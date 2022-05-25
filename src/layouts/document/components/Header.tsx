export const Header = () => {
  return (
    <header className="mx-auto mb-8 max-w-screen-xl pt-10">
      <picture>
        <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
        <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
        <img
          src="/images/jwc12-logo.png"
          alt="Junior Webmaster Camp 12"
          className="h-28"
        />
      </picture>
    </header>
  )
}
