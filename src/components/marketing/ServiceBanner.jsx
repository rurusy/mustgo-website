import { Link } from 'react-router-dom'
import { Fade, Button } from '../ui'

// 사진 위에 서비스 하나를 소개하는 넓은 배너 — 홈 단체여행 섹션의 서비스 4개(2026-11-20).
// 골프만 배너이고 나머지가 카드였을 때 '골프 전문 회사'처럼 보인다는 지적을 받아, 네 서비스를
// 모두 같은 배너로 맞췄다. 그래서 한 서비스만 다르게 꾸미는 prop 은 두지 않는다.
//
//   id         — 광고·메일이 바로 보낼 수 있는 홈 앵커(/#golf-tour 등). Fade 바깥 div 에 단다 —
//                Fade 는 떠오르며 위치가 바뀌어서, 안쪽에 두면 도착 위치를 잰 뒤 배너가 헤더 밑으로 밀린다.
//   tagline    — [앞, 뒤] 두 구절. 폰은 쉼표에서 두 줄, 넓은 화면은 한 줄.
//   tags       — 대상·지역 같은 짧은 태그.
//   inquiryName — 넓은 화면의 문의 버튼 앞에 붙는 서비스 이름('골프투어' → '골프투어 문의하기').
//                폰에서는 두 버튼이 한 줄에 들어가도록 '문의하기'만 보인다.
//   onInquiry  — 문의 버튼(#contact)을 누를 때. 문의 유형 미리 선택 같은 일을 한다.
//   detailTo   — '자세히 보기'가 가는 상세 페이지 주소.
//
// 글은 늘 왼쪽에 둔다. 좌우를 번갈아 놓아 봤는데 오른쪽 글이 가운데 떠 보였다(11-20).
// 높이를 줄이려고 설명 문장 없이 소개 한 줄과 태그만 둔다 — 설명은 상세 페이지에 있다.
export function ServiceBanner({ id, image, alt, eyebrow, title, tagline, tags = [], inquiryName, onInquiry, detailTo }) {
  return (
    <div id={id} className="scroll-mt-28">
      <Fade>
        <div className="relative overflow-hidden rounded-lg bg-ink-800">
          <img src={image} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          {/*
            폰은 글이 사진 아래쪽을 덮으므로 아래에서 위로 진하게 — 밝은 사진(단체여행의 하늘)에서
            주황 라벨이 묻혀서 중간(60%)까지 /75 로 어둡게 둔다. 넓은 화면은 왼쪽 글에서 오른쪽으로.
          */}
          <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-ink-900/95 from-30% via-ink-900/75 via-60% to-ink-900/20" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-ink-900/10" />
          <div className="relative px-6 pt-28 pb-6 sm:px-10 sm:py-7 lg:px-12 sm:max-w-2xl">
            <span className="text-amber-500 font-eng font-bold text-sm mb-1.5 block tracking-wider">{eyebrow}</span>
            <h3 className="text-2xl lg:text-[28px] font-bold text-white tracking-tight mb-1.5">{title}</h3>
            <p className="text-base lg:text-lg text-gray-100 leading-snug mb-4">
              {tagline[0]}
              <br className="sm:hidden" /> {tagline[1]}
            </p>
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-5">
                {tags.map((t) => (
                  <li key={t} className="rounded-sm border border-white/30 bg-white/10 px-2.5 py-1 text-[13px] text-white backdrop-blur-sm">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {/* 폰에서도 두 버튼을 한 줄에 둔다 — 세로로 쌓으면 배너가 50px 길어진다. */}
            <div className="grid grid-cols-2 sm:flex gap-2.5">
              <Button as="a" href="#contact" variant="blue" size="sm" onClick={onInquiry}>
                {inquiryName && <span className="hidden sm:inline">{inquiryName}&nbsp;</span>}문의하기 →
              </Button>
              <Button as={Link} to={detailTo} variant="outlineLight" size="sm">
                자세히 보기 →
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}
