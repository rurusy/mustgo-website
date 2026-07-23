// 토스페이먼츠 코어 API 공용 헬퍼 (국내 원화 결제).
//
// Secrets (Edge Function Secrets 에 등록):
//   TOSS_SECRET_KEY   상점관리자 → API 개별 연동 키의 시크릿 키
//                     (test_gsk_… / live_gsk_…)  ← 절대 프론트엔드/저장소에 두지 말 것
//
// 테스트/운영 구분은 별도 env 없이 키 접두사(test_ / live_)로 결정됩니다.
// 엔드포인트는 하나이고, 어떤 키로 호출하느냐에 따라 테스트/실거래가 갈립니다.

const API_BASE = 'https://api.tosspayments.com'

export function tossSecretKey(): string {
  const key = Deno.env.get('TOSS_SECRET_KEY')
  if (!key) throw new Error('TOSS_SECRET_KEY not configured')
  return key
}

// 토스는 "시크릿키 + 콜론"을 base64 로 인코딩한 Basic 인증을 씁니다(비밀번호 없음).
function authHeader(): string {
  return `Basic ${btoa(`${tossSecretKey()}:`)}`
}

export type TossResult = {
  ok: boolean
  status: number
  // 성공이면 Payment 객체, 실패면 { code, message }
  data: Record<string, unknown>
}

export async function tossRequest(
  path: string,
  opts: { method?: string; body?: unknown; idempotencyKey?: string } = {},
): Promise<TossResult> {
  const headers: Record<string, string> = {
    Authorization: authHeader(),
    'Content-Type': 'application/json',
  }
  // 같은 요청이 네트워크 재시도로 두 번 도착해도 한 번만 처리되도록.
  if (opts.idempotencyKey) headers['Idempotency-Key'] = opts.idempotencyKey

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method ?? 'GET',
    headers,
    ...(opts.body !== undefined ? { body: JSON.stringify(opts.body) } : {}),
  })

  let data: Record<string, unknown> = {}
  try {
    data = await res.json()
  } catch {
    data = {}
  }
  return { ok: res.ok, status: res.status, data }
}

// 토스 결제 상태 → payments_kr.status 매핑.
//   DONE                결제 승인 완료
//   WAITING_FOR_DEPOSIT 가상계좌 발급됨, 입금 대기
//   CANCELED / PARTIAL_CANCELED  승인 후 취소
//   ABORTED / EXPIRED   승인 실패·만료
export function mapStatus(tossStatus: unknown): string {
  switch (String(tossStatus ?? '')) {
    case 'DONE':
      return 'completed'
    case 'WAITING_FOR_DEPOSIT':
      return 'waiting_for_deposit'
    case 'CANCELED':
    case 'PARTIAL_CANCELED':
      return 'canceled'
    case 'ABORTED':
    case 'EXPIRED':
      return 'failed'
    default:
      return 'failed'
  }
}

// 가상계좌 응답의 bankCode → 은행명. 목록에 없으면 코드를 그대로 노출합니다.
const BANK_NAMES: Record<string, string> = {
  '02': '한국산업은행',
  '03': 'IBK기업은행',
  '04': 'KB국민은행',
  '06': 'KB국민은행',
  '07': 'Sh수협은행',
  '11': 'NH농협은행',
  '12': '단위농협',
  '20': '우리은행',
  '23': 'SC제일은행',
  '27': '한국씨티은행',
  '31': 'DGB대구은행',
  '32': 'BNK부산은행',
  '34': '광주은행',
  '35': '제주은행',
  '37': '전북은행',
  '39': 'BNK경남은행',
  '45': '새마을금고',
  '48': '신협',
  '50': '저축은행',
  '54': 'HSBC은행',
  '64': '산림조합',
  '71': '우체국',
  '81': '하나은행',
  '88': '신한은행',
  '89': '케이뱅크',
  '90': '카카오뱅크',
  '92': '토스뱅크',
}

export function bankName(code: unknown): string {
  const c = String(code ?? '').trim()
  return BANK_NAMES[c] ?? (c || '은행')
}

// 결제창에 노출할 가상계좌 정보만 추려낸다 (승인 응답 전체는 raw 에 별도 보관).
export function virtualAccountSummary(payment: Record<string, unknown> | null | undefined) {
  const va = payment?.virtualAccount as Record<string, unknown> | null | undefined
  if (!va || !va.accountNumber) return null
  return {
    bank: bankName(va.bankCode),
    account_number: String(va.accountNumber),
    holder: va.customerName != null ? String(va.customerName) : null,
    due_date: va.dueDate != null ? String(va.dueDate) : null,
  }
}
