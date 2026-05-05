import { cn } from '../../design/cn'

const variants = {
  light: 'bg-white border border-gray-200 shadow-sm',
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
