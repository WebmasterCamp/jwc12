import { ImgHTMLAttributes } from 'react'

export function Logo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <picture>
      <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
      <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
      <img src="/images/jwc12-logo.png" alt="Junior Webmaster Camp 12" {...props} />
    </picture>
  )
}
