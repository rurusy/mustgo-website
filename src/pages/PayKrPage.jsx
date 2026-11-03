import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PaymentKr } from '../components/sections/PaymentKr'
import { BrandText } from '../components/ui'

// 국내 고객용 원화 결제 페이지. 한글 홈(/) 헤더의 "결제하기" 버튼으로 진입합니다.
// 해외 고객용 USD/EUR PayPal 결제는 /pay 에 따로 있습니다
// (국내 카드는 외국환거래법상 PayPal 로 받을 수 없어 경로가 나뉩니다).
export default function PayKrPage() {
  useEffect(() => {
    // 거래용 유틸리티 페이지 — 검색 결과에 노출하지 않습니다.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = '결제하기 · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft">
      <PayKrHeader />
      <main className="flex-grow">
        <PaymentKr />
      </main>
      <PayKrFooter />
    </div>
  )
}

export function PayKrHeader() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Mustgo 홈">
          <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
        </Link>
        <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
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
          안전 결제
        </span>
      </div>
    </header>
  )
}

export function PayKrFooter() {
  return (
    <footer className="bg-ink-900 py-10">
      <div className="max-w-layout mx-auto px-6 lg:px-12 flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-sm text-gray-400 mb-1">
            <BrandText /> — 비즈니스 출장의 양방향 전문가
          </p>
          <p className="text-xs text-gray-600">
            (주)머스트고 | 대표자: 이종화 | 사업자등록번호: 618-81-35992
          </p>
          <p className="text-xs text-gray-600">통신판매업 신고번호: 2026-대구수성구-0781</p>
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
            className="block mt-1 text-gray-400 hover:text-amber-500 transition-colors"
          >
            결제·환불 정책
          </Link>
          <Link
            to="/privacy"
            className="block mt-1 text-gray-400 hover:text-amber-500 transition-colors"
          >
            개인정보처리방침
          </Link>
          <Link
            to="/terms"
            className="block mt-1 text-gray-400 hover:text-amber-500 transition-colors"
          >
            이용약관
          </Link>
          <p className="text-xs text-gray-600 font-eng mt-1">© 2026 Mustgo Co., Ltd.</p>
        </div>
      </div>
    </footer>
  )
}
