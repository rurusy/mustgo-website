import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const NOT_CONFIGURED = {
  message:
    'Supabase 클라이언트가 설정되지 않았습니다. 환경변수 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 를 확인하세요.',
  code: 'env_missing',
}

// 비밀번호 재설정 메일의 링크는 Supabase 가 토큰을 확인한 뒤
//   {redirect_to}#access_token=…&refresh_token=…&type=recovery
// 로 되돌려보낸다 (만료·재사용된 링크는 토큰 대신 #error_code=… 로 온다).
//
// 문제는 아래 createClient 의 detectSessionInUrl(기본값 true)이 이 해시를 소비한 뒤
// history.replaceState 로 지워버린다는 점이다. React 라우터가 마운트되는 시점에는
// "복구 링크로 들어왔다"는 사실이 흔적도 없이 사라져서, 앱이 재설정 화면을 띄울
// 근거를 잃는다. createClient 보다 먼저 실행되는 이 자리에서 스냅샷해 둔다.
//
// (implicit flow 기준. flowType 을 pkce 로 바꾸면 토큰이 ?code= 로 오므로 함께 수정)
function readRecoveryParams() {
  if (typeof window === 'undefined') return null

  const hash = window.location.hash
  if (hash.length < 2) return null

  const params = new URLSearchParams(hash.slice(1))
  const type = params.get('type')
  const errorCode = params.get('error_code')
  // 만료된 링크의 해시에는 type 이 실려오지 않는다 → error_code 만으로도 받는다.
  if (type !== 'recovery' && !errorCode) return null

  return {
    type,
    accessToken: params.get('access_token'),
    refreshToken: params.get('refresh_token'),
    errorCode,
    errorDescription: params.get('error_description'),
  }
}

let pendingRecovery = readRecoveryParams()
let claimedRecovery = null

// 복구 파라미터를 꺼내 쓴다 (재설정 페이지가 호출).
// StrictMode 의 이중 마운트에도 같은 값을 돌려주도록 꺼낸 값은 보관한다.
export function takeRecoveryParams() {
  if (pendingRecovery) {
    claimedRecovery = pendingRecovery
    pendingRecovery = null
  }
  return claimedRecovery
}

// 아직 아무도 가져가지 않은 복구 파라미터가 있는지만 확인 (소비하지 않음).
// App 의 리다이렉트 가드가 사용 — 소비해버리면 정작 재설정 페이지가 못 받는다.
export function hasPendingRecovery() {
  return pendingRecovery !== null
}

// env 가 누락된 채 createClient(url, anonKey) 가 호출되면 supabase-js 가
// "supabaseUrl is required" 를 동기적으로 throw 하면서 React 트리 전체가
// 마운트 전에 죽음 → 홈페이지가 통째로 흰 화면.
//
// 가드 : URL/키 누락 시 동일한 API 표면을 가진 stub 으로 대체. 홈페이지는
// 정상 렌더되고, Contact 폼 제출 / Admin 로그인 / Admin 조회만 명시적
// 에러로 실패. 호출부의 `{ error }` 패턴이 그대로 동작.
function createStub() {
  const fail = () => Promise.resolve({ data: null, error: NOT_CONFIGURED })

  return {
    from() {
      return {
        insert: fail,
        select() {
          return { order: fail }
        },
        update() {
          return { eq: fail }
        },
      }
    },
    rpc: fail,
    auth: {
      signInWithPassword: () =>
        Promise.resolve({ data: { user: null, session: null }, error: NOT_CONFIGURED }),
      resetPasswordForEmail: fail,
      updateUser: () => Promise.resolve({ data: { user: null }, error: NOT_CONFIGURED }),
      setSession: () =>
        Promise.resolve({ data: { user: null, session: null }, error: NOT_CONFIGURED }),
      signOut: () => Promise.resolve({ error: null }),
      // Admin 가드가 redirect 하도록 session=null 로 응답.
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
      }),
    },
  }
}

const isConfigured = Boolean(url && anonKey)

if (!isConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 설정되지 않았습니다. ' +
      'Contact 폼 제출과 관리자 페이지가 비활성됩니다. .env.local 또는 호스팅 환경변수를 확인하세요.',
  )
}

export const supabase = isConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : createStub()

// 관리자 계정 이메일 목록. 로그인 화면이 이 목록으로 계정 선택 UI를 만들고,
// 비밀번호 재설정 메일도 여기서 고른 주소로 발송합니다. 비밀번호는 코드에 두지 않고
// 화면에서 입력받아 Supabase Auth 가 검증합니다.
//
// 주소를 추가할 때 세 곳을 함께 맞춰야 합니다:
//   1. 이 목록
//   2. Supabase Authentication → Users (계정이 실제로 있어야 함)
//   3. db/payments.sql / db/payments_kr.sql 의 RLS 이메일 허용 목록
// 2를 빠뜨리면 재설정 메일이 조용히 발송되지 않고(아래 참고), 3을 빠뜨리면 로그인은
// 되지만 결제 내역만 빈 목록으로 뜹니다.
//
// 참고 — Supabase 는 등록되지 않은 주소로 재설정 메일을 요청해도 계정 존재 여부를
// 숨기려고 성공 응답을 돌려줍니다. 에러가 없어도 메일이 오지 않을 수 있습니다.
export const ADMIN_EMAILS = ['wemustgo@mustgokorea.com', 'rurusy@gmail.com']

// 첫 항목이 주 계정 — 로그인 화면의 초기 선택값.
export const ADMIN_EMAIL = ADMIN_EMAILS[0]

// 재설정 메일이 되돌아올 주소. Supabase Authentication → URL Configuration 의
// Redirect URLs 에 같은 값이 등록되어 있어야 링크가 동작합니다.
export const PASSWORD_RESET_PATH = '/admin/reset-password'
