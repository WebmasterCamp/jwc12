import { FunctionComponent } from 'react'

import clsx from 'clsx'

type MaxWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
export interface ContainerProps {
  className?: string
  children: React.ReactNode
  maxWidth?: MaxWidth
}

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  maxWidth = 'full',
  className,
}) => {
  return (
    <div
      className={clsx(
        className,
        'relative min-h-screen w-full flex flex-col text-white p-5 max-w-',
        `max-w-${maxWidth}`
      )}
    >
      {children}
    </div>
  )
}
