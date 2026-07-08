import { Button, Fade, BrandText } from '../../ui'
import { heroImages, heroStepSeconds } from '../../../design/tokens'

// English mirror of sections/Hero.jsx. Smooth-scrolls to #contact and pre-selects
// the inquiry type, matching the offset compensation the Korean hero uses.
function goToContactWithType(type) {
  return (e) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (target) {
      const headerEl = document.getElementById('main-header')
      const offset = headerEl ? headerEl.offsetHeight : 0
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type } }))
  }
}

export function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-ink-900 mt-20 lg:mt-0">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <div
            key={img.src}
            role="img"
            aria-label={img.alt}
            className="ds-hero-bg"
            style={{
              backgroundImage: `url(${img.src})`,
              animationDelay: `${idx * heroStepSeconds}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/55 to-ink-900/85" />
      </div>

      <div className="relative z-10 max-w-layout w-full mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <Fade as="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.35] mb-6">
          Wherever Business Takes You,
          <br />
          <BrandText /> Is With You
        </Fade>
        <Fade as="p" delay={0.1} className="font-eng font-medium text-lg md:text-xl text-amber-500 mb-8">
          Your Trusted Partner for Business Travel — Outbound &amp; Inbound
        </Fade>
        <Fade as="p" delay={0.2} className="max-w-2xl text-gray-200 text-[15px] md:text-base leading-relaxed mb-12">
          From Korean companies traveling abroad to global VIPs visiting Korea —
          <br className="hidden md:block" /> the corporate travel agency that manages every detail of two-way business travel.
        </Fade>
        <Fade delay={0.3} className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            as="a"
            href="#contact"
            variant="blue"
            font="eng"
            className="w-full sm:w-auto"
            onClick={goToContactWithType('corporate')}
          >
            Get a Flight Quote
          </Button>
          <Button
            as="a"
            href="#contact"
            variant="outlineLight"
            font="eng"
            className="w-full sm:w-auto"
            onClick={goToContactWithType('inbound')}
          >
            Inbound Tour Inquiry
          </Button>
        </Fade>
      </div>
    </section>
  )
}
