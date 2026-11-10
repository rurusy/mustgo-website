import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section, Fade, FormLabel, Input, BrandText, Button } from '../ui'
import { supabase } from '../../lib/supabase'
import { cn } from '../../design/cn'
import { PRODUCT_PATH, PRODUCT_SLUG, sampleProduct } from '../../data/sampleProduct'

// 클라이언트 키는 "공개값"이라 프론트엔드에 노출해도 안전합니다.
// 시크릿 키는 서버(Edge Function Secrets)에만 둡니다.
const CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY

// 연동 방식은 클라이언트 키의 종류로 정해진다 — 키마다 쓸 수 있는 SDK 가 다르다.
//   test_gck_ / live_gck_  결제위젯 연동 키   → 'widget' (결제수단·약관 UI 를 페이지에 그림)
//   test_ck_  / live_ck_   API 개별 연동 키   → 'window' (우리가 결제수단 버튼을 그리고, 토스 결제창을 띄움)
// 서버의 TOSS_SECRET_KEY 도 같은 종류(gsk / sk)의 짝이어야 승인이 된다.
// 2026-11: 가맹 심사 중이라 개발자센터에 체험 상점의 ck 키만 있어서 'window' 를 추가했다.
// 계약 후 gck 키를 받으면 키만 바꾸면 되고 코드는 그대로 둔다.
function integrationMode(key) {
  if (/^(test|live)_gck_/.test(key ?? '')) return 'widget'
  if (/^(test|live)_ck_/.test(key ?? '')) return 'window'
  return null
}
const MODE = integrationMode(CLIENT_KEY)

// 서버(toss-prepare-payment)의 TOSS_MIN_AMOUNT / TOSS_MAX_AMOUNT 와 맞춰야 합니다.
const MIN_AMOUNT = 1000
const MAX_AMOUNT = 100000000 // 1억원

const METHODS_SELECTOR = '#toss-payment-methods'
const AGREEMENT_SELECTOR = '#toss-agreement'

// 'window' 모드에서 고객이 고르는 결제수단. 카드 결제창(flowMode DEFAULT)은 카드사 목록과
// 함께 상점에 계약된 간편결제도 보여주므로 '간편결제'를 따로 두지 않는다.
// 결제창 약관 동의는 토스 결제창 안에서 받는다.
const WINDOW_METHODS = [
  {
    key: 'CARD',
    label: '신용·체크카드 / 간편결제',
    options: { card: { flowMode: 'DEFAULT', useEscrow: false, useCardPoint: false, useAppCardOnly: false } },
  },
  { key: 'TRANSFER', label: '계좌이체', options: { transfer: { useEscrow: false } } },
  {
    key: 'VIRTUAL_ACCOUNT',
    label: '가상계좌 (무통장입금)',
    // 입금 기한 7일 — 결제위젯 기본값과 같게. 입금 확인은 toss-webhook 이 처리한다.
    options: { virtualAccount: { validHours: 168, useEscrow: false } },
  },
]

// 토스 결제위젯 SDK(v2)를 한 번만 로드한다. 로드되면 window.TossPayments 가 생긴다.
let sdkPromise = null
function loadTossSdk() {
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise((resolve, reject) => {
    if (window.TossPayments) return resolve(window.TossPayments)

    const script = document.createElement('script')
    script.src = 'https://js.tosspayments.com/v2/standard'
    script.async = true
    script.onload = () =>
      window.TossPayments
        ? resolve(window.TossPayments)
        : reject(new Error('TossPayments global missing'))
    script.onerror = () => reject(new Error('Toss SDK load failed'))
    document.body.appendChild(script)
  })
  // 실패는 캐시하지 않는다 — 네트워크가 회복되면 다시 시도할 수 있도록.
  sdkPromise.catch(() => {
    sdkPromise = null
  })
  return sdkPromise
}

// 입력에서 숫자만 남겨 정수 금액으로. 원화는 소수점이 없다.
function parseAmount(raw) {
  const digits = String(raw ?? '').replace(/[^\d]/g, '').slice(0, 12)
  if (!digits) return null
  const n = Number(digits)
  return Number.isSafeInteger(n) ? n : null
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// 결제 링크용 프리필: /pay-kr?amount=1500000&ref=견적번호 처럼 보내면 금액과 메모가
// 채워진 채로 열린다. 입력칸을 미리 채울 뿐이라 고객이 직접 입력하는 것과 같고,
// 금액 범위 검증·주문 고정은 기존 흐름(toss-prepare-payment) 그대로 거친다.
function initialFromQuery() {
  if (typeof window === 'undefined') return { amount: '', reference: '' }
  const q = new URLSearchParams(window.location.search)
  const n = parseAmount(q.get('amount'))
  return {
    amount: n === null ? '' : n.toLocaleString('ko-KR'),
    reference: (q.get('ref') ?? '').slice(0, 100),
  }
}

// 상품 결제 모드: 상품 페이지가 /pay-kr?product=seoul-busan-5d&qty=2 로 보내면, 금액을
// 상품 데이터(단가 × 인원)로 계산해 고정한다. 고객이 금액을 고칠 수 없어서 "상품 금액 =
// 결제 금액"이 화면에서 보장된다. 모르는 상품이거나 인원이 이상하면 일반 모드로 연다.
// 토스 심사용 상품과 함께 생겼으므로 상품을 철거할 때 이 함수와 product 분기도 지운다.
function productFromQuery() {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search)
  if (q.get('product') !== PRODUCT_SLUG) return null
  const qty = Number(q.get('qty') ?? '1')
  const unitPrice = sampleProduct.pricePerPerson
  if (!Number.isSafeInteger(qty) || qty < 1 || qty * unitPrice > MAX_AMOUNT) return null
  return { name: sampleProduct.name, qty, unitPrice, amount: qty * unitPrice }
}

export function PaymentKr() {
  const [initial] = useState(initialFromQuery)
  const [product] = useState(productFromQuery)
  const [amount, setAmount] = useState(() =>
    product ? product.amount.toLocaleString('ko-KR') : initial.amount,
  )
  const [payerName, setPayerName] = useState('')
  const [payerEmail, setPayerEmail] = useState('')
  const [reference, setReference] = useState(() =>
    product ? `${product.name} ${product.qty}인` : initial.reference,
  )

  // form   금액·연락처 입력 단계
  // widget 결제수단 선택 단계 (주문번호와 금액이 서버에 고정된 뒤)
  const [step, setStep] = useState('form')
  const [order, setOrder] = useState(null) // { orderId, orderName, amount }
  const [preparing, setPreparing] = useState(false)
  const [paying, setPaying] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [widgetState, setWidgetState] = useState('idle') // idle | loading | ready | error

  const [windowMethod, setWindowMethod] = useState(WINDOW_METHODS[0].key) // 'window' 모드 전용

  const widgetsRef = useRef(null) // 토스 widgets 인스턴스 (한 번만 생성) — 'widget' 모드
  const paymentRef = useRef(null) // 토스 payment 인스턴스 (한 번만 생성) — 'window' 모드
  const renderedRef = useRef(false) // 결제수단/약관 UI 를 이미 그렸는지

  const parsed = parseAmount(amount)
  const amountValid = parsed !== null && parsed >= MIN_AMOUNT && parsed <= MAX_AMOUNT
  const emailValid = !payerEmail.trim() || isValidEmail(payerEmail.trim())
  const configured = Boolean(MODE) && typeof supabase.functions?.invoke === 'function'

  const onAmountChange = (e) => {
    const n = parseAmount(e.target.value)
    setAmount(n === null ? '' : n.toLocaleString('ko-KR'))
  }

  // 결제창을 열기 전에 서버가 주문번호를 발급하고 금액을 고정한다.
  // 이 금액이 승인 단계에서 대조되므로, 금액을 바꾸면 주문도 새로 만들어야 한다.
  const onProceed = async () => {
    if (!amountValid) {
      setErrorMsg(
        `결제 금액은 ${MIN_AMOUNT.toLocaleString('ko-KR')}원 이상 ${MAX_AMOUNT.toLocaleString('ko-KR')}원 이하로 입력해주세요.`,
      )
      return
    }
    if (!emailValid) {
      setErrorMsg('이메일 형식을 확인해주세요.')
      return
    }

    setErrorMsg('')
    setPreparing(true)
    const { data, error } = await supabase.functions.invoke('toss-prepare-payment', {
      body: {
        amount: parsed,
        payer_name: payerName.trim() || null,
        payer_email: payerEmail.trim() || null,
        reference: reference.trim() || null,
      },
    })
    setPreparing(false)

    if (error || !data?.orderId) {
      console.error('[payment-kr] prepare failed:', error)
      setErrorMsg('결제 준비 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setOrder(data)
    setStep('widget')
  }

  // 결제수단 위젯 준비. 컨테이너가 화면에 보이는 상태에서 그려야 높이가 정확해서,
  // step 이 'widget' 으로 바뀐 뒤(=DOM 커밋 후)에 실행되도록 의존성에 넣는다.
  useEffect(() => {
    if (step !== 'widget' || !order || !configured) return

    let cancelled = false
    setWidgetState('loading')
    ;(async () => {
      try {
        const TossPayments = await loadTossSdk()
        if (cancelled) return

        // 결제창 방식은 그릴 UI 가 없다. 인스턴스만 만들고, 금액은 requestPayment 때 넘긴다.
        if (MODE === 'window') {
          if (!paymentRef.current) {
            paymentRef.current = TossPayments(CLIENT_KEY).payment({
              customerKey: TossPayments.ANONYMOUS,
            })
          }
          if (!cancelled) setWidgetState('ready')
          return
        }

        if (!widgetsRef.current) {
          const toss = TossPayments(CLIENT_KEY)
          widgetsRef.current = toss.widgets({ customerKey: TossPayments.ANONYMOUS })
        }
        const widgets = widgetsRef.current

        // 금액은 항상 서버가 확정한 값으로 세팅한다 (입력값이 아니라 order.amount).
        await widgets.setAmount({ currency: 'KRW', value: order.amount })

        // 위젯은 한 번만 렌더하고, 이후 금액 변경은 setAmount 로만 반영한다.
        if (!renderedRef.current) {
          await Promise.all([
            widgets.renderPaymentMethods({
              selector: METHODS_SELECTOR,
              variantKey: 'DEFAULT',
            }),
            // 약관 위젯은 variantKey 를 넘기지 않고 기본값을 쓴다 — 상점관리자에 없는
            // variantKey 를 넘기면 렌더가 실패한다.
            widgets.renderAgreement({ selector: AGREEMENT_SELECTOR }),
          ])
          renderedRef.current = true
        }

        if (!cancelled) setWidgetState('ready')
      } catch (e) {
        console.error('[payment-kr] widget init failed:', e)
        if (!cancelled) setWidgetState('error')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [step, order, configured])

  const onPay = async () => {
    const instance = MODE === 'window' ? paymentRef.current : widgetsRef.current
    if (!instance || !order) return

    // 성공/실패 모두 페이지를 떠나 토스가 지정한 URL 로 돌아옵니다.
    // 실제 승인은 돌아온 뒤 /pay-kr/success 에서 서버가 처리합니다 (두 방식 공통).
    const common = {
      orderId: order.orderId,
      orderName: order.orderName,
      successUrl: `${window.location.origin}/pay-kr/success`,
      failUrl: `${window.location.origin}/pay-kr/fail`,
      ...(payerName.trim() ? { customerName: payerName.trim().slice(0, 100) } : {}),
      ...(payerEmail.trim() && isValidEmail(payerEmail.trim())
        ? { customerEmail: payerEmail.trim() }
        : {}),
    }

    setErrorMsg('')
    setPaying(true)
    try {
      if (MODE === 'window') {
        const method = WINDOW_METHODS.find((m) => m.key === windowMethod) ?? WINDOW_METHODS[0]
        // 금액은 항상 서버가 확정한 값 (입력값이 아니라 order.amount).
        await instance.requestPayment({
          method: method.key,
          amount: { currency: 'KRW', value: order.amount },
          ...method.options,
          ...common,
        })
      } else {
        await instance.requestPayment(common)
      }
    } catch (e) {
      setPaying(false)
      // 고객이 결제창을 닫은 경우는 오류가 아니다.
      if (e?.code === 'USER_CANCEL') return
      console.error('[payment-kr] requestPayment failed:', e)
      setErrorMsg(e?.message || '결제 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const onEditAmount = () => {
    setStep('form')
    setOrder(null)
    setErrorMsg('')
  }

  return (
    <Section id="payment-kr" tone="soft">
      <Fade className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-sm font-eng font-semibold tracking-widest uppercase text-brand-blue mb-4">
          Secure Payment
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          안전하게 결제하기
        </h2>
        <p className="text-gray-600 text-[15px] leading-relaxed">
          {product ? (
            <>
              선택하신 상품과 결제 금액을 확인하신 뒤 신용·체크카드, 간편결제, 계좌이체,
              가상계좌로 결제하실 수 있습니다.
            </>
          ) : (
            <>
              <BrandText /> 담당 컨설턴트가 안내한 금액을 입력하시면 신용·체크카드, 간편결제,
              계좌이체, 가상계좌로 결제하실 수 있습니다.
            </>
          )}
        </p>
      </Fade>

      <Fade className="max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          {/* ── 1단계: 결제 정보 입력 ─────────────────────────────── */}
          <div className={step === 'form' ? '' : 'hidden'}>
            {product ? (
              <div className="mb-6 rounded border border-gray-200 bg-surface-soft p-5">
                <p className="text-xs font-bold text-gray-500 mb-1">주문 상품</p>
                <p className="font-bold text-gray-900">{product.name}</p>
                <p className="mt-1 text-sm text-gray-600">
                  1인 {product.unitPrice.toLocaleString('ko-KR')}원 × {product.qty}인
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-gray-700">결제 금액</span>
                  <span className="text-2xl font-bold text-brand-blue">
                    {product.amount.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <Link
                  to={PRODUCT_PATH}
                  className="inline-block mt-3 text-xs text-gray-500 underline hover:text-brand-blue"
                >
                  인원 변경은 상품 페이지에서
                </Link>
              </div>
            ) : (
            <div className="mb-6">
              <FormLabel htmlFor="pay-kr-amount" required>
                결제 금액
              </FormLabel>
              <div className="relative">
                <Input
                  id="pay-kr-amount"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0"
                  value={amount}
                  onChange={onAmountChange}
                  className="pr-12 text-right"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  원
                </span>
              </div>
              {amount && !amountValid && (
                <p className="mt-2 text-xs text-red-600">
                  {MIN_AMOUNT.toLocaleString('ko-KR')}원 이상{' '}
                  {MAX_AMOUNT.toLocaleString('ko-KR')}원 이하로 입력해주세요.
                </p>
              )}
              {amountValid && (
                <p className="mt-2 text-sm text-gray-700">
                  결제하실 금액:{' '}
                  <span className="font-bold">{parsed.toLocaleString('ko-KR')}원</span>
                </p>
              )}
            </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <FormLabel htmlFor="pay-kr-name">성함 / 회사명</FormLabel>
                <Input
                  id="pay-kr-name"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  placeholder="선택 입력"
                />
              </div>
              <div>
                <FormLabel htmlFor="pay-kr-email">이메일</FormLabel>
                <Input
                  id="pay-kr-email"
                  type="email"
                  value={payerEmail}
                  onChange={(e) => setPayerEmail(e.target.value)}
                  placeholder="선택 입력"
                />
                {!emailValid && (
                  <p className="mt-2 text-xs text-red-600">이메일 형식을 확인해주세요.</p>
                )}
              </div>
            </div>

            {/* 상품 결제에서는 메모가 "상품명 N인"으로 정해져 있어 칸을 숨긴다. */}
            <div className={product ? 'hidden' : 'mb-6'}>
              <FormLabel htmlFor="pay-kr-ref">견적번호 / 메모</FormLabel>
              <Input
                id="pay-kr-ref"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="담당자가 안내한 견적번호 (선택)"
              />
            </div>

            {!configured && (
              <p className="text-sm text-gray-500 mb-4">
                결제 모듈이 아직 설정되지 않았습니다. (VITE_TOSS_CLIENT_KEY 필요)
              </p>
            )}
            {errorMsg && (
              <p className="text-sm text-red-600 mb-4" role="alert">
                {errorMsg}
              </p>
            )}

            <Button
              type="button"
              variant="blue"
              size="md"
              className="w-full"
              onClick={onProceed}
              disabled={!configured || !amountValid || !emailValid || preparing}
            >
              {preparing ? '준비 중…' : '결제수단 선택'}
            </Button>
          </div>

          {/* ── 2단계: 결제수단 선택 ─────────────────────────────── */}
          {/* 위젯 컨테이너는 계속 마운트해 둔다 — 언마운트하면 다시 그려야 하고,
              금액 변경은 setAmount 로 반영하는 편이 안전하다. */}
          <div className={step === 'widget' ? '' : 'hidden'}>
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-0.5">결제 금액</p>
                <p className="text-lg font-bold text-gray-900">
                  {order ? order.amount.toLocaleString('ko-KR') : '0'}원
                </p>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={onEditAmount}>
                {product ? '이전으로' : '금액 수정'}
              </Button>
            </div>

            {widgetState === 'loading' && (
              <p className="text-sm text-gray-400 py-4">결제 모듈을 불러오는 중…</p>
            )}
            {widgetState === 'error' && (
              <p className="text-sm text-red-600 py-4">
                결제 모듈을 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 새로고침해주세요.
              </p>
            )}

            {MODE === 'window' && widgetState === 'ready' && (
              <fieldset className="py-4">
                <legend className="text-sm font-bold text-gray-900 mb-3">결제수단</legend>
                <div className="space-y-2">
                  {WINDOW_METHODS.map((m) => (
                    <label
                      key={m.key}
                      className={cn(
                        'flex items-center gap-3 rounded border px-4 py-3 cursor-pointer text-[15px] transition-colors',
                        windowMethod === m.key
                          ? 'border-brand-blue bg-brand-blue/5 text-gray-900 font-semibold'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300',
                      )}
                    >
                      <input
                        type="radio"
                        name="pay-kr-method"
                        value={m.key}
                        checked={windowMethod === m.key}
                        onChange={() => setWindowMethod(m.key)}
                        className="accent-brand-blue"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  결제하기를 누르면 토스페이먼츠 결제창이 열립니다.
                </p>
              </fieldset>
            )}

            <div id="toss-payment-methods" />
            <div id="toss-agreement" />

            {errorMsg && (
              <p className="text-sm text-red-600 mt-4" role="alert">
                {errorMsg}
              </p>
            )}

            <Button
              type="button"
              variant="blue"
              size="md"
              className="w-full mt-4"
              onClick={onPay}
              disabled={widgetState !== 'ready' || paying}
            >
              {paying
                ? '결제창을 여는 중…'
                : order
                  ? `${order.amount.toLocaleString('ko-KR')}원 결제하기`
                  : '결제하기'}
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-400 leading-relaxed">
            결제 시{' '}
            <a
              href="/policy#ko"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-blue"
            >
              결제·환불 정책
            </a>
            에 동의하는 것으로 간주됩니다. 결제는 토스페이먼츠를 통해 안전하게 처리되며,{' '}
            <BrandText />는 카드 정보를 저장하지 않습니다. 결제 확인 후 담당자가 연락드립니다.
          </p>
        </div>
      </Fade>
    </Section>
  )
}
