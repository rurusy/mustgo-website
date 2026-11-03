import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrandText } from '../components/ui'
import { cn } from '../design/cn'

// =============================================================================
// 개인정보처리방침 (표준 정합 초안)
// 개인정보보호법 제30조 및 표준 개인정보 처리방침(KISA/PIPC)에 맞춘 초안.
// 실제 수집·처리 현황을 코드 기준으로 반영:
//   - 문의(inquiries): 회사·성명·직책·연락처·이메일·문의내용
//   - 결제(payments/payments_kr): 결제자 이름·이메일·금액·통화·결제수단·거래정보
//                                  (원화는 토스페이먼츠, USD/EUR는 PayPal)
//   - 저장: Supabase(AWS 서울 리전, 국내) / 위탁: 토스페이먼츠(국내), Resend, PayPal
//   - 국외이전: PayPal·Resend·Vercel·Cloudflare·Google (토스페이먼츠는 국내라 제외)
//
// TODO(사장님/법률 검토 후 확정):
//   - 시행일(현재 2026-07-11 안)
//   - 개인정보 보호책임자 성명/직책 (현재 대표 이종화)
//   - 문의 데이터 보유기간(현재 최대 3년 안) — 결제는 전자상거래법 법정기간 적용
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

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[13px] border border-gray-200 min-w-[640px]">
        <thead>
          <tr className="bg-gray-50 text-left align-top">
            {head.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-600 border-b border-gray-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// 처리위탁 (수탁자)
const KO_PROCESSORS = [
  ['Supabase Inc.', '문의·결제 데이터의 저장 및 서버 인프라 운영', '저장 위치: 대한민국(AWS 서울 리전) · 운영사 소재: 미국'],
  ['토스페이먼츠 주식회사', '국내 원화 결제 처리 및 결제수단 관리', '대한민국'],
  ['PayPal (PayPal Holdings, Inc.)', '해외 통화(USD/EUR) 결제 처리 및 결제수단 관리', '미국 등'],
  ['Resend (Resend, Inc.)', '문의·결제 접수 시 관리자 알림 이메일 발송', '미국'],
]
const EN_PROCESSORS = [
  ['Supabase Inc.', 'Storage of inquiry/payment data and server infrastructure', 'Data stored in Korea (AWS Seoul) · operator based in the US'],
  ['Toss Payments Inc.', 'Domestic (KRW) payment processing and payment-method handling', 'Republic of Korea'],
  ['PayPal (PayPal Holdings, Inc.)', 'International (USD/EUR) payment processing and payment-method handling', 'United States, etc.'],
  ['Resend (Resend, Inc.)', 'Sending admin notification emails for inquiries/payments', 'United States'],
]

// 국외이전 (Supabase 저장은 국내라 제외)
const KO_TRANSFER = [
  ['PayPal Holdings, Inc.', '미국', '결제자 이름·이메일, 결제 금액·통화, 거래 식별정보', '결제 처리 및 정산 (온라인 결제 이용 시에만)', '결제 시 통신망을 통해 전송', '관련 법령 및 PayPal 정책에 따른 기간'],
  ['Resend, Inc.', '미국', '알림에 포함된 이름·연락처·이메일·문의내용', '관리자 알림 이메일 발송', '문의·결제 접수 시 전송', '발송 처리 후 서비스 정책에 따라 최소 보관'],
  ['Vercel, Inc.', '미국', '접속 IP, 브라우저·기기 정보 등', '웹사이트 호스팅 및 콘텐츠 전송', '사이트 접속 시 전송', '서비스 정책에 따른 기간'],
  ['Cloudflare, Inc.', '미국', '접속 IP, 브라우저·기기 정보 등', 'CDN·보안·트래픽 처리', '사이트 접속 시 전송', '서비스 정책에 따른 기간'],
  ['Google LLC', '미국', '접속 IP, 브라우저·기기 정보 등', '지도(Google Maps)·글꼴(Google Fonts) 제공', '해당 요소 로드 시 전송', '서비스 정책에 따른 기간'],
]
const EN_TRANSFER = [
  ['PayPal Holdings, Inc.', 'USA', 'Payer name/email, amount, currency, transaction identifiers', 'Payment processing and settlement (only when you pay online)', 'Transmitted over the network at payment', 'Per applicable law and PayPal policy'],
  ['Resend, Inc.', 'USA', 'Name, phone, email, message contained in notifications', 'Sending admin notification emails', 'Transmitted when an inquiry/payment is received', 'Minimally retained per service policy'],
  ['Vercel, Inc.', 'USA', 'Access IP, browser/device information, etc.', 'Website hosting and content delivery', 'Transmitted when the site is accessed', 'Per service policy'],
  ['Cloudflare, Inc.', 'USA', 'Access IP, browser/device information, etc.', 'CDN, security, and traffic handling', 'Transmitted when the site is accessed', 'Per service policy'],
  ['Google LLC', 'USA', 'Access IP, browser/device information, etc.', 'Maps (Google Maps) and fonts (Google Fonts)', 'Transmitted when those elements load', 'Per service policy'],
]

export default function PrivacyPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = '개인정보처리방침 · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  // Land on the section matching the URL hash (e.g. /privacy#en linked from English
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            개인정보처리방침
          </h1>
          <p className="text-sm text-gray-400 mt-3">
            시행일: 2026년 7월 11일 · (주)머스트고 (Mustgo Co., Ltd.) · 사업자등록번호 618-81-35992 ·
            통신판매업 신고번호 2026-대구수성구-0781
          </p>
          <nav className="mt-4 text-sm text-brand-blue flex gap-4">
            <a href="#ko" className="hover:underline">한국어</a>
            <a href="#en" className="hover:underline font-eng">English</a>
          </nav>

          {/* ---------------- 한국어 ---------------- */}
          <article id="ko" className="mt-10 scroll-mt-24">
            <P>
              (주)머스트고("회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 정보주체의
              개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다. 본 방침은
              회사가 운영하는 웹사이트(mustgokorea.co.kr 및 관련 페이지, 이하 "사이트")에 적용됩니다.
            </P>

            <H2>1. 수집하는 개인정보 항목 및 수집 방법</H2>
            <P>회사는 서비스 제공에 필요한 최소한의 개인정보를 다음과 같이 수집합니다.</P>
            <UL>
              <li><strong>문의하기(상담 신청):</strong> 회사명, 담당자 성명, 직책(선택), 연락처, 이메일, 문의 내용, 수집·이용 동의 여부</li>
              <li><strong>온라인 결제:</strong> 결제자 이름, 결제자 이메일, 결제 금액·통화, 결제수단(카드/간편결제/계좌이체/가상계좌 구분), 결제 식별정보(토스페이먼츠 주문·결제번호 또는 PayPal 주문·거래번호), 고객이 입력한 견적번호/메모</li>
              <li><strong>자동 수집:</strong> 서비스 이용 과정에서 접속 IP, 브라우저·기기 정보, 접속 일시 등이 생성·수집될 수 있습니다.</li>
            </UL>
            <P>
              수집 방법: 사이트의 문의 폼 및 결제 화면을 통한 이용자의 직접 입력, 서비스 이용 중
              자동 생성. <strong>신용카드 번호 등 결제수단 정보는 결제대행사(토스페이먼츠·PayPal)가
              처리하며 회사는 저장하지 않습니다.</strong>
            </P>

            <H2>2. 개인정보의 수집·이용 목적</H2>
            <UL>
              <li>문의·상담 접수 및 응대, 견적 안내 등 서비스 상담</li>
              <li>여행·출장 관련 서비스 계약의 체결·이행 및 결제·정산</li>
              <li>거래 확인, 고객 문의 대응, 분쟁 처리 및 기록 보존</li>
              <li>서비스 운영·보안, 부정 이용 방지</li>
            </UL>

            <H2>3. 개인정보의 보유·이용 기간</H2>
            <P>
              회사는 원칙적으로 개인정보의 수집·이용 목적이 달성되면 지체 없이 파기합니다. 다만 다음
              각 호의 경우 해당 기간 동안 보관합니다.
            </P>
            <UL>
              <li><strong>문의·상담 기록:</strong> 상담 처리 목적 달성 후, 재문의 응대 및 분쟁 대비를 위해 최대 3년 보관 후 파기 <span className="text-gray-400">(확정 예정)</span></li>
              <li><strong>결제 관련 기록(전자상거래법):</strong> 계약 또는 청약철회 등에 관한 기록 5년 · 대금결제 및 재화 등의 공급에 관한 기록 5년 · 소비자의 불만 또는 분쟁처리에 관한 기록 3년</li>
              <li>기타 관련 법령에서 정한 기간이 있는 경우 그 기간</li>
            </UL>

            <H2>4. 개인정보 처리의 위탁</H2>
            <P>회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</P>
            <Table head={['수탁자', '위탁 업무', '이전 국가/위치']} rows={KO_PROCESSORS} />
            <P>
              회사는 위탁계약 시 개인정보가 안전하게 관리되도록 필요한 사항을 규정하며, 수탁자가
              변경될 경우 본 방침을 통해 공개합니다.
            </P>

            <H2>5. 개인정보의 국외 이전</H2>
            <P>
              <strong>고객님의 문의·결제 정보는 국내(대한민국, AWS 서울 리전)에 저장됩니다.</strong>{' '}
              다만 웹사이트 운영, 관리자 알림 이메일 발송, 그리고 (결제 이용 시) 결제 처리를 위해 아래
              해외 서비스로 일부 정보가 이전됩니다. <strong>PayPal 결제는 온라인 결제를 진행하는 경우에만
              해당</strong>하며, 단순 문의 시에는 적용되지 않습니다.
            </P>
            <Table
              head={['이전받는 자', '국가', '이전 항목', '이전 목적', '이전 시기·방법', '보유·이용기간']}
              rows={KO_TRANSFER}
            />
            <P>
              정보주체는 개인정보의 국외 이전을 거부할 수 있으며, 이 경우 결제 등 관련 서비스 이용이
              제한될 수 있습니다. 국외 이전은 계약의 이행 및 본 방침의 공개를 근거로 이루어집니다.
            </P>

            <H2>6. 개인정보의 제3자 제공</H2>
            <P>
              회사는 이용자의 개인정보를 본 방침에 명시한 목적 범위를 넘어 제3자에게 제공하지
              않습니다. 다만 이용자가 사전에 동의한 경우, 또는 법령에 따라 요구되는 경우에는 예외로
              합니다.
            </P>

            <H2>7. 정보주체의 권리·의무 및 행사 방법</H2>
            <UL>
              <li>정보주체는 언제든지 개인정보의 열람·정정·삭제·처리정지를 요구할 수 있습니다.</li>
              <li>권리 행사는 아래 문의처(개인정보 보호책임자)를 통해 서면·이메일 등으로 하실 수 있으며, 회사는 지체 없이 조치합니다.</li>
              <li>정보주체가 개인정보의 오류에 대한 정정을 요청한 경우, 정정 완료 전까지 해당 개인정보를 이용·제공하지 않습니다.</li>
            </UL>

            <H2>8. 개인정보의 파기 절차 및 방법</H2>
            <UL>
              <li>보유기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다.</li>
              <li>전자적 파일은 복구·재생이 불가능한 방법으로 삭제하며, 출력물 등은 분쇄 또는 소각합니다.</li>
            </UL>

            <H2>9. 개인정보의 안전성 확보 조치</H2>
            <UL>
              <li>전송 구간 암호화(HTTPS/TLS)를 통한 데이터 전송 보호</li>
              <li>접근권한 통제 — 문의·결제 데이터는 인증된 관리자만 조회 가능하도록 데이터베이스 접근을 제한(RLS)</li>
              <li>결제수단(카드) 정보 미저장 — 결제는 토스페이먼츠·PayPal이 처리</li>
              <li>개인정보 처리 최소화 및 접근 기록 관리</li>
            </UL>

            <H2>10. 쿠키 등 자동수집 장치</H2>
            <P>
              회사는 이용자의 행태정보를 수집하는 자체 광고·분석 쿠키를 사용하지 않습니다. 다만
              결제(토스페이먼츠·PayPal), 지도(Google Maps), 글꼴(Google Fonts) 등 제3자 서비스가 해당 기능
              제공을 위해 쿠키를 설정할 수 있으며, 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할
              수 있습니다(일부 기능 이용이 제한될 수 있음).
            </P>

            <H2>11. 개인정보 보호책임자 및 문의처</H2>
            <UL>
              <li>개인정보 보호책임자: 이종화 (대표) <span className="text-gray-400">(확정 예정)</span></li>
              <li>이메일: wemustgo@mustgokorea.com</li>
              <li>전화: 1551-5992</li>
            </UL>

            <H2>12. 권익침해 구제 방법</H2>
            <P>개인정보 침해에 대한 신고·상담이 필요한 경우 아래 기관에 문의하실 수 있습니다.</P>
            <UL>
              <li>개인정보 분쟁조정위원회 (privacy.go.kr / 1833-6972)</li>
              <li>개인정보침해 신고센터, 한국인터넷진흥원(KISA) (privacy.kisa.or.kr / 118)</li>
              <li>대검찰청 사이버수사과 (spo.go.kr / 1301)</li>
              <li>경찰청 사이버수사국 (ecrm.police.go.kr / 182)</li>
            </UL>

            <H2>13. 시행 및 변경</H2>
            <P>
              본 개인정보처리방침은 2026년 7월 11일부터 적용됩니다. 법령·서비스 변경에 따라 내용이
              수정될 경우 사이트를 통해 변경 사항을 공지합니다.
            </P>
            <P className="text-xs text-gray-400 mt-6">
              본 문서는 표준 기반 초안이며 법률 자문이 아닙니다. 시행일·보유기간·보호책임자 등 세부
              사항은 최종 확정 후 반영 예정입니다.
            </P>
          </article>

          <hr className="my-14 border-gray-200" />

          {/* ---------------- English ---------------- */}
          <article id="en" className="font-eng scroll-mt-24">
            <P>
              Mustgo Co., Ltd. ("we", "the Company") complies with the Republic of Korea's Personal
              Information Protection Act (PIPA) and related laws, and establishes this Privacy Policy
              to protect the personal information of data subjects. This policy applies to the website
              we operate (mustgokorea.co.kr and related pages, the "Site").
            </P>

            <H2>1. Personal information we collect &amp; how</H2>
            <P>We collect the minimum personal information needed to provide our services:</P>
            <UL>
              <li><strong>Inquiry form:</strong> company name, contact person's name, title (optional), phone, email, message, and consent status.</li>
              <li><strong>Online payment:</strong> payer name, payer email, amount and currency, payment method type (card / easy-pay / bank transfer / virtual account), payment identifiers (Toss Payments order/payment ID or PayPal order/transaction ID), and any quote number/memo you enter.</li>
              <li><strong>Automatically collected:</strong> access IP, browser/device information, and access time may be generated while using the Site.</li>
            </UL>
            <P>
              How: direct entry via the Site's inquiry form and payment screen, and automatic
              generation during use. <strong>Card and other payment-method details are handled by the
              payment processors (Toss Payments and PayPal); we do not store them.</strong>
            </P>

            <H2>2. Purposes of collection &amp; use</H2>
            <UL>
              <li>Receiving and responding to inquiries, providing quotes and consultation.</li>
              <li>Forming and performing travel/business-trip service contracts, and processing payment/settlement.</li>
              <li>Transaction verification, customer support, dispute handling, and record keeping.</li>
              <li>Service operation and security, and prevention of misuse.</li>
            </UL>

            <H2>3. Retention &amp; use period</H2>
            <P>
              In principle, we destroy personal information without delay once its purpose is achieved.
              However, we retain it as follows:
            </P>
            <UL>
              <li><strong>Inquiry records:</strong> up to 3 years after the consultation purpose is achieved, for follow-up and dispute readiness, then destroyed <span className="text-gray-400">(to be confirmed)</span>.</li>
              <li><strong>Payment records (E-Commerce Act):</strong> records on contracts/withdrawal 5 years · records on payment and supply of goods 5 years · records on consumer complaints or disputes 3 years.</li>
              <li>Other periods required by applicable law.</li>
            </UL>

            <H2>4. Outsourcing of processing</H2>
            <P>To provide our services, we entrust processing of personal information as follows:</P>
            <Table head={['Processor', 'Entrusted work', 'Country / location']} rows={EN_PROCESSORS} />
            <P>
              We include necessary safeguards in outsourcing agreements, and disclose any change of
              processor through this policy.
            </P>

            <H2>5. Overseas transfer</H2>
            <P>
              <strong>Your inquiry and payment data is stored in Korea (AWS Seoul region).</strong>{' '}
              Some information is transferred to the overseas services below only to operate the
              website, send admin notification emails, and (if you pay) process payment.{' '}
              <strong>PayPal applies only when you make an online payment</strong>, not for simple
              inquiries.
            </P>
            <Table
              head={['Recipient', 'Country', 'Items', 'Purpose', 'When/how', 'Retention']}
              rows={EN_TRANSFER}
            />
            <P>
              You may refuse the overseas transfer, in which case related services (e.g., payment) may
              be limited. Transfers are based on performance of the contract and disclosure via this
              policy.
            </P>

            <H2>6. Provision to third parties</H2>
            <P>
              We do not provide your personal information to third parties beyond the purposes stated
              here, except with your prior consent or where required by law.
            </P>

            <H2>7. Your rights &amp; how to exercise them</H2>
            <UL>
              <li>You may request access, correction, deletion, or suspension of processing of your personal information at any time.</li>
              <li>Requests can be made via the contact below (Privacy Officer) in writing or by email; we act without undue delay.</li>
              <li>If you request correction of an error, we do not use or provide that information until correction is complete.</li>
            </UL>

            <H2>8. Destruction procedure &amp; method</H2>
            <UL>
              <li>Personal information whose retention period has passed or purpose is achieved is destroyed without delay.</li>
              <li>Electronic files are deleted irrecoverably; printouts are shredded or incinerated.</li>
            </UL>

            <H2>9. Security measures</H2>
            <UL>
              <li>Encryption in transit (HTTPS/TLS).</li>
              <li>Access control — inquiry/payment data is restricted so only an authenticated administrator can read it (row-level security).</li>
              <li>No storage of card details — payment is handled by Toss Payments and PayPal.</li>
              <li>Data minimization and access logging.</li>
            </UL>

            <H2>10. Cookies &amp; automatic collection</H2>
            <P>
              We do not use our own advertising/analytics cookies to collect behavioral data. However,
              third-party services — payment (Toss Payments, PayPal), maps (Google Maps), fonts (Google Fonts) — may
              set cookies to provide their features. You can refuse cookies via your browser settings
              (some features may be limited).
            </P>

            <H2>11. Privacy Officer &amp; contact</H2>
            <UL>
              <li>Privacy Officer: Jonghwa Lee (CEO) <span className="text-gray-400">(to be confirmed)</span></li>
              <li>Email: wemustgo@mustgokorea.com</li>
              <li>Phone: +82-1551-5992</li>
            </UL>

            <H2>12. Remedies</H2>
            <P>For reports or counseling on privacy infringement, you may contact:</P>
            <UL>
              <li>Personal Information Dispute Mediation Committee (privacy.go.kr / +82-1833-6972)</li>
              <li>Privacy Infringement Report Center, KISA (privacy.kisa.or.kr / +82-118)</li>
              <li>Supreme Prosecutors' Office Cybercrime (spo.go.kr / +82-1301)</li>
              <li>National Police Agency Cyber Bureau (ecrm.police.go.kr / +82-182)</li>
            </UL>

            <H2>13. Effective date &amp; changes</H2>
            <P>
              This Privacy Policy takes effect on July 11, 2026. If the content changes due to law or
              service updates, we will announce the changes through the Site.
            </P>
            <P className="text-xs text-gray-400 mt-6">
              This is a standards-based draft and not legal advice. Details such as the effective date,
              retention periods, and Privacy Officer are subject to final confirmation.
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
