import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrandText } from '../components/ui'
import { cn } from '../design/cn'

// =============================================================================
// 결제·환불 정책 (표준 정합 버전 초안)
// 취소수수료는 공정위 소비자분쟁해결기준(국외여행) 값에 맞춤: 0/10/15/20/30/50%.
//
// TODO(사장님 최종 확정 후 교체):
//   - 시행일(Effective date)
//   - 통신판매업 신고번호 (신고 후 발급)
//   - 견적 유효기간(현재 7일), 환불 처리 영업일(현재 5~10일)
//   - 최저 행사인원 통보 기한, 여행자 보험 실제 제공 여부/보장 내용
//   - 준거법·관할 최종 문구 (변호사/KATA 확인)
// 인바운드/B2B 적용 여부와 최종 문구는 법률 검토 권장 — 본 문서는 법률 자문 아님.
// =============================================================================

function H2({ children }) {
  return <h2 className="text-lg font-bold text-gray-900 mt-10 mb-3">{children}</h2>
}

function P({ children, className }) {
  return <p className={cn('text-[15px] text-gray-600 leading-relaxed mb-3', className)}>{children}</p>
}

function UL({ children }) {
  return (
    <ul className="list-disc pl-5 text-[15px] text-gray-600 leading-relaxed mb-3 space-y-1">
      {children}
    </ul>
  )
}

function ScheduleTable({ rows, head }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[14px] border border-gray-200">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">{head[0]}</th>
            <th className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="align-top">
              <td className="px-4 py-2 text-gray-600 border-b border-gray-100">{a}</td>
              <td className="px-4 py-2 text-gray-900 font-medium border-b border-gray-100">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const EN_SCHEDULE = [
  ['30+ days before the service start date', 'No cancellation fee — full refund'],
  ['20–29 days before', '10% of the service amount'],
  ['10–19 days before', '15%'],
  ['8–9 days before', '20%'],
  ['1–7 days before', '30%'],
  ['Same day / after start / no-show', '50%'],
]

const KO_SCHEDULE = [
  ['여행(서비스) 개시일 30일 이상 전', '취소수수료 없음 — 전액 환급'],
  ['20~29일 전', '서비스 금액의 10%'],
  ['10~19일 전', '15%'],
  ['8~9일 전', '20%'],
  ['1~7일 전', '30%'],
  ['당일 / 개시 후 / No-show', '50%'],
]

export default function PolicyPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'Payment & Refund Policy · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <Link
            to="/pay"
            className="text-sm font-eng font-medium text-gray-500 hover:text-brand-blue transition-colors"
          >
            ← Back to payment
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-eng">
            Payment &amp; Refund Policy
          </h1>
          <p className="text-sm text-gray-400 mt-3">
            Effective date: to be confirmed · Mustgo Co., Ltd. ((주)머스트고) · Business Reg. No.
            618-81-35992
          </p>
          <nav className="mt-4 text-sm text-brand-blue font-eng flex gap-4">
            <a href="#en" className="hover:underline">English</a>
            <a href="#ko" className="hover:underline">한국어</a>
          </nav>

          {/* ---------------- English ---------------- */}
          <article id="en" className="font-eng mt-10 scroll-mt-24">
            <H2>1. Scope</H2>
            <P>
              This policy applies to payments made to <BrandText /> Co., Ltd. ("Mustgo", "we") for
              custom-quoted travel and related services (inbound tours in Korea, corporate travel
              arrangements, and similar) via mustgokorea.co.kr/pay. By making a payment you agree to
              this policy and to the specific quotation provided by your Mustgo consultant.
            </P>

            <H2>2. Quotes &amp; pricing</H2>
            <UL>
              <li>Services are priced per quotation; the amount payable is the amount stated in the quote from your consultant.</li>
              <li>Quotes are valid for 7 days unless stated otherwise, and may change if not confirmed in time or if third-party costs (airfare, accommodation, ground services) change.</li>
              <li>Amounts are in US Dollars (USD) unless otherwise agreed. Any bank or card conversion costs are the payer's responsibility.</li>
            </UL>

            <H2>3. What is included / excluded</H2>
            <P>
              The services, inclusions, and exclusions are those set out in your quotation or
              itinerary. Items not listed as included (e.g., personal expenses, optional activities,
              gratuities, items required by local regulations) are excluded and payable separately.
            </P>

            <H2>4. Payment</H2>
            <UL>
              <li>Payments are processed securely by PayPal (PayPal balance or credit/debit card). Mustgo never stores your card details.</li>
              <li>Your booking is confirmed only after payment is received and your consultant confirms it in writing.</li>
            </UL>

            <H2>5. Cancellation by you &amp; refunds</H2>
            <P>
              To cancel, email wemustgo@mustgokorea.com or contact your consultant. Cancellation takes
              effect on the date we receive your written request (KST). Unless your quotation states
              otherwise, the following cancellation fees apply to the total service amount (aligned with
              Korea's Consumer Dispute Resolution Standards for overseas travel):
            </P>
            <ScheduleTable head={['Notice before service start date', 'Cancellation fee']} rows={EN_SCHEDULE} />
            <UL>
              <li>In addition, non-recoverable third-party costs already incurred on your behalf (airline tickets, hotel/venue deposits, permits, event tickets, guide/vehicle bookings) are non-refundable to the extent Mustgo cannot recover them.</li>
              <li>PayPal processing fees may be non-refundable.</li>
              <li>Approved refunds are returned to the original payment method via PayPal, normally within 5–10 business days of approval; posting times may vary.</li>
            </UL>

            <H2>6. Cancellation or changes by Mustgo</H2>
            <UL>
              <li><strong>Our fault:</strong> If we cancel or materially change confirmed services due to our fault, we will refund all amounts paid and pay compensation equivalent to the rate in the table above for the corresponding timing.</li>
              <li><strong>Minimum participants:</strong> For group products, if a required minimum is not met we will notify you by the date stated in your quotation and refund amounts paid.</li>
              <li><strong>Force majeure:</strong> If services cannot be delivered due to events beyond either party's control (natural disaster, war, terrorism, epidemic, government order, supplier failure, etc.), neither party is penalized; we refund recoverable amounts less costs already incurred. Mustgo is not liable for indirect or consequential losses.</li>
            </UL>

            <H2>7. After services begin</H2>
            <P>
              If services are terminated after they begin due to events beyond either party's control,
              refunds are limited to the unused portion, less costs already incurred or committed on
              your behalf.
            </P>

            <H2>8. Travel documents, insurance &amp; safety</H2>
            <UL>
              <li>You are responsible for holding a valid passport, visa, and any entry requirements. We provide guidance but cannot be liable for denied entry due to missing or invalid documents.</li>
              <li>We recommend that travelers hold appropriate travel insurance. Any insurance we arrange is described in your quotation.</li>
              <li>We provide safety information relevant to your itinerary as required.</li>
            </UL>

            <H2>9. Claims</H2>
            <P>
              If you believe you have suffered a loss, please notify us with supporting documentation.
              We will review and respond within a reasonable period.
            </P>

            <H2>10. Corporate &amp; custom bookings</H2>
            <P>
              For corporate (B2B) and custom arrangements, the specific terms set out in the individual
              quotation or contract prevail over this policy where they differ (including any
              supplier-driven cancellation terms).
            </P>

            <H2>11. Before a chargeback</H2>
            <P>
              Please contact us first — we aim to resolve issues quickly. Filing a card or PayPal
              dispute without contacting us may delay resolution.
            </P>

            <H2>12. Governing law &amp; interpretation</H2>
            <P>
              This policy is governed by the laws of the Republic of Korea. For consumer contracts, the
              relevant consumer-protection laws and the Consumer Dispute Resolution Standards apply and
              prevail where more favorable to the consumer. Any ambiguity is interpreted in the
              traveler's favor.
            </P>

            <H2>13. Contact</H2>
            <P>Mustgo Co., Ltd. — wemustgo@mustgokorea.com — +82-1551-5992</P>
            <P className="text-xs text-gray-400 mt-6">This is a draft and not legal advice.</P>
          </article>

          <hr className="my-14 border-gray-200" />

          {/* ---------------- Korean ---------------- */}
          <article id="ko" className="scroll-mt-24">
            <H2>1. 적용 범위</H2>
            <P>
              본 정책은 <BrandText /> (주)머스트고("머스트고")가 제공하는 맞춤 견적 여행 및 관련
              서비스(한국 인바운드 투어, 기업 출장 수배 등)에 대해 mustgokorea.co.kr/pay 를 통해
              이루어지는 결제에 적용됩니다. 결제 시 본 정책과 담당 컨설턴트가 제시한 견적 조건에 동의한
              것으로 봅니다.
            </P>

            <H2>2. 견적 및 요금</H2>
            <UL>
              <li>요금은 건별 견적에 따르며, 결제 금액은 담당 컨설턴트가 안내한 견적 금액입니다.</li>
              <li>견적 유효기간은 별도 표기가 없으면 7일이며, 기간 내 미확정 또는 항공·숙박·현지 서비스 등 제3자 비용 변동 시 변경될 수 있습니다.</li>
              <li>별도 합의가 없으면 통화는 미국 달러(USD)이며, 환전·카드 수수료는 결제자 부담입니다.</li>
            </UL>

            <H2>3. 여행경비 포함/불포함</H2>
            <P>
              포함·불포함 내역은 견적서 또는 일정표에 명시된 바에 따릅니다. 포함으로 표기되지 않은
              항목(개인 경비, 선택 관광, 팁, 현지 규정상 필요한 비용 등)은 불포함이며 별도 부담합니다.
            </P>

            <H2>4. 결제</H2>
            <UL>
              <li>결제는 PayPal(PayPal 잔액 또는 신용/체크카드)로 안전하게 처리되며, 머스트고는 카드 정보를 저장하지 않습니다.</li>
              <li>예약은 결제 확인 및 담당 컨설턴트의 서면 확정 이후에만 성립합니다.</li>
            </UL>

            <H2>5. 고객 취소 및 환불</H2>
            <P>
              취소는 wemustgo@mustgokorea.com 또는 담당 컨설턴트에게 요청하며, 효력은 서면 요청
              도달일(KST) 기준입니다. 견적에 별도 명시가 없으면 총 서비스 금액 기준으로 다음
              취소수수료를 적용합니다(공정위 소비자분쟁해결기준(국외여행) 정합):
            </P>
            <ScheduleTable head={['서비스 개시일 전 통보 시점', '취소수수료']} rows={KO_SCHEDULE} />
            <UL>
              <li>또한 고객을 위해 이미 지출된 회수 불가 제3자 비용(항공권, 호텔·행사장 예치금, 허가·입장권, 가이드·차량 예약 등)은 위 표와 무관하게 회수 불가 범위에서 환불되지 않습니다.</li>
              <li>PayPal 결제 수수료는 환불되지 않을 수 있습니다.</li>
              <li>승인된 환불은 원 결제수단으로 PayPal을 통해 승인일로부터 통상 영업일 5~10일 내 처리되며, 반영 시점은 다를 수 있습니다.</li>
            </UL>

            <H2>6. 머스트고의 취소·변경</H2>
            <UL>
              <li><strong>머스트고 귀책:</strong> 당사 귀책으로 확정 서비스를 취소·중대 변경하는 경우, 기지급액 전액 환급 및 위 표의 해당 시점 요율에 상응하는 배상금을 지급합니다.</li>
              <li><strong>최저 행사인원:</strong> 단체 상품에서 최저인원 미달 시 견적서에 명시된 기한까지 통보하고 기지급액을 환급합니다.</li>
              <li><strong>불가항력:</strong> 천재지변·전쟁·테러·감염병·정부명령·공급사 사정 등 양 당사자의 통제를 벗어난 사유로 서비스가 불가한 경우 어느 쪽도 위약금을 부담하지 않으며, 이미 지출된 비용을 제외한 회수 가능액을 환급합니다. 머스트고는 간접·부수적 손해에 대해 책임지지 않습니다.</li>
            </UL>

            <H2>7. 여행 시작 후 해지</H2>
            <P>
              서비스 개시 후 양 당사자의 통제를 벗어난 사유로 해지되는 경우, 환불은 미사용분에
              한하며 이미 지출·확정된 비용은 공제합니다.
            </P>

            <H2>8. 여권·비자·보험·안전</H2>
            <UL>
              <li>유효한 여권·비자 및 입국 요건 구비는 고객 책임입니다. 당사는 안내를 제공하나, 서류 미비·무효로 인한 입국 거부에 대해서는 책임지지 않습니다.</li>
              <li>여행자 보험 가입을 권장합니다. 당사가 수배하는 보험이 있는 경우 견적서에 명시합니다.</li>
              <li>일정과 관련된 안전정보를 관련 규정에 따라 제공합니다.</li>
            </UL>

            <H2>9. 손해배상 청구</H2>
            <P>
              손해가 발생했다고 판단되는 경우 증빙 서류와 함께 통지해 주십시오. 당사는 합리적 기간 내
              검토·회신합니다.
            </P>

            <H2>10. 기업·맞춤 예약</H2>
            <P>
              기업(B2B) 및 맞춤 수배의 경우, 개별 견적서 또는 계약서에 정한 조건(공급사 기반 취소
              조건 포함)이 본 정책과 다를 때 그 조건이 우선합니다.
            </P>

            <H2>11. 지급거절(차지백) 전 문의</H2>
            <P>
              문제가 있으면 먼저 연락 주십시오 — 신속히 해결하겠습니다. 사전 연락 없는 카드/PayPal
              분쟁 제기는 처리를 지연시킬 수 있습니다.
            </P>

            <H2>12. 준거법 및 해석</H2>
            <P>
              본 정책은 대한민국 법을 준거법으로 합니다. 소비자 계약의 경우 관련 소비자보호 법령 및
              소비자분쟁해결기준이 적용되며, 소비자에게 더 유리한 경우 그 기준이 우선합니다. 약관의
              해석이 모호한 경우 여행자(소비자)에게 유리하게 해석합니다.
            </P>

            <H2>13. 문의</H2>
            <P>(주)머스트고 — wemustgo@mustgokorea.com — 1551-5992</P>
            <P className="text-xs text-gray-400 mt-6">
              본 문서는 초안이며 법률 자문이 아닙니다. 통신판매업 신고번호 및 세부 조건은 확정 후
              반영 예정입니다.
            </P>
          </article>
        </div>
      </main>

      <footer className="bg-ink-900 py-8">
        <div className="max-w-layout mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs text-gray-500 font-eng">© 2026 Mustgo Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
