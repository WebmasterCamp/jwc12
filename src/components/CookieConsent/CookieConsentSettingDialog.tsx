import { Fragment, FunctionComponent } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { ConsentKeys, GoogleConsent, MetaConsent } from '@/lib/gtm'
import { useConsentStore } from '@/stores/consents'

import { Button } from '../Button'
import { CookieConsentSection } from './CookieSection'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

interface ConsentMap<T> {
  true: T
  false: T
}

const googleConsentMap: ConsentMap<GoogleConsent> = {
  true: 'granted',
  false: 'denied',
}

const metaConsentMap: ConsentMap<MetaConsent> = {
  true: 'grant',
  false: 'revoke',
}

export const CookieConsentSettingDialog: FunctionComponent<Props> = ({ isOpen, closeModal }) => {
  const { consents, setConsentCookie, setOpenSettings } = useConsentStore()

  const handleSubmitConsent = () => {
    setOpenSettings(false)
  }

  const handleChangeConsent =
    <T,>(name: ConsentKeys, mapping: ConsentMap<T>) =>
    (checked: boolean) => {
      setConsentCookie({ ...consents, [name]: mapping[`${checked}`] })
    }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="mb-5 text-lg font-medium leading-6 text-gray-900">
                  ตั้งค่าความเป็นส่วนตัว
                </Dialog.Title>
                <div className="flex flex-col">
                  <div className="border p-4">
                    <div className="flex justify-between font-medium">
                      <div>คุกกี้ที่จำเป็น</div>
                      <div className="text-gold-dark">เปิดใช้งานตลอด</div>
                    </div>
                    <div className="mt-3 text-sm">
                      คุกกี้มีความจำเป็นสำหรับการทำงานของเว็บไซต์
                      เพื่อให้คุณสามารถใช้ได้อย่างเป็นปกติ และเข้าชมเว็บไซต์
                      คุณไม่สามารถปิดการทำงานของคุกกี้นี้ในระบบเว็บไซต์ของเราได้
                    </div>
                  </div>
                  <CookieConsentSection
                    checked={consents.ad_storage === 'granted' ?? false}
                    onChange={handleChangeConsent('ad_storage', googleConsentMap)}
                    title="คุกกี้โฆษณาและการตลาด"
                    content="คุกกี้ประเภทนี้จะทำการจัดเก็บตัวเลือกการเข้าถึงเว็บไซต์ของผู้ใช้ เพื่อใช้เป็นพื้นฐานในการปรับแต่งหน้าของเว็บไซต์เพื่อนำเสนอโฆษณาที่เหมาะสมกับคุณมากที่สุด การป้องกันหรือจำกัดจำนวนครั้งที่โฆษณาจะปรากฏบนหน้าเว็บไซต์เพื่อให้สามารถประเมินประสิทธิภาพของโฆษณาได้ดียิ่งขึ้น"
                  />
                  <CookieConsentSection
                    checked={consents.analytics_storage === 'granted' ?? false}
                    onChange={handleChangeConsent('analytics_storage', googleConsentMap)}
                    title="คุกกี้เพื่อการวิเคราะห์"
                    content="คุกกี้ประเภทนี้จะทำการเก็บข้อมูลการใช้งานเว็บไซต์ของคุณ เพื่อเป็นประโยชน์ในการวัดผล ปรับปรุงและพัฒนาประสบการณ์ที่ดีในการใช้งานเว็บไซต์ ถ้าหากท่านไม่ยินยอมให้เราใช้คุกกี้นี้เราจะไม่สามารถวัดผล ปรังปรุงและพัฒนาเว็บไซต์ได้"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-5">
                  <Button type="button" onClick={handleSubmitConsent}>
                    บันทึกการตั้งค่า
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
