import { FunctionComponent, forwardRef } from 'react'

import clsx from 'clsx'

export type InputVariants = 'outlined'

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  variant?: InputVariants
  label?: string
  error?: string
}

export const Input: FunctionComponent<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outlined', label, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label htmlFor={rest.id}>{label}</label>}
        <input
          {...rest}
          ref={ref}
          className={clsx(
            rest.className,
            'px-3 py-2 placeholder-gray-300 text-slate-600 relative bg-white',
            'rounded-md text-sm border-2 border-gray-300 focus:border-primary w-full',
            'outline-none focus:outline-none transition-colors',
            !!error ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {!!error && <div className="text-red-500 text-xs italic">{error}</div>}
      </div>
    )
  }
)

Input.displayName = 'button'
