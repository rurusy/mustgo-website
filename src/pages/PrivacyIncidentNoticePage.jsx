import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../design/cn'
import { useHtmlLang } from '../hooks/useHtmlLang'
import { BrandText } from '../components/ui'
import { NOTICE_PATH, NOTICE_POSTED } from '../components/layout/PrivacyIncidentBanner'

// =============================================================================
// 개인정보 유출 안내 (아마데우스 GDS 사고, 2026-11) — /notice/privacy-incident,
// /en/notice/privacy-incident
//
// 토파스여행정보가 KISA 신고 시 고객사(머스트고 포함)를 함께 신고했고, 개인정보
// 보호법 제34조에 따라 각 고객사도 홈페이지에 고지할 의무가 있다 — 기한
// 2026-11-04 14:00, 게시 기간 30일 이상. 국문은 토파스가 배포한 샘플
// "(샘플) xxx여행사 개인정보 유출 안내문.docx"를 그대로 따르고 XXX 자리만
// (주)머스트고로 바꿨다. 영문은 그 번역이다.
//
// 문의처는 샘플대로 아마데우스 전담 이메일만 둔다. 머스트고 연락처 추가를
// 검토했으나 사장님 지시로 뺐다(2026-11-02) — 다시 넣자는 의견이 나오면 확인 후.
//
// 게시 기간이 끝나도 이 페이지는 남겨 두고, 홈 배너와 푸터 링크만 내리면 된다.
// 토파스·아마데우스에서 추가 사항이 오면 두 언어를 함께 갱신.
// =============================================================================

const pCls = 'text-[15px] text-gray-700 leading-relaxed mb-4'
const aCls = 'font-eng underline hover:text-brand-blue'

const AMADEUS_MAIL = (
  <a href="mailto:security_incident@amadeus.com" className={aCls}>
    security_incident@amadeus.com
  </a>
)

const COPY = {
  ko: {
    title: '개인정보 유출 안내 · Mustgo',
    eyebrow: '공지사항',
    h1: '항공예약시스템(GDS) 개인정보 유출 안내',
    meta: `게시일: ${NOTICE_POSTED.ko} · (주)머스트고`,
    home: '← 홈으로',
    homePath: '/',
    switchLabel: 'English',
    intro: [
      '안녕하십니까. (주)머스트고입니다.',
      <>항상 <BrandText />를 이용해 주시는 고객 여러분께 감사드립니다.</>,
      '최근 글로벌 항공예약시스템(GDS) 운영사인 아마데우스(Amadeus IT Group, S.A.)의 시스템에서 일부 항공예약 관련 개인정보가 유출된 정황이 확인되어 고객 여러분께 관련 내용을 안내드립니다.',
      '아마데우스 측에서 확인 중인 내용에 따르면, 이번 사고는 아마데우스 시스템 계정의 로그인 인증정보를 이용한 비인가 접근으로 인해 발생한 것으로 파악되고 있습니다.',
      '사고 발생 시점은 2023년 8월부터 2026년 9월 사이로 추정되며, 정확한 발생 시점과 유출 범위 등에 대해서는 현재 조사가 진행 중입니다. 현재까지 알려진 유출 정보에는 일부 고객의 항공예약번호(PNR)가 포함되어 있으며, 그 외 추가적인 개인정보 유출 여부와 구체적인 피해 규모는 관계 기관 및 아마데우스 측에서 확인 중인 것으로 알려져 있습니다.',
      '(주)머스트고는 이번 사고와 관련하여 당사를 통해 항공권을 예약하신 고객님의 정보가 유출 대상에 포함되어 있는지 확인하고 있으며, 관련 사항이 확인되는 경우 필요한 조치를 신속히 진행하겠습니다.',
      '아울러 고객 여러분께서는 이번 사고를 악용한 스미싱, 피싱 등 2차 피해가 발생하지 않도록 다음 사항에 유의하여 주시기 바랍니다.',
    ],
    tips: [
      '출처가 불분명한 문자메시지 및 이메일에 포함된 인터넷 주소(URL) 클릭 주의',
      '의심스러운 첨부파일 다운로드 및 실행 자제',
      '항공예약 확인, 환불 및 일정 변경 등을 사칭한 개인정보·금융정보 입력 요구 주의',
      '의심스러운 연락을 받은 경우 공식 고객센터를 통해 사실 여부 확인',
    ],
    beforeContact:
      '본 사안과 관련하여 문의 사항이 있거나 피해가 발생한 경우, 아래의 전담 창구로 연락해 주시면 신속하게 구제 절차를 안내해 드리겠습니다.',
    contactTitle: '■ 문의 및 피해 접수',
    contacts: [
      <>개인정보 유출 피해접수: 아마데우스 전담 이메일 ({AMADEUS_MAIL})</>,
    ],
    outro: [
      '이번 사고로 인해 손해를 입으신 경우, 개인정보 보호법 제39조·제39조의2에 따른 손해배상청구 및 제43조에 따른 분쟁조정 신청의 권리를 행사하실 수 있습니다. (개인정보 분쟁조정위원회, 1833-6972)',
      '(주)머스트고는 고객님의 개인정보 보호를 최우선으로 생각하며, 관련 상황을 지속적으로 확인하고 필요한 보호조치 및 대응에 최선을 다하겠습니다.',
      '향후 추가적으로 확인되는 사항이 있을 경우 고객 여러분께 신속하고 투명하게 안내드리겠습니다.',
      '고객 여러분께 심려를 끼쳐드린 점에 대해 유감스럽게 생각하며, 앞으로도 안전하고 신뢰할 수 있는 여행 서비스를 제공하기 위해 노력하겠습니다.',
      '감사합니다.',
    ],
    sign: '(주)머스트고 드림',
  },
  en: {
    title: 'Data Breach Notice · Mustgo',
    eyebrow: 'Notice',
    h1: 'Notice of a Personal Data Breach in the Airline Reservation System (GDS)',
    meta: `Posted ${NOTICE_POSTED.en} · Mustgo Co., Ltd.`,
    home: '← Home',
    homePath: '/en',
    switchLabel: '한국어',
    intro: [
      'Dear valued customers,',
      <>Thank you for choosing <BrandText />.</>,
      'We are writing to inform you that a leak of some airline reservation–related personal information has been identified in the systems of Amadeus IT Group, S.A., the operator of a global airline reservation system (GDS).',
      'According to Amadeus’s ongoing review, the incident appears to have resulted from unauthorized access using login credentials of an account on the Amadeus system.',
      'The incident is estimated to have occurred between August 2023 and September 2026, and the exact timing and scope are still under investigation. The information known to have been exposed so far includes the airline booking reference numbers (PNR) of some customers. Whether any further personal information was exposed, and the specific extent of the damage, are reportedly being verified by the relevant authorities and Amadeus.',
      'Mustgo is checking whether information of customers who booked flights through us is among the affected records, and will promptly take the necessary measures if this is confirmed.',
      'We also ask that you take the following precautions to avoid secondary harm, such as smishing or phishing attempts exploiting this incident:',
    ],
    tips: [
      'Be careful about clicking links (URLs) in text messages or emails from unknown senders.',
      'Do not download or open suspicious attachments.',
      'Be wary of requests to enter personal or financial information that impersonate booking confirmations, refunds or schedule changes.',
      'If you receive a suspicious message, verify it through the official customer service channel.',
    ],
    beforeContact:
      'If you have any questions about this matter or have suffered any damage, please contact the dedicated channels below and we will promptly guide you through the remedy process.',
    contactTitle: '■ Inquiries and damage reports',
    contacts: [
      <>Personal data breach damage reports: Amadeus dedicated email ({AMADEUS_MAIL})</>,
    ],
    outro: [
      'If you have suffered damage from this incident, you may claim compensation under Articles 39 and 39-2 of the Korean Personal Information Protection Act, and apply for dispute mediation under Article 43 (Personal Information Dispute Mediation Committee, 1833-6972).',
      'Mustgo considers the protection of your personal information our highest priority. We will continue to monitor the situation closely and do our utmost to take the necessary protective measures.',
      'We will inform you promptly and transparently of any further findings.',
      'We sincerely regret the concern this has caused, and we will continue working to provide safe and trustworthy travel services.',
      'Thank you.',
    ],
    sign: 'Mustgo Co., Ltd.',
  },
}

export default function PrivacyIncidentNoticePage({ lang = 'ko' }) {
  const c = COPY[lang]
  const isEn = lang === 'en'
  const other = isEn ? 'ko' : 'en'
  useHtmlLang(lang)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = c.title
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [c.title])

  return (
    <div className={cn('min-h-screen flex flex-col bg-white', isEn && 'font-eng')}>
      <header className="border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to={c.homePath} className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-5 text-sm font-medium text-gray-500">
            <Link
              to={NOTICE_PATH[other]}
              className={cn('hover:text-brand-blue transition-colors', !isEn && 'font-eng')}
            >
              {c.switchLabel}
            </Link>
            <Link to={c.homePath} className="hover:text-brand-blue transition-colors">
              {c.home}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <article className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-xs font-bold uppercase tracking-wide2 text-brand-blue">{c.eyebrow}</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {c.h1}
          </h1>
          <p className="text-sm text-gray-400 mt-3">{c.meta}</p>

          <div className="mt-10">
            {c.intro.map((t, i) => (
              <p key={i} className={pCls}>
                {t}
              </p>
            ))}
            <ul className="list-disc pl-5 text-[15px] text-gray-700 leading-relaxed mb-6 space-y-1">
              {c.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className={pCls}>{c.beforeContact}</p>

            <div className="my-8 rounded-lg border border-gray-200 bg-surface-soft p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">{c.contactTitle}</h2>
              <ul className="text-[15px] text-gray-700 leading-relaxed space-y-2">
                {c.contacts.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {c.outro.map((t, i) => (
              <p key={i} className={pCls}>
                {t}
              </p>
            ))}
            <p className="mt-8 text-[15px] font-semibold text-gray-900">{c.sign}</p>
          </div>
        </article>
      </main>
    </div>
  )
}
