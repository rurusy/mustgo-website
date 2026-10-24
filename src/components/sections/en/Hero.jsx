import { Button, Fade, BrandText } from '../../ui'
import { heroImages, heroStepSeconds } from '../../../design/tokens'

// English mirror of sections/Hero.jsx, with the same header-offset compensation.
function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const headerEl = document.getElementById('main-header')
  const offset = headerEl ? headerEl.offsetHeight : 0
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

// Smooth-scrolls to #contact and pre-selects the inquiry type.
function goToContactWithType(type) {
  return (e) => {
    e.preventDefault()
    scrollToSection('contact')
    window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type } }))
  }
}

// Inbound clients usually want to see the service before writing in, so this button
// goes to the Inbound section; its closing CTA pre-selects the inquiry type.
function goToSection(id) {
  return (e) => {
    e.preventDefault()
    scrollToSection(id)
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
        {/*
          Same layout as the Korean hero: a one-line audience caption over each button,
          two equal-width columns so Outbound and Inbound carry the same weight.
        */}
        <Fade delay={0.3} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 w-full sm:w-auto">
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-eng text-sm text-gray-300">For companies traveling abroad</span>
            <Button
              as="a"
              href="#contact"
              variant="blue"
              font="eng"
              className="w-full"
              onClick={goToContactWithType('corporate')}
            >
              Get a Flight Quote
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-eng text-sm text-gray-300">For VIPs visiting Korea</span>
            <Button
              as="a"
              href="#inbound"
              variant="outlineLight"
              font="eng"
              className="w-full"
              onClick={goToSection('inbound')}
            >
              Inbound Tour Overview
            </Button>
          </div>
        </Fade>
      </div>
    </section>
  )
}
