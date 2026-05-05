import { cn } from '../../design/cn'
import { useFadeIn } from '../../hooks/useFadeIn'

export function Fade({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, visible] = useFadeIn()
  const style = delay ? { transitionDelay: `${delay}s`, ...rest.style } : rest.style
  return (
    <Tag
      ref={ref}
      className={cn('ds-fade', visible && 'is-visible', className)}
      {...rest}
      style={style}
    >
      {children}
    </Tag>
  )
}
