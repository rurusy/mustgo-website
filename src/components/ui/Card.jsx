import { cn } from '../../design/cn'

const variants = {
  // 상세 카드(marketing/DetailCard)와 같은 테두리·그림자(2026-11-20 정리).
  light: 'bg-white border border-gray-100 shadow-sm',
  dark: 'bg-white/5 border border-white/10 hover:bg-white/10 transition-colors',
  charcoal: 'bg-ink-800',
  topAccent: 'bg-ink-800 rounded-b-lg',
}

const padding = {
  md: 'p-8',
  lg: 'p-10',
  none: '',
}

export function Card({ variant = 'light', pad = 'md', className, children }) {
  return (
    <div className={cn('rounded-lg', variants[variant], padding[pad], className)}>{children}</div>
  )
}
