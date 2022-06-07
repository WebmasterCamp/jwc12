import Link from 'next/link'

import clsx from 'clsx'

interface LogoProps {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <header className={clsx(className)}>
      <Link href="/" passHref>
        <a>
          <picture>
            <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
            <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
            <img src="/images/jwc12-logo.png" alt="Junior Webmaster Camp 12" className="h-16" />
          </picture>
        </a>
      </Link>
    </header>
  )
}
