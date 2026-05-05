import { cn } from '../../design/cn'
import { Fade } from '../ui'

const accents = {
  white: 'text-white',
  blue: 'text-brand-blue',
}

export function ServiceCard({ title, description, accent = 'white', delay = 0 }) {
  return (
    <Fade
      delay={delay}
      className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-colors"
    >
      <h4 className={cn('text-xl font-bold mb-4', accents[accent])}>{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </Fade>
  )
}
