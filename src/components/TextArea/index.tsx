import { FunctionComponent, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import { ErrorMessage } from '../ErrorMessage'
import { RequireMark } from '../RequireMark/indext'

export type TextAreaVariants = 'outlined'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextAreaVariants
  label?: ReactNode
  error?: string
  noMark?: boolean
}

export const TextArea: FunctionComponent<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ variant = 'outlined', label, error, noMark, ...rest }, ref) => {
  console.log(rest.name, rest.required, noMark)
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={rest.id} className="inline">
          {label} {rest.required && !noMark && <RequireMark />}
        </label>
      )}
      <textarea
        {...rest}
        ref={ref}
        className={clsx(
          rest.className,
          'px-3 py-2 placeholder-gray-300 text-slate-600 relative bg-white',
          'rounded-md text-sm border-2 border-gray-300 focus:border-gold-darker w-full',
          'outline-none focus:outline-none transition-colors',
          !!error ? 'border-red-500' : 'border-gray-300'
        )}
      />
      <ErrorMessage message={error} />
    </div>
  )
})

TextArea.displayName = 'TextArea'
