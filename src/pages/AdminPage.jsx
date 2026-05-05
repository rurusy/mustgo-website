import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button, BrandText, Card } from '../components/ui'
import { cn } from '../design/cn'

const TYPE_LABEL = {
  corporate: 'Corporate',
  inbound: 'Inbound',
  other: '기타',
}

const TYPE_TONE = {
  corporate: 'bg-amber-50 text-amber-700 border-amber-200',
  inbound: 'bg-blue-50 text-blue-700 border-blue-200',
  other: 'bg-gray-100 text-gray-700 border-gray-200',
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const FILTER_TABS = [
  { key: 'all', label: '전체' },
  { key: 'unhandled', label: '미처리' },
  { key: 'handled', label: '처리완료' },
]

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toggleError, setToggleError] = useState('')
  const [filter, setFilter] = useState('all') // all | unhandled | handled
  const navigate = useNavigate()
  const toggleErrorTimer = useRef(null)

  // Admin 라우트는 검색엔진에 노출되지 않아야 함.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'MustGo Admin · 문의 내역'
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
      if (!session) {
        navigate('/admin/login', { replace: true })
      }
    })

    return () => {
      cancelled = true
      sub?.subscription?.unsubscribe?.()
      if (toggleErrorTimer.current) clearTimeout(toggleErrorTimer.current)
    }
  }, [navigate])

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: fetchError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    setLoading(false)
    if (fetchError) {
      setError(fetchError.message)
      return
    }
    setInquiries(data ?? [])
  }

  const showToggleError = (msg) => {
    setToggleError(msg)
    if (toggleErrorTimer.current) clearTimeout(toggleErrorTimer.current)
    toggleErrorTimer.current = setTimeout(() => setToggleError(''), 4000)
  }

  const toggleHandled = async (row) => {
    const next = !row.handled
    setInquiries((prev) => prev.map((r) => (r.id === row.id ? { ...r, handled: next } : r)))
    const { error: updateError } = await supabase
      .from('inquiries')
      .update({ handled: next })
      .eq('id', row.id)
    if (updateError) {
      setInquiries((prev) => prev.map((r) => (r.id === row.id ? { ...r, handled: !next } : r)))
      showToggleError('상태 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const onLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  // 한 번의 순회로 filter + stats 동시 계산.
  const { filtered, stats } = useMemo(() => {
    let unhandled = 0
    let handled = 0
    const filteredList = []
    for (const r of inquiries) {
      if (r.handled) handled += 1
      else unhandled += 1

      if (filter === 'all' || (filter === 'handled' ? r.handled : !r.handled)) {
        filteredList.push(r)
      }
    }
    return {
      filtered: filteredList,
      stats: { total: inquiries.length, unhandled, handled },
    }
  }, [inquiries, filter])

  // 세션 확인 전엔 인증된 콘텐츠를 노출하지 않음 (FoUC 방지).
  if (!authChecked) return null

  return (
    <main className="min-h-screen bg-surface-soft">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight">
            <BrandText />{' '}
            <span className="text-sm font-eng font-medium text-gray-500 ml-2">Admin</span>
          </Link>
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

      <div className="max-w-layout mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              문의 내역
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              전체 {stats.total}건 · 미처리 {stats.unhandled}건 · 처리완료 {stats.handled}건
            </p>
          </div>

          <div className="flex gap-2" role="tablist" aria-label="문의 상태 필터">
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.key
              return (
                <Button
                  key={tab.key}
                  type="button"
                  variant={active ? 'pillFilterActive' : 'pillFilter'}
                  size="pillSm"
                  onClick={() => setFilter(tab.key)}
                  role="tab"
                  aria-selected={active}
                >
                  {tab.label}
                </Button>
              )
            })}
            <Button
              type="button"
              variant="pillFilter"
              size="iconSm"
              onClick={load}
              title="새로고침"
              aria-label="문의 목록 새로고침"
            >
              ↻
            </Button>
          </div>
        </div>

        {loading && <p className="text-sm text-gray-500">불러오는 중…</p>}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            에러: {error}
          </p>
        )}
        {toggleError && (
          <p className="text-sm text-red-600 mb-4" role="alert" aria-live="polite">
            {toggleError}
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Card className="p-12 text-center text-sm text-gray-500">표시할 문의가 없습니다.</Card>
        )}

        <div className="space-y-4">
          {filtered.map((row) => (
            <Card
              key={row.id}
              pad="none"
              className={cn('p-6', row.handled ? 'opacity-60' : 'shadow-sm')}
            >
              <article>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold border',
                        TYPE_TONE[row.inquiry_type] ?? TYPE_TONE.other,
                      )}
                    >
                      {TYPE_LABEL[row.inquiry_type] ?? row.inquiry_type}
                    </span>
                    <span className="text-xs text-gray-500 font-eng">
                      {formatDate(row.created_at)}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant={row.handled ? 'chipNeutral' : 'chipPrimary'}
                    size="xs"
                    onClick={() => toggleHandled(row)}
                  >
                    {row.handled ? '미처리로 되돌리기' : '처리완료 표시'}
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                  <Field label="회사명" value={row.company} />
                  <Field
                    label="담당자"
                    value={row.name + (row.position ? ` · ${row.position}` : '')}
                  />
                  <Field label="연락처" value={row.phone} />
                  <Field label="이메일" value={row.email} />
                </div>

                {row.message && (
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-1">문의 내용</p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {row.message}
                    </p>
                  </div>
                )}
              </article>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-700 mb-0.5">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  )
}
