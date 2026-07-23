import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button, BrandText, Card } from '../components/ui'
import { cn } from '../design/cn'

// 국내(토스페이먼츠·원화)와 해외(PayPal·USD/EUR) 결제를 한 화면에 모아 보여줍니다.
// 두 결제는 테이블이 분리돼 있으므로(payments_kr / payments) 공통 형태로 정규화한 뒤
// 시간순으로 합쳐서 렌더합니다. 실제 매출은 status='completed' 만 집계합니다.

const STATUS = {
  completed: { label: '결제완료', tone: 'green' },
  waiting_for_deposit: { label: '입금대기', tone: 'amber' },
  pending: { label: '검토중', tone: 'blue' },
  created: { label: '미완료', tone: 'gray' },
  canceled: { label: '취소·환불', tone: 'gray' },
  failed: { label: '실패', tone: 'red' },
}

const STATUS_TONE = {
  green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  red: 'bg-red-50 text-red-700 border-red-200',
}

// 상태 필터 탭 → 어떤 status 값을 묶어 보여줄지.
const STATUS_TABS = [
  { key: 'all', label: '전체', match: () => true },
  { key: 'completed', label: '결제완료', match: (s) => s === 'completed' },
  { key: 'waiting', label: '대기', match: (s) => s === 'waiting_for_deposit' || s === 'pending' },
  {
    key: 'incomplete',
    label: '미완료·실패',
    match: (s) => s === 'created' || s === 'failed' || s === 'canceled',
  },
]

const SOURCE_TABS = [
  { key: 'all', label: '전체' },
  { key: 'domestic', label: '국내' },
  { key: 'overseas', label: '해외' },
]

const SOURCE_BADGE = {
  domestic: { label: '국내 · 토스', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  overseas: { label: '해외 · PayPal', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
}

function formatDate(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 통화별로 표기가 다르다. 원화는 소수점 없이 "원", 나머지는 통화기호 + 소수 2자리.
function formatMoney(amount, currency) {
  if (amount == null || Number.isNaN(amount)) return '-'
  const cur = (currency || '').toUpperCase()
  if (cur === 'KRW') return `${amount.toLocaleString('ko-KR')}원`
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(amount)
  } catch {
    return `${amount.toLocaleString('en-US')} ${cur}`
  }
}

// 두 테이블을 하나의 표시 모델로 맞춘다. id 에 접두사를 붙여 두 소스가 섞여도 key 충돌이 없게.
function normalizeKr(r) {
  return {
    id: `kr-${r.id}`,
    source: 'domestic',
    created_at: r.created_at,
    amount: r.amount != null ? Number(r.amount) : null,
    currency: r.currency || 'KRW',
    status: r.status,
    method: r.method,
    payer_name: r.payer_name,
    payer_email: r.payer_email,
    reference: r.reference,
    receipt_url: r.receipt_url,
    order_ref: r.order_id,
  }
}

function normalizeOverseas(r) {
  return {
    id: `pp-${r.id}`,
    source: 'overseas',
    created_at: r.created_at,
    amount: r.amount != null ? Number(r.amount) : null,
    currency: r.currency || 'USD',
    status: r.status,
    method: 'PayPal',
    payer_name: r.payer_name,
    payer_email: r.payer_email,
    reference: r.reference,
    receipt_url: null,
    order_ref: r.paypal_order_id,
  }
}

export default function AdminPaymentsPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const navigate = useNavigate()

  // Admin 라우트는 검색엔진에 노출되지 않아야 함.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'MustGo Admin · 결제 내역'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      if (!data.session) {
        navigate('/admin/login', { replace: true })
        return
      }
      setAuthChecked(true)
      load()
    })

    // 세션이 만료되거나 다른 탭에서 로그아웃되면 로그인으로 자동 redirect.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return
      if (!session) navigate('/admin/login', { replace: true })
    })

    return () => {
      cancelled = true
      sub?.subscription?.unsubscribe?.()
    }
  }, [navigate])

  const load = async () => {
    setLoading(true)
    setError('')

    const [kr, overseas] = await Promise.all([
      supabase.from('payments_kr').select('*').order('created_at', { ascending: false }),
      supabase.from('payments').select('*').order('created_at', { ascending: false }),
    ])
    setLoading(false)

    // 한쪽 테이블 조회가 실패해도 다른 쪽은 보여준다. 둘 다 실패했을 때만 에러 처리.
    if (kr.error && overseas.error) {
      setError(kr.error.message)
      return
    }

    const merged = [
      ...(kr.data ?? []).map(normalizeKr),
      ...(overseas.data ?? []).map(normalizeOverseas),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    setRows(merged)
  }

  const onLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  // 한 번의 순회로 필터 + 통계(완료 매출 통화별 합계 + 상태별 건수)를 계산.
  const { filtered, stats } = useMemo(() => {
    const statusTab = STATUS_TABS.find((t) => t.key === statusFilter) ?? STATUS_TABS[0]
    const revenue = {} // { KRW: n, USD: n, EUR: n }
    let completed = 0
    let waiting = 0
    const filteredList = []

    for (const r of rows) {
      if (r.status === 'completed') {
        completed += 1
        const cur = (r.currency || '').toUpperCase()
        if (r.amount != null) revenue[cur] = (revenue[cur] ?? 0) + r.amount
      } else if (r.status === 'waiting_for_deposit' || r.status === 'pending') {
        waiting += 1
      }

      const okSource = sourceFilter === 'all' || r.source === sourceFilter
      if (okSource && statusTab.match(r.status)) filteredList.push(r)
    }

    return {
      filtered: filteredList,
      stats: { total: rows.length, completed, waiting, revenue },
    }
  }, [rows, statusFilter, sourceFilter])

  // 세션 확인 전엔 인증된 콘텐츠를 노출하지 않음 (FoUC 방지).
  if (!authChecked) return null

  const revenueEntries = Object.entries(stats.revenue).filter(([, v]) => v > 0)

  return (
    <main className="min-h-screen bg-surface-soft">
      <AdminHeader current="payments" onLogout={onLogout} />

      <div className="max-w-layout mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              결제 내역
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              전체 {stats.total}건 · 결제완료 {stats.completed}건 · 대기 {stats.waiting}건
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2" role="tablist" aria-label="결제 소스 필터">
              {SOURCE_TABS.map((tab) => {
                const active = sourceFilter === tab.key
                return (
                  <Button
                    key={tab.key}
                    type="button"
                    variant={active ? 'pillFilterActive' : 'pillFilter'}
                    size="pillSm"
                    onClick={() => setSourceFilter(tab.key)}
                    role="tab"
                    aria-selected={active}
                  >
                    {tab.label}
                  </Button>
                )
              })}
            </div>
            <Button
              type="button"
              variant="pillFilter"
              size="iconSm"
              onClick={load}
              title="새로고침"
              aria-label="결제 목록 새로고침"
            >
              ↻
            </Button>
          </div>
        </div>

        {/* 완료 매출 요약 — 통화별로 나눠서 집계 (KRW/USD/EUR 는 합산 불가). */}
        {revenueEntries.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {revenueEntries.map(([cur, amt]) => (
              <div
                key={cur}
                className="bg-white border border-gray-200 rounded-sm px-5 py-3 shadow-sm"
              >
                <p className="text-xs font-bold text-gray-500 mb-0.5">
                  결제완료 합계 · {cur}
                </p>
                <p className="text-lg font-bold text-gray-900">{formatMoney(amt, cur)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-6" role="tablist" aria-label="결제 상태 필터">
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab.key
            return (
              <Button
                key={tab.key}
                type="button"
                variant={active ? 'pillFilterActive' : 'pillFilter'}
                size="pillSm"
                onClick={() => setStatusFilter(tab.key)}
                role="tab"
                aria-selected={active}
              >
                {tab.label}
              </Button>
            )
          })}
        </div>

        {loading && <p className="text-sm text-gray-500">불러오는 중…</p>}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            에러: {error}
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Card className="p-12 text-center text-sm text-gray-500">
            표시할 결제 내역이 없습니다.
          </Card>
        )}

        <div className="space-y-4">
          {filtered.map((row) => (
            <PaymentCard key={row.id} row={row} />
          ))}
        </div>
      </div>
    </main>
  )
}

function PaymentCard({ row }) {
  const status = STATUS[row.status] ?? { label: row.status, tone: 'gray' }
  const source = SOURCE_BADGE[row.source]
  const dimmed = ['created', 'failed', 'canceled'].includes(row.status)

  return (
    <Card pad="none" className={cn('p-6', dimmed ? 'opacity-60' : 'shadow-sm')}>
      <article>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold border',
                STATUS_TONE[status.tone],
              )}
            >
              {status.label}
            </span>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold border',
                source.className,
              )}
            >
              {source.label}
            </span>
            <span className="text-xs text-gray-500 font-eng">{formatDate(row.created_at)}</span>
          </div>

          <p className="text-lg font-bold text-gray-900">
            {formatMoney(row.amount, row.currency)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          <Field label="결제자" value={row.payer_name} />
          <Field label="이메일" value={row.payer_email} />
          <Field label="결제수단" value={row.method} />
          <Field label="견적번호 / 메모" value={row.reference} />
          <Field label="주문번호" value={row.order_ref} mono />
          {row.receipt_url && (
            <div>
              <p className="text-xs font-bold text-gray-700 mb-0.5">매출전표</p>
              <a
                href={row.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-blue underline hover:text-brand-green break-all"
              >
                전표 보기
              </a>
            </div>
          )}
        </div>
      </article>
    </Card>
  )
}

function Field({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-700 mb-0.5">{label}</p>
      <p className={cn('text-sm text-gray-900 break-all', mono && 'font-eng')}>{value || '-'}</p>
    </div>
  )
}

// 두 관리자 페이지(문의/결제)를 오가는 공통 헤더.
export function AdminHeader({ current, onLogout }) {
  const tab = (key, to, label) => (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium transition-colors',
        current === key ? 'text-gray-900' : 'text-gray-500 hover:text-amber-600',
      )}
      aria-current={current === key ? 'page' : undefined}
    >
      {label}
    </Link>
  )

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-layout mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-lg tracking-tight">
            <BrandText />{' '}
            <span className="text-sm font-eng font-medium text-gray-500 ml-2">Admin</span>
          </Link>
          <nav className="flex items-center gap-5" aria-label="관리자 메뉴">
            {tab('inquiries', '/admin', '문의 내역')}
            {tab('payments', '/admin/payments', '결제 내역')}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
            사이트 보기
          </Link>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  )
}
