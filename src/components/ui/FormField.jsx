import { cn } from '../../design/cn'

export function FormLabel({ htmlFor, required, children, className, size = 'sm' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block font-bold text-gray-900 mb-2',
        size === 'sm' ? 'text-xs text-gray-700' : 'text-sm',
        className,
      )}
    >
      {children}
      {required && <span className="text-amber-600"> *</span>}
    </label>
  )
}

const fieldBase =
  'w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm text-gray-900 focus:bg-white transition-colors placeholder:text-gray-400'

export function Input({ className, ...rest }) {
  return <input className={cn(fieldBase, className)} {...rest} />
}

export function Textarea({ className, rows = 4, ...rest }) {
  return <textarea rows={rows} className={cn(fieldBase, 'resize-none', className)} {...rest} />
}

export function Radio({ name, value, label, defaultChecked, className, ...rest }) {
  return (
    <label className={cn('flex items-center cursor-pointer group', className)}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-600"
        {...rest}
      />
      <span className="ml-3 text-sm text-gray-700 group-hover:text-amber-600 transition-colors font-medium">
        {label}
      </span>
    </label>
  )
}

export function Checkbox({ id, label, className, ...rest }) {
  return (
    <div className={cn('flex items-start', className)}>
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-600"
          {...rest}
        />
      </div>
      <label htmlFor={id} className="ml-2 text-xs text-gray-500 cursor-pointer">
        {label}
      </label>
    </div>
  )
}
