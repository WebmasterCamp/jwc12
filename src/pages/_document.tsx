import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { FB_PIXEL_ID } from '../lib/fpixel'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="1"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;300;400;500;700&family=IBM+Plex+Sans+Thai+Looped:wght@100;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#8E269F" />
          <link rel="icon" href="/images/favicon-4.svg" type="image/svg+xml" />
          <noscript>
            <img
              height="1"
              width="1"
              alt="Facebook Pixel"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
