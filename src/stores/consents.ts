import { getCookie, setCookies } from 'cookies-next'
import create from 'zustand'

import { ConsentParams, GTM } from '@/lib/gtm'

export interface ConsentStoreProps {
  open: boolean
  openSettings: boolean
  consents: ConsentParams
  initialize: () => void
  setOpen: (open: boolean) => void
  setOpenSettings: (open: boolean) => void
  setConsentCookie: (payload: ConsentParams) => void
}

const getExpiredDate = () => {
  const now = new Date()
  now.setFullYear(now.getFullYear() + 1)
  return now
}

export const useConsentStore = create<ConsentStoreProps>((set, get) => {
  const initialize = () => {
    const initiallyOpen = typeof window !== 'undefined' ? !getCookie('consents') : false
    if (initiallyOpen) {
      get().setConsentCookie({
        mt_pixel: 'grant',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }
    set((state) => ({ ...state, open: initiallyOpen }))
  }

  const setConsentCookie = (payload: ConsentParams): void => {
    const expires = getExpiredDate()
    setCookies('consents', JSON.stringify(payload), { expires })
    GTM.consentUpdate()
    set((state) => ({ ...state, consents: payload }))
  }

  const setOpen = (open: boolean) => {
    set((state) => ({ ...state, open }))
  }

  const setOpenSettings = (openSettings: boolean) => {
    set((state) => ({ ...state, openSettings }))
  }

  const consents = JSON.parse((getCookie('consents') as string) || '{}') as Partial<ConsentParams>

  return {
    open: false,
    openSettings: false,
    consents: {
      mt_pixel: consents?.mt_pixel || 'revoke',
      ad_storage: consents?.ad_storage || 'denied',
      analytics_storage: consents?.analytics_storage || 'denied',
    },
    initialize,
    setOpen,
    setOpenSettings,
    setConsentCookie,
  }
})
