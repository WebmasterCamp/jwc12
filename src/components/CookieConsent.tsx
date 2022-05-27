import { Transition } from '@headlessui/react'
import { setCookies } from 'cookies-next'
import Link from 'next/link'
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { PDPAConsentCookies, SetPDPAConsentCookie } from '../utils/pdpa'
import { CookieConsentSettingDialog } from './CookieConsentSettingDialog'

interface Props {
  consent: PDPAConsentCookies | undefined
  setConsent: (consent: PDPAConsentCookies) => void
}

export const CookieConsent: FunctionComponent<Props> = ({
  consent,
  setConsent,
}) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState<boolean>(false)

  // console.log(consent)

  return (
    <>
      <CookieConsentSettingDialog
        isOpen={isSettingDialogOpen}
        closeModal={() => setIsSettingDialogOpen(!isSettingDialogOpen)}
        consent={consent}
        setConsent={setConsent}
      />
      <Transition
        show={
          consent !== undefined && (!consent.g_analytics || !consent.mt_pixel)
        }
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
              เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
              และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
              คุณสามารถศึกษารายละเอียดได้ที่{' '}
              <Link href={'/policy'}>
                <a className="underline">นโยบายความเป็นส่วนตัว</a>
              </Link>{' '}
              และสามารถจัดการความเป็นส่วนตัวเองได้ของคุณได้เองโดยคลิกที่ตั้งค่า
            </p>
            <div className="mt-3 flex flex-row justify-end gap-5">
              <button
                type="button"
                className="rounded-md border border-[#940FA3] bg-white px-5 py-2 font-serif font-medium text-[#940FA3] hover:bg-[#FDF6FE]"
                onClick={() => setIsSettingDialogOpen(true)}
              >
                ตั้งค่า
              </button>
              <button
                type="button"
                className="rounded-md bg-[#940FA3] px-5 py-2 font-serif font-medium text-white hover:bg-[#660A70]"
                onClick={() =>
                  setConsent({ g_analytics: true, mt_pixel: true })
                }
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
