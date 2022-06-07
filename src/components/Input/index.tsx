import { FunctionComponent, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import { ErrorMessage } from '../ErrorMessage'
import { RequireMark } from '../RequireMark/indext'

export type InputVariants = 'outlined'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariants
  label?: ReactNode
  error?: string
  noMark?: boolean
}

export const Input: FunctionComponent<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outlined', label, error, noMark, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={rest.id}>
            {label} {rest.required && !noMark && <RequireMark />}
          </label>
        )}
        <input
          {...rest}
          ref={ref}
          className={clsx(
            rest.className,
            'px-3 py-2 placeholder-gray-300 text-cool-gray relative bg-white leading-none',
            'rounded-md text-sm border-2 border-gray-300 focus:border-gold-darker w-full',
            'outline-none focus:outline-none transition-colors',
            !!error ? 'border-red-500' : 'border-gray-300',
            'disabled:bg-gray-100'
          )}
        />
        <ErrorMessage message={error} />
      </div>
    )
  }
)

Input.displayName = 'Input'
