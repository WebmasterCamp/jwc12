import { DefaultSeoProps } from 'next-seo'

export const DefaultSeoConfig: DefaultSeoProps = {
  defaultTitle: 'Junior Webmaster Camp 12',
  description: 'JWC 12',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://jwc.in.th',
  },
  facebook: {
    appId: '',
  },
  twitter: {
    handle: '@jwcth',
    site: '@jwcth',
    cardType: 'summary_large_image',
  },
}
