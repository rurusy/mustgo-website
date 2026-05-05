import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, ADMIN_EMAIL } from '../lib/supabase'
import { Button, BrandText, FormLabel, Input } from '../components/ui'

export default function AdminLoginPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Admin 라우트는 검색엔진에 노출되지 않아야 함.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'MustGo Admin · Sign in'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      if (data.session) {
        navigate('/admin', { replace: true })
        return
      }
      setAuthChecked(true)
    })
    return () => {
      cancelled = true
    }
  }, [navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    })
    setLoading(false)
    if (authError) {
      setError('비밀번호가 올바르지 않습니다.')
      return
    }
    navigate('/admin', { replace: true })
  }

  // 세션 확인 전엔 폼을 노출하지 않음 (이미 로그인 상태에서 폼 깜빡임 방지).
  if (!authChecked) return null

  return (
    <main className="min-h-screen bg-surface-soft flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight">
            <BrandText />
          </Link>
          <p className="text-sm text-gray-500 mt-2 font-eng">Admin Console</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
        >
          <FormLabel htmlFor="admin-password" required>
            비밀번호
          </FormLabel>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
            className="mb-4"
          />

          {error && (
            <p className="text-sm text-red-600 mb-4" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '확인 중…' : '로그인'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}
