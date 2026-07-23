// 토스페이먼츠 결제 승인 — 고객이 결제창에서 인증을 마치고 successUrl 로 돌아오면
// 브라우저가 supabase.functions.invoke('toss-confirm-payment', { body }) 로 호출합니다.
//
// 토스 결제는 "인증"과 "승인"이 분리되어 있습니다. 이 함수가 승인 API 를 호출해야
// 비로소 실제로 청구됩니다. 승인 전에 반드시 서버가 보관한 금액과 대조합니다.
//
// 필요한 Edge Function Secrets:
//   TOSS_SECRET_KEY                            (toss.ts 참고)
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (자동 주입됨)
//   (선택) RESEND_API_KEY / ADMIN_NOTIFY_TO / SENDER_FROM  — 관리자 알림 메일
//
// 배포: supabase functions deploy toss-confirm-payment --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'
import { mapStatus, tossRequest, virtualAccountSummary } from '../_shared/toss.ts'
import { notifyPaymentKr } from '../_shared/notify.ts'

// 이미 결과가 확정된 상태 — 승인을 다시 시도하지 않고 기록된 값을 그대로 돌려준다.
const SETTLED = ['completed', 'waiting_for_deposit', 'canceled']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)
    const paymentKey = (body?.paymentKey ?? '').toString().trim().slice(0, 200)
    const orderId = (body?.orderId ?? '').toString().trim().slice(0, 64)
    const amount = Number(body?.amount)

    if (!paymentKey || !orderId || !Number.isSafeInteger(amount)) {
      return jsonResponse({ error: 'invalid_request' }, 400)
    }

    const db = admin()

    const { data: row, error: readError } = await db
      .from('payments_kr')
      .select('status, amount, method, receipt_url, approved_at, raw, payer_name, payer_email, reference')
      .eq('order_id', orderId)
      .maybeSingle()

    if (readError) {
      console.error('[toss-confirm-payment] db read failed:', readError.message)
      return jsonResponse({ error: 'internal_error' }, 500)
    }
    // 서버가 만들지 않은 주문번호는 승인하지 않는다.
    if (!row) return jsonResponse({ error: 'unknown_order' }, 404)

    // 앱 레벨 멱등: 새로고침·중복 호출로 승인이 두 번 나가지 않도록.
    if (SETTLED.includes(row.status)) {
      return jsonResponse(summary(orderId, row.status, row, row.raw), 200)
    }

    // 금액 대조 — 결제창으로 넘어간 뒤 쿼리스트링이 조작됐는지 확인하는 핵심 검증.
    if (Number(row.amount) !== amount) {
      console.error('[toss-confirm-payment] amount mismatch for order:', orderId)
      return jsonResponse({ error: 'amount_mismatch' }, 400)
    }

    const res = await tossRequest('/v1/payments/confirm', {
      method: 'POST',
      body: { paymentKey, orderId, amount },
      idempotencyKey: orderId,
    })

    let payment = res.data

    // 이미 승인된 결제(멱등 창 만료 후 재시도 등): 에러 본문을 결제로 오독하지 말고
    // 주문번호로 실제 결제를 다시 조회한다.
    if (!res.ok && payment?.code === 'ALREADY_PROCESSED_PAYMENT') {
      const lookup = await tossRequest(`/v1/payments/orders/${encodeURIComponent(orderId)}`)
      if (lookup.ok) payment = lookup.data
    } else if (!res.ok) {
      // PII 없이 식별 가능한 값만 로깅.
      console.error('[toss-confirm-payment] confirm failed:', res.status, payment?.code)
      await markFailed(db, orderId, payment)
      return jsonResponse(
        { error: 'confirm_failed', code: payment?.code ?? null },
        502,
      )
    }

    const status = mapStatus(payment?.status)
    if (status === 'failed') {
      console.error('[toss-confirm-payment] unexpected payment status:', payment?.status)
      await markFailed(db, orderId, payment)
      return jsonResponse({ error: 'confirm_failed', code: null }, 502)
    }

    const approvedAt = payment?.approvedAt ? String(payment.approvedAt) : null
    const record: Record<string, unknown> = {
      payment_key: paymentKey,
      status,
      method: payment?.method != null ? String(payment.method) : null,
      receipt_url: (payment?.receipt as { url?: string } | undefined)?.url ?? null,
      // 가상계좌 입금 웹훅을 검증할 때 대조하는 값 (가상계좌가 아니면 null).
      vbank_secret: payment?.secret != null ? String(payment.secret) : null,
      approved_at: approvedAt,
      raw: payment,
      updated_at: new Date().toISOString(),
    }

    const { error: updateError } = await db
      .from('payments_kr')
      .update(record)
      .eq('order_id', orderId)
    if (updateError) {
      console.error('[toss-confirm-payment] db update failed:', updateError.message)
    }

    await notifyPaymentKr({
      status,
      amount,
      method: record.method as string | null,
      payerName: row.payer_name ?? null,
      payerEmail: row.payer_email ?? null,
      reference: row.reference ?? null,
      orderId,
      receiptUrl: record.receipt_url as string | null,
    })

    return jsonResponse(summary(orderId, status, { ...row, ...record }, payment), 200)
  } catch (e) {
    console.error('[toss-confirm-payment] unhandled:', e)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}

// 브라우저에 돌려주는 결과. 결제 완료 화면에 필요한 값만 담는다.
function summary(
  orderId: string,
  status: string,
  row: Record<string, unknown>,
  payment: Record<string, unknown> | null | undefined,
) {
  return {
    status,
    order_id: orderId,
    amount: row.amount != null ? Number(row.amount) : null,
    method: (row.method as string | null) ?? null,
    receipt_url: (row.receipt_url as string | null) ?? null,
    approved_at: (row.approved_at as string | null) ?? null,
    virtual_account: virtualAccountSummary(payment),
  }
}

// 실패 기록은 UPDATE 로만 시도한다 (선행 create 행이 항상 존재하므로).
async function markFailed(
  db: ReturnType<typeof admin>,
  orderId: string,
  payment: unknown,
) {
  try {
    const { error } = await db
      .from('payments_kr')
      .update({ status: 'failed', raw: payment, updated_at: new Date().toISOString() })
      .eq('order_id', orderId)
    if (error) console.error('[toss-confirm-payment] markFailed failed:', error.message)
  } catch (e) {
    console.error('[toss-confirm-payment] markFailed threw:', e)
  }
}
