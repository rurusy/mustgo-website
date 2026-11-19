import { cn } from '../../design/cn'

// 상세 페이지의 '사진(또는 화면) + 설명' 줄에서 설명 쪽을 담는 흰 카드.
// /group-travel/ 의 서비스 글과 /btms/ 의 기능 글이 같은 모양을 쓴다(2026-11-20 사용자 선택 'B안').
//
//  - 부제(lead)는 작게(15px 회색) 두고 주황 세로선으로 제목과 묶는다. 크게 두면 제목과 다퉜다.
//  - 본문은 children 으로 받는다. 라벨은 DetailLabel, 목록은 CheckList 를 쓴다.
//  - back 을 주면 카드 맨 아래에 '↑ ○○ 목록으로' 링크를 단다 — 카드 밖에 두면 옆 사진이
//    그 줄까지 늘어나 사진과 카드의 아랫선이 어긋났다.
//  - 카드가 옆 그림보다 높게 늘어나면(className="h-full") '목록으로' 링크는 맨 아래에 붙는다(mt-auto).
export function DetailCard({ eyebrow, eyebrowEng = true, title, lead, back, children, className }) {
  return (
    <div className={cn('flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold text-amber-600 mb-3',
            eyebrowEng ? 'font-eng uppercase tracking-wide2' : 'tracking-wide',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl lg:text-[26px] font-bold tracking-tight text-gray-900 mb-2">{title}</h2>
      {lead && <p className="text-[15px] text-gray-500 leading-relaxed border-l-2 border-amber-500 pl-3 mb-7">{lead}</p>}
      {children}
      {back && (
        <div className="mt-auto pt-7">
          <div className="pt-5 border-t border-gray-100">
            <a
              href={back.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-sm"
            >
              <ArrowIcon className="rotate-180" />
              {back.label}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// 카드 안 묶음 제목('이런 분께' 등). 진한 파랑 — 회색은 심심했고, 기본 파랑은 13px 에서 흐렸다.
export function DetailLabel({ className, children }) {
  return <p className={cn('text-[13px] font-bold text-brand-blue-ink', className)}>{children}</p>
}

// '포함'을 뜻하는 체크 목록. 번호(01·02)는 순서로 읽혀서 쓰지 않는다.
// items — 문자열, 또는 { name, detail } (굵은 이름 + 설명 두 줄).
export function CheckList({ items, className }) {
  return (
    <ul className={cn('space-y-2.5 text-[15px] text-gray-800', className)}>
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.name
        return (
          <li key={key} className="flex gap-3 leading-relaxed">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {typeof item === 'string' ? (
              item
            ) : (
              <span>
                <span className="block font-bold text-gray-900">{item.name}</span>
                <span className="block text-gray-600">{item.detail}</span>
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

// 아래 화살표. 돌려서(rotate-180) 위 화살표로도 쓴다. JumpNav 도 쓴다.
export function ArrowIcon({ className }) {
  return (
    <svg className={cn('w-3.5 h-3.5 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
    </svg>
  )
}
