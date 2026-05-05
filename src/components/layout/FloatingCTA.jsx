import { useEffect, useState } from 'react'
import { cn } from '../../design/cn'

export function FloatingCTA() {
  // Contact 섹션이 화면에 보이면 floating CTA 숨김 — 사용자가 이미 Contact 에
  // 도달했으므로 같은 곳을 가리키는 버튼은 중복.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('contact')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-8 right-6 lg:right-12 z-50 ds-cta-group transition-opacity duration-300',
        hidden && 'opacity-0 pointer-events-none',
      )}
      aria-hidden={hidden}
    >
      <div className="ds-cta-menu absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden w-64">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-500">어떤 도움이 필요하세요?</span>
        </div>
        <div className="flex flex-col">
          <a
            href="#contact"
            className="px-4 py-3 text-sm text-gray-800 hover:bg-brand-blue-dark hover:text-white transition-colors flex items-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-2" />
            출장 항공 견적이 필요해요
          </a>
          <a
            href="#contact"
            className="px-4 py-3 text-sm text-gray-800 hover:bg-ink-800 hover:text-white transition-colors border-t border-gray-50 flex items-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2" />
            해외 VIP 한국 의전 문의예요
          </a>
        </div>
      </div>

      <button className="bg-brand-blue text-white h-14 px-6 rounded-full shadow-xl flex items-center justify-center space-x-2 hover:bg-brand-blue-dark transition-all transform hover:scale-105 active:scale-95 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        <span className="font-bold text-[15px]">빠른 상담 요청</span>
      </button>
    </div>
  )
}
