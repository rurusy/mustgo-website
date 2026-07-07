// PayPal 주문 생성 — 금액을 서버에서 검증한 뒤 PayPal 에 주문을 만듭니다.
// 브라우저에서 supabase.functions.invoke('paypal-create-order', { body }) 로 호출.
//
// 필요한 Edge Function Secrets:
//   PAYPAL_CLIENT_ID / PAYPAL_SECRET / PAYPAL_ENV          (paypal.ts 참고)
//   PAYPAL_CURRENCY     기본 통화 (기본 'USD')
//   PAYPAL_MIN_AMOUNT   최소 결제 금액 (기본 '1')
//   PAYPAL_MAX_AMOUNT   최대 결제 금액 (기본 '50000')
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY              (자동 주입됨)
//
// 배포: supabase functions deploy paypal-create-order --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'
import { getAccessToken, paypalBase } from '../_shared/paypal.ts'

const DEFAULT_CURRENCY = Deno.env.get('PAYPAL_CURRENCY') ?? 'USD'
const MIN_AMOUNT = Number(Deno.env.get('PAYPAL_MIN_AMOUNT') ?? '1')
const MAX_AMOUNT = Number(Deno.env.get('PAYPAL_MAX_AMOUNT') ?? '50000')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)

    // 금액 검증: 서버가 단일 진실원. 클라이언트가 보낸 값은 범위/형식만 통과시킴.
    const amount = Math.round(Number(body?.amount) * 100) / 100
    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return jsonResponse({ error: `amount out of range (${MIN_AMOUNT}-${MAX_AMOUNT})` }, 400)
    }
    const currency = (body?.currency ?? DEFAULT_CURRENCY).toString().toUpperCase().slice(0, 3)
    const value = amount.toFixed(2)
    const reference = trimOrNull(body?.reference)

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
      console.error('[paypal-create-order] paypal error:', res.status, JSON.stringify(order))
      return jsonResponse({ error: 'paypal_create_failed' }, 502)
    }

    // 결제 기록 (best-effort — DB 오류가 결제 흐름을 막지 않도록 격리)
    try {
      await admin().from('payments').insert({
        paypal_order_id: order.id,
        amount,
        currency,
        status: 'created',
        payer_name: trimOrNull(body?.payer_name),
        payer_email: trimOrNull(body?.payer_email),
        reference,
      })
    } catch (e) {
      console.error('[paypal-create-order] db insert failed:', e)
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

function trimOrNull(v: unknown): string | null {
  const s = (v ?? '').toString().trim()
  return s.length ? s : null
}
