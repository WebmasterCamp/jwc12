import { FunctionComponent } from 'react'

import clsx from 'clsx'

interface Props {
  className?: string
  noPadding?: boolean
  children?: React.ReactNode
}

export const Section: FunctionComponent<Props> = ({
  className = '',
  noPadding = false,
  children,
}) => {
  return (
    <div className={clsx('w-full lg:p-32 mx-auto my-16', !noPadding && 'p-4', className)}>
      {children}
    </div>
  )
}
