// 토스페이먼츠 주문 생성 — 결제창을 열기 "전"에 주문번호와 금액을 서버에 고정합니다.
// 브라우저에서 supabase.functions.invoke('toss-prepare-payment', { body }) 로 호출.
//
// 이 단계는 토스 API 를 호출하지 않습니다. 결제 요청은 브라우저 SDK 가 하고,
// 서버는 "이 주문번호의 정당한 금액은 얼마인가"를 미리 기록해 둘 뿐입니다.
// 승인(toss-confirm-payment) 시 이 금액과 대조해서 금액 변조를 차단합니다.
//
// 필요한 Edge Function Secrets:
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (자동 주입됨)
//   (선택) TOSS_MIN_AMOUNT  최소 결제 금액 (기본 '1000')
//   (선택) TOSS_MAX_AMOUNT  최대 결제 금액 (기본 '100000000' = 1억)
//
// 배포: supabase functions deploy toss-prepare-payment --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'

const MIN_AMOUNT = Number(Deno.env.get('TOSS_MIN_AMOUNT') ?? '1000')
const MAX_AMOUNT = Number(Deno.env.get('TOSS_MAX_AMOUNT') ?? '100000000')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => null)

    // 금액 검증: 서버가 단일 진실원. 원화라 정수만 허용한다.
    const amount = Number(body?.amount)
    if (!Number.isSafeInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return jsonResponse(
        { error: 'amount_out_of_range', min: MIN_AMOUNT, max: MAX_AMOUNT },
        400,
      )
    }

    // 공개 엔드포인트라 입력 길이를 서버에서 제한(DB bloat / 남용 방지).
    const reference = trimOrNull(body?.reference, 200)
    const payerName = trimOrNull(body?.payer_name, 100)
    const payerEmail = trimOrNull(body?.payer_email, 254)

    const orderId = newOrderId()
    const orderName = buildOrderName(reference)

    // 승인 단계가 이 행을 기준으로 금액을 검증하므로, 기록에 실패하면 결제를 진행시키지
    // 않는다. (미승인 주문은 청구되지 않지만, 여기서 막는 편이 고객 경험상 낫다.)
    const { error: dbError } = await admin().from('payments_kr').insert({
      order_id: orderId,
      amount,
      currency: 'KRW',
      status: 'created',
      payer_name: payerName,
      payer_email: payerEmail,
      reference,
    })
    if (dbError) {
      console.error('[toss-prepare-payment] db insert failed:', dbError.message)
      return jsonResponse({ error: 'order_create_failed' }, 500)
    }

    return jsonResponse({ orderId, orderName, amount, currency: 'KRW' }, 200)
  } catch (e) {
    console.error('[toss-prepare-payment] unhandled:', e)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})

function admin() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
}

// 토스 규격: 6~64자, 영문 대소문자·숫자·'-'·'_' 만 허용.
function newOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()
  return `MG-${stamp}-${rand}`
}

// 토스 규격: 최대 100자. 결제창과 매출전표·카드 명세서에 표시됩니다.
function buildOrderName(reference: string | null): string {
  const base = '머스트고 여행대금'
  const name = reference ? `${base} (${reference})` : base
  return name.slice(0, 100)
}

function trimOrNull(v: unknown, maxLen: number): string | null {
  const s = (v ?? '').toString().trim()
  return s.length ? s.slice(0, maxLen) : null
}
