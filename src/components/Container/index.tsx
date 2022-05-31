import { FunctionComponent } from 'react'

import clsx from 'clsx'

export interface ContainerProps {
  className?: string
  children: React.ReactNode
}

export const Container: FunctionComponent<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx(className, 'relative min-h-screen w-full flex flex-col text-white p-5')}>
      {children}
    </div>
  )
}
