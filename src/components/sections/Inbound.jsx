import { Fade, Button } from '../ui'
import { AudienceCard } from '../marketing/AudienceCard'
import { ImageCard } from '../marketing/ImageCard'

const audiences = [
  {
    title: '본사 경영진의 한국 방문 책임자',
    subtitle: 'For HQ travel coordinators arranging executive visits',
    quote: 'CEO·임원·이사회 멤버의 일정을, 단 한 번의 미스도 없이.',
    accent: 'green',
  },
  {
    title: '해외 연사·VIP 게스트의 한국 체류 담당자',
    subtitle: 'For staff coordinating international speakers and VIP guests in Korea',
    quote: '참가자 만족도가 행사의 성공을 결정합니다.',
    accent: 'green',
  },
  {
    title: 'B2B 미팅·공장 시찰을 동행하시는 분',
    subtitle: 'For partners coordinating buyer or vendor visits',
    quote: '비즈니스의 첫인상이, 거래의 결과를 바꿉니다.',
    accent: 'green',
  },
]

const services = [
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    alt: 'Black executive sedan — VIP protocol vehicle',
    eyebrow: 'VIP Concierge',
    description: '공항 영접, 프리미엄 차량, 통역, 일정 매니지먼트',
  },
  {
    image: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Executives in a glass-walled boardroom — premium business meeting',
    eyebrow: 'Business Program',
    description: 'B2B 미팅, 산업 시찰, 정부 방문, MOU 운영',
  },
  {
    image: 'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gyeongbokgung Palace, Seoul',
    eyebrow: 'Cultural Tour',
    description: '한국의 멋과 맛을 동시에 즐기는 K-컬처체험',
  },
]

export function Inbound() {
  return (
    <section id="inbound" className="py-24 lg:py-32 bg-ink-900 text-white relative">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1769847770288-d290a1f9d943?auto=format&fit=crop&q=80&w=1920')",
        }}
        role="img"
        aria-label="Haeundae Beach skyline at night, Busan"
      />

      <div className="max-w-layout mx-auto px-6 lg:px-12 relative z-10">
        <Fade className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-white">
            한국을 찾는 글로벌 VIP를 위한 프리미엄 의전 투어
          </h2>
          <h3 className="font-eng font-medium text-amber-500 text-lg lg:text-xl mb-8">
            Premium Inbound Experience for Your Global VIPs in Korea.
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-gray-300 text-[15px] lg:text-base leading-relaxed text-justify">
              해외 본사·파트너사·바이어가 한국을 방문할 때, 공항 영접부터 비즈니스 미팅, 산업 시찰,
              문화 체험까지 모든 디테일을 Mustgo가 책임집니다.
            </p>
            <p className="text-amber-500/80 font-eng text-[15px] leading-relaxed text-justify">
              When global headquarters, partners, and buyers visit Korea, Mustgo handles every
              detail from airport arrival to executive meetings, industry tours, and cultural
              experiences.
            </p>
          </div>
        </Fade>

        <div className="mt-24 text-center">
          <Fade as="h3" className="text-xl font-bold text-white mb-12 border-b border-brand-blue/20 pb-4 inline-block">
            이런 분들을 위한 서비스입니다
          </Fade>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {audiences.map((a, idx) => (
              <AudienceCard key={a.title} {...a} delay={idx * 0.1} />
            ))}
          </div>
        </div>

        <Fade className="mt-24 pt-16 border-t border-white/10">
          <h3 className="text-xl font-bold text-center mb-16 text-white">
            3가지 영역에서 모든 것을 준비합니다
          </h3>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {services.map((s) => (
              <ImageCard key={s.eyebrow} {...s} />
            ))}
          </div>
        </Fade>

        <Fade className="mt-24 text-center">
          <p className="text-gray-300 mb-6 text-lg">해외 VIP의 한국 방문, Mustgo와 상담하세요.</p>
          <Button as="a" href="#contact" variant="outlineLight" font="eng">
            Plan Your VIP Experience →
          </Button>
        </Fade>
      </div>
    </section>
  )
}
