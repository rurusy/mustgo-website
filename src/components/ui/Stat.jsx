import { cn } from '../../design/cn'
import { useCounter } from '../../hooks/useCounter'
import { useFadeIn } from '../../hooks/useFadeIn'

export function Stat({
  target,
  prefix = '',
  suffix = '',
  label,
  color = 'green',
  format = 'plain',
  staticValue,
}) {
  const [ref, visible] = useFadeIn()
  const display = useCounter({ target: target ?? 0, active: visible && !staticValue, format })

  const colorClass = color === 'amber' ? 'text-amber-600' : 'text-brand-green'

  return (
    <div ref={ref}>
      <div className={cn('text-4xl md:text-5xl font-eng font-bold mb-2', colorClass)}>
        {prefix}
        {staticValue ?? display}
        {suffix}
      </div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  )
}
