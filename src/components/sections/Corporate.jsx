import { Link } from 'react-router-dom'
import { Section, Fade, Button } from '../ui'
import { ServiceCard } from '../marketing/ServiceCard'
import { ProcessSteps } from '../marketing/ProcessSteps'
import { ScreenshotFrame } from '../marketing/ScreenshotFrame'
import { BTMS, BTMS_HERO_SHOT, BTMS_HOME, BTMS_LAUNCH, BTMS_PATH } from '../../data/btms'

const services = [
  {
    title: (
      <>
        최적의 항공권,
        <br />
        가장 빠르게
      </>
    ),
    description: '전 세계 GDS, 기업 특가, 비즈니스·퍼스트석 컨설팅',
    accent: 'blue',
  },
  { title: '도착 후의 모든 것까지', description: '호텔 기업 요금, 의전 차량, 비자, 단체 보험' },
  {
    title: (
      <>
        보이지 않던 비용이,
        <br />
        보이기 시작합니다
      </>
    ),
    description: '부서·노선·개인별 비용 자동 분석, 절감안 도출',
    accent: 'blue',
  },
  {
    title: (
      <>
        365일,
        <br />
        어디서든 연락 한 번으로
      </>
    ),
    description: '긴급 변경, 위기 대응, 24시간 비상 콜센터',
  },
]

const steps = ['요청', '제안', '확정', '진행', '정산']

// 'BTMS 도입 상담' 링크 — 같은 페이지의 문의 폼으로 내려가면서 문의 유형을 BTMS 도입 상담으로 고른다.
// Hero 의 goToContactWithType 과 같은 방식(고정 헤더 높이만큼 덜 내려간다).
function goToBtmsInquiry(e) {
  e.preventDefault()
  const target = document.getElementById('contact')
  if (target) {
    const header = document.getElementById('main-header')
    const top = target.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0)
    window.scrollTo({ top, behavior: 'smooth' })
  }
  window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type: 'btms' } }))
}

export function Corporate() {
  return (
    <Section
      id="corporate"
      tone="charcoal"
      bgImage="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=1920"
      bgImageAlt="Aircraft landing on a runway with city skyline in the background"
      overlay="bg-gradient-to-b from-ink-900/95 via-ink-900/80 to-ink-900/95"
    >
      <Fade className="max-w-3xl mx-auto text-left sm:text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
          기업 해외 출장, 항공권부터 정산까지 한 번에
        </h2>
        <p className="text-amber-500 text-lg opacity-90 leading-relaxed">
          단순 발권을 넘어,
          <br className="sm:hidden" /> 임직원의 출장 경험과 회사의 비용 효율을 함께 높입니다.
        </p>
      </Fade>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {services.map((s, idx) => (
          <ServiceCard key={idx} {...s} delay={idx * 0.1} />
        ))}
      </div>

      {/* MUSTGO BTMS 요약. 자세한 내용은 /btms/ — 문안은 src/data/btms.js. */}
      <Fade className="mt-16 rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-12">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
              <p className="text-sm font-bold text-amber-500">
                <span className="font-eng tracking-wider">{BTMS.name}</span> · {BTMS.fullName}
              </p>
              <span className="rounded-sm bg-white/10 px-2 py-1 text-xs font-bold text-white">{BTMS_LAUNCH}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-4">
              {BTMS.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 [text-wrap:pretty]">
              {BTMS.intro.map((sentence) => (
                <span key={sentence} className="block">
                  {sentence}
                </span>
              ))}
            </p>
            <ul className="space-y-2 mb-8">
              {BTMS_HOME.points.map((point) => (
                <li key={point} className="flex gap-2 text-[15px] text-white">
                  <svg
                    className="w-4 h-4 mt-1 shrink-0 text-brand-green"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button as={Link} to={BTMS_PATH}>
                BTMS 자세히 보기 →
              </Button>
              <a
                href="#contact"
                onClick={goToBtmsInquiry}
                className="text-sm font-medium text-gray-300 underline underline-offset-4 hover:text-white transition-colors"
              >
                도입 상담 요청
              </a>
            </div>
          </div>
          <ScreenshotFrame {...BTMS_HERO_SHOT} tone="dark" />
        </div>
      </Fade>

      <Fade className="mt-24 pt-16 border-t border-white/10">
        <h3 className="text-xl font-bold text-center mb-16">출장 1건이 처리되는 5단계</h3>
        <ProcessSteps steps={steps} />
      </Fade>

      <Fade className="mt-24 text-center">
        <p className="text-gray-400 mb-6 text-sm sm:text-lg">우리 회사에 맞는 출장 솔루션이 궁금하신가요?</p>
        <Button as="a" href="#contact" variant="outlineLight">
          무료 견적 요청하기 →
        </Button>
      </Fade>
    </Section>
  )
}
