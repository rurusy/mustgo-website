import { Link } from 'react-router-dom'
import { cn } from '../../design/cn'

// 홈 Inbound 섹션의 도시 타일 — 도시 허브(/korea/<city>/)로 가는 길.
// 예전에는 파란 꽉 찬 버튼에 도시 이름만 있어서 '견적 받기' 같은 행동 버튼과 구별되지 않았고,
// 누르면 무엇이 나오는지(명소 소개)도 알 수 없었다(2026-11-18). 그래서 행동 버튼과 다른 반투명 타일에
// 명소 수와 화살표를 달아 '들어가 보는 곳'으로 읽히게 한다.
const tones = {
  dark: {
    box: 'border-white/25 bg-white/5 hover:border-brand-blue hover:bg-brand-blue/15',
    name: 'text-white',
    meta: 'text-brand-blue group-hover:text-white',
  },
}

export function CityLinkCard({ to, name, meta, tone = 'dark', font, className }) {
  const t = tones[tone]
  return (
    <Link
      to={to}
      className={cn(
        'group flex flex-col items-center justify-center gap-1 rounded-sm border px-2 py-3.5 sm:py-4 text-center transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600',
        t.box,
        font === 'eng' && 'font-eng',
        className,
      )}
    >
      <span className={cn('text-base sm:text-lg font-bold', t.name)}>{name}</span>
      <span className={cn('text-xs sm:text-[13px] transition-colors', t.meta)}>
        {meta} <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
