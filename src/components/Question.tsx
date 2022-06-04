import { useState } from 'react'

import Cross from '@iconify/icons-akar-icons/cross'
import Plus from '@iconify/icons-akar-icons/plus'
import { Icon } from '@iconify/react'

interface Props {
  title: string
  children: React.ReactNode
}

export const Question: React.FunctionComponent<Props> = ({ title = '', children }) => {
  const [shown, setShown] = useState(false)
  const toggle = () => setShown((s) => !s)
  return (
    <div>
      <div
        className="flex justify-between items-center font-heading border-white border-y py-4"
        onClick={toggle}
      >
        <h3 className="font-bold text-2xl">{title}</h3>
        <Icon className="text-2xl" icon={shown ? Cross : Plus}></Icon>
      </div>
      {shown && <div className="p-4">{children}</div>}
    </div>
  )
}
