import { cn } from '../../design/cn'

const base =
  'inline-flex items-center justify-center font-semibold transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600 active:scale-[0.98]'

const variants = {
  primary: 'bg-amber-600 text-white hover:bg-amber-700',
  blue: 'bg-brand-blue text-white hover:bg-brand-green',
  green: 'bg-brand-green text-white hover:bg-brand-green-light',
  outlineLight:
    'bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm shadow-none',
  ghost: 'bg-transparent text-gray-700 hover:text-amber-600 shadow-none',
  // Admin/utility variants — flat, no shadow, used in tab strips and inline filters.
  pillFilter:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-none font-medium',
  pillFilterActive:
    'bg-gray-900 text-white border border-gray-900 shadow-none font-medium',
  // Inline action chip used inside cards (e.g. 처리완료 표시).
  chipPrimary: 'bg-amber-600 text-white hover:bg-amber-700 shadow-none font-medium',
  chipNeutral: 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none font-medium',
}

const sizes = {
  sm: 'h-10 px-5 text-sm rounded-sm',
  md: 'px-8 py-4 text-[15px] rounded-sm',
  lg: 'px-10 py-5 text-base rounded-sm',
  pill: 'h-14 px-6 rounded-full text-[15px]',
  // Compact sizes for utility/chip buttons.
  xs: 'h-8 px-3 text-xs rounded-sm',
  pillSm: 'px-4 py-2 text-sm rounded-sm',
  iconSm: 'h-10 w-10 text-sm rounded-sm',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  font = 'sans',
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        base,
        variants[variant],
        sizes[size],
        font === 'eng' && 'font-eng',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
