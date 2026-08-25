# 관리자 비밀번호 재설정

관리자 계정은 `wemustgo@mustgokorea.com` 하나뿐이고, 비밀번호는 코드에 없습니다.
Supabase Auth 가 보관하고 검증합니다 (`src/lib/supabase.js` 의 `ADMIN_EMAIL`).

## 1. Supabase 설정 (최초 1회, 필수)

이 설정이 없으면 재설정 메일의 링크가 **머스트고 메인 홈페이지로 떨어집니다.**

Supabase 대시보드 → **Authentication → URL Configuration → Redirect URLs** 에 추가:

```
https://www.mustgokorea.co.kr/admin/reset-password
http://localhost:5173/admin/reset-password
```

(두 번째 줄은 로컬 개발용. 없어도 운영에는 지장 없습니다.)

Supabase 는 허용 목록에 없는 `redirectTo` 를 무시하고 **Site URL** 로 되돌려보냅니다.
Site URL 은 홈페이지(`https://www.mustgokorea.co.kr`)라서, 등록을 빠뜨리면 링크를
눌러도 홈이 뜨고 끝납니다.

이 목록은 **허용 목록이지 우선순위 목록이 아닙니다.** 목적지를 정하는 것은 코드가 보내는
`redirectTo` 값이고, 목록은 그 값을 허용할지만 판단합니다 — 등록 순서는 무관하며 맨 위
항목으로 끌려가지 않습니다.

와일드카드에서 `**` 는 구분자(`.` 과 `/`)를 포함한 모든 문자에 매칭되므로,
`https://www.mustgokorea.co.kr/**` 가 이미 등록돼 있다면 `/admin/reset-password` 는
그 패턴으로 이미 허용됩니다 (위 첫 줄은 중복이지만 무해). 반면 `localhost` 는 origin 이
달라 그 와일드카드로 커버되지 않으므로 별도 등록이 필요합니다.

## 2. 비밀번호 재설정 (평상시)

1. `/admin/login` 에서 **"비밀번호를 잊으셨나요? 재설정 메일 받기"** 클릭
2. `wemustgo@mustgokorea.com` 메일함에서 링크 열기
3. `/admin/reset-password` 에서 새 비밀번호 입력 (8자 이상) → 변경 후 자동 로그인

링크는 **발송 후 1시간**, **1회만** 유효합니다. 만료·재사용 시 화면에 `otp_expired`
같은 코드가 그대로 표시되니 메일을 다시 요청하면 됩니다.

Supabase 기본 메일 서버는 시간당 발송 수가 적으므로 연속으로 여러 번 요청하지 마세요
(`over_request_rate_limit`).

## 3. 메일을 못 받을 때 — 대시보드에서 직접 지정

메일이 안 오거나 메일함에 접근할 수 없으면 대시보드에서 비밀번호를 직접 정할 수 있습니다.

**Authentication → Users** → 해당 사용자 행에서 비밀번호 지정.
지정 UI가 없는 버전이면 사용자를 **삭제한 뒤 Add user → Create new user** 로 같은
이메일에 새 비밀번호를 넣고 **Auto Confirm User** 를 체크해 다시 만들면 됩니다.

삭제·재생성해도 데이터와 권한에는 영향이 없습니다 — RLS 정책이 사용자 uid 가 아니라
**이메일**을 기준으로 하기 때문입니다 (`db/payments.sql`, `db/payments_kr.sql` 의
`auth.jwt() ->> 'email'`). 코드 어디에도 uid 를 박아둔 곳이 없습니다.

## 참고 — 대시보드에서 보낸 재설정 메일

대시보드의 **Send password recovery** 는 `redirectTo` 를 지정할 수 없어 링크가 Site URL
(= 홈페이지)로 떨어집니다. 이 경우를 위해 `App.jsx` 의 `RecoveryRedirect` 가 복구
토큰을 감지해 `/admin/reset-password` 로 넘겨주므로, 홈으로 떨어져도 재설정 화면이
정상적으로 뜹니다.

## 오류 코드

두 화면 모두 Supabase 가 내려준 `error_code` 를 화면에 그대로 표시합니다
(`src/lib/authErrors.js`). 자주 보는 코드:

| 코드 | 뜻 |
| --- | --- |
| `invalid_credentials` | 비밀번호 불일치 — 계정이 아예 없을 때도 같은 코드가 옵니다 |
| `otp_expired` | 재설정 링크 만료 (1시간 초과) |
| `same_password` | 기존과 동일한 비밀번호 |
| `weak_password` | Supabase 비밀번호 정책 미달 |
| `session_not_found` | 재설정 세션 만료 — 메일을 다시 요청 |
| `over_request_rate_limit` | 시도/발송 횟수 초과 — 약 5분 대기 |
| `env_missing` | 배포 환경에 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 누락 |
