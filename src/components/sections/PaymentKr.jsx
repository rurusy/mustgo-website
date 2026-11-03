import { useEffect, useRef, useState } from 'react'
import { Section, Fade, FormLabel, Input, BrandText, Button } from '../ui'
import { supabase } from '../../lib/supabase'

// 클라이언트 키는 "공개값"이라 프론트엔드에 노출해도 안전합니다.
// 시크릿 키는 서버(Edge Function Secrets)에만 둡니다.
const CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY

// 서버(toss-prepare-payment)의 TOSS_MIN_AMOUNT / TOSS_MAX_AMOUNT 와 맞춰야 합니다.
const MIN_AMOUNT = 1000
const MAX_AMOUNT = 100000000 // 1억원

const METHODS_SELECTOR = '#toss-payment-methods'
const AGREEMENT_SELECTOR = '#toss-agreement'

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

export function PaymentKr() {
  const [amount, setAmount] = useState('')
  const [payerName, setPayerName] = useState('')
  const [payerEmail, setPayerEmail] = useState('')
  const [reference, setReference] = useState('')

  // form   금액·연락처 입력 단계
  // widget 결제수단 선택 단계 (주문번호와 금액이 서버에 고정된 뒤)
  const [step, setStep] = useState('form')
  const [order, setOrder] = useState(null) // { orderId, orderName, amount }
  const [preparing, setPreparing] = useState(false)
  const [paying, setPaying] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [widgetState, setWidgetState] = useState('idle') // idle | loading | ready | error

  const widgetsRef = useRef(null) // 토스 widgets 인스턴스 (한 번만 생성)
  const renderedRef = useRef(false) // 결제수단/약관 UI 를 이미 그렸는지

  const parsed = parseAmount(amount)
  const amountValid = parsed !== null && parsed >= MIN_AMOUNT && parsed <= MAX_AMOUNT
  const emailValid = !payerEmail.trim() || isValidEmail(payerEmail.trim())
  const configured = Boolean(CLIENT_KEY) && typeof supabase.functions?.invoke === 'function'

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
    const widgets = widgetsRef.current
    if (!widgets || !order) return

    setErrorMsg('')
    setPaying(true)
    try {
      // 성공/실패 모두 페이지를 떠나 토스가 지정한 URL 로 돌아옵니다.
      // 실제 승인은 돌아온 뒤 /pay-kr/success 에서 서버가 처리합니다.
      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: `${window.location.origin}/pay-kr/success`,
        failUrl: `${window.location.origin}/pay-kr/fail`,
        ...(payerName.trim() ? { customerName: payerName.trim().slice(0, 100) } : {}),
        ...(payerEmail.trim() && isValidEmail(payerEmail.trim())
          ? { customerEmail: payerEmail.trim() }
          : {}),
      })
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
          <BrandText /> 담당 컨설턴트가 안내한 금액을 입력하시면 신용·체크카드, 간편결제,
          계좌이체, 가상계좌로 결제하실 수 있습니다.
        </p>
      </Fade>

      <Fade className="max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          {/* ── 1단계: 결제 정보 입력 ─────────────────────────────── */}
          <div className={step === 'form' ? '' : 'hidden'}>
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

            <div className="mb-6">
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
                금액 수정
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
              href="/policy"
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
