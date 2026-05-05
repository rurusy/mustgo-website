import { useEffect, useState } from 'react'
import { cn } from '../../design/cn'

const navItems = [
  { label: 'About Mustgo', href: '#about' },
  { label: 'Corporate Travel', href: '#corporate' },
  { label: 'Inbound Tour', href: '#inbound' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, href) => {
    if (!href.startsWith('#') || href === '#') return
    const target = document.querySelector(href)
    if (!target) return
    e.preventDefault()
    const headerEl = document.getElementById('main-header')
    const offset = headerEl ? headerEl.offsetHeight : 0
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
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

        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm font-eng font-medium text-gray-500">
            <button className="text-amber-600 font-bold">KOR</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-amber-600 transition-colors">ENG</button>
          </div>
        </div>

        <button className="lg:hidden text-gray-800 p-2" aria-label="Toggle Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  )
}
