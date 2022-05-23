import { Icon } from '@iconify/react'
import FacebookIcon from '@iconify/icons-fa6-brands/facebook'
import TwitterIcon from '@iconify/icons-fa6-brands/twitter'
import InstagramIcon from '@iconify/icons-fa6-brands/instagram'
import { FunctionComponent } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
}

export const FollowUsBar: FunctionComponent<Props> = ({ className = '' }) => {
  return (
    <div className={clsx('inline-block text-xl space-x-4', className)}>
      <span>ติดต่อเราที่</span>
      <span>
        <Icon icon={FacebookIcon} className="text-3xl sm:text-4xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">Junior Webmaster Camp</span>
      </span>
      <span>
        <Icon icon={TwitterIcon} className="text-3xl sm:text-4xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">@jwcth</span>
      </span>
      <span>
        <Icon icon={InstagramIcon} className="text-3xl sm:text-4xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">@jwcth</span>
      </span>
    </div>
  )
}
