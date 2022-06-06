import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'

export interface TabItem {
  label: string
  index: number
  active?: boolean
  disabled?: boolean
}

export const TabItem: FunctionComponent<TabItem> = ({ label, index, active, disabled }) => {
  const router = useRouter()

  const handleClick = () => {
    if (!disabled) router.push(`/register/step/${index}`)
  }

  return (
    <div
      className={clsx(
        'px-4 py-2 flex flex-1 items-center justify-center md:justify-start space-x-2 transition-colors',
        active ? 'bg-gold hover:bg-gold-dark text-brown-dark font-bold' : 'bg-white text-black',
        disabled && 'cursor-default hover:bg-white',
        !disabled && !active && 'cursor-pointer hover:bg-gray-200'
      )}
      onClick={handleClick}
    >
      <span
        className={clsx(
          'rounded-full p-4 text-md md:text-sm leading-none flex items-center justify-center w-5 h-5 bg-transparent',
          active ? 'font-bold' : 'text-gray-500'
        )}
      >
        {index}
      </span>
      <span className={clsx('text-sm select-none hidden md:block')}>{label}</span>
    </div>
  )
}

export interface TabProps {
  furthestStep: number
  currentStep: number
  children: React.ReactNode
}

export const Tab: FunctionComponent<TabProps> = ({ children, furthestStep, currentStep }) => {
  return (
    <div className="flex flex-row w-full divide-x-0 sm:divide-x divide-solid divide-gray-300 mb-6 rounded-md overflow-x-hidden">
      {React.Children.map(children, (child, index) => {
        const step = index + 1
        return React.cloneElement(child as React.ReactElement, {
          active: currentStep === step,
          disabled: step > furthestStep,
        })
      })}
    </div>
  )
}
