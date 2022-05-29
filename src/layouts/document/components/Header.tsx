import Link from 'next/link'

export const Header = () => {
  return (
    <header className="mx-auto mb-8 flex max-w-screen-xl justify-between pt-10">
      <Link href={'/'}>
        <a>
          <picture>
            <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
            <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
            <img src="/images/jwc12-logo.png" alt="Junior Webmaster Camp 12" className="h-28" />
          </picture>
        </a>
      </Link>
    </header>
  )
}
