// 관리자 결제 알림 메일 (Resend). inquiry-email 과 동일한 시크릿을 공유합니다.
//
//   RESEND_API_KEY / ADMIN_NOTIFY_TO / SENDER_FROM
//
// 알림은 항상 best-effort 입니다. 메일이 실패해도 결제 처리는 계속되어야 하므로
// 절대 throw 하지 않습니다. 결제의 진실원은 DB(payments_kr)이고 메일은 편의 알림입니다.

export async function notifyPaymentKr(info: {
  status: string
  amount: number | null
  method: string | null
  payerName: string | null
  payerEmail: string | null
  reference: string | null
  orderId: string
  receiptUrl?: string | null
}): Promise<void> {
  const key = Deno.env.get('RESEND_API_KEY')
  const to = Deno.env.get('ADMIN_NOTIFY_TO')
  const from = Deno.env.get('SENDER_FROM')
  if (!key || !to || !from) return

  const amountLabel =
    info.amount != null ? `${info.amount.toLocaleString('ko-KR')}원` : '(금액 확인 필요)'

  const statusLabel = {
    completed: '입금/결제 완료',
    waiting_for_deposit: '가상계좌 발급 · 입금 대기',
    canceled: '결제 취소',
    failed: '결제 실패',
  }[info.status] ?? info.status

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[MustGo 결제] ${amountLabel} ${statusLabel}`,
        text: [
          `국내 결제(토스페이먼츠) ${statusLabel}.`,
          '',
          `상태: ${info.status}`,
          `금액: ${amountLabel}`,
          `결제수단: ${info.method ?? '-'}`,
          `결제자: ${info.payerName ?? '-'}`,
          `이메일: ${info.payerEmail ?? '-'}`,
          `참조: ${info.reference ?? '-'}`,
          `주문번호: ${info.orderId}`,
          `매출전표: ${info.receiptUrl ?? '-'}`,
        ].join('\n'),
      }),
    })
  } catch (e) {
    console.error('[notify] payment_kr notify failed:', e)
  }
}
