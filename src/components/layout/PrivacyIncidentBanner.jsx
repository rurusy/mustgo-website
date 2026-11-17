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
    short: '아마데우스 개인정보 유출 안내',
    more: '자세히 보기 →',
  },
  en: {
    tag: '[Notice]',
    text: 'Personal data breach at Amadeus, operator of the global airline reservation system (GDS).',
    short: 'Amadeus data breach',
    more: 'Read more →',
  },
}

export function PrivacyIncidentBanner({ lang = 'ko' }) {
  const c = COPY[lang]
  return (
    // 띠는 헤더 안(<main> 밖)이라 main 의 break-keep 을 받지 못한다. 폰에서 '개인정/보'처럼
    // 단어 중간에서 끊기지 않도록 한국어 띠에도 따로 단다.
    // 폰에서는 짧은 문구로 한 줄만 쓴다. 긴 문구는 세 줄로 접혀 고정 헤더를 160px 넘게 키웠고,
    // 첫 화면의 제목이 그 뒤로 가려졌다(2026-11-18). 띠 전체를 링크로 두어 어디를 눌러도 공지로 간다.
    <Link
      to={NOTICE_PATH[lang]}
      className={cn('group block bg-ink-900 text-white', lang === 'en' ? 'font-eng' : 'break-keep')}
    >
      <div className="max-w-layout mx-auto px-6 lg:px-12 py-2 sm:py-2.5 flex items-center justify-center gap-2 sm:gap-3 text-[13px] sm:text-sm">
        <p className="min-w-0 truncate sm:whitespace-normal text-gray-200">
          <span className="font-semibold text-amber-500">{c.tag}</span>{' '}
          <span className="sm:hidden">{c.short}</span>
          <span className="hidden sm:inline">{c.text}</span>
        </p>
        <span className="shrink-0 font-semibold underline underline-offset-4 decoration-white/40 group-hover:text-amber-500 group-hover:decoration-amber-500 transition-colors">
          {c.more}
        </span>
      </div>
    </Link>
  )
}
