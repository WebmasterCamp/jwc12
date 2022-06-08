import { Fragment, ReactNode } from 'react'

import Link from 'next/link'

import { Dialog } from '@headlessui/react'
import CrossIcon from '@iconify/icons-akar-icons/cross'
import { Icon } from '@iconify/react'
import { count } from 'console'

import { Button, LinkButton } from './Button'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  description: string
  count: number
  questions: ReactNode[]
}

export const BranchDialog: React.FunctionComponent<Props> = ({
  open,
  onClose,
  title,
  description,
  count,
  questions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="z-[200]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-[200]" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center p-8">
          <Dialog.Panel className="flex flex-col justify-between w-full lg:w-1/2">
            <div className="bg-white space-y-8 p-8 mx-auto rounded-2xl max-h-[calc(100vh_-_72px)] overflow-y-scroll">
              <div className="flex justify-between items-center mb-8">
                <Dialog.Title className="font-bold text-lg lg:text-3xl text-brown-dark font-heading">
                  {title}
                </Dialog.Title>
                <Icon icon={CrossIcon} onClick={onClose} className="text-3xl cursor-pointer" />
              </div>
              <Dialog.Description className="mb-4">{description}</Dialog.Description>
              {/* TODO: Insert questions here */}
              {questions}
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                <span className="font-bold text-lg lg:text-3xl text-brown-dark font-heading">
                  สมัครแล้ว {count} คน
                </span>
                <Link href="/register" passHref>
                  <LinkButton color="gold">สมัครสาขานี้</LinkButton>
                </Link>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
