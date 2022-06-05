import { ChangeEventHandler, Fragment, ReactNode, useCallback } from 'react'
import { ChangeHandler } from 'react-hook-form'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

import { ErrorMessage } from '../ErrorMessage'

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: ReactNode
  options: string[]
  error?: string
  onChange?: (...event: any[]) => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  name,
  label,
  options,
  error,
  placeholder,
  onChange,
  disabled,
}) => {
  const handleChange = useCallback(
    (option: string) => () => {
      onChange?.({
        target: { value: option, name },
      })
    },
    []
  )

  return (
    <Menu as="div" className={clsx('relative inline-block text-left w-full')}>
      <div>
        {label}
        <div className="flex flex-col gap-2 w-full">
          <Menu.Button
            className={clsx(
              'inline-flex justify-between w-full rounded-md border-2 border-gray-300',
              'shadow-sm px-4 py-2 bg-white text-sm focus:outline-none',
              !!value ? 'text-black' : 'text-gray-300',
              !!error && 'border-red-500 border-2'
            )}
            disabled={disabled}
          >
            {value ? value : placeholder}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>
          <ErrorMessage message={error} />
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'origin-top absolute right-0 mt-2 w-full rounded-md',
            'shadow-lg bg-white ring-2 ring-black ring-opacity-5 focus:outline-none z-50'
          )}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={`${name}_${option}`}>
                <span
                  className={clsx(
                    value === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                  )}
                  onClick={handleChange(option)}
                >
                  {option}
                </span>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
