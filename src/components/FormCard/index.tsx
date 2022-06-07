import { FunctionComponent } from 'react'

import clsx from 'clsx'

export interface FormCardProps {
  className?: string
  children: React.ReactNode
}

export const FormCard: FunctionComponent<FormCardProps> = ({ children, className }) => {
  return (
    <div className={clsx(className, 'bg-white rounded-md w-full p-5 sm:p-8 md:p-10')}>
      {children}
    </div>
  )
}
