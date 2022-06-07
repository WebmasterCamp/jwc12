import { FunctionComponent } from 'react'

import { Switch } from '@headlessui/react'
import clsx from 'clsx'

export interface CookieConsentSectionProps {
  checked: boolean
  onChange: (checked: boolean) => void
  title: string
  content: string
}

export const CookieConsentSection: FunctionComponent<CookieConsentSectionProps> = ({
  checked,
  onChange,
  title,
  content,
}) => {
  return (
    <div className="border border-t-0 p-4">
      <div className="flex justify-between font-medium">
        <div>{title}</div>
        <Switch
          checked={checked}
          onChange={onChange}
          className={clsx(
            'relative inline-flex h-[24px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
            checked ? 'bg-primary' : 'bg-gray-300'
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
              checked ? 'translate-x-[26px]' : 'translate-x-0'
            )}
          />
        </Switch>
      </div>
      <div className="mt-3 text-sm">{content}</div>
    </div>
  )
}
