import { useEffect, useState } from 'react'
import { cn } from '../../design/cn'

const CTA_COPY = {
  ko: {
    heading: '어떤 도움이 필요하세요?',
    corp: '출장 항공 견적이 필요해요',
    group: '단체여행·인센티브 견적이 필요해요',
    inbound: '해외 VIP 한국 의전 문의예요',
    button: '빠른 상담 요청',
  },
  en: {
    heading: 'How can we help?',
    corp: 'I need a corporate travel quote',
    inbound: 'Inbound VIP protocol inquiry',
    button: 'Request a Consultation',
  },
}

// 메뉴 항목. 누르면 문의 폼으로 가면서 문의 유형을 미리 고른다(Contact 의 prefill 이벤트).
// group 은 한국어 문구에만 있다 — 영문 홈에는 단체여행 섹션도, 그 문의 유형도 없다.
const ITEMS = [
  { key: 'corp', type: 'corporate', dot: 'bg-brand-blue', hover: 'hover:bg-brand-blue-dark' },
  { key: 'group', type: 'group', dot: 'bg-amber-500', hover: 'hover:bg-ink-800' },
  { key: 'inbound', type: 'inbound', dot: 'bg-brand-green', hover: 'hover:bg-ink-800' },
]

const prefill = (type) => () =>
  window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type } }))

export function FloatingCTA({ lang = 'ko' }) {
  const t = CTA_COPY[lang]
  const isEn = lang === 'en'
  // Hero 또는 Contact 섹션이 화면에 보이면 floating CTA 숨김.
  //   - Hero: 자체 CTA 두 개("출장 항공 견적 받기" / "Inbound Tour 문의")가 있어
  //     동일한 액션을 floating으로 또 노출하면 중복.
  //   - Contact: 사용자가 이미 도달했으므로 같은 곳을 가리키는 버튼은 무의미.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Below sm the CTA is hidden via Tailwind's `hidden sm:block`, so the
    // observer would just be doing wasted work on the most constrained device.
    // We don't add a resize listener — phones don't cross this breakpoint.
    if (window.matchMedia('(max-width: 639px)').matches) return

    const targets = ['hero', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (targets.length === 0) return

    const intersecting = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        }
        setHidden(intersecting.size > 0)
      },
      { threshold: 0.15 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'hidden sm:block fixed bottom-8 right-6 lg:right-12 z-50 ds-cta-group transition-opacity duration-300',
        hidden && 'opacity-0 pointer-events-none',
      )}
      aria-hidden={hidden}
    >
      <div className="ds-cta-menu absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden w-64">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
          <span className={cn('text-xs font-bold text-gray-500', isEn && 'font-eng')}>{t.heading}</span>
        </div>
        <div className="flex flex-col">
          {ITEMS.filter((item) => t[item.key]).map((item, idx) => (
            <a
              key={item.key}
              href="#contact"
              onClick={prefill(item.type)}
              className={cn(
                'px-4 py-3 text-sm text-gray-800 hover:text-white transition-colors flex items-center',
                item.hover,
                idx > 0 && 'border-t border-gray-50',
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-2', item.dot)} />
              {t[item.key]}
            </a>
          ))}
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
        <span className={cn('font-bold text-[15px]', isEn && 'font-eng')}>{t.button}</span>
      </button>
    </div>
  )
}
