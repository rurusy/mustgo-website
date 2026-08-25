// Supabase Auth 는 실패 원인을 error_code 로 내려준다. 화면에서 이를 한 문구로
// 뭉치면 "비밀번호가 틀렸다"와 "계정이 없다 / 시도가 막혔다 / 환경변수가 비었다"를
// 구분할 수 없다. 코드별 안내 + 원본 코드 노출로 원인을 화면에서 바로 읽게 한다.
//
// 로그인과 비밀번호 재설정은 같은 코드라도 안내 문구가 달라야 하므로, 공통 코드만
// 여기 두고 나머지는 호출부가 messages 로 덮어쓴다 (Button 의 variants 와 같은
// lookup 규약).

export const sharedAuthErrors = {
  over_request_rate_limit: {
    message: '요청이 너무 많습니다.',
    hint: '약 5분 뒤에 다시 시도해주세요.',
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

export function resolveAuthError(err, { messages = {}, fallback = '요청을 처리하지 못했습니다.' } = {}) {
  // 네트워크 실패는 error_code 없이 AuthRetryableFetchError(status 0) 로 온다.
  const code =
    err.code ?? (err.name === 'AuthRetryableFetchError' || err.status === 0 ? 'network' : null)
  const known = code ? (messages[code] ?? sharedAuthErrors[code]) : null
  if (known) return { ...known, code }

  // 매핑되지 않은 코드는 원문 그대로 노출 — 원인을 삼키지 않는다.
  return {
    message: fallback,
    hint: err.message || null,
    code: code || (err.status ? `HTTP ${err.status}` : 'unknown'),
  }
}
