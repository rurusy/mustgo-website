import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button, BrandText } from '../components/ui'

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

export default function AdminPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all | unhandled | handled
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      if (!data.session) {
        navigate('/admin/login', { replace: true })
        return
      }
      load()
    })
    return () => {
      cancelled = true
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

  const toggleHandled = async (row) => {
    const next = !row.handled
    setInquiries((prev) => prev.map((r) => (r.id === row.id ? { ...r, handled: next } : r)))
    const { error: updateError } = await supabase
      .from('inquiries')
      .update({ handled: next })
      .eq('id', row.id)
    if (updateError) {
      setInquiries((prev) => prev.map((r) => (r.id === row.id ? { ...r, handled: !next } : r)))
      alert('상태 업데이트에 실패했습니다.')
    }
  }

  const onLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const filtered = inquiries.filter((r) =>
    filter === 'all' ? true : filter === 'handled' ? r.handled : !r.handled,
  )

  const stats = {
    total: inquiries.length,
    unhandled: inquiries.filter((r) => !r.handled).length,
    handled: inquiries.filter((r) => r.handled).length,
  }

  return (
    <main className="min-h-screen bg-surface-soft">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg tracking-tight">
            <BrandText /> <span className="text-sm font-medium text-gray-500 ml-2">Admin</span>
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

          <div className="flex gap-2">
            {[
              { key: 'all', label: '전체' },
              { key: 'unhandled', label: '미처리' },
              { key: 'handled', label: '처리완료' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={
                  filter === tab.key
                    ? 'px-4 py-2 text-sm font-medium rounded-sm bg-gray-900 text-white'
                    : 'px-4 py-2 text-sm font-medium rounded-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={load}
              className="px-4 py-2 text-sm font-medium rounded-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              title="새로고침"
            >
              ↻
            </button>
          </div>
        </div>

        {loading && <p className="text-sm text-gray-500">불러오는 중…</p>}
        {error && <p className="text-sm text-red-600">에러: {error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-sm text-gray-500">
            표시할 문의가 없습니다.
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((row) => (
            <article
              key={row.id}
              className={
                row.handled
                  ? 'bg-white border border-gray-200 rounded-lg p-6 opacity-60'
                  : 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm'
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={
                      'inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-bold border ' +
                      (TYPE_TONE[row.inquiry_type] ?? TYPE_TONE.other)
                    }
                  >
                    {TYPE_LABEL[row.inquiry_type] ?? row.inquiry_type}
                  </span>
                  <span className="text-xs text-gray-500 font-eng">
                    {formatDate(row.created_at)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleHandled(row)}
                  className={
                    row.handled
                      ? 'text-xs px-3 py-1.5 rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'text-xs px-3 py-1.5 rounded-sm bg-amber-600 text-white hover:bg-amber-700'
                  }
                >
                  {row.handled ? '미처리로 되돌리기' : '처리완료 표시'}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                <Field label="회사명" value={row.company} />
                <Field label="담당자" value={row.name + (row.position ? ` · ${row.position}` : '')} />
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
