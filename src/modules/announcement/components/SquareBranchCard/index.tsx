import Link from 'next/link'

import { BranchType } from '@/modules/register/types'

export interface SquareBranchCardProps {
  branch: BranchType
  selected: boolean
}

export const SquareBranchCard: React.FC<SquareBranchCardProps> = ({ branch, selected }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link passHref href={`/announcement?branch=${branch}`}>
        <a className="hover:scale-105 transition-transform duration-300">
          <img src={`/images/square/${branch}.png`} alt={branch} />
        </a>
      </Link>
      {selected && <Caret />}
    </div>
  )
}

function Caret() {
  return (
    <svg
      className="hidden sm:block"
      width="28"
      height="25"
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 0L28 25H0L14 0Z" fill="white" />
    </svg>
  )
}
