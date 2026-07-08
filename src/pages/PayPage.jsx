import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Payment } from '../components/sections/Payment'
import { BrandText } from '../components/ui'

// Dedicated English payment page for overseas clients.
// Reached from the English homepage (/en) "Pay Online" button (or a direct
// link a consultant shares). Reuses the same Edge Functions / payments backend.
export default function PayPage() {
  useEffect(() => {
    // Utility/transactional page — keep it out of search results.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'Payment · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/en" className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <span className="flex items-center gap-2 text-sm font-eng font-medium text-gray-400">
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
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Secure Payment
          </span>
        </div>
      </header>

      <main className="flex-grow">
        <Payment />
      </main>

      <footer className="bg-ink-900 py-10">
        <div className="max-w-layout mx-auto px-6 lg:px-12 flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              <BrandText /> — Your Trusted Partner in Two-Way Business Travel.
            </p>
            <p className="text-xs text-gray-600 font-eng">
              Mustgo Co., Ltd. · Business Reg. 618-81-35992
            </p>
          </div>
          <div className="text-sm">
            <a
              href="mailto:wemustgo@mustgokorea.com"
              className="text-gray-300 hover:text-amber-500 font-eng transition-colors"
            >
              wemustgo@mustgokorea.com
            </a>
            <Link
              to="/policy"
              className="block mt-1 text-gray-400 hover:text-amber-500 font-eng transition-colors"
            >
              Payment &amp; Refund Policy
            </Link>
            <p className="text-xs text-gray-600 font-eng mt-1">© 2026 Mustgo Co., Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
