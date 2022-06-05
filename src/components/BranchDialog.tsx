import { Dialog } from '@headlessui/react'
import CrossIcon from '@iconify/icons-akar-icons/cross'
import { Icon } from '@iconify/react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  description: string
}

export const BranchDialog: React.FunctionComponent<Props> = ({
  open,
  onClose,
  title,
  description,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="z-[200]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-[200]" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center p-8">
          <Dialog.Panel className="w-full lg:w-1/2">
            <div className="bg-white p-8 mx-auto rounded">
              <div className="flex justify-between items-center mb-8">
                <Dialog.Title className="font-bold text-3xl text-brown-dark font-heading">
                  {title}
                </Dialog.Title>
                <Icon icon={CrossIcon} onClick={onClose} className="text-3xl cursor-pointer" />
              </div>
              <Dialog.Description>{description}</Dialog.Description>
              {/* TODO: Insert questions here */}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
