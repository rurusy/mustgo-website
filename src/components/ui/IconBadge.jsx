import { cn } from '../../design/cn'

const tones = {
  blueSoft: 'bg-brand-blue/10 text-amber-600',
  amberSoft: 'bg-amber-600/5 text-amber-600',
  blueRingSoft: 'bg-brand-blue/15 text-amber-600',
  neutral: 'bg-gray-50 text-gray-400',
}

const sizes = {
  md: 'w-12 h-12 rounded',
  sm: 'w-10 h-10 rounded-full',
}

export function IconBadge({ tone = 'blueSoft', size = 'md', className, children }) {
  return (
    <div className={cn('flex items-center justify-center shrink-0', sizes[size], tones[tone], className)}>
      {children}
    </div>
  )
}
