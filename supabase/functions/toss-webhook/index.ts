// 토스페이먼츠 웹훅 — 가상계좌 입금처럼 "결제창을 떠난 뒤"에 확정되는 결제를 반영합니다.
//
// 카드·간편결제·계좌이체는 승인(toss-confirm-payment) 시점에 즉시 완료되지만,
// 가상계좌는 고객이 나중에 입금해야 완료됩니다. 그 순간을 알 수 있는 유일한 경로가
// 이 웹훅입니다.
//
// 상점관리자 → 개발자센터 → 웹훅에서 아래 URL 을 DEPOSIT_CALLBACK 이벤트로 등록:
//   https://<project-ref>.supabase.co/functions/v1/toss-webhook
//
// 설계 원칙: 웹훅 본문을 신뢰하지 않고 "알림이 왔다"는 신호로만 씁니다. 실제 상태는
// 매번 토스 API 에서 다시 조회합니다. 덕분에 위조 요청으로 상태를 바꿀 수 없고,
// 재시도로 오래된 알림이 늦게 도착해도 상태가 거꾸로 덮이지 않습니다.
//
// 필요한 Edge Function Secrets:
//   TOSS_SECRET_KEY                            (toss.ts 참고)
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (자동 주입됨)
//   (선택) RESEND_API_KEY / ADMIN_NOTIFY_TO / SENDER_FROM  — 관리자 알림 메일
//
// 배포: supabase functions deploy toss-webhook --no-verify-jwt
//       (토스는 Supabase JWT 를 보내지 않으므로 --no-verify-jwt 가 필수입니다.)

import { createClient } from 'npm:@supabase/supabase-js@2'
import { jsonResponse } from '../_shared/cors.ts'
import { mapStatus, tossRequest } from '../_shared/toss.ts'
import { notifyPaymentKr } from '../_shared/notify.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)

    // 두 이벤트 형식을 모두 받아들인다.
    //   DEPOSIT_CALLBACK       { orderId, status, secret, transactionKey, createdAt }
    //   PAYMENT_STATUS_CHANGED { eventType, createdAt, data: { …Payment } }
    const isStatusChanged = body?.eventType === 'PAYMENT_STATUS_CHANGED'
    const payload = isStatusChanged ? body?.data : body
    const orderId = (payload?.orderId ?? '').toString().trim().slice(0, 64)
    const incomingSecret = payload?.secret != null ? String(payload.secret) : null

    if (!orderId) return jsonResponse({ error: 'invalid_payload' }, 400)

    const db = admin()
    const { data: row, error: readError } = await db
      .from('payments_kr')
      .select('status, amount, method, vbank_secret, payer_name, payer_email, reference, receipt_url')
      .eq('order_id', orderId)
      .maybeSingle()

    if (readError) {
      console.error('[toss-webhook] db read failed:', readError.message)
      return jsonResponse({ error: 'internal_error' }, 500)
    }
    // 아직 승인 기록이 없으면 4xx 로 응답해 토스가 재시도하게 둔다.
    if (!row) {
      console.warn('[toss-webhook] unknown order:', orderId)
      return jsonResponse({ error: 'unknown_order' }, 404)
    }

    // 가상계좌 발급 시 받은 secret 과 대조 (위조 알림 차단).
    // 아직 secret 이 기록되기 전이면 건너뛰고, 아래 토스 API 조회로만 판단한다.
    if (row.vbank_secret && incomingSecret && incomingSecret !== row.vbank_secret) {
      console.error('[toss-webhook] secret mismatch for order:', orderId)
      return jsonResponse({ error: 'unauthorized' }, 401)
    }

    // 진실원은 언제나 토스 API. 웹훅 본문의 status 는 쓰지 않는다.
    const lookup = await tossRequest(`/v1/payments/orders/${encodeURIComponent(orderId)}`)
    if (!lookup.ok) {
      console.error('[toss-webhook] payment lookup failed:', lookup.status, lookup.data?.code)
      return jsonResponse({ error: 'lookup_failed' }, 502)
    }

    const payment = lookup.data
    const status = mapStatus(payment?.status)
    if (status === row.status) {
      return jsonResponse({ ok: true, unchanged: true }, 200)
    }

    const method = payment?.method != null ? String(payment.method) : row.method
    const receiptUrl = (payment?.receipt as { url?: string } | undefined)?.url ?? row.receipt_url

    const { error: updateError } = await db
      .from('payments_kr')
      .update({
        status,
        method,
        receipt_url: receiptUrl,
        approved_at: payment?.approvedAt ? String(payment.approvedAt) : null,
        raw: payment,
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId)
    if (updateError) {
      console.error('[toss-webhook] db update failed:', updateError.message)
      // 반영에 실패했으면 재시도를 받는 편이 낫다.
      return jsonResponse({ error: 'internal_error' }, 500)
    }

    // 입금 완료·취소처럼 사람이 알아야 하는 전이에서만 메일을 보낸다.
    if (status === 'completed' || status === 'canceled') {
      await notifyPaymentKr({
        status,
        amount: row.amount != null ? Number(row.amount) : null,
        method,
        payerName: row.payer_name ?? null,
        payerEmail: row.payer_email ?? null,
        reference: row.reference ?? null,
        orderId,
        receiptUrl,
      })
    }

    return jsonResponse({ ok: true, status }, 200)
  } catch (e) {
    console.error('[toss-webhook] unhandled:', e)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}
