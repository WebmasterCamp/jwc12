import { getCookie, setCookies } from 'cookies-next'

export interface PDPAConsentCookies {
  g_analytics?: boolean
  mt_pixel?: boolean
}

export const GetPDPAConsentCookie = (): PDPAConsentCookies =>
  JSON.parse(decodeURI((getCookie('pdpa-consent') as string) || '{}') || '{}')

export const SetPDPAConsentCookie = (payload: PDPAConsentCookies): void => {
  setCookies('pdpa-consent', encodeURI(JSON.stringify(payload)), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  })
}
