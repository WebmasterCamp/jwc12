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
      <a href="https://www.facebook.com/jwcth" className="hover:text-gray-200">
        <Icon icon={FacebookIcon} className="text-2xl sm:text-3xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">Junior Webmaster Camp</span>
      </a>
      <a href="https://twitter.com/jwcth" className="hover:text-gray-200">
        <Icon icon={TwitterIcon} className="text-2xl sm:text-3xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">@jwcth</span>
      </a>
      <a href="https://www.instagram.com/jwcth/" className="hover:text-gray-200">
        <Icon icon={InstagramIcon} className="text-2xl sm:text-3xl inline mr-3" inline />
        <span className="hidden md:inline-block font-bold">@jwcth</span>
      </a>
    </div>
  )
}
