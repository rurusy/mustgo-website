import { Section, Fade, Button } from '../../ui'
import { ServiceCard } from '../../marketing/ServiceCard'
import { ProcessSteps } from '../../marketing/ProcessSteps'

const services = [
  {
    title: 'The Best Fares, the Fastest Way',
    description: 'Global GDS, corporate fares, business/first-class consulting',
    accent: 'blue',
  },
  {
    title: 'Everything After Arrival',
    description: 'Corporate hotel rates, protocol vehicles, visas, group insurance',
  },
  {
    title: (
      <>
        Hidden Costs,
        <br />
        Brought Into View
      </>
    ),
    description: 'Automated cost analysis by team, route, and individual — with savings proposals',
    accent: 'blue',
  },
  {
    title: (
      <>
        365 Days,
        <br />
        One Call From Anywhere
      </>
    ),
    description: 'Urgent changes, crisis response, a 24/7 emergency call center',
  },
]

const steps = ['Request', 'Proposal', 'Confirmation', 'Departure', 'Settlement']

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
          Corporate Travel Abroad — From Ticketing to Settlement, All in One
        </h2>
        <p className="text-amber-500 text-lg opacity-90 leading-relaxed">
          Beyond simple ticketing, we elevate the traveler’s experience while improving your
          company’s cost efficiency.
        </p>
      </Fade>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {services.map((s, idx) => (
          <ServiceCard key={idx} {...s} delay={idx * 0.1} />
        ))}
      </div>

      <Fade className="mt-24 pt-16 border-t border-white/10">
        <h3 className="text-xl font-bold text-center mb-16">The 5 Steps Behind Every Trip</h3>
        <ProcessSteps steps={steps} />
      </Fade>

      <Fade className="mt-24 text-center">
        <p className="text-gray-400 mb-6 text-sm sm:text-lg">Curious about the right travel solution for your company?</p>
        <Button as="a" href="#contact" variant="outlineLight" font="eng">
          Request a Free Quote →
        </Button>
      </Fade>
    </Section>
  )
}
