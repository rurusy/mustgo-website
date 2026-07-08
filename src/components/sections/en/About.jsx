import { Section, Fade, BrandText, Stat } from '../../ui'
import { FeatureCard } from '../../marketing/FeatureCard'
import { GlobeIcon, StarIcon, ClockIcon } from '../../icons.jsx'

const reasons = [
  {
    icon: <GlobeIcon />,
    title: 'Two-Way Expertise',
    description: (
      <>
        As a travel agency that operates both outbound and inbound, <BrandText /> is a
        dependable partner to the companies we serve.
      </>
    ),
    badgeTone: 'blueSoft',
  },
  {
    icon: <StarIcon />,
    title: 'VIP-Level Detail',
    description: (
      <>
        Detail honed through executive trips and VIP protocol tours.
        <br />
        ‘Detail builds trust’ — the operating philosophy of <BrandText />.
      </>
    ),
    badgeTone: 'blueSoft',
  },
  {
    icon: <ClockIcon />,
    title: '24/7 Concierge',
    description: (
      <>
        A dedicated operations team that responds instantly, no matter the time zone.
        <br />
        Whatever happens on your trip, a single call is all it takes.
      </>
    ),
    badgeTone: 'amberSoft',
  },
]

export function About() {
  return (
    <Section id="about" tone="light">
      <Fade className="max-w-3xl mx-auto text-left sm:text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
          Meet <BrandText />, Your Two-Way Corporate Travel Specialist.
        </h2>
        <p className="text-gray-600 text-base lg:text-lg leading-[1.8] text-justify">
          <BrandText /> is a corporate travel agency specializing in both outbound business travel
          for Korean companies and inbound visits for their foreign VIP clients. From international
          flight ticketing to hotels, protocol, and inbound tours, we aim to be your most trusted
          partner at every stage of the business journey.
        </p>
      </Fade>

      <div className="mt-24">
        <Fade as="h3" className="text-2xl font-bold text-gray-900 mb-12 border-b pb-4 text-center">
          Three Reasons to Choose <BrandText />
        </Fade>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {reasons.map((r, idx) => (
            <FeatureCard key={r.title} {...r} delay={idx * 0.1} />
          ))}
        </div>
      </div>

      <Fade className="mt-24 pt-16 border-t border-gray-100">
        <h3 className="text-center text-sm font-eng font-bold text-gray-400 uppercase tracking-wide2 mb-12">
          <BrandText /> by the Numbers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          <Stat target={15} suffix="+" label="Years of Outbound & Inbound experience" color="green" />
          <Stat target={50000} suffix="+" label="Corporate trips handled" color="green" />
          <Stat target={10000} suffix="+" label="Inbound VIP guests served" color="green" />
          <Stat staticValue="24h" label="Emergency response, always on" color="green" />
        </div>
      </Fade>
    </Section>
  )
}
