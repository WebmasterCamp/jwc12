import { forwardRef } from 'react'
import React from 'react'

import clsx from 'clsx'

import { ObjectBoolean } from '@/types'

import { ErrorMessage } from '../ErrorMessage'
import { RequireMark } from '../RequireMark/indext'

export interface CheckboxGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: ObjectBoolean
  label?: React.ReactNode
  direction?: 'row' | 'column'
  position?: 'start' | 'center' | 'end'
  error?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = forwardRef<
  HTMLInputElement,
  CheckboxGroupProps
>(({ direction = 'row', position = 'start', label, required, error, children }, ref) => {
  return (
    <div
      className={clsx(
        `flex gap-x-7 gap-y-2 w-full flex-wrap`,
        position === 'start' && `items-start`,
        position === 'center' && `items-center`,
        position === 'end' && `items-end`,
        direction === 'row' ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'
      )}
      ref={ref}
    >
      {label && (
        <label className="whitespace-nowrap">
          {label} {required && <RequireMark />}
        </label>
      )}
      <div className="flex gap-x-1 sm:gap-x-5 flex-wrap flex-col sm:flex-row justify-between">
        {children}
        <ErrorMessage message={error} />
      </div>
    </div>
  )
})

CheckboxGroup.displayName = 'CheckboxGroup'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  checked?: boolean
  label?: string
}

export const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, checked, className, onChange, ...rest }, ref) => {
    return (
      <div className="flex flex-row gap-x-2 items-center cursor-pointer p-1 select-none">
        <input
          {...rest}
          ref={ref}
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={clsx(
            `accent-white w-4 h-4 relative cursor-pointer checked:bg-gold-darker checked:border-gold-darker`,
            `appearance-none bg-white rounded-sm border-2 border-gray-300`,
            `before:content-['✓'] before:absolute before:bg-transparent before:text-white before:font-bold before:text-xs`,
            `before:w-2 before:h-2 before:flex before:items-center before:justify-center`,
            'before:top-1/2 before:left-1/2',
            'before:transform before:-translate-x-1/2 before:-translate-y-1/2',
            `transition-colors ease-out duration-100`,
            className
          )}
        />
        {label && (
          <label className="cursor-pointer" htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
