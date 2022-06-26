import { HTMLAttributes, forwardRef } from 'react'

import clsx from 'clsx'

export const Paper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Paper(
  props,
  ref
) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={clsx('bg-white rounded-md w-full p-5 sm:p-8 md:p-10 text-black', className)}
      {...rest}
    />
  )
})
