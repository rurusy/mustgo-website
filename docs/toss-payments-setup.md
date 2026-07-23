# 토스페이먼츠 (국내 원화 결제) 설정 가이드

`/pay-kr` 에서 국내 고객이 원화로 결제할 수 있게 하는 연동입니다.
해외 고객용 USD/EUR PayPal 결제(`/pay`)와는 완전히 분리된 별도 경로입니다 —
국내 발행 카드는 외국환거래법상 PayPal 로 받을 수 없기 때문입니다.

---

## 1. 구조 한눈에 보기

```
브라우저                          Edge Function                    토스페이먼츠
────────────────────────────────────────────────────────────────────────────
① 금액 입력
   "결제수단 선택" 클릭  ───────▶ toss-prepare-payment
                                  · 금액 검증 (1,000원~1억원)
                                  · 주문번호 발급
                                  · payments_kr 에 'created' 기록
                       ◀───────── { orderId, orderName, amount }

② 결제위젯 렌더 (SDK v2)
   "결제하기" 클릭  ─────────────────────────────────────────▶ 결제창(인증)
                                                               │
   /pay-kr/success ?paymentKey&orderId&amount  ◀────────────────┘

③ 승인 요청           ───────────▶ toss-confirm-payment
                                  · DB 금액과 대조 (변조 차단)
                                  · POST /v1/payments/confirm ─▶ 실제 청구
                                  · 상태·매출전표 기록 + 관리자 메일
                       ◀───────── { status, amount, method, … }

④ (가상계좌만) 고객이 나중에 입금 ───────────────────────────▶ 토스
                                  toss-webhook  ◀───── DEPOSIT_CALLBACK
                                  · 토스 API 재조회로 상태 확정
                                  · 'completed' 로 변경 + 관리자 메일
```

**핵심 원칙:** 금액의 진실원은 항상 서버입니다. ①에서 서버가 기록한 금액과
③에서 넘어온 금액이 다르면 승인하지 않습니다. 그리고 ②의 인증만으로는
**청구되지 않습니다** — ③의 승인 API 호출이 성공해야 실제로 결제됩니다.

관련 파일:

| 역할 | 경로 |
| --- | --- |
| 결제 화면 (2단계) | `src/components/sections/PaymentKr.jsx` |
| 페이지 `/pay-kr` | `src/pages/PayKrPage.jsx` |
| 착지 `/pay-kr/success`·`/fail` | `src/pages/PayKrResultPage.jsx` |
| 주문 생성 | `supabase/functions/toss-prepare-payment/` |
| 결제 승인 | `supabase/functions/toss-confirm-payment/` |
| 입금 웹훅 | `supabase/functions/toss-webhook/` |
| 공용 헬퍼 | `supabase/functions/_shared/toss.ts`, `notify.ts` |
| 테이블 | `db/payments_kr.sql` → `public.payments_kr` |

---

## 2. 지금 해야 할 일 (체크리스트)

### 2-1. 테스트 키로 먼저 검증 (계약 전에도 가능)

토스가 공개한 문서용 테스트 키입니다. **실제 청구가 발생하지 않습니다.**

| 종류 | 값 |
| --- | --- |
| 클라이언트 키 | `test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm` |
| 시크릿 키 | `test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6` |

1. **로컬 `.env.local`** 에 클라이언트 키 추가

   ```
   VITE_TOSS_CLIENT_KEY=test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm
   ```

2. **Supabase Edge Function Secrets** 에 시크릿 키 등록
   (Supabase 대시보드 → Edge Functions → Secrets)

   ```
   TOSS_SECRET_KEY = test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6
   ```

3. `npm run dev` → `http://localhost:5173/pay-kr` 에서 결제 테스트
   - 결제 후 `payments_kr` 에 행이 생기는지 확인.
   - ⚠️ **문서용 테스트 상점의 카드 결제는 카드사(KB Pay 등) 실제 로그인을 요구합니다.**
     자동/무계정 테스트가 필요하면 아래 "검증 기록"의 가상계좌 경로를 쓰세요.

### 2-2. 실제 계약 후

1. 토스페이먼츠 가맹 신청 → 심사 통과
2. [상점관리자](https://app.tosspayments.com) → **개발자센터 → API 키**
   에서 **결제위젯 연동 키**의 클라이언트/시크릿 키를 복사
   - ⚠️ "API 개별 연동 키"가 아니라 **결제위젯 연동 키**여야 합니다
     (`gck` / `gsk` 접두사).
3. 값 교체
   - Vercel → Project Settings → Environment Variables →
     `VITE_TOSS_CLIENT_KEY` = `live_gck_…` → **Redeploy**
   - Supabase Secrets → `TOSS_SECRET_KEY` = `live_gsk_…`
   - 테스트/운영 구분은 키 접두사로만 결정됩니다. 별도 env 플래그가 없습니다.
4. **결제위젯에 노출할 결제수단 설정**
   상점관리자 → 결제위젯 → 결제수단 관리에서 카드 / 간편결제 / 계좌이체 /
   가상계좌를 켭니다. 코드는 위젯이 주는 대로 보여주므로, 결제수단 변경은
   **배포 없이 대시보드에서만** 하면 됩니다.
5. **웹훅 등록 (가상계좌를 쓰면 필수)**
   상점관리자 → 개발자센터 → 웹훅 → 등록

   | 항목 | 값 |
   | --- | --- |
   | URL | `https://ionkfogzjfmvkermxbyy.supabase.co/functions/v1/toss-webhook` |
   | 이벤트 | `DEPOSIT_CALLBACK` |

   등록하지 않으면 **고객이 가상계좌에 입금해도 사이트가 그 사실을 알 수 없습니다**
   (`waiting_for_deposit` 에서 멈춤). `PAYMENT_STATUS_CHANGED` 도 함께 등록하면
   같은 결제로 알림이 두 번 오지만, 웹훅 함수가 매번 토스 API 로 상태를 다시
   조회하므로 중복 처리되지는 않습니다.
6. 도메인 등록 — 상점관리자에서 `https://mustgokorea.co.kr` 을 허용 도메인에
   추가해야 운영 키로 결제창이 열립니다.

---

## 3. 환경변수 정리

### 프론트엔드 (Vercel / `.env.local`)

| 변수 | 설명 |
| --- | --- |
| `VITE_TOSS_CLIENT_KEY` | 결제위젯 클라이언트 키. **공개값**이라 노출돼도 안전 |

### Edge Function Secrets (Supabase)

| 변수 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `TOSS_SECRET_KEY` | ✅ | — | 결제위젯 시크릿 키. **절대 프론트엔드에 두지 말 것** |
| `TOSS_MIN_AMOUNT` | | `1000` | 1건당 최소 결제 금액(원) |
| `TOSS_MAX_AMOUNT` | | `100000000` | 1건당 최대 결제 금액(원, 1억) |
| `RESEND_API_KEY` | | — | 관리자 알림 메일 (문의 폼과 공유) |
| `ADMIN_NOTIFY_TO` | | — | 〃 |
| `SENDER_FROM` | | — | 〃 |

> `TOSS_MAX_AMOUNT` 를 바꾸면 `src/components/sections/PaymentKr.jsx` 의
> `MAX_AMOUNT` 상수도 같이 바꿔야 합니다 (클라이언트 사전 검증용).

---

## 4. 배포 명령

```bash
# 테이블 (최초 1회) — Supabase SQL Editor 에 db/payments_kr.sql 붙여넣기

# Edge Functions
supabase functions deploy toss-prepare-payment --no-verify-jwt
supabase functions deploy toss-confirm-payment --no-verify-jwt
supabase functions deploy toss-webhook         --no-verify-jwt
```

`toss-webhook` 은 토스가 Supabase JWT 를 보내지 않으므로 `--no-verify-jwt` 가
**반드시** 필요합니다. 대신 함수 안에서 ① 저장된 `vbank_secret` 대조,
② 토스 API 재조회로 검증합니다.

---

## 5. 서버 스모크 테스트

```bash
PROJECT=https://ionkfogzjfmvkermxbyy.supabase.co
ANON=<VITE_SUPABASE_ANON_KEY>

# 주문 생성 — 200 + {"orderId":"MG-…"} 이면 정상
curl -s -X POST "$PROJECT/functions/v1/toss-prepare-payment" \
  -H "Authorization: Bearer $ANON" -H 'Content-Type: application/json' \
  -d '{"amount":10000,"reference":"smoke-test"}'

# 금액 범위 밖 — 400 + {"error":"amount_out_of_range"} 이면 정상
curl -s -X POST "$PROJECT/functions/v1/toss-prepare-payment" \
  -H "Authorization: Bearer $ANON" -H 'Content-Type: application/json' \
  -d '{"amount":10}'
```

스모크 테스트로 생긴 `status='created'` 행은 실제 결제가 아니므로
확인 후 지워도 됩니다 (승인 전이라 청구된 적 없음).

---

## 5-1. 검증 기록 (2026-07-24, 테스트 키)

전 구간을 실제로 태워 확인했습니다. **실제 청구는 없었습니다.**

| 확인 항목 | 결과 |
| --- | --- |
| `toss-prepare-payment` 정상/범위밖 | 200 / 400 `amount_out_of_range` |
| `toss-confirm-payment` 없는 주문 | 404 `unknown_order` |
| `toss-confirm-payment` 금액 조작 | 400 `amount_mismatch` (승인 차단) |
| **결제위젯 렌더** | 결제수단·약관 위젯 정상, "테스트 환경" 배너 표시 |
| **가상계좌 발급 E2E** | 실제 `paymentKey` 로 승인 성공 → `waiting_for_deposit` + 계좌번호·예금주·기한이 `/pay-kr/success` 에 정상 표시 |
| `toss-webhook` 정상 알림 | 200 `{ok:true,unchanged:true}` |
| `toss-webhook` 위조 secret | 401 `unauthorized` |
| `toss-webhook` 없는 주문 / GET | 404 / 405 |

웹훅 검증에서 중요한 점: 본문에 `"status":"DONE"` 을 넣어 보냈는데도 함수가 토스 API 를
재조회해 실제 상태(`WAITING_FOR_DEPOSIT`)를 유지했습니다. **위조 알림으로 상태를 바꿀 수
없다**는 설계가 실제로 동작함을 확인한 것입니다.

**아직 확인하지 못한 것:** 가상계좌 실제 입금 → `completed` 전이와 그때 나가는 관리자 메일.
입금 시뮬레이션은 상점관리자 로그인이 필요해서, 계약 후 우리 상점에서 확인하는 게 맞습니다.

> 자동 테스트에 쓴 우회 경로: 결제위젯 키(`gck`/`gsk`)로는 결제창 API 를 못 쓰므로,
> 문서용 **API 개별 연동 테스트 키**(`test_ck_4vZnjEJeQVxJzDoab4d8PmOoBN0k` /
> `test_sk_XjExPeJWYVQR12P55agr49R5gvNL`)로 가상계좌를 발급했습니다. 이때만 잠시
> `TOSS_SECRET_KEY` 를 바꿨다가 원래 위젯 시크릿으로 되돌렸습니다.

---

## 6. 상태값 읽는 법 (`payments_kr.status`)

| 값 | 의미 | 돈이 들어왔나? |
| --- | --- | --- |
| `created` | 결제창을 열기 위해 주문만 만든 상태 | ❌ 청구 안 됨 |
| `waiting_for_deposit` | 가상계좌 발급됨, 입금 대기 | ❌ 아직 |
| `completed` | 승인 완료 | ✅ |
| `canceled` | 승인 후 취소·환불 | ❌ 되돌아감 |
| `failed` | 승인 실패 | ❌ |

`created` 행이 쌓이는 것은 정상입니다 — 고객이 금액만 입력하고 결제를
중단하면 남습니다. **실제 매출은 `completed` 만 셉니다.**

---

## 7. 자주 걸리는 문제

| 증상 | 원인 |
| --- | --- |
| "결제 모듈이 아직 설정되지 않았습니다" | `VITE_TOSS_CLIENT_KEY` 미설정. Vercel 은 값 추가 후 **Redeploy** 필요 |
| 결제창이 안 열림 (운영키) | 상점관리자에 도메인 미등록 |
| 승인 단계에서 실패 | `TOSS_SECRET_KEY` 미설정 또는 클라이언트/시크릿 키의 테스트·운영 짝이 안 맞음 |
| 가상계좌 입금했는데 `waiting_for_deposit` 그대로 | 웹훅 URL 미등록 |
| `amount_mismatch` | 착지 URL 의 `amount` 파라미터가 조작됨 — 정상 차단 동작 |

로그: Supabase 대시보드 → Edge Functions → 각 함수 → Logs.
결제 내역: `payments_kr` 테이블 (관리자 계정만 조회 가능, RLS).

---

## 8. 남은 일 / 알려진 한계

- **환불은 코드에 없습니다.** 상점관리자에서 수동 취소하거나, 필요해지면
  `/v1/payments/{paymentKey}/cancel` 을 호출하는 함수를 추가해야 합니다.
- **에스크로·현금영수증**은 연동하지 않았습니다. 현금영수증은 상점관리자
  설정으로 자동 발급되게 할 수 있습니다.
- **관리자 페이지에 결제 목록이 없습니다.** 현재는 Supabase 테이블을 직접
  보거나 알림 메일로 확인합니다 (PayPal 결제도 동일).
- 결제·환불 정책(`/policy`)과 개인정보처리방침(`/privacy`)에 토스페이먼츠
  관련 문구를 반영해 두었습니다 — 실제 시행 전 사장님/법률 검토 권장.
