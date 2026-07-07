// PayPal 주문 캡처 — 고객이 PayPal 창에서 승인(onApprove)하면 결제를 확정합니다.
// 브라우저에서 supabase.functions.invoke('paypal-capture-order', { body: { orderID } }) 로 호출.
//
// 필요한 Edge Function Secrets:
//   PAYPAL_CLIENT_ID / PAYPAL_SECRET / PAYPAL_ENV          (paypal.ts 참고)
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY              (자동 주입됨)
//   (선택) RESEND_API_KEY / ADMIN_NOTIFY_TO / SENDER_FROM  — 관리자 알림 메일
//          inquiry-email 함수와 동일한 시크릿을 공유합니다.
//
// 배포: supabase functions deploy paypal-capture-order --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'
import { getAccessToken, paypalBase } from '../_shared/paypal.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)
    const orderID = (body?.orderID ?? '').toString().trim().slice(0, 64)
    if (!orderID) return jsonResponse({ error: 'orderID required' }, 400)

    const db = admin()

    // 이미 완료로 기록된 주문이면 재캡처/중복 알림 없이 그대로 반환(앱 레벨 멱등).
    const { data: existing, error: readError } = await db
      .from('payments')
      .select('status, amount, currency, paypal_capture_id')
      .eq('paypal_order_id', orderID)
      .maybeSingle()
    if (!readError && existing?.status === 'completed') {
      return jsonResponse(
        {
          status: 'completed',
          order_id: orderID,
          capture_id: existing.paypal_capture_id ?? null,
          amount: existing.amount != null ? Number(existing.amount) : null,
          currency: existing.currency ?? null,
        },
        200,
      )
    }

    const token = await getAccessToken()
    const capRes = await fetch(`${paypalBase()}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // 같은 주문에 대한 캡처 재시도를 멱등 처리 (네트워크 재시도 대비)
        'PayPal-Request-Id': orderID,
      },
    })
    let data = await capRes.json()

    // 이미 캡처된 주문(멱등 창 만료 후 재시도 등): 에러 본문을 주문으로 오독하지 말고
    // 실제 주문을 다시 조회해 캡처 세부정보를 얻는다.
    const alreadyCaptured = Array.isArray(data?.details)
      && data.details.some((d: { issue?: string }) => d?.issue === 'ORDER_ALREADY_CAPTURED')
    if (!capRes.ok && alreadyCaptured) {
      const getRes = await fetch(`${paypalBase()}/v2/checkout/orders/${orderID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (getRes.ok) data = await getRes.json()
    }

    const capture = data?.purchase_units?.[0]?.payments?.captures?.[0]
    const captureStatus = capture?.status // COMPLETED | PENDING | DECLINED | ...
    const completed = captureStatus === 'COMPLETED'
    const pending = captureStatus === 'PENDING'

    if (!completed && !pending) {
      console.error(
        '[paypal-capture-order] capture failed:',
        capRes.status,
        data?.name,
        data?.debug_id,
        captureStatus,
      )
      await markFailed(db, orderID, data)
      return jsonResponse({ status: 'failed' }, 502)
    }

    const amount = capture?.amount?.value != null ? Number(capture.amount.value) : null
    const currency = capture?.amount?.currency_code ?? null
    const payer = data?.payer
    const payerName = payer?.name
      ? `${payer.name.given_name ?? ''} ${payer.name.surname ?? ''}`.trim() || null
      : null
    const payerEmail = payer?.email_address ?? null
    const status = completed ? 'completed' : 'pending'

    // 캡처에서 확인된 값만 덮어써서 create 단계의 고객 입력값(reference 등)을 보존.
    const record: Record<string, unknown> = {
      paypal_order_id: orderID,
      paypal_capture_id: capture?.id ?? null,
      status,
      raw: data,
      updated_at: new Date().toISOString(),
    }
    if (amount != null) record.amount = amount
    if (currency) record.currency = currency
    if (payerName) record.payer_name = payerName
    if (payerEmail) record.payer_email = payerEmail

    const { error: upsertError } = await db
      .from('payments')
      .upsert(record, { onConflict: 'paypal_order_id' })
    if (upsertError) console.error('[paypal-capture-order] db upsert failed:', upsertError.message)

    // 관리자 알림 (best-effort)
    await notifyAdmin({ status, amount, currency, payerName, payerEmail, orderID, captureId: capture?.id })

    return jsonResponse(
      { status, order_id: orderID, capture_id: capture?.id ?? null, amount, currency },
      200,
    )
  } catch (e) {
    console.error('[paypal-capture-order] unhandled:', e)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}

// 실패 기록은 UPDATE 로만 시도한다. amount 가 NOT NULL 이라, 선행 create 행이 없을 때
// upsert 로 INSERT 하면 제약 위반이 나므로(정상 캡처는 항상 create 행이 선행함).
async function markFailed(
  db: ReturnType<typeof admin>,
  orderID: string,
  data: unknown,
) {
  try {
    const { error } = await db
      .from('payments')
      .update({ status: 'failed', raw: data, updated_at: new Date().toISOString() })
      .eq('paypal_order_id', orderID)
    if (error) console.error('[paypal-capture-order] markFailed failed:', error.message)
  } catch (e) {
    console.error('[paypal-capture-order] markFailed threw:', e)
  }
}

async function notifyAdmin(info: {
  status: string
  amount: number | null
  currency: string | null
  payerName: string | null
  payerEmail: string | null
  orderID: string
  captureId?: string
}) {
  const key = Deno.env.get('RESEND_API_KEY')
  const to = Deno.env.get('ADMIN_NOTIFY_TO')
  const from = Deno.env.get('SENDER_FROM')
  if (!key || !to || !from) return

  const amountLabel = info.amount != null
    ? `${info.amount.toFixed(2)} ${info.currency ?? ''}`.trim()
    : '(금액 확인 필요)'
  const statusLabel = info.status === 'completed' ? '결제 완료' : '결제 접수 (확인 대기)'

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[MustGo 결제] $${amountLabel} ${statusLabel}`,
        text: [
          `PayPal ${statusLabel}.`,
          '',
          `상태: ${info.status}`,
          `금액: $${amountLabel}`,
          `결제자: ${info.payerName ?? '-'}`,
          `이메일: ${info.payerEmail ?? '-'}`,
          `주문번호: ${info.orderID}`,
          `거래번호: ${info.captureId ?? '-'}`,
        ].join('\n'),
      }),
    })
  } catch (e) {
    console.error('[paypal-capture-order] notify failed:', e)
  }
}
