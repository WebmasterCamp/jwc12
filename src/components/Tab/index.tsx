import { FunctionComponent } from 'react'

import Link from 'next/link'

import Tippy from '@tippyjs/react'
import clsx from 'clsx'

import { Tooltip } from '../Tooltip'

export interface TabItem {
  label: string
  index: number
  active: boolean
}

export const TabItem: FunctionComponent<TabItem> = ({ label, index, active }) => {
  return (
    <div
      className={clsx(
        'px-4 py-2 flex flex-1 items-center space-x-2 transition-colors',
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
        data-tooltip-target={label}
        className={clsx(
          'text-sm hidden md:block select-none',
          active ? 'text-white' : 'text-black'
        )}
      >
        {label}
      </span>
      <div
        id={label}
        role="tooltip"
        className={clsx(
          'inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700',
          ''
        )}
      >
        {label}
        <div className="tooltip-arrow" />
      </div>
    </div>
  )
}

export interface TabProps {
  children: React.ReactNode
}

export const Tab: FunctionComponent<TabProps> = ({ children }) => {
  return (
    <div className="flex flex-row w-full divide-x divide-solid divide-gray-300 mb-6 rounded-md overflow-hidden">
      {children}
    </div>
  )
}
