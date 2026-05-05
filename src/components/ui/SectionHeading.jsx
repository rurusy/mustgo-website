import { cn } from '../../design/cn'
import { Fade } from './Fade'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  tone = 'light',
  className,
  maxWidth = 'max-w-3xl',
}) {
  const isDark = tone === 'dark'
  const titleColor = isDark ? 'text-white' : 'text-gray-900'
  const subColor = isDark ? 'text-amber-500' : 'text-amber-600'
  const descColor = isDark ? 'text-gray-300' : 'text-gray-600'
  const alignment = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <Fade className={cn(maxWidth, alignment, className)}>
      {eyebrow && (
        <p className={cn('text-sm font-eng font-bold uppercase tracking-wide2 mb-4', isDark ? 'text-amber-500/70' : 'text-gray-400')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('text-3xl lg:text-4xl font-bold tracking-tight mb-4', titleColor)}>{title}</h2>
      {subtitle && (
        <h3 className={cn('font-eng font-medium text-lg lg:text-xl mb-6', subColor)}>{subtitle}</h3>
      )}
      {description && (
        <p className={cn('text-base lg:text-lg leading-[1.8]', descColor)}>{description}</p>
      )}
    </Fade>
  )
}
