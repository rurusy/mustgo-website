import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 가 설정되지 않았습니다. .env.local 을 확인하세요.',
  )
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: true, autoRefreshToken: true },
})

// 관리자 계정 이메일은 Supabase Authentication → Users 에 등록된 값과 일치해야 합니다.
// 비밀번호는 코드에 두지 않고 로그인 화면에서 입력받아 Supabase Auth 가 검증합니다.
export const ADMIN_EMAIL = 'rurusy@naver.com'
