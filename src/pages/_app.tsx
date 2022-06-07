import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { ParallaxProvider } from 'react-scroll-parallax'

import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { CookieConsent } from '@/components/CookieConsent'
import { RegistrationDataProvider } from '@/db'
import { GTM } from '@/lib/gtm'
import { GOOGLE_TAG_MANAGER_CONTAINER_ID } from '@/utils/env'

import '../styles/globals.css'
import { DefaultSeoConfig } from '../utils/defaultSeoConfig'

function MyApp({ Component, pageProps }: AppProps) {
  const gtmRef = useRef(false)

  useEffect(() => {
    if (gtmRef.current === false) {
      GTM.initialize({ gtmId: GOOGLE_TAG_MANAGER_CONTAINER_ID })
    }
    gtmRef.current = true
  }, [])

  return (
    <RegistrationDataProvider>
      <DefaultSeo {...DefaultSeoConfig} />
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
      <CookieConsent />
      <Toaster />
    </RegistrationDataProvider>
  )
}

export default MyApp
