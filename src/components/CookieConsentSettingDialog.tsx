import { Dialog, Switch, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { PDPAConsentCookies } from '../utils/pdpa'

interface Props {
  isOpen: boolean
  closeModal: () => void
  consent: PDPAConsentCookies
  setConsent: (consent: PDPAConsentCookies) => void
}

export const CookieConsentSettingDialog: FunctionComponent<Props> = ({
  isOpen,
  closeModal,
  consent,
  setConsent,
}) => {
  const [g_analytics, setGAnalytics] = useState<boolean>(
    consent.g_analytics || true
  )
  const [mt_pixel, setMtPixel] = useState<boolean>(consent.mt_pixel || true)

  useEffect(() => {
    setGAnalytics(consent.g_analytics ?? true)
    setMtPixel(consent.mt_pixel ?? true)
  }, [consent])

  const handleSubmitConsent = () => {
    setConsent({ g_analytics, mt_pixel })
    closeModal()
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
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-medium leading-6 text-gray-900"
                >
                  ตั้งค่าความเป็นส่วนตัว
                </Dialog.Title>

                <div className="flex flex-col">
                  <div className="border p-4">
                    <div className="flex justify-between font-medium">
                      <div>คุกกี้ที่จำเป็น</div>
                      <div className="text-[#940FA3]">เปิดใช้งานตลอด</div>
                    </div>
                    <div className="mt-3 font-serif text-sm">
                      คุกกี้มีความจำเป็นสำหรับการทำงานของเว็บไซต์
                      เพื่อให้คุณสามารถใช้ได้อย่างเป็นปกติ และเข้าชมเว็บไซต์
                      คุณไม่สามารถปิดการทำงานของคุกกี้นี้ในระบบเว็บไซต์ของเราได้
                    </div>
                  </div>
                  <div className="border p-4">
                    <div className="flex justify-between font-medium">
                      <div>คุกกี้เพื่อการวิเคราะห์</div>
                      <Switch
                        checked={g_analytics}
                        onChange={() => setGAnalytics(!g_analytics)}
                        className={clsx(
                          'relative inline-flex h-[24px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
                          g_analytics ? 'bg-[#940FA3]' : 'bg-[#D1D5DB]'
                        )}
                      >
                        <span className="sr-only">
                          Google Analytics Settings
                        </span>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                            g_analytics ? 'translate-x-[26px]' : 'translate-x-0'
                          )}
                        />
                      </Switch>
                    </div>
                    <div className="mt-3 font-serif text-sm">
                      คุกกี้ประเภทนี้จะทำการเก็บข้อมูลการใช้งานเว็บไซต์ของคุณ
                      เพื่อเป็นประโยชน์ในการวัดผล ปรับปรุง
                      และพัฒนาประสบการณ์ที่ดีในการใช้งานเว็บไซต์
                      ถ้าหากท่านไม่ยินยอมให้เราใช้คุกกี้นี้ เราจะไม่สามารถวัดผล
                      ปรังปรุงและพัฒนาเว็บไซต์ได้
                    </div>
                  </div>
                  <div className="border p-4">
                    <div className="flex items-center justify-between font-medium">
                      <div>คุกกี้เพื่อปรับเนื้อหาให้เข้ากับกลุ่มเป้าหมาย</div>
                      <Switch
                        checked={mt_pixel}
                        onChange={() => setMtPixel(!mt_pixel)}
                        className={clsx(
                          'relative inline-flex h-[24px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
                          mt_pixel ? 'bg-[#940FA3]' : 'bg-[#D1D5DB]'
                        )}
                      >
                        <span className="sr-only">Meta Pixel Setting</span>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                            mt_pixel ? 'translate-x-[26px]' : 'translate-x-0'
                          )}
                        />
                      </Switch>
                    </div>
                    <div className="mt-3 font-serif text-sm">
                      คุกกี้ประเภทนี้จะเก็บข้อมูลต่าง ๆ
                      รวมทั้งข้อมูลวส่วนบุคคลเกี่ยวกับตัวคุณเพื่อเราสามารถนำมาวิเคราะห์
                      และนำเสนอเนื้อหา ให้ตรงกับความเหมาะสมกับความสนใจของคุณ
                      ถ้าหากคุณไม่ยินยอมเราจะไม่สามารถนำเสนอเนื้อหาและโฆษณาได้ไม่ตรงกับความสนใจของคุณ
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#940FA3] px-4 py-2 text-sm font-medium text-white hover:bg-[#660A70] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#940FA3] focus-visible:ring-offset-2"
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
