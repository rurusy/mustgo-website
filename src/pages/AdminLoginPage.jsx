import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, ADMIN_EMAIL } from '../lib/supabase'
import { Button, BrandText, FormLabel, Input } from '../components/ui'

// Supabase Auth 는 실패 원인을 error_code 로 내려주는데, 화면에서 이를 한 문구로
// 뭉치면 "비밀번호가 틀렸다"와 "계정이 아예 없다 / 시도가 막혔다 / 환경변수가
// 비었다"를 구분할 수 없다. 코드별 안내 + 원본 코드 노출로 원인을 화면에서
// 바로 읽을 수 있게 한다.
const authErrors = {
  invalid_credentials: {
    message: '비밀번호가 올바르지 않습니다.',
    hint: `${ADMIN_EMAIL} 계정이 Supabase Authentication → Users 에 없을 때도 같은 오류가 납니다.`,
  },
  user_not_found: {
    message: '등록되지 않은 관리자 계정입니다.',
    hint: `Supabase Authentication → Users 에 ${ADMIN_EMAIL} 을 추가하세요.`,
  },
  email_not_confirmed: {
    message: '이메일 인증이 끝나지 않은 계정입니다.',
    hint: 'Authentication → Providers → Email 에서 Confirm email 을 끄거나, 사용자를 Auto Confirm 으로 다시 등록하세요.',
  },
  over_request_rate_limit: {
    message: '로그인 시도가 너무 많습니다.',
    hint: '약 5분 뒤에 다시 시도해주세요. 비밀번호가 맞아도 이 상태에서는 로그인되지 않습니다.',
  },
  user_banned: {
    message: '차단된 계정입니다.',
    hint: 'Supabase Authentication → Users 에서 차단을 해제하세요.',
  },
  validation_failed: {
    message: '비밀번호를 입력해주세요.',
    hint: null,
  },
  // supabase.js 의 stub 이 내려주는 자체 코드 (VITE_ 환경변수 누락).
  env_missing: {
    message: 'Supabase 연결이 설정되지 않았습니다.',
    hint: '배포 환경의 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 환경변수를 확인하세요.',
  },
  network: {
    message: '서버에 연결하지 못했습니다.',
    hint: '네트워크 상태를 확인한 뒤 다시 시도해주세요.',
  },
}

function resolveAuthError(err) {
  // 네트워크 실패는 error_code 없이 AuthRetryableFetchError(status 0) 로 온다.
  const code =
    err.code ?? (err.name === 'AuthRetryableFetchError' || err.status === 0 ? 'network' : null)
  const known = code ? authErrors[code] : null
  if (known) return { ...known, code }

  // 매핑되지 않은 코드는 원문 그대로 노출 — 원인을 삼키지 않는다.
  return {
    message: '로그인에 실패했습니다.',
    hint: err.message || null,
    code: code || (err.status ? `HTTP ${err.status}` : 'unknown'),
  }
}

export default function AdminLoginPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
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
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    })
    setLoading(false)
    if (authError) {
      setError(resolveAuthError(authError))
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
            <div className="mb-4" role="alert">
              <p className="text-sm text-red-600">{error.message}</p>
              {error.hint && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{error.hint}</p>}
              <p className="text-[11px] text-gray-400 mt-1">
                오류 코드 <span className="font-eng">{error.code}</span>
              </p>
            </div>
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
