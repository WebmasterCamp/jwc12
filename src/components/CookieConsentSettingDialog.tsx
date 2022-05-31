import { Fragment, FunctionComponent } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { ConsentKeys } from '@/lib/gtm'
import { useConsentStore } from '@/stores/consents'

import { CookieConsentSection } from './CookieSection'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export const CookieConsentSettingDialog: FunctionComponent<Props> = ({ isOpen, closeModal }) => {
  const { consents, setConsentCookie, setOpenSettings } = useConsentStore()

  const handleSubmitConsent = () => {
    setOpenSettings(false)
  }

  const handleChangeConsent = (name: ConsentKeys) => (checked: boolean) => {
    setConsentCookie({ ...consents, [name]: checked ? 'granted' : 'denied' })
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
                      <div className="text-primary">เปิดใช้งานตลอด</div>
                    </div>
                    <div className="mt-3 text-sm">
                      คุกกี้มีความจำเป็นสำหรับการทำงานของเว็บไซต์
                      เพื่อให้คุณสามารถใช้ได้อย่างเป็นปกติ และเข้าชมเว็บไซต์
                      คุณไม่สามารถปิดการทำงานของคุกกี้นี้ในระบบเว็บไซต์ของเราได้
                    </div>
                  </div>
                  <CookieConsentSection
                    checked={consents.ad_storage === 'granted' ?? false}
                    onChange={handleChangeConsent('ad_storage')}
                    title="คุกกี้โฆษณาและการตลาด"
                    content="คุกกี้ประเภทนี้จัดเก็บตัวเลือกการเข้าถึงเว็บไซต์ของผู้ใช้ และใช้เป็นพื้นฐานในการปรับแต่งหน้าของเว็บไซต์เพื่อนำเสนอโฆษณาที่เกี่ยวข้องกับคุณมากที่สุด เช่น โดยการเลือกแสดงโฆษณาสำหรับสินค้าที่คุณสนใจ การป้องกันหรือจำกัดจำนวนครั้งที่โฆษณาปรากฏบนหน้าเว็บไซต์เพื่อประเมินประสิทธิภาพของโฆษณาได้ดียิ่งขึ้น"
                  />
                  <CookieConsentSection
                    checked={consents.analytics_storage === 'granted' ?? false}
                    onChange={handleChangeConsent('analytics_storage')}
                    title="คุกกี้เพื่อการวิเคราะห์"
                    content="คุกกี้ประเภทนี้จะทำการเก็บข้อมูลการใช้งานเว็บไซต์ของคุณ เพื่อเป็นประโยชน์ในการวัดผล ปรับปรุงและพัฒนาประสบการณ์ที่ดีในการใช้งานเว็บไซต์ ถ้าหากท่านไม่ยินยอมให้เราใช้คุกกี้นี้เราจะไม่สามารถวัดผล ปรังปรุงและพัฒนาเว็บไซต์ได้"
                  />

                  <CookieConsentSection
                    checked={consents.mt_pixel === 'granted' ?? false}
                    onChange={handleChangeConsent('mt_pixel')}
                    title="คุกกี้เพื่อปรับเนื้อหาให้เข้ากับกลุ่มเป้าหมาย"
                    content="คุกกี้ประเภทนี้จะเก็บข้อมูลต่าง ๆ รวมทั้งข้อมูลวส่วนบุคคลเกี่ยวกับตัวคุณเพื่อเราสามารถนำมาวิเคราะห์ และนำเสนอเนื้อหา ให้ตรงกับความเหมาะสมกับความสนใจของคุณ ถ้าหากคุณไม่ยินยอมเราจะไม่สามารถนำเสนอเนื้อหาและโฆษณาได้ไม่ตรงกับความสนใจของคุณ"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={handleSubmitConsent}
                  >
                    บันทึกการตั้งค่า
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
