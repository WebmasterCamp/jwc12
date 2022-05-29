import { FunctionComponent } from 'react'

import Link from 'next/link'

import { Transition } from '@headlessui/react'

import { useConsentStore } from '@/stores/consents'

import { CookieConsentSettingDialog } from './CookieConsentSettingDialog'

export const CookieConsent: FunctionComponent = () => {
  const { open, setOpenSettings, setOpen, openSettings, setConsentCookie } = useConsentStore()

  const handleSubmit = () => {
    setConsentCookie({
      mt_pixel: true,
      ad_storage: true,
      analytics_storage: true,
    })
    setOpen(false)
  }

  const handleClose = () => {
    setOpenSettings(false)
  }

  const handleOpen = () => {
    setOpenSettings(true)
  }

  return (
    <>
      <CookieConsentSettingDialog isOpen={openSettings} closeModal={handleClose} />
      <Transition
        show={open}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed bottom-5 z-30 w-full px-4">
          <div className="mx-auto flex max-w-xl flex-col rounded-md bg-white p-4 px-5 text-sm text-black shadow-lg">
            <p>
              เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
              คุณสามารถศึกษารายละเอียดได้ที่{' '}
              <Link href="/policy">
                <a className="underline">นโยบายความเป็นส่วนตัว</a>
              </Link>{' '}
              และสามารถจัดการความเป็นส่วนตัวเองได้ของคุณได้เองโดยคลิกที่ตั้งค่า
            </p>
            <div className="mt-3 flex flex-row justify-end gap-5">
              <button
                type="button"
                className="rounded-md border border-primary bg-white px-5 py-2 font-medium text-primary-accent hover:bg-purple-50"
                onClick={handleOpen}
              >
                ตั้งค่า
              </button>
              <button
                type="button"
                className="rounded-md bg-primary px-5 py-2 font-medium text-white hover:bg-primary-accent"
                onClick={handleSubmit}
              >
                ยอมรับ
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
