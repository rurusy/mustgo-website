import { Section, Fade, BrandText, Stat } from '../ui'
import { FeatureCard } from '../marketing/FeatureCard'
import { GlobeIcon, StarIcon, ClockIcon } from '../icons.jsx'

const reasons = [
  {
    icon: <GlobeIcon />,
    title: '양방향 전문성',
    description:
      'Outbound와 Inbound를 동시에 운영하는 기업 전문 여행사 Mustgo는 고객사의 든든한 파트너입니다.',
    badgeTone: 'blueSoft',
  },
  {
    icon: <StarIcon />,
    title: 'VIP 디테일',
    description: (
      <>
        임원 출장과 해외 의전 투어로 다져진 디테일.
        <br />
        '디테일이 신뢰를 만든다' — Mustgo의 운영 철학입니다.
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
      <Fade className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
          기업 출장의 양방향 전문가, <BrandText />입니다.
        </h2>
        <p className="text-gray-600 text-base lg:text-lg leading-[1.8] text-justify">
          Mustgo는 국내 기업의 해외 출장과, 기업들의 외국 VIP 고객의 한국 방문을 전문적으로 다루는
          기업 전문 여행사입니다. 해외출장항공 발권부터 호텔, 의전, Inbound tour까지 비즈니스
          여정의 모든 단계에서 가장 신뢰할 수 있는 파트너가 되겠습니다.
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
          <Stat target={1800} suffix="+" label="누적 기업 출장 건수" color="green" />
          <Stat target={3500} suffix="+" label="Inbound Tour 이용 해외VIP 고객수" color="green" />
          <Stat staticValue="24h" label="긴급 대응 체계 가동" color="green" />
        </div>
      </Fade>
    </Section>
  )
}
