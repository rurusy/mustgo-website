# PayPal 결제 테스트 가이드

Mustgo `/pay` 결제(홈 헤더 Payment 버튼 진입, 영문 전용)의 PayPal 연동을 검증하는 절차.

관련 파일:
- 프론트: `src/components/sections/Payment.jsx`, `src/pages/PayPage.jsx`
- 백엔드: `supabase/functions/paypal-create-order/`, `supabase/functions/paypal-capture-order/`, `supabase/functions/_shared/paypal.ts`
- 설정: `.env.local`(프론트), Supabase Edge Function Secrets(백엔드)

---

## 0. 현재 상태 (2026-07 기준)

- ✅ **Sandbox 파이프라인 검증 완료** — sandbox에서 $1 결제 → "결제 완료" 알림 메일 수신 확인.
  즉 `create-order → capture → DB 기록 → 관리자 알림 → 성공 UI` 전 과정이 코드상 정상.
- ✅ **Live create-order 동작 확인** — live에서 카드 폼까지 떴다는 건 live 주문 생성이 성공했다는 뜻.
- ⚠️ **Live 캡처(실제 승인 완료)는 미검증** — 유일한 live 시도가 *한국 발행 카드*여서 카드 승인 단계에서 거절됨.
  (한국 PayPal 가맹점 ↔ 한국 발행 카드/한국 PayPal 계정은 외국환거래법 컴플라이언스로 차단 — 코드 문제 아님, 수정 불가.)

> **핵심 구분:** Sandbox 성공 = *코드/로직* 검증 완료. 하지만 Sandbox는 **live 가맹점 계정**을
> 건드리지 않으므로, "live에서 실고객이 실제로 결제된다"까지 증명하지는 않는다. 아래 "Live 검증" 참고.
>
> **⚠️ payments 테이블이 비어 보여도 놀라지 말 것:** 07-08 sandbox 성공 캡처 시 생긴
> `completed` 행은 테스트 후 **일부러 삭제**했다. 지금 남은 `created`-only 행들은 캡처까지
> 못 간 잔여 흔적일 뿐. 즉 "completed 0건"이 곧 "캡처 미작동"은 아니다.

---

## ⚠️ 시작 전 주의 2가지

1. **Edge Function은 한 벌뿐.** 배포된 함수의 시크릿을 sandbox로 바꾸면 **운영 URL 결제도 sandbox가 됨.**
   테스트 후 반드시 **live로 원복**(7단계).
2. **프론트·백엔드는 같은 sandbox 앱이어야 함.** 프론트 `VITE_PAYPAL_CLIENT_ID`와
   서버 `PAYPAL_CLIENT_ID`가 **동일한 sandbox 앱의 Client ID**여야 함. 한쪽만 sandbox면
   "주문 못 찾음/캡처 실패" 발생 — sandbox 테스트가 깨지는 1순위 원인.

---

## Sandbox 테스트 절차

### 1. Sandbox 앱 자격증명 발급
1. https://developer.paypal.com/dashboard/ 로그인 (Mustgo PayPal 계정)
2. 우측 상단 **Sandbox** 모드 선택
3. **Apps & Credentials → Sandbox** → 기본 앱 클릭(또는 새 앱 생성)
4. **Client ID** / **Secret** 복사

### 2. Sandbox 테스트 계정 확인
1. **Testing Tools → Sandbox Accounts**
2. 기본 **business(판매자)** / **personal(구매자)** 계정 2개 존재
3. **personal(구매자)** 계정 이메일(`sb-xxxx@personal.example.com`)·비밀번호 확인
   (`...` → View/Edit account에서 확인/재설정)
4. (카드 게스트 결제도 볼 경우) **Testing Tools → Credit Card Generator**로 테스트 카드 생성
   - 가장 확실한 검증은 **노란 PayPal 버튼 → personal 계정 로그인 → 승인** (코드 경로 동일)

### 3. 백엔드 시크릿을 sandbox로

**대시보드:** Supabase → 프로젝트 → **Edge Functions → Secrets**
```
PAYPAL_CLIENT_ID = <sandbox Client ID>
PAYPAL_SECRET    = <sandbox Secret>
PAYPAL_ENV       = sandbox
```

**CLI (PowerShell):**
```powershell
supabase secrets set PAYPAL_CLIENT_ID="<sandbox Client ID>" PAYPAL_SECRET="<sandbox Secret>" PAYPAL_ENV="sandbox" --project-ref <project-ref>
```
- `<project-ref>`: Supabase → Project Settings → General → **Reference ID**
- 시크릿은 다음 호출부터 반영(재배포 불필요). 미덥지 않으면 `supabase functions deploy paypal-create-order --no-verify-jwt`
- 💡 바꾸기 전 **현재 live 값 메모** (원복용)

### 4. 프론트엔드를 sandbox로 (로컬만)
1. `.env.local`의 `VITE_PAYPAL_CLIENT_ID`를 sandbox Client ID로 교체 (기존 live 값 메모)
   ```
   VITE_PAYPAL_CLIENT_ID=<sandbox Client ID>
   ```
   (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`는 그대로)
2. 개발 서버 재시작: `npm run dev`
3. `http://localhost:5173/pay` 접속

### 5. 테스트 흐름
1. 금액 입력(예 `10.00`, USD) → 버튼 활성화 확인
2. **노란 PayPal 버튼** → personal sandbox 계정 로그인 → **Pay Now**
3. "Payment complete" 성공 패널 + Transaction ID 확인
4. (선택) 카드 경로: "Debit or Credit Card" → 생성한 테스트 카드로 진행

### 6. 검증 포인트
- ✅ 성공 화면에 금액·Transaction ID 표시
- ✅ Supabase `payments` 테이블에 `status = completed` 행
  `select * from payments order by created_at desc limit 5;`
- ✅ (RESEND 시크릿 설정 시) 관리자 알림 메일 `[MustGo 결제] ...` 수신
- ✅ (선택) 취소 버튼 → `onCancel` → idle 복귀

### 7. Live로 원복 (필수)
```powershell
supabase secrets set PAYPAL_CLIENT_ID="<live Client ID>" PAYPAL_SECRET="<live Secret>" PAYPAL_ENV="live" --project-ref <project-ref>
```
1. `.env.local`의 `VITE_PAYPAL_CLIENT_ID`를 live 값으로 원복
2. dev 서버 재시작해 원복 확인(또는 종료)

---

## Live 검증 (해외 카드 없이 가능한 확인)

Sandbox가 통과해도 **live 가맹점 계정 자체의 자격**은 별개로 확인해야 한다.
해외 카드/지인이 없어도 아래는 확인 가능:

1. **Live PayPal 비즈니스 계정 상태 점검** (https://www.paypal.com 로그인)
   - 계정이 **완전 인증(verified)** 상태인가? (미인증이면 수취 한도/차단)
   - 계정에 **제한(limitation)** 걸린 게 없는가?
   - **게스트/카드 결제(Website Payments / Guest Checkout)** 가 활성인가?
   - 수취 통화에 USD/EUR 포함되는가?
2. **payments 테이블에서 live 흔적 확인**
   - 이전 live 카드 시도의 `status = 'created'` 행이 남아 있으면 → live 주문 생성이 실제로 성공했다는 근거.
3. **실결제 스모크 테스트 (가능해질 때)**
   - **비(非)한국 발행 카드** 또는 **해외 PayPal 계정**으로 소액($1). 성공 후 PayPal에서 환불 처리.
   - 실고객 상당수는 **PayPal 계정 로그인** 결제(가장 안정적)를 쓰므로, 계정이 verified면 이 경로는 사실상 문제없음.

## 알려진 제약 (코드로 수정 불가)

- **한국 발행 카드 / 한국 PayPal 계정 → 한국 PayPal 가맹점**: 외국환거래법 컴플라이언스로 PayPal이 차단.
  Mustgo 타깃은 해외 고객(외국 카드/외국 계정)이라 실제 서비스에는 영향 없음.
- 게스트 카드 버튼 노출·승인은 PayPal이 구매자 위치·카드 발행국·리스크로 결정 → 서버에서 강제 불가.

## 참고 자료
- [Guest Checkout | Accept Cards without Account — PayPal](https://www.paypal.com/us/cshelp/article/how-do-i-accept-cards-with-checkout-using-the-guest-checkout-option--help307)
- [페이팔 연동 후 테스트 결제 실패 — 카페24 Help Center](https://support.cafe24.com/hc/ko/articles/8475069259545)
- [내 결제가 거부된 이유 — PayPal KR](https://www.paypal.com/kr/cshelp/article/help419)
