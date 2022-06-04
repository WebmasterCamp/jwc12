import { FunctionComponent } from 'react'

import clsx from 'clsx'

export interface TabItem {
  label: string
  index: number
  active: boolean
}

export const TabItem: FunctionComponent<TabItem> = ({ label, index, active }) => {
  return (
    <div
      className={clsx(
        'px-4 py-2 flex flex-1 items-center justify-center md:justify-start space-x-2 transition-colors',
        active ? 'bg-primary hover:bg-primary-accent' : 'bg-white hover:bg-gray-100'
      )}
    >
      <span
        className={clsx(
          'border rounded-full p-4 text-xs leading-none flex items-center justify-center w-5 h-5',
          active ? 'text-white' : 'text-gray-500'
        )}
      >
        {index}
      </span>
      <span
        className={clsx(
          'text-sm select-none whitespace-nowrap',
          active ? 'text-white' : 'text-black'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export interface TabProps {
  children: React.ReactNode
}

export const Tab: FunctionComponent<TabProps> = ({ children }) => {
  return (
    <div className="flex flex-row w-full divide-x divide-solid divide-gray-300 mb-6 rounded-md overflow-x-auto">
      {children}
    </div>
  )
}
