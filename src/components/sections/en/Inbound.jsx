import { Section, Fade, Button, BrandText } from '../../ui'
import { AudienceCard } from '../../marketing/AudienceCard'
import { ImageCard } from '../../marketing/ImageCard'

const audiences = [
  {
    title: 'Coordinating HQ Executive Visits to Korea',
    subtitle: 'For HQ travel coordinators arranging executive visits',
    quote: 'Not a single misstep across the schedules of CEOs, executives, and board members.',
    accent: 'green',
  },
  {
    title: 'Hosting International Speakers & VIP Guests',
    subtitle: 'For staff coordinating international speakers and VIP guests in Korea',
    quote: 'Guest satisfaction decides the success of the event.',
    accent: 'green',
  },
  {
    title: 'Accompanying B2B Meetings & Factory Tours',
    subtitle: 'For partners coordinating buyer or vendor visits',
    quote: 'The first impression in business shapes the flow of the deal.',
    accent: 'green',
  },
]

const services = [
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    alt: 'Black executive sedan — VIP protocol vehicle',
    eyebrow: 'VIP Concierge',
    description: 'Airport greeting, premium vehicles, interpretation, itinerary management',
  },
  {
    image: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Executives in a glass-walled boardroom — premium business meeting',
    eyebrow: 'Business Program',
    description: 'B2B meetings, site inspections, government visits, MOU signings',
  },
  {
    image: 'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gyeongbokgung Palace, Seoul',
    eyebrow: 'Cultural Tour',
    description: 'K-culture experiences blending the beauty and flavors of Korea',
  },
]

export function Inbound() {
  return (
    <Section
      id="inbound"
      tone="ink"
      bgImage="https://images.unsplash.com/photo-1769847770288-d290a1f9d943?auto=format&fit=crop&q=80&w=1920"
      bgImageAlt="Haeundae Beach skyline at night, Busan"
      bgImageClassName="opacity-10 mix-blend-luminosity"
    >
      <Fade className="max-w-4xl mx-auto text-left sm:text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-white">
          Premium Protocol Tours for Global VIPs Visiting Korea
        </h2>
        <h3 className="font-eng font-medium text-amber-500 text-lg lg:text-xl mb-8">
          From Arrival to Departure, Every Detail Handled.
        </h3>
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-gray-300 text-[15px] lg:text-base leading-relaxed text-justify">
            When global headquarters, partners, and buyers visit Korea, <BrandText /> handles every
            detail — from airport arrival to executive meetings, industry tours, and cultural
            experiences.
          </p>
        </div>
      </Fade>

      <div className="mt-24 text-center">
        <Fade as="h3" className="text-xl font-bold text-white mb-12 border-b border-brand-blue/20 pb-4 inline-block">
          Who This Service Is For
        </Fade>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {audiences.map((a, idx) => (
            <AudienceCard key={a.title} {...a} delay={idx * 0.1} />
          ))}
        </div>
      </div>

      <Fade className="mt-24 pt-16 border-t border-white/10">
        <h3 className="text-xl font-bold text-center mb-16 text-white">
          Everything Prepared<br className="sm:hidden" /> Across Three Areas
        </h3>
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {services.map((s) => (
            <ImageCard key={s.eyebrow} {...s} />
          ))}
        </div>
      </Fade>

      <Fade className="mt-24 text-center">
        <p className="text-gray-300 mb-6 text-lg">
          Planning a VIP visit to Korea?<br className="sm:hidden" /> Talk to <BrandText />.
        </p>
        <Button as="a" href="#contact" variant="outlineLight" font="eng">
          Plan Your VIP Experience →
        </Button>
      </Fade>
    </Section>
  )
}
