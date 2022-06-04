import React, { FunctionComponent, forwardRef } from 'react'

import clsx from 'clsx'

import { ErrorMessage } from '../ErrorMessage'
import { RequireMark } from '../RequireMark/indext'

export interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  label?: React.ReactNode
  direction?: 'row' | 'column'
  position?: 'start' | 'center' | 'end'
  error?: string
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = forwardRef<
  HTMLInputElement,
  RadioGroupProps
>(
  (
    { direction = 'row', position = 'start', value, label, error, children, required, onChange },
    ref
  ) => {
    return (
      <div
        className={clsx(
          `flex justify-${position} gap-x-7 gap-y-5 w-full flex-wrap`,
          direction === 'row' ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'
        )}
        ref={ref}
      >
        {label && (
          <label className="whitespace-nowrap">
            {label} {required && <RequireMark />}
          </label>
        )}
        <div className="flex gap-x-2 sm:gap-x-5 flex-wrap flex-col sm:flex-row justify-between flex-1">
          {React.Children.map(children, (child, _) => {
            const radioValue: string = (child?.valueOf() as any)?.props.value
            return React.cloneElement(child as React.ReactElement<RadioProps>, {
              onChange,
              selected: value === radioValue,
            })
          })}
          <ErrorMessage message={error} />
        </div>
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export interface RadioProps {
  value: string
  name?: string
  currentValue?: string
  label?: string
  selected?: boolean
  className?: string
  onChange?: (event: any) => void
}

export const Radio: FunctionComponent<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  ({ name, value, label, selected, className, onChange, ...rest }, ref) => {
    const handleClick = (e: any) => {
      e.target.value = value
      onChange?.(e)
    }

    return (
      <div className="flex flex-row gap-x-1 items-center cursor-pointer p-1" onClick={handleClick}>
        <span
          {...rest}
          ref={ref}
          className={clsx(
            'transition-colors ease-in-out duration-200',
            'rounded-full mr-2 w-4 h-4 relative text-sm border-2  focus:border-primary',
            'before:absolute before:top-1/2 before:left-1/2 before:w-2 before:h-2 before:rounded-full',
            'before:transform before:-translate-x-1/2 before:-translate-y-1/2',
            'before:transition-colors before:ease-in-out before:duration-200',
            selected ? 'border-primary before:bg-primary' : 'border-gray-300 before:bg-white',
            className
          )}
        />
        {label && (
          <label onClick={handleClick} className="cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
