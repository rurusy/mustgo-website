import { useEffect, useRef, useState } from 'react'
import { cn } from '../../design/cn'
import { Button } from '../ui/Button'
import { BrandText } from '../ui/BrandText'

// 여름 휴가 안내 모달 (2026-08-09 일요일까지).
// - 페이지 진입 시 자동으로 뜹니다.
// - "오늘 하루 보지 않기"를 누르면 그 날 하루는 다시 뜨지 않습니다(localStorage).
// - NOTICE_END 이후에는 아예 렌더링되지 않으므로, 휴가가 끝나면 방치해도
//   저절로 사라집니다. (완전히 제거하려면 각 홈페이지에서 이 컴포넌트를 빼면 됩니다.)
const NOTICE_END = '2026-08-09' // 이 날짜(포함)까지만 노출
const STORAGE_KEY = 'mustgo:notice:summer-2026'

// 로컬 기준 오늘 날짜를 YYYY-MM-DD 로. (ISO 문자열은 문자열 비교로 날짜 비교가 됨)
function todayStr() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

const HEAD = {
  ko: { eyebrow: '휴무 안내', title: '여름 휴가 안내' },
  en: { eyebrow: 'Holiday Notice', title: 'Summer Holiday Notice' },
}

const UI = {
  ko: { close: '닫기', hideToday: '오늘 하루 보지 않기', closeAria: '닫기' },
  en: {
    close: 'Close',
    hideToday: "Don't show again today",
    closeAria: 'Close',
  },
}

function KoBody() {
  return (
    <>
      <p className="text-[15px] leading-relaxed text-gray-700">
        <BrandText />는 <strong className="font-semibold text-gray-900">8월 9일(일)</strong>까지 여름
        휴가로 운영을 잠시 쉽니다. 이 기간 문의는 정상적으로 접수되며,{' '}
        <strong className="font-semibold text-gray-900">8월 10일(월)부터 순차적으로</strong>{' '}
        답변드립니다.
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
        소중한 문의에 조금 늦게 답변드리는 점 양해 부탁드립니다. 감사합니다.
      </p>
    </>
  )
}

function EnBody() {
  return (
    <>
      <p className="font-eng text-[15px] leading-relaxed text-gray-700">
        <BrandText /> is on summer break through{' '}
        <strong className="font-semibold text-gray-900">Sunday, August 9</strong>. Your inquiries are
        still received during this time and will be answered{' '}
        <strong className="font-semibold text-gray-900">in order from Monday, August 10</strong>.
      </p>
      <p className="mt-3 font-eng text-[15px] leading-relaxed text-gray-700">
        Thank you for your patience and understanding.
      </p>
    </>
  )
}

export function HolidayNotice({ lang = 'ko' }) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)

  // 노출 여부 판단 → 진입 직후 살짝 늦게 부드럽게 띄운다.
  useEffect(() => {
    const today = todayStr()
    if (today > NOTICE_END) return // 휴가 종료 후엔 표시하지 않음
    let dismissed = null
    try {
      dismissed = localStorage.getItem(STORAGE_KEY)
    } catch {
      // localStorage 접근 불가(프라이빗 모드 등) — 그냥 이번엔 보여준다.
    }
    if (dismissed === today) return // 오늘 이미 "오늘 하루 보지 않기" 누름
    const id = setTimeout(() => setOpen(true), 350)
    return () => clearTimeout(id)
  }, [])

  // 열려 있는 동안: 배경 스크롤 잠금 + ESC 닫기 + 닫기 버튼으로 포커스 이동.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function hideToday() {
    try {
      localStorage.setItem(STORAGE_KEY, todayStr())
    } catch {
      // 저장 실패해도 닫기는 정상 동작
    }
    setOpen(false)
  }

  if (!open) return null

  const isEn = lang === 'en'
  const head = HEAD[lang]
  const ui = UI[lang]
  // 아래쪽(다른 언어) 블록도 위와 같은 머리말(휴무 안내 / 여름 휴가 안내)을 갖는다.
  const altIsEn = !isEn
  const altHead = HEAD[altIsEn ? 'en' : 'ko']

  return (
    <div
      className="ds-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-ink-900/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="holiday-notice-title"
    >
      <div
        className="ds-modal-card relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white p-7 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 (X) */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label={ui.closeAria}
          className="absolute right-4 top-4 rounded-sm text-gray-400 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 헤더 */}
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-wide2 text-brand-blue',
            isEn && 'font-eng',
          )}
        >
          {head.eyebrow}
        </p>
        <h2
          id="holiday-notice-title"
          className={cn('mt-2 text-2xl font-bold text-gray-900', isEn && 'font-eng')}
        >
          {head.title}
        </h2>

        {/* 본문 — 현재 페이지 언어 */}
        <div className="mt-4">{isEn ? <EnBody /> : <KoBody />}</div>

        {/* 구분선 + 다른 언어 (위 블록과 동일한 머리말 구조) */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p
            className={cn(
              'text-xs font-bold uppercase tracking-wide2 text-brand-blue',
              altIsEn && 'font-eng',
            )}
          >
            {altHead.eyebrow}
          </p>
          <h3
            className={cn('mt-1 text-lg font-bold text-gray-900', altIsEn && 'font-eng')}
          >
            {altHead.title}
          </h3>
          <div className="mt-3 opacity-80">{isEn ? <KoBody /> : <EnBody />}</div>
        </div>

        {/* 액션 */}
        <div className="mt-7 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={hideToday}
            className={cn(
              'text-sm text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-gray-800 hover:decoration-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600',
              isEn && 'font-eng',
            )}
          >
            {ui.hideToday}
          </button>
          <Button
            variant="blueSolid"
            size="sm"
            onClick={() => setOpen(false)}
            font={isEn ? 'eng' : 'sans'}
          >
            {ui.close}
          </Button>
        </div>
      </div>
    </div>
  )
}
