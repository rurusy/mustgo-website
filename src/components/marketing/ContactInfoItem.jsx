import { cn } from '../../design/cn'
import { IconBadge } from '../ui'

export function ContactInfoItem({
  icon,
  eyebrow,
  label,
  helper,
  eyebrowAccent = false,
  badgeTone = 'neutral',
  grow = false,
  className,
  contentClassName,
  children,
}) {
  return (
    <div
      className={cn(
        'flex',
        grow ? 'items-stretch flex-grow' : 'items-start',
        className,
      )}
    >
      <IconBadge tone={badgeTone} size="sm" className="mr-4">
        {icon}
      </IconBadge>
      <div className={cn('w-full', grow && 'flex flex-col', contentClassName)}>
        <p
          className={`text-xs font-bold uppercase tracking-wider mb-1 font-eng ${
            eyebrowAccent ? 'text-amber-600' : 'text-gray-500'
          }`}
        >
          {eyebrow}
        </p>
        {label && <p className="text-[15px] font-medium text-gray-900">{label}</p>}
        {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
        {children}
      </div>
    </div>
  )
}
