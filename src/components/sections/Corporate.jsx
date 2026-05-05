import { Fade, Button } from '../ui'
import { ServiceCard } from '../marketing/ServiceCard'
import { ProcessSteps } from '../marketing/ProcessSteps'

const services = [
  {
    title: '최적의 항공권, 가장 빠르게',
    description: '전 세계 GDS, 기업 특가, 비즈니스/퍼스트 컨설팅',
    accent: 'blue',
  },
  { title: '도착 후의 모든 것까지', description: '호텔 기업요금, 의전 차량, 비자, 단체 보험' },
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
        어디서든 한 번의 연락으로
      </>
    ),
    description: '긴급 변경, 위기 대응, 24/7 비상 콜센터',
  },
]

const steps = ['요청', '제안', '확정', '진행', '정산']

export function Corporate() {
  return (
    <section
      id="corporate"
      className="py-24 lg:py-32 bg-ink-800 text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=1920')",
        }}
        role="img"
        aria-label="Aircraft landing on a runway with city skyline in the background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/95 via-ink-900/80 to-ink-900/95" />

      <div className="max-w-layout mx-auto px-6 lg:px-12 relative z-10">
        <Fade className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
          기업 해외출장, 항공권부터 정산까지 한 번에
        </h2>
        <p className="text-amber-500 text-lg opacity-90 leading-relaxed">
          단순 발권을 넘어, 임직원의 출장 경험과 회사의 비용 효율을 동시에 향상시킵니다.
        </p>
      </Fade>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {services.map((s, idx) => (
          <ServiceCard key={s.title} {...s} delay={idx * 0.1} />
        ))}
      </div>

      <Fade className="mt-24 pt-16 border-t border-white/10">
        <h3 className="text-xl font-bold text-center mb-16">출장 1건이 처리되는 5단계</h3>
        <ProcessSteps steps={steps} />
      </Fade>

      <Fade className="mt-24 text-center">
        <p className="text-gray-400 mb-6 text-lg">우리 회사에 맞는 출장 솔루션이 궁금하신가요?</p>
        <Button as="a" href="#contact" variant="outlineLight">
          무료 견적 요청하기 →
        </Button>
      </Fade>
      </div>
    </section>
  )
}
