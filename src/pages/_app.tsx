import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { DefaultSeoConfig } from '../utils/defaultSeoConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DefaultSeoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
