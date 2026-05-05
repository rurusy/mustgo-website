import { cn } from '../../design/cn'
import { Container } from './Container'

const tones = {
  light: 'bg-white text-gray-800',
  soft: 'bg-surface-soft text-gray-800',
  charcoal: 'bg-ink-800 text-white',
  ink: 'bg-ink-900 text-white',
}

export function Section({
  id,
  tone = 'light',
  className,
  containerClassName,
  children,
  bleed = false,
}) {
  return (
    <section id={id} className={cn('py-24 lg:py-32 relative', tones[tone], className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
