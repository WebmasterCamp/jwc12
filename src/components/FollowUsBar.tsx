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
    <div className={clsx('inline-block space-x-4 text-xl', className)}>
      <span>ติดต่อเราที่</span>
      <a href="https://www.facebook.com/jwcth" className="hover:text-gray-200">
        <Icon
          icon={FacebookIcon}
          className="mr-3 inline text-2xl sm:text-3xl"
          inline
        />
        <span className="hidden font-bold md:inline-block">
          Junior Webmaster Camp
        </span>
      </a>
      <a href="https://twitter.com/jwcth" className="hover:text-gray-200">
        <Icon
          icon={TwitterIcon}
          className="mr-3 inline text-2xl sm:text-3xl"
          inline
        />
        <span className="hidden font-bold md:inline-block">@jwcth</span>
      </a>
      <a
        href="https://www.instagram.com/jwcth/"
        className="hover:text-gray-200"
      >
        <Icon
          icon={InstagramIcon}
          className="mr-3 inline text-2xl sm:text-3xl"
          inline
        />
        <span className="hidden font-bold md:inline-block">@jwcth</span>
      </a>
    </div>
  )
}
