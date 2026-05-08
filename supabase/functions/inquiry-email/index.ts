// Database Webhook (public.inquiries INSERT) -> Resend -> 관리자 메일
//
// 필요한 환경변수 (Edge Function Secrets 에 등록):
//   RESEND_API_KEY     Resend 대시보드에서 발급한 API 키
//   ADMIN_NOTIFY_TO    알림 받을 주소 (예: wemustgo@mustgokorea.com)
//   SENDER_FROM        발신 주소 (예: "MustGo <noreply@mustgokorea.com>")
//   WEBHOOK_SECRET     Database Webhook 의 custom header 값과 동일하게 설정
//
// 배포: `supabase functions deploy inquiry-email --no-verify-jwt`
//   --no-verify-jwt 필수 — Database Webhook 은 JWT 를 보내지 않고
//   대신 위 WEBHOOK_SECRET 으로 인증.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_NOTIFY_TO = Deno.env.get('ADMIN_NOTIFY_TO')!
const SENDER_FROM = Deno.env.get('SENDER_FROM')!
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET')!

const TYPE_LABELS: Record<string, string> = {
  corporate: '기업 출장 (Corporate Travel)',
  inbound: 'Inbound Tour (해외 VIP 한국 방문)',
  other: '기타 문의',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('method not allowed', { status: 405 })
  }

  if (req.headers.get('x-webhook-secret') !== WEBHOOK_SECRET) {
    return new Response('unauthorized', { status: 401 })
  }

  const body = await req.json()
  const row = body?.record
  if (!row) return new Response('no record', { status: 400 })

  const typeLabel = TYPE_LABELS[row.inquiry_type] ?? row.inquiry_type
  const subject = `[MustGo 문의] ${typeLabel} · ${row.company} (${row.name})`

  const text = [
    `문의 유형: ${typeLabel}`,
    `회사명: ${row.company}`,
    `담당자: ${row.name}${row.position ? ` (${row.position})` : ''}`,
    `연락처: ${row.phone}`,
    `이메일: ${row.email}`,
    '',
    '문의 내용:',
    row.message ?? '(내용 없음)',
    '',
    '─────────',
    `접수 시각: ${row.created_at}`,
    `문의 ID: ${row.id}`,
  ].join('\n')

  const html = `
    <div style="font-family:'Noto Sans KR',sans-serif;font-size:14px;line-height:1.6;color:#1f2937">
      <h2 style="font-size:16px;margin:0 0 16px">[MustGo 문의] ${escapeHtml(typeLabel)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:6px 12px;background:#f9fafb;width:120px">문의 유형</td><td style="padding:6px 12px">${escapeHtml(typeLabel)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb">회사명</td><td style="padding:6px 12px">${escapeHtml(row.company)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb">담당자</td><td style="padding:6px 12px">${escapeHtml(row.name)}${row.position ? ` (${escapeHtml(row.position)})` : ''}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb">연락처</td><td style="padding:6px 12px">${escapeHtml(row.phone)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb">이메일</td><td style="padding:6px 12px"><a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a></td></tr>
      </table>
      <h3 style="font-size:14px;margin:24px 0 8px">문의 내용</h3>
      <div style="white-space:pre-wrap;padding:12px;background:#f9fafb;border-radius:4px">${escapeHtml(row.message ?? '(내용 없음)')}</div>
      <p style="color:#6b7280;font-size:12px;margin-top:24px">
        접수 시각 ${escapeHtml(row.created_at)}<br>
        문의 ID ${escapeHtml(row.id)}
      </p>
    </div>
  `.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SENDER_FROM,
      to: [ADMIN_NOTIFY_TO],
      reply_to: row.email,
      subject,
      text,
      html,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    console.error('[inquiry-email] resend failed:', res.status, errBody)
    return new Response(`resend ${res.status}: ${errBody}`, { status: 502 })
  }

  return new Response('ok', { status: 200 })
})
