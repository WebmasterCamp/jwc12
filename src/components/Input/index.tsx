import { FunctionComponent } from 'react'

import clsx from 'clsx'

export type InputVariants = 'priamry' | 'secondary'

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  variant: InputVariants
  label?: string
}

export const Input: FunctionComponent<InputProps> = ({ variant, label, ...rest }) => {
  return (
    <>
      {label && (
        <label htmlFor={rest.id} className="">
          {label}
        </label>
      )}
      <input {...rest} className={clsx(rest.className, '')} />
    </>
  )
}
