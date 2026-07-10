// PayPal 주문 생성 — 금액을 서버에서 검증한 뒤 PayPal 에 주문을 만듭니다.
// 브라우저에서 supabase.functions.invoke('paypal-create-order', { body }) 로 호출.
//
// 필요한 Edge Function Secrets:
//   PAYPAL_CLIENT_ID / PAYPAL_SECRET / PAYPAL_ENV          (paypal.ts 참고)
//   PAYPAL_CURRENCIES   허용 통화 목록 (기본 'USD,EUR') — 이 목록 안에서만 클라이언트 선택 허용
//   PAYPAL_CURRENCY     기본 통화 (미지정 시 목록 첫 번째) — 클라이언트가 통화 미전송 시 사용
//   PAYPAL_MIN_AMOUNT   최소 결제 금액 (기본 '1')
//   PAYPAL_MAX_AMOUNT   최대 결제 금액 (기본 '50000')
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY              (자동 주입됨)
//
// 배포: supabase functions deploy paypal-create-order --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'
import { getAccessToken, paypalBase } from '../_shared/paypal.ts'

// 통화는 허용목록 안에서만 채택한다. 클라이언트가 보낸 값이라도 목록에 없으면 거부.
const ALLOWED_CURRENCIES = (Deno.env.get('PAYPAL_CURRENCIES') ?? 'USD,EUR')
  .split(',')
  .map((c) => c.trim().toUpperCase().slice(0, 3))
  .filter(Boolean)
const DEFAULT_CURRENCY = (Deno.env.get('PAYPAL_CURRENCY') ?? ALLOWED_CURRENCIES[0] ?? 'USD')
  .toUpperCase()
  .slice(0, 3)
const MIN_AMOUNT = Number(Deno.env.get('PAYPAL_MIN_AMOUNT') ?? '1')
const MAX_AMOUNT = Number(Deno.env.get('PAYPAL_MAX_AMOUNT') ?? '50000')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)

    // 금액 검증: 서버가 단일 진실원.
    const amount = Math.round(Number(body?.amount) * 100) / 100
    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return jsonResponse({ error: `amount out of range (${MIN_AMOUNT}-${MAX_AMOUNT})` }, 400)
    }
    const value = amount.toFixed(2)

    // 통화 검증: 클라이언트가 보낸 통화를 허용목록과 대조해서만 채택(미전송 시 기본값).
    let currency = DEFAULT_CURRENCY
    const rawCurrency = body?.currency
    if (rawCurrency != null && String(rawCurrency).trim() !== '') {
      const c = String(rawCurrency).toUpperCase().slice(0, 3)
      if (!ALLOWED_CURRENCIES.includes(c)) {
        return jsonResponse(
          { error: `unsupported currency (allowed: ${ALLOWED_CURRENCIES.join(', ')})` },
          400,
        )
      }
      currency = c
    }

    // 공개 엔드포인트라 입력 길이를 서버에서 제한(DB bloat / 남용 방지).
    const reference = trimOrNull(body?.reference, 200)
    const payerName = trimOrNull(body?.payer_name, 200)
    const payerEmail = trimOrNull(body?.payer_email, 254)

    const token = await getAccessToken()
    const res = await fetch(`${paypalBase()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: currency, value },
            description: 'MustGo travel service',
            ...(reference ? { custom_id: reference.slice(0, 127) } : {}),
          },
        ],
      }),
    })
    const order = await res.json()
    if (!res.ok || !order?.id) {
      // PII(payer 등)를 남기지 않도록 상태/식별자만 로깅.
      console.error('[paypal-create-order] paypal error:', res.status, order?.name, order?.debug_id)
      return jsonResponse({ error: 'paypal_create_failed' }, 502)
    }

    // 결제 기록 (best-effort). supabase-js 는 DB 에러를 throw 하지 않고 { error } 로
    // 반환하므로 반드시 확인해서 로깅(그렇지 않으면 실패가 조용히 유실됨).
    try {
      const { error: dbError } = await admin().from('payments').insert({
        paypal_order_id: order.id,
        amount,
        currency,
        status: 'created',
        payer_name: payerName,
        payer_email: payerEmail,
        reference,
      })
      if (dbError) console.error('[paypal-create-order] db insert failed:', dbError.message)
    } catch (e) {
      console.error('[paypal-create-order] db insert threw:', e)
    }

    return jsonResponse({ id: order.id }, 200)
  } catch (e) {
    console.error('[paypal-create-order] unhandled:', e)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}

function trimOrNull(v: unknown, maxLen: number): string | null {
  const s = (v ?? '').toString().trim()
  return s.length ? s.slice(0, maxLen) : null
}
