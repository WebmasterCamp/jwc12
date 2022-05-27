import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { DefaultSeoConfig } from '../utils/defaultSeoConfig'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as fbq from '../lib/fpixel'
import {
  GetPDPAConsentCookie,
  PDPAConsentCookies,
  SetPDPAConsentCookie,
} from '../utils/pdpa'
import { CookieConsent } from '../components/CookieConsent'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [PDPAConsent, setPDPAConsent] = useState<
    PDPAConsentCookies | undefined
  >(undefined)

  useEffect(() => {
    const pdpaConsent = GetPDPAConsentCookie()
    setPDPAConsent(pdpaConsent)
  }, [])

  // useEffect(() => {
  //   // This pageview only triggers the first time (it's important for Pixel to have real information)
  //   fbq.pageview()

  //   const handleRouteChange = () => {
  //     fbq.pageview()
  //   }

  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <>
      {PDPAConsent?.g_analytics && (
        <>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-42284958-3"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}       
          
          gtag('js', new Date());
          gtag('config', 'UA-42284958-3');
        `}
          </Script>
        </>
      )}
      {PDPAConsent?.mt_pixel && (
        <>
          <Head>
            <noscript>
              <img
                height="1"
                width="1"
                alt="Facebook Pixel"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${fbq.FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </Head>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `}
          </Script>
        </>
      )}
      <CookieConsent
        consent={PDPAConsent}
        setConsent={(consent) => {
          setPDPAConsent(consent)
          SetPDPAConsentCookie(consent)
        }}
      />
      <DefaultSeo {...DefaultSeoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
