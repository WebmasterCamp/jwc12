import { FunctionComponent, useEffect } from 'react'

import Link from 'next/link'

import { Transition } from '@headlessui/react'

import { useConsentStore } from '@/stores/consents'

import { Button } from './Button'
import { CookieConsentSettingDialog } from './CookieConsentSettingDialog'

export const CookieConsent: FunctionComponent = () => {
  const { open, setOpenSettings, initialize, setOpen, openSettings, setConsentCookie } =
    useConsentStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleSubmit = () => {
    setConsentCookie({
      mt_pixel: 'grant',
      ad_storage: 'granted',
      analytics_storage: 'granted',
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
          <div className="mx-auto flex max-w-xl flex-col rounded-md bg-white p-4 px-5 text-sm text-black shadow-2xl">
            <p>
              เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
              คุณสามารถศึกษารายละเอียดได้ที่{' '}
              <Link href="/policy">
                <a className="underline">นโยบายความเป็นส่วนตัว</a>
              </Link>{' '}
              และสามารถจัดการความเป็นส่วนตัวเองได้ของคุณได้เองโดยคลิกที่ตั้งค่า
            </p>
            <div className="mt-3 flex flex-row justify-end gap-5">
              <Button variant="outlined" onClick={handleOpen}>
                ตั้งค่า
              </Button>
              <Button onClick={handleSubmit}>ยอมรับ</Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
