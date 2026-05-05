import { cn } from '../../design/cn'

export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('max-w-layout mx-auto px-6 lg:px-12', className)} {...rest}>
      {children}
    </Tag>
  )
}
