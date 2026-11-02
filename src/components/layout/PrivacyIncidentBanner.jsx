import { Link } from 'react-router-dom'
import { cn } from '../../design/cn'

// 홈 맨 위에 고정으로 띄우는 개인정보 유출 공지 띠 (아마데우스 GDS 사고).
// 개인정보 보호법 제34조 고지 의무 — 2026-11-04 14:00까지 게시, 30일 이상 유지.
// 닫기 버튼을 두지 않는다: "보기 쉬운 곳에 계속 게시"가 요건이라, 방문자가 지워
// 버릴 수 있는 팝업보다 항상 보이는 띠가 맞다.
//
// 내리는 시점: 게시일로부터 30일이 지난 뒤(2026-12-04 이후) 사장님 확인을 받고
// HomePage·EnHomePage·두 Footer 에서 빼면 된다. 본문 페이지는 남긴다.
export const NOTICE_POSTED = { ko: '2026년 11월 3일', en: 'November 3, 2026' }
export const NOTICE_PATH = { ko: '/notice/privacy-incident', en: '/en/notice/privacy-incident' }

const COPY = {
  ko: {
    tag: '[공지]',
    text: '항공예약시스템(GDS) 운영사 아마데우스의 개인정보 유출 관련 안내드립니다.',
    more: '자세히 보기 →',
  },
  en: {
    tag: '[Notice]',
    text: 'Personal data breach at Amadeus, operator of the global airline reservation system (GDS).',
    more: 'Read more →',
  },
}

export function PrivacyIncidentBanner({ lang = 'ko' }) {
  const c = COPY[lang]
  return (
    <div className={cn('bg-ink-900 text-white', lang === 'en' && 'font-eng')}>
      <div className="max-w-layout mx-auto px-6 lg:px-12 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-3 text-sm">
        <p className="text-gray-200">
          <span className="font-semibold text-amber-500">{c.tag}</span> {c.text}
        </p>
        <Link
          to={NOTICE_PATH[lang]}
          className="shrink-0 font-semibold underline underline-offset-4 decoration-white/40 hover:text-amber-500 hover:decoration-amber-500 transition-colors"
        >
          {c.more}
        </Link>
      </div>
    </div>
  )
}
