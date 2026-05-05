import { cn } from '../../design/cn'
import { Fade } from '../ui'

const accentMap = {
  blue: 'border-brand-blue',
  amber: 'border-amber-600',
  green: 'border-brand-green',
}

export function AudienceCard({ title, subtitle, quote, accent = 'blue', delay = 0 }) {
  return (
    <Fade delay={delay} className={cn('bg-ink-800 border-t-2 p-8 rounded-b-lg', accentMap[accent])}>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="font-eng text-xs text-amber-500 mb-6 opacity-70">{subtitle}</p>
      <p className="text-sm text-gray-300 leading-relaxed">{quote}</p>
    </Fade>
  )
}
