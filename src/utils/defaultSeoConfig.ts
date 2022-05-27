import { DefaultSeoProps } from 'next-seo'

const BASE_URL = process.env.BASE_URL || 'https://12.jwc.in.th'
const MODE = process.env.MODE || 'production'
const isNoFollow = MODE === 'DEVELOPMENT' || MODE === 'STAGING'

export const DefaultSeoConfig: DefaultSeoProps = {
  defaultTitle: 'Junior Webmaster Camp 12',
  titleTemplate: '%s | Junior Webmaster Camp 12',
  description:
    'ค่ายทำเว็บที่เด็กม.ปลาย พลาดไม่ได้!! กับโอกาสในการพัฒนาและลิขิตอนาคตใน Junior Webmaster Camp ครั้งที่ 12',
  dangerouslySetAllPagesToNoFollow: isNoFollow,
  dangerouslySetAllPagesToNoIndex: isNoFollow,
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/og/og_image.jpg`,
      },
    ],
  },
  twitter: {
    handle: '@jwcth',
    site: '@jwcth',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      property: 'twitter:image',
      content: `${BASE_URL}/images/og/twitter_card.jpg`,
    },
  ],
}
