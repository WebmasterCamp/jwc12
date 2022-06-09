import { FunctionComponent } from 'react'

import clsx from 'clsx'

const maxWidthMapping = {
  xs: `max-w-xs`,
  sm: `max-w-sm`,
  md: `max-w-md`,
  lg: `max-w-lg`,
  xl: `max-w-xl`,
  '2xl': `max-w-2xl`,
  '3xl': `max-w-3xl`,
  '4xl': `max-w-4xl`,
  '5xl': `max-w-5xl`,
  '6xl': `max-w-6xl`,
  '7xl': `max-w-7xl`,
  full: `max-w-full`,
}

type MaxWidth = keyof typeof maxWidthMapping
export interface ContainerProps {
  className?: string
  children: React.ReactNode
  maxWidth?: MaxWidth
  belowNavbar?: boolean
}

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  maxWidth = 'full',
  className,
  belowNavbar = false,
}) => {
  return (
    <div
      className={clsx(
        className,
        belowNavbar ? 'min-h-screen-navbar' : 'min-h-screen',
        'relative w-full flex flex-col text-white p-5 m-auto',
        maxWidth && maxWidthMapping[maxWidth]
      )}
    >
      {children}
    </div>
  )
}
