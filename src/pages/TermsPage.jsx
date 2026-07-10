import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../design/cn'

// =============================================================================
// 이용약관 (표준 정합 초안)
// 머스트고 실제 사업에 맞춤: 기업 출장(아웃바운드) 수배 + 해외 VIP 인바운드 투어,
// B2B/B2C, 사이트 문의·견적·결제(/pay). 회원가입/계정이 없는 사이트이므로 회원·
// 아이디·탈퇴 등 해당 없는 조항은 넣지 않음. 결제·환불은 /policy, 개인정보는
// /privacy 를 참조.
//
// TODO(사장님/법률 검토 후 확정):
//   - 시행일(현재 2026-07-11 안)
//   - 준거법·관할, 면책·책임 한계, 지식재산권 최종 문구
// 본 문서는 표준 기반 초안이며 법률 자문이 아님 — 최종 시행 전 전문가 검토 권장.
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

const linkCls = 'underline hover:text-brand-blue'

export default function TermsPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = '이용약관 · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  // Land on the section matching the URL hash (e.g. /terms#en linked from English
  // pages), since client-side navigation doesn't scroll to the hash on its own.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView())
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">이용약관</h1>
          <p className="text-sm text-gray-400 mt-3">
            시행일: 2026년 7월 11일 · (주)머스트고 (Mustgo Co., Ltd.) · 사업자등록번호 618-81-35992
          </p>
          <nav className="mt-4 text-sm text-brand-blue flex gap-4">
            <a href="#ko" className="hover:underline">한국어</a>
            <a href="#en" className="hover:underline font-eng">English</a>
          </nav>

          {/* ---------------- 한국어 ---------------- */}
          <article id="ko" className="mt-10 scroll-mt-24">
            <H2>제1조 (목적)</H2>
            <P>
              본 약관은 (주)머스트고("회사")가 웹사이트 mustgokorea.co.kr 및 관련 페이지("사이트")를
              통해 제공하는 여행·출장 관련 서비스의 이용조건 및 절차, 회사와 이용자의 권리·의무 및
              책임사항을 규정함을 목적으로 합니다.
            </P>

            <H2>제2조 (정의)</H2>
            <UL>
              <li><strong>서비스:</strong> 회사가 제공하는 기업 출장(아웃바운드) 수배, 해외 VIP의 한국 방문(인바운드) 투어, 이와 관련한 상담·견적·예약·수배·결제 등 일체의 서비스.</li>
              <li><strong>이용자:</strong> 사이트에 접속하여 문의·상담·결제 등 회사의 서비스를 이용하는 개인 또는 법인(기업 고객 포함).</li>
              <li><strong>견적:</strong> 이용자의 요청에 따라 회사가 제시하는 서비스 내용·일정·가격 등의 제안.</li>
            </UL>

            <H2>제3조 (약관의 효력 및 변경)</H2>
            <UL>
              <li>본 약관은 사이트에 게시함으로써 효력이 발생합니다.</li>
              <li>회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 적용일자와 개정사유를 명시하여 사이트에 공지합니다.</li>
              <li>본 약관에 정하지 않은 사항은 관계 법령 및 회사가 별도로 정한 정책·개별 견적/계약에 따릅니다.</li>
            </UL>

            <H2>제4조 (서비스의 내용)</H2>
            <P>회사는 다음의 서비스를 제공합니다. 세부 내용·포함/불포함 사항은 개별 견적서 또는 일정표에 따릅니다.</P>
            <UL>
              <li>국내 기업의 해외 출장(아웃바운드) 수배 및 관리</li>
              <li>해외 VIP·단체의 한국 방문(인바운드) 투어 기획·수배</li>
              <li>상담·견적 제공, 예약·수배, 결제 및 관련 부대 서비스</li>
            </UL>

            <H2>제5조 (상담·견적 및 계약의 성립)</H2>
            <UL>
              <li>이용자는 사이트의 문의 폼 또는 회사가 안내하는 방법으로 상담·견적을 요청할 수 있습니다.</li>
              <li>회사는 요청 내용을 검토하여 견적을 제시하며, 견적의 유효기간·조건은 견적서에 따릅니다.</li>
              <li><strong>계약은 이용자의 결제 확인 및 담당 컨설턴트의 서면(이메일 등) 확정 이후에 성립</strong>합니다.</li>
              <li>기업(B2B)·맞춤 수배의 경우 개별 견적서 또는 계약서에 정한 조건이 본 약관과 다를 때 그 조건이 우선합니다.</li>
            </UL>

            <H2>제6조 (요금 및 결제)</H2>
            <UL>
              <li>서비스 요금은 건별 견적에 따르며, 결제 금액은 담당 컨설턴트가 안내한 견적 금액입니다.</li>
              <li>결제는 PayPal 등 회사가 제공하는 수단으로 이루어지며, 통화는 미국 달러(USD) 또는 유로(EUR)입니다.</li>
              <li>결제·통화·수수료 등 세부 사항은 <Link to="/policy" className={linkCls}>결제·환불 정책</Link>을 따릅니다.</li>
            </UL>

            <H2>제7조 (취소 및 환불)</H2>
            <P>
              이용자의 취소 및 환불, 회사의 취소·변경, 불가항력 등에 관한 사항은{' '}
              <Link to="/policy" className={linkCls}>결제·환불 정책</Link>에 따릅니다. 소비자에게 더
              유리한 관계 법령 및 소비자분쟁해결기준이 있는 경우 그 기준이 우선합니다.
            </P>

            <H2>제8조 (회사의 의무)</H2>
            <UL>
              <li>회사는 관련 법령과 본 약관을 준수하며, 안정적·계속적으로 서비스를 제공하기 위해 노력합니다.</li>
              <li>회사는 이용자의 개인정보를 <Link to="/privacy" className={linkCls}>개인정보처리방침</Link>에 따라 보호합니다.</li>
              <li>회사는 이용자의 정당한 의견·불만을 신속·성실하게 처리하기 위해 노력합니다.</li>
            </UL>

            <H2>제9조 (이용자의 의무)</H2>
            <UL>
              <li>이용자는 상담·예약·결제 시 정확한 정보를 제공하여야 하며, 허위 정보로 인한 불이익은 이용자가 부담합니다.</li>
              <li>이용자는 유효한 여권·비자 및 방문·출입국에 필요한 요건을 스스로 구비하여야 합니다.</li>
              <li>이용자는 관계 법령, 본 약관, 공서양속에 반하는 행위 및 타인의 정보 도용·권리 침해를 하여서는 안 됩니다.</li>
            </UL>

            <H2>제10조 (개인정보보호)</H2>
            <P>
              회사는 서비스 제공에 필요한 범위에서 개인정보를 수집·이용하며, 그 처리에 관한 사항은{' '}
              <Link to="/privacy" className={linkCls}>개인정보처리방침</Link>에서 정합니다.
            </P>

            <H2>제11조 (면책 및 책임의 제한)</H2>
            <UL>
              <li>천재지변, 전쟁·테러, 감염병, 정부 명령 등 회사의 통제를 벗어난 불가항력으로 서비스를 제공할 수 없는 경우 회사는 책임을 지지 않습니다.</li>
              <li>항공·숙박·현지 지상 서비스 등 제3의 공급자 사정 또는 이용자의 귀책으로 발생한 손해에 대하여, 회사는 회사의 고의·과실이 없는 한 책임을 지지 않습니다.</li>
              <li>회사는 관계 법령이 허용하는 범위에서 간접적·부수적·특별 손해에 대하여 책임을 지지 않습니다.</li>
            </UL>

            <H2>제12조 (지식재산권)</H2>
            <P>
              사이트에 게시된 콘텐츠(디자인, 문구, 로고, 이미지 등)에 대한 저작권 및 기타 지식재산권은
              회사 또는 정당한 권리자에게 귀속되며, 이용자는 회사의 사전 동의 없이 이를 복제·배포·상업적
              이용할 수 없습니다.
            </P>

            <H2>제13조 (준거법 및 관할)</H2>
            <P>
              본 약관 및 서비스 이용에는 대한민국 법을 준거법으로 하며, 회사와 이용자 간 분쟁에 관한
              소송은 관계 법령이 정하는 관할법원을 제1심 관할로 합니다. 소비자 계약의 경우 소비자보호
              관련 법령이 정하는 바에 따릅니다.
            </P>

            <H2>제14조 (분쟁의 해결)</H2>
            <P>
              회사와 이용자는 서비스와 관련하여 분쟁이 발생한 경우 상호 신의에 따라 원만히 해결하도록
              노력합니다. 원만히 해결되지 않는 소비자 분쟁은 소비자분쟁해결기준 및 관계 법령에 따르며,
              기업(B2B) 거래는 개별 계약이 정하는 바를 우선합니다.
            </P>

            <H2>부칙</H2>
            <P>본 약관은 2026년 7월 11일부터 시행합니다.</P>
            <P className="text-xs text-gray-400 mt-6">
              본 문서는 표준 기반 초안이며 법률 자문이 아닙니다. 시행일 및 세부 문구는 최종 확정 후 반영
              예정입니다.
            </P>
          </article>

          <hr className="my-14 border-gray-200" />

          {/* ---------------- English ---------------- */}
          <article id="en" className="font-eng scroll-mt-24">
            <H2>Article 1 (Purpose)</H2>
            <P>
              These Terms govern the conditions and procedures for using the travel and business-trip
              services that Mustgo Co., Ltd. ("the Company") provides through the website
              mustgokorea.co.kr and related pages (the "Site"), and set out the rights, obligations,
              and responsibilities of the Company and users.
            </P>

            <H2>Article 2 (Definitions)</H2>
            <UL>
              <li><strong>Services:</strong> arranging outbound corporate business trips, planning and arranging inbound tours for overseas VIPs/groups visiting Korea, and all related consultation, quotation, booking, arrangement, and payment.</li>
              <li><strong>User:</strong> an individual or entity (including corporate clients) that accesses the Site and uses the Company's services such as inquiries, consultation, or payment.</li>
              <li><strong>Quote:</strong> the Company's proposal of service details, itinerary, and price in response to a user's request.</li>
            </UL>

            <H2>Article 3 (Effect &amp; amendment)</H2>
            <UL>
              <li>These Terms take effect when posted on the Site.</li>
              <li>The Company may amend these Terms within the bounds of applicable law, announcing the effective date and reason on the Site.</li>
              <li>Matters not stated here follow applicable law and the Company's separate policies or the individual quote/contract.</li>
            </UL>

            <H2>Article 4 (Services)</H2>
            <P>The Company provides the following; details and inclusions/exclusions follow each quote or itinerary.</P>
            <UL>
              <li>Arranging and managing outbound business trips for Korean companies</li>
              <li>Planning and arranging inbound tours for overseas VIPs/groups visiting Korea</li>
              <li>Consultation and quotes, booking and arrangement, payment, and related services</li>
            </UL>

            <H2>Article 5 (Consultation, quotes &amp; formation of contract)</H2>
            <UL>
              <li>Users may request consultation/quotes via the Site's inquiry form or a method the Company provides.</li>
              <li>The Company reviews the request and provides a quote; its validity and conditions follow the quote.</li>
              <li><strong>A contract is formed only after payment is confirmed and your consultant confirms it in writing (e.g., email).</strong></li>
              <li>For corporate (B2B) and custom arrangements, the terms of the individual quote or contract prevail where they differ from these Terms.</li>
            </UL>

            <H2>Article 6 (Fees &amp; payment)</H2>
            <UL>
              <li>Fees follow each quote; the amount payable is the quoted amount from your consultant.</li>
              <li>Payment is made via PayPal or other means the Company provides, in US Dollars (USD) or Euros (EUR).</li>
              <li>Details of payment, currency, and fees follow the <Link to="/policy" className={linkCls}>Payment &amp; Refund Policy</Link>.</li>
            </UL>

            <H2>Article 7 (Cancellation &amp; refunds)</H2>
            <P>
              Cancellation and refunds by the user, cancellation or changes by the Company, and force
              majeure follow the <Link to="/policy" className={linkCls}>Payment &amp; Refund Policy</Link>.
              Where consumer-protection laws or dispute-resolution standards more favorable to the
              consumer apply, those prevail.
            </P>

            <H2>Article 8 (Company's obligations)</H2>
            <UL>
              <li>The Company complies with applicable law and these Terms and strives to provide services stably and continuously.</li>
              <li>The Company protects users' personal information per the <Link to="/privacy#en" className={linkCls}>Privacy Policy</Link>.</li>
              <li>The Company strives to handle legitimate feedback and complaints promptly and in good faith.</li>
            </UL>

            <H2>Article 9 (User's obligations)</H2>
            <UL>
              <li>Users must provide accurate information for consultation, booking, and payment; disadvantages arising from false information are borne by the user.</li>
              <li>Users are responsible for holding a valid passport, visa, and any entry/travel requirements.</li>
              <li>Users must not act against applicable law, these Terms, or public order, nor misappropriate others' information or infringe others' rights.</li>
            </UL>

            <H2>Article 10 (Privacy)</H2>
            <P>
              The Company collects and uses personal information to the extent necessary to provide the
              services; its processing is set out in the <Link to="/privacy#en" className={linkCls}>Privacy Policy</Link>.
            </P>

            <H2>Article 11 (Disclaimers &amp; limitation of liability)</H2>
            <UL>
              <li>The Company is not liable where it cannot provide services due to force majeure beyond its control (natural disaster, war/terrorism, epidemic, government order, etc.).</li>
              <li>For loss arising from third-party suppliers (airlines, accommodation, ground services) or the user's fault, the Company is not liable absent its own intent or negligence.</li>
              <li>To the extent permitted by law, the Company is not liable for indirect, incidental, or special damages.</li>
            </UL>

            <H2>Article 12 (Intellectual property)</H2>
            <P>
              Copyright and other IP in the Site's content (design, text, logos, images, etc.) belong
              to the Company or the rightful owner. Users may not copy, distribute, or commercially use
              it without the Company's prior consent.
            </P>

            <H2>Article 13 (Governing law &amp; jurisdiction)</H2>
            <P>
              These Terms and use of the services are governed by the laws of the Republic of Korea.
              Lawsuits between the Company and a user are subject to the competent court under
              applicable law as the court of first instance. For consumer contracts, consumer-protection
              laws apply.
            </P>

            <H2>Article 14 (Dispute resolution)</H2>
            <P>
              The Company and the user strive to resolve any dispute amicably in good faith. Consumer
              disputes not resolved amicably follow the Consumer Dispute Resolution Standards and
              applicable law; corporate (B2B) transactions are governed first by the individual contract.
            </P>

            <H2>Addendum</H2>
            <P>These Terms take effect on July 11, 2026.</P>
            <P className="text-xs text-gray-400 mt-6">
              This is a standards-based draft and not legal advice. The effective date and detailed
              wording are subject to final confirmation.
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
