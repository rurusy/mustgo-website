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
    // 헤더가 fixed 라 그 높이(--header-h, Header 가 잰다)만큼 위를 비워, 가려지지 않은 영역 한가운데에
    // 내용을 둔다. 배경은 헤더 뒤까지 깔린다. 비우지 않으면 화면 전체 기준 가운데라 내용이 위로 붙어 보인다.
    // 폰은 높이를 고정하지 않고 최소 높이(svh — 주소창이 펼쳐진 상태의 화면 높이)만 준다. 고정하면
    // 내용이 상자보다 클 때 위아래로 넘쳐 제목이 헤더 뒤로 들어간다(2026-11-18 아이폰 화면).
    <section id="hero" className="relative w-full min-h-svh lg:h-screen lg:min-h-[700px] pt-[var(--header-h,5rem)] flex items-center justify-center overflow-hidden bg-ink-900">
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

      <div className="relative z-10 max-w-layout w-full mx-auto px-6 lg:px-12 py-12 lg:py-0 text-center flex flex-col items-center">
        <Fade as="h1" className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.35] text-balance mb-4 sm:mb-6">
          Wherever Business Takes You,
          <br />
          <BrandText /> Is With You
        </Fade>
        <Fade as="p" delay={0.1} className="font-eng font-medium text-[15px] sm:text-lg md:text-xl text-amber-500 mb-8">
          Your Trusted Partner for Business Travel
          {/* 폰에서는 줄표 대신 줄을 바꿔 '— Outbound & Inbound' 가 반쯤 걸친 둘째 줄이 되지 않게 한다. */}
          <span className="hidden sm:inline"> — </span>
          <br className="sm:hidden" />
          Outbound &amp; Inbound
        </Fade>
        <Fade as="p" delay={0.2} className="hidden sm:block max-w-2xl text-gray-200 text-[15px] md:text-base leading-relaxed mb-12">
          From Korean companies traveling abroad to global VIPs visiting Korea —
          <br className="hidden md:block" /> the corporate travel agency that manages every detail of two-way business travel.
        </Fade>
        {/*
          Same layout as the Korean hero: a one-line audience caption over each button,
          two equal-width columns so Outbound and Inbound carry the same weight.
        */}
        {/* 설명 문단은 폰에서 숨긴다(hidden sm:block). 아래 버튼마다 얹힌 한 줄이 같은 내용이라, 좁은 화면에서는 같은 말을 두 번 하며 버튼만 밀어낸다. */}
        <Fade delay={0.3} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6 w-full sm:w-auto">
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-eng text-[13px] sm:text-sm text-gray-300">For companies traveling abroad</span>
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
            <span className="font-eng text-[13px] sm:text-sm text-gray-300">For VIPs visiting Korea</span>
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
