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
  bgImage,
  bgImageAlt,
  bgImageClassName,
  overlay,
}) {
  return (
    <section
      id={id}
      className={cn('py-24 lg:py-32 relative overflow-hidden', tones[tone], className)}
    >
      {bgImage && (
        <div
          className={cn('absolute inset-0 bg-cover bg-center', bgImageClassName)}
          style={{ backgroundImage: `url(${bgImage})` }}
          role={bgImageAlt ? 'img' : 'presentation'}
          aria-label={bgImageAlt || undefined}
        />
      )}
      {overlay && <div className={cn('absolute inset-0', overlay)} aria-hidden="true" />}
      <div className="relative z-10">
        {bleed ? children : <Container className={containerClassName}>{children}</Container>}
      </div>
    </section>
  )
}
