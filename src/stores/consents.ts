import { getCookie, setCookies } from 'cookies-next'
import create from 'zustand'

import { ConsentParams, GTM } from '@/lib/gtm'

export interface ConsentStoreProps {
  open: boolean
  openSettings: boolean
  consents: ConsentParams
  setOpen: (open: boolean) => void
  setOpenSettings: (open: boolean) => void
  setConsentCookie: (payload: ConsentParams) => void
}

export const useConsentStore = create<ConsentStoreProps>((set) => {
  const setConsentCookie = (payload: ConsentParams): void => {
    setCookies('consents', JSON.stringify(payload))
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
    open: true,
    openSettings: false,
    consents: {
      mt_pixel: consents?.mt_pixel || 'denied',
      ad_storage: consents?.ad_storage || 'denied',
      analytics_storage: consents?.analytics_storage || 'denied',
    },
    setOpen,
    setOpenSettings,
    setConsentCookie,
  }
})
