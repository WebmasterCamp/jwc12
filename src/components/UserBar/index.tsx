import React, { Fragment, useMemo } from 'react'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

interface UserBarProps {
  signOut: () => void
  displayName?: string
  photoURL?: string
}

export const UserBar: React.FC<UserBarProps> = ({ displayName, photoURL, signOut }) => {
  const shortName = useMemo(() => {
    return displayName ? displayName.split(' ')[0] : 'user'
  }, [displayName])

  const firstLetter = useMemo(() => {
    return displayName ? displayName.split(' ')[0][0] : 'O'
  }, [displayName])

  return (
    <Menu as="div" className={clsx('relative w-fit')}>
      <div className="flex flex-col gap-2 ">
        <Menu.Button
          className={clsx(
            'inline-flex rounded-full justify-between items-center gap-x-2',
            'shadow-sm px-5 py-2 bg-white hover:bg-gray-50 focus:outline-none'
          )}
        >
          {photoURL ? (
            <img src={photoURL} width="24" height="24" alt="" />
          ) : (
            <div className="w-[24px] h-[24px] rounded-full bg-primary leading-none flex items-center justify-center">
              {firstLetter}
            </div>
          )}
          <p className="text-primary font-medium">{shortName}</p>
        </Menu.Button>
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
            'origin-top absolute right-0 mt-2 rounded-md overflow-hidden transition-colors',
            'shadow-lg bg-white focus:outline-none z-50'
          )}
        >
          <Menu.Item>
            <span
              className={clsx(
                'text-gray-700',
                'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
              )}
              onClick={signOut}
            >
              ออกจากระบบ
            </span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
