import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const NOT_CONFIGURED = {
  message:
    'Supabase 클라이언트가 설정되지 않았습니다. 환경변수 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 를 확인하세요.',
  code: 'env_missing',
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

// 관리자 계정 이메일은 Supabase Authentication → Users 에 등록된 값과 일치해야 합니다.
// 비밀번호는 코드에 두지 않고 로그인 화면에서 입력받아 Supabase Auth 가 검증합니다.
export const ADMIN_EMAIL = 'rurusy@naver.com'
