import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, takeRecoveryParams } from '../lib/supabase'
import { resolveAuthError } from '../lib/authErrors'
import { Button, BrandText, FormLabel, Input } from '../components/ui'

const MIN_LENGTH = 8

// updateUser 가 내려주는 코드 (로그인 화면과 안내 문구가 달라야 하는 것들).
const updateErrors = {
  same_password: {
    message: '기존 비밀번호와 같습니다.',
    hint: '다른 비밀번호를 입력해주세요.',
  },
  weak_password: {
    message: '비밀번호가 너무 단순합니다.',
    hint: '길이를 늘리거나 숫자·기호를 섞어주세요.',
  },
  session_not_found: {
    message: '재설정 세션이 만료되었습니다.',
    hint: '로그인 화면에서 재설정 메일을 다시 요청해주세요.',
  },
  over_request_rate_limit: {
    message: '요청이 너무 많습니다.',
    hint: '약 5분 뒤에 다시 시도해주세요. 비밀번호는 아직 바뀌지 않았습니다.',
  },
}

// 링크 자체가 무효일 때 Supabase 가 해시에 실어보내는 코드.
const linkErrorMessages = {
  otp_expired: '재설정 링크가 만료되었습니다.',
  access_denied: '이미 사용했거나 유효하지 않은 링크입니다.',
}

function ErrorNote({ error, className = '' }) {
  return (
    <div className={className} role="alert">
      <p className="text-sm text-red-600">{error.message}</p>
      {error.hint && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{error.hint}</p>}
      {error.code && (
        <p className="text-[11px] text-gray-400 mt-1">
          오류 코드 <span className="font-eng">{error.code}</span>
        </p>
      )}
    </div>
  )
}

export default function AdminResetPasswordPage() {
  // checking → (ready | invalid) → done
  const [status, setStatus] = useState('checking')
  const [linkError, setLinkError] = useState(null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  // Admin 라우트는 검색엔진에 노출되지 않아야 함.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'MustGo Admin · Reset password'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const prepare = async () => {
      const params = takeRecoveryParams()

      // 만료·재사용된 링크는 토큰 없이 error_code 만 실려온다.
      if (params?.errorCode) {
        return {
          status: 'invalid',
          linkError: {
            message: linkErrorMessages[params.errorCode] ?? '재설정 링크가 유효하지 않습니다.',
            hint: '링크는 발송 후 1시간 동안, 한 번만 쓸 수 있습니다. 로그인 화면에서 메일을 다시 요청해주세요.',
            code: params.errorCode,
          },
        }
      }

      // detectSessionInUrl 이 해시를 이미 처리했다면 세션이 서 있다.
      // 관리자가 로그인한 채로 직접 들어온 경우(비밀번호 변경)도 여기에 걸린다.
      const { data } = await supabase.auth.getSession()
      if (data.session) return { status: 'ready' }

      // 세션이 없으면 스냅샷해 둔 토큰으로 직접 세운다.
      if (params?.accessToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken ?? '',
        })
        if (!sessionError) return { status: 'ready' }
        return {
          status: 'invalid',
          linkError: resolveAuthError(sessionError, {
            fallback: '재설정 링크를 확인하지 못했습니다.',
          }),
        }
      }

      return {
        status: 'invalid',
        linkError: {
          message: '재설정 링크로 들어온 것이 아닙니다.',
          hint: '비밀번호 재설정 메일에 있는 링크를 눌러야 이 화면에서 비밀번호를 바꿀 수 있습니다.',
          code: null,
        },
      }
    }

    prepare().then((next) => {
      if (cancelled) return
      setStatus(next.status)
      setLinkError(next.linkError ?? null)
    })

    return () => {
      cancelled = true
    }
  }, [])

  // 변경에 성공하면 이미 그 세션으로 로그인된 상태 → 관리자 화면으로 넘긴다.
  useEffect(() => {
    if (status !== 'done') return
    const timer = setTimeout(() => navigate('/admin', { replace: true }), 3000)
    return () => clearTimeout(timer)
  }, [status, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password.length < MIN_LENGTH) {
      setError({ message: `비밀번호는 ${MIN_LENGTH}자 이상이어야 합니다.`, hint: null, code: null })
      return
    }
    if (password !== confirm) {
      setError({ message: '두 비밀번호가 일치하지 않습니다.', hint: null, code: null })
      return
    }

    setSaving(true)
    setError(null)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setSaving(false)

    if (updateError) {
      setError(
        resolveAuthError(updateError, {
          messages: updateErrors,
          fallback: '비밀번호를 변경하지 못했습니다.',
        }),
      )
      return
    }
    setStatus('done')
  }

  // 링크 확인 전엔 아무것도 노출하지 않음 (폼이 깜빡였다 사라지는 것 방지).
  if (status === 'checking') return null

  return (
    <main className="min-h-screen bg-surface-soft flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight">
            <BrandText />
          </Link>
          <p className="text-sm text-gray-500 mt-2 font-eng">Reset password</p>
        </div>

        {status === 'invalid' && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <ErrorNote error={linkError} className="mb-6" />
            <Button as={Link} to="/admin/login" className="w-full">
              로그인 화면으로
            </Button>
          </div>
        )}

        {status === 'done' && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-900">비밀번호를 변경했습니다.</p>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              잠시 후 관리자 화면으로 이동합니다.
              <br />
              다음 로그인부터 새 비밀번호를 사용하세요.
            </p>
            <Button as={Link} to="/admin" className="w-full mt-6">
              지금 이동
            </Button>
          </div>
        )}

        {status === 'ready' && (
          <form
            onSubmit={onSubmit}
            className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
          >
            <FormLabel htmlFor="new-password" required>
              새 비밀번호
            </FormLabel>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`${MIN_LENGTH}자 이상`}
              required
              className="mb-4"
            />

            <FormLabel htmlFor="confirm-password" required>
              새 비밀번호 확인
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="한 번 더 입력"
              required
              className="mb-4"
            />

            {error && <ErrorNote error={error} className="mb-4" />}

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? '변경 중…' : '비밀번호 변경'}
            </Button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}
