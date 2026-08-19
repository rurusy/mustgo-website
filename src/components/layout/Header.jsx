import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../design/cn'
import { Button } from '../ui'

const navItems = [
  { label: 'About Mustgo', href: '#about' },
  { label: 'Corporate Travel', href: '#corporate' },
  { label: 'Inbound Tour', href: '#inbound' },
  { label: 'Contact', href: '#contact' },
]

// 결제 진입 버튼. 국내 고객은 원화(토스페이먼츠) /pay-kr, 해외 고객은 USD/EUR(PayPal) /pay.
// 국내 카드는 외국환거래법상 PayPal 로 받을 수 없어 언어별로 경로가 갈립니다.
const PAY_ENTRY = {
  ko: { to: '/pay-kr', label: '결제하기', font: 'sans' },
  en: { to: '/pay', label: 'Pay Online', font: 'eng' },
}

function CardIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V9z"
      />
    </svg>
  )
}

const HEADER_COPY = {
  ko: { openMenu: '메뉴 열기', closeMenu: '메뉴 닫기', mobileMenu: '모바일 메뉴' },
  en: { openMenu: 'Open menu', closeMenu: 'Close menu', mobileMenu: 'Mobile menu' },
}

// KOR ⇄ ENG switch. Same markup on both pages; only the active language differs.
function LangToggle({ lang, className, onNavigate }) {
  const item = (to, code, active) => (
    <Link
      to={to}
      onClick={onNavigate}
      aria-current={active ? 'true' : undefined}
      className={cn('px-1.5 transition-colors', active ? 'text-brand-blue' : 'hover:text-brand-blue')}
    >
      {code}
    </Link>
  )
  return (
    <div className={cn('flex items-center text-sm font-eng font-semibold text-gray-400', className)}>
      {item('/', 'KOR', lang === 'ko')}
      <span className="text-gray-300" aria-hidden="true">/</span>
      {item('/en', 'ENG', lang === 'en')}
    </div>
  )
}

export function Header({ lang = 'ko' }) {
  const t = HEADER_COPY[lang]
  const payEntry = PAY_ENTRY[lang] ?? PAY_ENTRY.ko
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 메뉴 오픈 시: body 스크롤 잠금, ESC 닫기, 초기 focus 이동, 닫힐 때 trigger 로 focus 복귀.
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      triggerRef.current?.focus()
    }
  }, [menuOpen])

  const handleAnchor = (e, href) => {
    if (!href.startsWith('#') || href === '#') return
    const target = document.querySelector(href)
    if (!target) return
    e.preventDefault()
    const headerEl = document.getElementById('main-header')
    const offset = headerEl ? headerEl.offsetHeight : 0
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset
    setMenuOpen(false)
    // 드로어 닫힘 트랜지션이 시작된 다음 스크롤해야 시각적으로 부드러움.
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }

  return (
    <>
      <header
        id="main-header"
        className={cn(
          'fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300',
          scrolled && 'shadow-sm',
        )}
      >
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* 로고는 언어별 홈으로. href="#" 는 크롤러가 "접근 불가 내부 링크"로 집계합니다. */}
          <Link to={lang === 'en' ? '/en' : '/'} className="flex flex-col items-start group">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-gray-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchor(e, item.href)}
                className="hover:text-brand-blue transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              as={Link}
              to={payEntry.to}
              variant="blueSolid"
              size="pillSm"
              font={payEntry.font}
              className="gap-2"
            >
              <CardIcon />
              {payEntry.label}
            </Button>
            <LangToggle lang={lang} />
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2 text-brand-blue hover:text-brand-blue-dark transition-colors"
            aria-label={t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/*
        Backdrop 과 drawer 는 <header> 바깥에 렌더해야 합니다.
        헤더의 backdrop-blur-md (backdrop-filter) 가 fixed 자손의 containing block
        을 만들어버려서, 안에 두면 h-full 이 viewport(100vh)가 아니라 헤더 높이로
        계산됩니다. 그러면 드로어 안 nav 가 0px 가 되어 안 보입니다.
      */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-black/40 transition-opacity duration-300 z-[60]',
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileMenu}
        className={cn(
          'lg:hidden fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-out z-[70] flex flex-col',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <span className="text-sm font-medium text-gray-500 font-eng">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 -mr-2 text-brand-blue hover:text-brand-blue-dark transition-colors"
            aria-label={t.closeMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18l12-12" />
            </svg>
          </button>
        </div>

        <nav className="px-6 py-4 flex flex-col overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchor(e, item.href)}
              className="py-4 text-lg font-medium text-ink-800 hover:text-brand-blue active:text-brand-blue border-b border-gray-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button
            as={Link}
            to={payEntry.to}
            onClick={() => setMenuOpen(false)}
            variant="blueSolid"
            size="md"
            font={payEntry.font}
            className="w-full gap-2 mt-6"
          >
            <CardIcon />
            {payEntry.label}
          </Button>
          <LangToggle lang={lang} onNavigate={() => setMenuOpen(false)} className="mt-8" />
        </nav>
      </aside>
    </>
  )
}
