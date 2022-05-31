import { FunctionComponent, forwardRef } from 'react'

import clsx from 'clsx'

export type ButtonVariants = 'primary' | 'outlined'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
}

export const Button: FunctionComponent<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...rest }, ref) => {
    return (
      <button
        type="button"
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'rounded-md px-5 py-2 font-medium transition-colors',
          variant === 'outlined' &&
            'border border-primary bg-white text-primary-accent hover:bg-purple-50',
          variant === 'primary' && 'bg-primary text-white hover:bg-primary-accent'
        )}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'button'
