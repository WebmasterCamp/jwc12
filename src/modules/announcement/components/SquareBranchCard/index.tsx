import Link from 'next/link'

import { BranchType } from '@/modules/register/types'

export const SquareBranchCard: React.FC<{ branch: BranchType }> = ({ branch }) => {
  return (
    <Link passHref href={`/announcement?branch=${branch}`}>
      <a className="hover:scale-105 transition-transform duration-300">
        <img src={`/images/square/${branch}.png`} alt={branch} />
      </a>
    </Link>
  )
}
