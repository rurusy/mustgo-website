import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button, Card } from '../components/ui'
import { PayKrFooter, PayKrHeader } from './PayKrPage'
import { cn } from '../design/cn'

// 토스 결제창에서 돌아오는 착지 페이지.
//   /pay-kr/success ?paymentKey&orderId&amount  → 서버가 승인(confirm)을 실행
//   /pay-kr/fail    ?code&message&orderId       → 실패 사유 안내
//
// 인증만으로는 청구되지 않습니다. 아래 confirm 호출이 성공해야 실제 결제가 완료됩니다.
export default function PayKrResultPage({ outcome = 'success' }) {
  const [params] = useSearchParams()
  const [state, setState] = useState(outcome === 'success' ? 'confirming' : 'failed')
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const confirmedRef = useRef(false) // StrictMode 이중 실행 방지

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = '결제 결과 · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    if (outcome !== 'success' || confirmedRef.current) return
    confirmedRef.current = true

    const paymentKey = params.get('paymentKey')
    const orderId = params.get('orderId')
    const amount = Number(params.get('amount'))

    if (!paymentKey || !orderId || !Number.isFinite(amount)) {
      setState('error')
      setErrorMsg('결제 정보가 올바르지 않습니다. 결제가 진행되지 않았다면 다시 시도해주세요.')
      return
    }

    ;(async () => {
      const { data, error } = await supabase.functions.invoke('toss-confirm-payment', {
        body: { paymentKey, orderId, amount },
      })
      if (error || !data?.status) {
        console.error('[payment-kr] confirm failed:', error)
        setState('error')
        setErrorMsg(
          '결제 승인 처리에 실패했습니다. 카드에서 금액이 빠져나가지 않았다면 다시 시도해주세요. ' +
            '문제가 계속되면 아래 이메일로 주문번호와 함께 알려주시면 바로 확인해 드리겠습니다.',
        )
        setResult({ order_id: orderId })
        return
      }
      setResult(data)
      setState('done')
    })()
  }, [outcome, params])

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft">
      <PayKrHeader />
      <main className="flex-grow flex items-start justify-center px-6 py-16 lg:py-24">
        <Card className="w-full max-w-lg sm:p-10">
          {state === 'confirming' && <Confirming />}
          {state === 'done' && <Done result={result} />}
          {state === 'error' && <Failed title="결제를 완료하지 못했습니다" message={errorMsg} orderId={result?.order_id} />}
          {state === 'failed' && (
            <Failed
              title="결제가 취소되었거나 실패했습니다"
              message={params.get('message') || '결제가 정상적으로 진행되지 않았습니다.'}
              code={params.get('code')}
              orderId={params.get('orderId')}
            />
          )}
        </Card>
      </main>
      <PayKrFooter />
    </div>
  )
}

function ResultIcon({ tone, children }) {
  const tones = {
    green: 'bg-brand-green/10 text-brand-green',
    amber: 'bg-amber-500/10 text-amber-600',
    red: 'bg-red-500/10 text-red-600',
  }
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center w-14 h-14 rounded-full mb-6',
        tones[tone],
      )}
    >
      {children}
    </div>
  )
}

function Confirming() {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
        <svg className="w-7 h-7 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"
          />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">결제를 확인하고 있습니다</h1>
      <p className="text-sm text-gray-600">
        창을 닫지 말고 잠시만 기다려주세요. 보통 몇 초 안에 완료됩니다.
      </p>
    </div>
  )
}

function Done({ result }) {
  const waiting = result?.status === 'waiting_for_deposit'
  const va = result?.virtual_account

  return (
    <div className="text-center">
      <ResultIcon tone={waiting ? 'amber' : 'green'}>
        {waiting ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </ResultIcon>

      <h1 className="text-xl font-bold text-gray-900 mb-2">
        {waiting ? '가상계좌가 발급되었습니다' : '결제가 완료되었습니다'}
      </h1>

      {result?.amount != null && (
        <p className="text-sm text-gray-600 mb-1">
          {waiting ? '입금하실 금액' : '결제 금액'}{' '}
          <span className="font-bold">{Number(result.amount).toLocaleString('ko-KR')}원</span>
        </p>
      )}
      {result?.method && <p className="text-xs text-gray-400 mb-6">결제수단 {result.method}</p>}

      {waiting && va && (
        <div className="text-left bg-gray-50 border border-gray-200 rounded-sm p-5 mb-6">
          <Row label="입금 은행" value={va.bank} />
          <Row label="계좌번호" value={va.account_number} mono />
          {va.holder && <Row label="예금주" value={va.holder} />}
          {va.due_date && <Row label="입금 기한" value={formatDue(va.due_date)} />}
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            기한 내에 위 계좌로 입금하시면 결제가 완료됩니다. 입금이 확인되면 담당자가
            연락드립니다.
          </p>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-2">
        {waiting
          ? '입금 전까지는 결제가 확정되지 않습니다.'
          : '담당 컨설턴트가 확인 후 곧 연락드리겠습니다.'}
      </p>
      {result?.order_id && (
        <p className="text-xs text-gray-400 mb-8 font-eng">주문번호 {result.order_id}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {result?.receipt_url && (
          <Button
            as="a"
            href={result.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="blue"
            size="sm"
          >
            매출전표 보기
          </Button>
        )}
        <Button as={Link} to="/" variant="ghost" size="sm">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

function Failed({ title, message, code, orderId }) {
  return (
    <div className="text-center">
      <ResultIcon tone="red">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </ResultIcon>

      <h1 className="text-xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{message}</p>
      {orderId && <p className="text-xs text-gray-400 font-eng">주문번호 {orderId}</p>}
      {code && <p className="text-xs text-gray-400 font-eng mb-6">오류코드 {code}</p>}

      <p className="text-sm text-gray-600 mt-6 mb-8">
        도움이 필요하시면{' '}
        <a
          href="mailto:wemustgo@mustgokorea.com"
          className="text-brand-blue underline hover:text-brand-green"
        >
          wemustgo@mustgokorea.com
        </a>
        {' '}으로 연락주세요.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button as={Link} to="/pay-kr" variant="blue" size="sm">
          다시 결제하기
        </Button>
        <Button as={Link} to="/" variant="ghost" size="sm">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-xs font-bold text-gray-700 shrink-0">{label}</span>
      <span className={cn('text-sm text-gray-900 text-right', mono && 'font-eng font-bold')}>
        {value}
      </span>
    </div>
  )
}

function formatDue(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
