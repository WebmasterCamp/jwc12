import { FunctionComponent } from 'react'

import clsx from 'clsx'

interface Props {
  className?: string
  children?: React.ReactNode
}

export const Section: FunctionComponent<Props> = ({ className = '', children }) => {
  return <div className={clsx('w-full p-4 lg:p-32 mx-auto my-16', className)}>{children}</div>
}
