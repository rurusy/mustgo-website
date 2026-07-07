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
    const orderID = (body?.orderID ?? '').toString().trim()
    if (!orderID) return jsonResponse({ error: 'orderID required' }, 400)

    const token = await getAccessToken()
    const res = await fetch(`${paypalBase()}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // 같은 주문에 대한 캡처 재시도를 멱등 처리 (네트워크 재시도 대비)
        'PayPal-Request-Id': orderID,
      },
    })
    const data = await res.json()

    const alreadyCaptured = Array.isArray(data?.details)
      && data.details.some((d: { issue?: string }) => d?.issue === 'ORDER_ALREADY_CAPTURED')

    if ((!res.ok && !alreadyCaptured) || (res.ok && data?.status !== 'COMPLETED')) {
      console.error('[paypal-capture-order] capture failed:', res.status, JSON.stringify(data))
      await markFailed(orderID, data)
      return jsonResponse({ status: 'failed' }, 502)
    }

    const capture = data?.purchase_units?.[0]?.payments?.captures?.[0]
    const amount = capture?.amount?.value != null ? Number(capture.amount.value) : null
    const currency = capture?.amount?.currency_code ?? null
    const payer = data?.payer
    const payerName = payer?.name
      ? `${payer.name.given_name ?? ''} ${payer.name.surname ?? ''}`.trim() || null
      : null
    const payerEmail = payer?.email_address ?? null

    // 기록 갱신. 캡처에서 확인된 값만 덮어써서 create 단계의 고객 입력값을 보존.
    const record: Record<string, unknown> = {
      paypal_order_id: orderID,
      paypal_capture_id: capture?.id ?? null,
      status: 'completed',
      raw: data,
      updated_at: new Date().toISOString(),
    }
    if (amount != null) record.amount = amount
    if (currency) record.currency = currency
    if (payerName) record.payer_name = payerName
    if (payerEmail) record.payer_email = payerEmail

    try {
      await admin().from('payments').upsert(record, { onConflict: 'paypal_order_id' })
    } catch (e) {
      console.error('[paypal-capture-order] db upsert failed:', e)
    }

    // 관리자 알림 (best-effort)
    await notifyAdmin({ amount, currency, payerName, payerEmail, orderID, captureId: capture?.id })

    return jsonResponse(
      { status: 'completed', order_id: orderID, capture_id: capture?.id ?? null, amount, currency },
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

async function markFailed(orderID: string, data: unknown) {
  try {
    await admin().from('payments').upsert(
      { paypal_order_id: orderID, status: 'failed', raw: data, updated_at: new Date().toISOString() },
      { onConflict: 'paypal_order_id' },
    )
  } catch (e) {
    console.error('[paypal-capture-order] markFailed db error:', e)
  }
}

async function notifyAdmin(info: {
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

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[MustGo 결제] $${amountLabel} 결제 완료`,
        text: [
          'PayPal 결제가 완료되었습니다.',
          '',
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
