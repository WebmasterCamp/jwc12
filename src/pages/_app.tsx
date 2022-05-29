import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Script from 'next/script'

import { GOOGLE_TAG_MANAGER_CONTAINER_ID } from '@/utils/env'

import '../styles/globals.css'
import { DefaultSeoConfig } from '../utils/defaultSeoConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DefaultSeoConfig} />
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GOOGLE_TAG_MANAGER_CONTAINER_ID}');
  `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_CONTAINER_ID}"`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}

export default MyApp
