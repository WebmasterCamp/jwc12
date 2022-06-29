import { Fragment, ReactNode } from 'react'

import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import CrossIcon from '@iconify/icons-akar-icons/cross'
import { Icon } from '@iconify/react'

import { BranchType } from '@/modules/register/types'

import { Button, LinkButton } from './Button'

interface Props {
  open: boolean
  onClose: () => void
  branch: BranchType
  title: string
  description: string
  count: number
  questions: ReactNode[]
}

export const BranchDialog: React.FunctionComponent<Props> = ({
  open,
  onClose,
  branch,
  title,
  description,
  count,
  questions,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="z-[200]">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-[199]" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-8 z-[200]">
            <Dialog.Panel className="flex flex-col justify-between w-full lg:w-1/2 relative rounded-2xl overflow-hidden">
              <div className="bg-white space-y-8 p-8 mx-auto max-h-[calc(100vh_-_72px)] overflow-y-scroll">
                <div className="flex justify-between items-center mb-8">
                  <Dialog.Title className="font-bold text-lg lg:text-3xl text-brown-dark font-heading">
                    {title}
                  </Dialog.Title>
                  <Icon icon={CrossIcon} onClick={onClose} className="text-3xl cursor-pointer" />
                </div>
                <Dialog.Description className="mb-4">{description}</Dialog.Description>
                {questions}
                <div className="h-[150px] lg:h-[100px]" />
              </div>
              <div className="flex flex-col lg:flex-row gap-8 justify-between absolute p-8 bottom-0 bg-white border-t-2 w-full">
                <span className="font-bold text-2xl lg:text-3xl text-center text-brown-dark font-heading">
                  สมัครแล้ว {count} คน
                </span>
                <Link href={`/campers/${branch}`} passHref>
                  <LinkButton className="register-button" color="gold">
                    ประกาศผลผู้ผ่านการคัดเลือก
                  </LinkButton>
                </Link>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
