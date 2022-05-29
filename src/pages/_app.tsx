import { useEffect, useState } from 'react'

import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
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
