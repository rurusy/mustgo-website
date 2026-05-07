import { useEffect, useRef, useState } from 'react'
import { cn } from '../../design/cn'

const navItems = [
  { label: 'About Mustgo', href: '#about' },
  { label: 'Corporate Travel', href: '#corporate' },
  { label: 'Inbound Tour', href: '#inbound' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
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
          <a href="#" className="flex flex-col items-start group">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </a>

          <nav className="hidden lg:flex items-center space-x-10 text-[15px] font-medium text-gray-700">
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
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2 text-brand-blue hover:text-brand-blue-dark transition-colors"
            aria-label="메뉴 열기"
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

          {/* TODO(i18n): /en 라우트 준비 시 KOR/ENG 토글 복원 */}
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
        aria-label="모바일 메뉴"
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
            aria-label="메뉴 닫기"
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
        </nav>
      </aside>
    </>
  )
}
