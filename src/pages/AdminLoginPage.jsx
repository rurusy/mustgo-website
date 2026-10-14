import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, ADMIN_EMAIL, ADMIN_EMAILS, PASSWORD_RESET_PATH } from '../lib/supabase'
import { resolveAuthError } from '../lib/authErrors'
import { Button, BrandText, FormLabel, Input, Select } from '../components/ui'

// 로그인 화면에서만 문구가 달라야 하는 코드들. 공통 코드(network / env_missing 등)는
// lib/authErrors.js 의 sharedAuthErrors 가 받는다.
//
// 관리자 계정이 둘 이상이라 "어느 주소가" 문제인지가 중요해졌으므로, 고정 객체 대신
// 선택된 주소를 받아 lookup 을 만든다 (resolveAuthError 의 messages 규약은 그대로).
const loginErrors = (email) => ({
  invalid_credentials: {
    message: '비밀번호가 올바르지 않습니다.',
    hint: `아래 "재설정 메일 받기"로 새 비밀번호를 지정할 수 있습니다. ${email} 계정이 아직 만들어지지 않았을 때도 같은 코드가 옵니다.`,
  },
  user_not_found: {
    message: '등록되지 않은 관리자 계정입니다.',
    hint: `Supabase Authentication → Users 에 ${email} 을 추가하세요.`,
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
})

export default function AdminLoginPage() {
  const [authChecked, setAuthChecked] = useState(false)
  // 로그인과 재설정 메일이 같은 주소를 쓴다. 기본값은 주 계정(ADMIN_EMAILS[0]).
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  // 메일을 실제로 보낸 주소. 계정을 바꿔 다시 보낼 수 있으므로 boolean 이 아니라 주소를
  // 담아, 안내 문구가 "방금 보낸 그 주소"를 가리키게 한다.
  const [resetSentTo, setResetSentTo] = useState(null)
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

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    // 이전 계정에 대한 에러·발송 안내가 새 선택에 그대로 붙어 보이지 않도록 비운다.
    setError(null)
    setResetSentTo(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (authError) {
      setError(
        resolveAuthError(authError, {
          messages: loginErrors(email),
          fallback: '로그인에 실패했습니다.',
        }),
      )
      return
    }
    navigate('/admin', { replace: true })
  }

  // redirectTo 를 명시해야 메일의 링크가 홈이 아니라 재설정 화면으로 떨어진다.
  // 같은 URL 이 Supabase Authentication → URL Configuration 의 Redirect URLs 에
  // 등록되어 있어야 하며, 등록되지 않으면 Supabase 가 Site URL 로 되돌려보낸다.
  //
  // 주의 : Supabase 는 Users 에 없는 주소로 요청해도 계정 존재 여부를 숨기려고 성공을
  // 돌려준다. 에러가 없다는 것이 "메일이 갔다"는 뜻은 아니라서, 안내 문구에 그 사실을
  // 적어둔다 (아래 resetSentTo 블록).
  const onRequestReset = async () => {
    setResetting(true)
    setError(null)
    // 응답을 기다리는 사이 계정 선택이 바뀌어도 안내가 엇갈리지 않도록 고정.
    const target = email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(target, {
      redirectTo: `${window.location.origin}${PASSWORD_RESET_PATH}`,
    })
    setResetting(false)
    if (resetError) {
      setError(
        resolveAuthError(resetError, {
          messages: loginErrors(target),
          fallback: '재설정 메일을 보내지 못했습니다.',
        }),
      )
      return
    }
    setResetSentTo(target)
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
          {ADMIN_EMAILS.length > 1 ? (
            <>
              <FormLabel htmlFor="admin-email" required>
                관리자 계정
              </FormLabel>
              <Select
                id="admin-email"
                value={email}
                onChange={onChangeEmail}
                className="mb-4 font-eng"
              >
                {ADMIN_EMAILS.map((addr) => (
                  <option key={addr} value={addr}>
                    {addr}
                  </option>
                ))}
              </Select>
            </>
          ) : (
            <p className="text-xs text-gray-500 mb-4 font-eng">{email}</p>
          )}

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

          <div className="text-center mt-4">
            {resetSentTo ? (
              <>
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-eng">{resetSentTo}</span> 으로 재설정 메일을 보냈습니다.
                  <br />
                  메일의 링크를 열면 새 비밀번호를 지정할 수 있습니다 (1시간 후 만료).
                </p>
                <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                  메일이 오지 않으면 Supabase Authentication → Users 에 이 주소가 등록돼 있는지
                  확인하세요. 등록되지 않은 주소에는 오류 없이 발송만 생략됩니다.
                </p>
                <button
                  type="button"
                  onClick={() => setResetSentTo(null)}
                  className="text-xs text-gray-500 hover:text-amber-600 transition-colors mt-3"
                >
                  다시 보내기
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onRequestReset}
                disabled={resetting}
                className="text-xs text-gray-500 hover:text-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetting ? '보내는 중…' : '비밀번호를 잊으셨나요? 재설정 메일 받기'}
              </button>
            )}
          </div>
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
