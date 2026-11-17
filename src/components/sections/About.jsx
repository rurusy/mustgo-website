import { Section, Fade, BrandText, Stat, SectionLabel } from '../ui'
import { FeatureCard } from '../marketing/FeatureCard'
import { GlobeIcon, StarIcon, ClockIcon } from '../icons.jsx'

const reasons = [
  {
    icon: <GlobeIcon />,
    title: '양방향 전문성',
    description: (
      <>
        Outbound와 Inbound를 함께 운영합니다.
        <br />
        양쪽에서 쌓은 네트워크가 고객사의 든든한 자산이 됩니다.
      </>
    ),
    badgeTone: 'blueSoft',
  },
  {
    icon: <StarIcon />,
    title: 'VIP 디테일',
    description: (
      <>
        임원 출장과 해외 의전 투어로 다져진 디테일.
        <br />
        '디테일이 신뢰를 만든다' — <BrandText />의 운영 철학입니다.
      </>
    ),
    badgeTone: 'blueSoft',
  },
  {
    icon: <ClockIcon />,
    title: '24/7 컨시어지',
    description: (
      <>
        시차에 관계없이 즉시 응답하는 전담 운영팀.
        <br />
        출장 중 어떤 상황에도, 한 통의 연락이면 충분합니다.
      </>
    ),
    badgeTone: 'amberSoft',
  },
]

export function About() {
  return (
    <Section id="about" tone="light">
      <Fade className="max-w-4xl mx-auto text-left sm:text-center">
        <SectionLabel>About Mustgo</SectionLabel>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
          기업 출장의 양방향 전문가, <BrandText />입니다.
        </h2>
        {/*
          줄 나눔은 사용자와 정한 것(2026-11-17): '~한국 방문을' / '~기업 전문 여행사입니다.' /
          '~Inbound Tour까지' / '비즈니스 여정의 ~'. 문구는 MustGo_디자인_프롬프트_v2.md 의
          인사말에 인센티브·단체여행을 더한 것. 글 폭(max-w-4xl)은 긴 줄이 PC에서 한 줄에 들어가도록 넓힌 것이다.
          폰에서는 문장 안의 줄 나눔(<br>)을 숨겨 글이 자연스럽게 흐르게 하고, 문장 사이만 살짝 띄운다
          — 강제로 나누면 '한국 방문을'처럼 한 어절만 남는 줄이 생긴다.
        */}
        <p className="text-gray-600 text-base lg:text-lg leading-[1.8]">
          <span className="block mb-2 sm:mb-0">
            <BrandText />는 국내 기업의 해외 출장과, 해외 VIP의 한국 방문을
            <br className="hidden sm:inline" /> 동시에 책임지는 기업 전문 여행사입니다.
          </span>
          <span className="block">
            항공권 발권부터 호텔, 인센티브·단체여행, 의전, Inbound Tour까지
            <br className="hidden sm:inline" /> 비즈니스 여정의 모든 단계에서 가장 신뢰할 수 있는 파트너가 되겠습니다.
          </span>
        </p>
      </Fade>

      <div className="mt-24">
        <Fade as="h3" className="text-2xl font-bold text-gray-900 mb-12 border-b pb-4 text-center">
          <BrandText />를 선택하는 세 가지 이유
        </Fade>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {reasons.map((r, idx) => (
            <FeatureCard key={r.title} {...r} delay={idx * 0.1} />
          ))}
        </div>
      </div>

      <Fade className="mt-24 pt-16 border-t border-gray-100">
        <h3 className="text-center text-sm font-eng font-bold text-gray-400 uppercase tracking-wide2 mb-12">
          숫자로 보는 <BrandText />
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          <Stat target={15} suffix="년+" label="Outbound, Inbound 현장 경험" color="green" />
          <Stat target={50000} suffix="+" label="누적 기업 출장 건수" color="green" />
          <Stat target={10000} suffix="+" label="Inbound Tour 이용 해외 VIP 고객 수" color="green" />
          <Stat staticValue="24h" label="긴급 대응 체계 가동" color="green" />
        </div>
      </Fade>
    </Section>
  )
}
