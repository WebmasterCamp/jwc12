import { HTMLAttributes } from 'react'

import clsx from 'clsx'

export const Paper: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx('bg-white rounded-md w-full p-5 sm:p-8 md:p-10 text-black', rest.className)}
    >
      {children}
    </div>
  )
}
