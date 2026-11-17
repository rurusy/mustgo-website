import { Button, Fade, BrandText } from '../ui'
import { heroImages, heroStepSeconds } from '../../design/tokens'

// scrollTo 만 하면 sticky header 높이만큼 가려지므로 오프셋 보정.
function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const headerEl = document.getElementById('main-header')
  const offset = headerEl ? headerEl.offsetHeight : 0
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

// Contact 섹션으로 부드럽게 스크롤하면서 문의 유형 라디오를 미리 선택.
function goToContactWithType(type) {
  return (e) => {
    e.preventDefault()
    scrollToSection('contact')
    window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type } }))
  }
}

// 방한 의전은 문의 전에 서비스를 먼저 보는 고객이 많아 폼이 아니라 Inbound 섹션으로 보냅니다.
// 섹션 끝의 상담 버튼이 문의 유형을 채워 폼으로 이어 줍니다.
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
          비즈니스 출장의 모든 길,
          <br />
          <BrandText />가 함께합니다
        </Fade>
        <Fade as="p" delay={0.1} className="font-eng font-medium text-[15px] sm:text-lg md:text-xl text-amber-500 mb-8">
          Your Trusted Partner for Business Travel
          {/* 폰에서는 줄표 대신 줄을 바꿔 '— Outbound & Inbound' 가 반쯤 걸친 둘째 줄이 되지 않게 한다. */}
          <span className="hidden sm:inline"> — </span>
          <br className="sm:hidden" />
          Outbound &amp; Inbound
        </Fade>
        <Fade as="p" delay={0.2} className="hidden sm:block max-w-2xl text-gray-200 text-[15px] md:text-base leading-relaxed mb-12">
          국내 기업의 해외 출장부터 해외 VIP의 한국 의전까지,
          <br className="hidden sm:inline" /> 양방향 비즈니스 여정의 모든 디테일을 책임지는 기업 전문 여행사입니다.
        </Fade>
        {/*
          버튼마다 누구를 위한 것인지 한 줄을 얹어, 방한 고객이 첫 화면에서 자기 입구를 바로 찾게 합니다.
          두 열을 같은 폭으로 두어 Outbound/Inbound 의 무게를 맞춥니다.
        */}
        {/* 설명 문단은 폰에서 숨긴다(hidden sm:block). 아래 버튼마다 얹힌 한 줄이 같은 내용이라, 좁은 화면에서는 같은 말을 두 번 하며 버튼만 밀어낸다. */}
        <Fade delay={0.3} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6 w-full sm:w-auto">
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-[13px] sm:text-sm text-gray-300">국내 기업의 해외 출장·단체여행</span>
            <Button
              as="a"
              href="#contact"
              variant="blue"
              className="w-full"
              onClick={goToContactWithType('corporate')}
            >
              출장 항공 견적 받기
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-[13px] sm:text-sm text-gray-300">해외 VIP의 한국 방문</span>
            <Button
              as="a"
              href="#inbound"
              variant="outlineLight"
              className="w-full"
              onClick={goToSection('inbound')}
            >
              Inbound Tour 안내
            </Button>
          </div>
        </Fade>
      </div>
    </section>
  )
}
