import { FunctionComponent, forwardRef } from 'react'

import clsx from 'clsx'

export type ButtonVariants = 'primary' | 'outlined'
export type ButtonColor = 'primary' | 'gold'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  color?: ButtonColor
}

export const Button: FunctionComponent<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', color = 'gold', children, ...rest }, ref) => {
    return (
      <button
        type="button"
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'rounded-md px-5 py-2 font-medium transition-colors',
          variant === 'outlined' &&
            color === 'primary' &&
            `border border-primary bg-white text-primary-accent hover:bg-gray-50`,
          variant === 'primary' &&
            color === 'primary' &&
            `bg-primary text-white hover:bg-primary-accent`,
          variant === 'outlined' &&
            color === 'gold' &&
            `border border-1 border-gold text-gold hover:bg-gold/10 hover:border-gold-dark hover:text-gold-dark`,
          variant === 'primary' && color === 'gold' && `bg-gold text-brown-dark hover:bg-gold-dark`
        )}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
