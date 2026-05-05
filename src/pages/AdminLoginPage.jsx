import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, ADMIN_EMAIL } from '../lib/supabase'
import { Button, BrandText } from '../components/ui'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true })
    })
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

  return (
    <main className="min-h-screen bg-surface-soft flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight">
            <BrandText />
          </Link>
          <p className="text-sm text-gray-500 mt-2">Admin Console</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
        >
          <label htmlFor="admin-password" className="block text-sm font-bold text-gray-900 mb-2">
            비밀번호
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors mb-4"
            placeholder="••••••"
            required
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
