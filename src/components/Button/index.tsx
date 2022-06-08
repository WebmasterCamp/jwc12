import { ComponentType, ElementType, ForwardedRef, FunctionComponent, forwardRef } from 'react'

import clsx from 'clsx'

export type ButtonVariants = 'primary' | 'outlined'
export type ButtonColor = 'primary' | 'gold'

export interface ButtonProps {
  variant?: ButtonVariants
  color?: ButtonColor
}

function renderButton<T, P>(
  Component: ElementType,
  ref: ForwardedRef<T>,
  variant: ButtonVariants,
  color: ButtonColor,
  className: string | undefined,
  props: P
) {
  return (
    <Component
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...props}
      ref={ref}
      className={clsx(
        className,
        'rounded-md px-5 py-2 font-medium transition-colors text-center',
        variant === 'outlined' &&
          color === 'primary' &&
          `border border-primary bg-white text-primary-accent hover:bg-gray-50`,
        variant === 'primary' &&
          color === 'primary' &&
          `bg-primary text-white hover:bg-primary-accent`,
        variant === 'outlined' &&
          color === 'gold' &&
          `border border-1 border-gold text-gold hover:bg-gold/10 hover:border-gold-dark hover:text-gold-dark`,
        variant === 'primary' && color === 'gold' && `bg-gold text-brown-dark hover:bg-gold-dark`,
        'disabled:bg-gray-200 disabled:hover:bg-gray-200'
      )}
    />
  )
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ variant = 'primary', color = 'gold', className, ...rest }, ref) => {
  return renderButton('button', ref, variant, color, className, rest)
})
Button.displayName = 'Button'

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant = 'primary', color = 'gold', className, ...rest }, ref) => {
  return renderButton('a', ref, variant, color, className, rest)
})
LinkButton.displayName = 'LinkButton'
