import { getCookie, setCookies } from 'cookies-next'
import create from 'zustand'

export interface ConsentCookies {
  mt_pixel?: boolean
  ad_storage?: boolean
  analytics_storage?: boolean
}

export type ConsentTypes = keyof ConsentCookies

export interface ConsentStoreProps {
  open: boolean
  openSettings: boolean
  consents: ConsentCookies
  setOpen: (open: boolean) => void
  setOpenSettings: (open: boolean) => void
  setConsentCookie: (payload: ConsentCookies) => void
}

export const useConsentStore = create<ConsentStoreProps>((set) => {
  const setConsentCookie = (payload: ConsentCookies): void => {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    setCookies('mt_pixel', payload?.mt_pixel ? 'granted' : 'denied', { expires })
    setCookies('ad_storage', payload?.ad_storage ? 'granted' : 'denied', { expires })
    setCookies('analytics_storage', payload?.analytics_storage ? 'granted' : 'denied', { expires })
    set((state) => ({ ...state, consents: payload }))
  }

  const setOpen = (open: boolean) => {
    set((state) => ({ ...state, open }))
  }

  const setOpenSettings = (openSettings: boolean) => {
    set((state) => ({ ...state, openSettings }))
  }

  return {
    open: true,
    openSettings: false,
    consents: {
      mt_pixel: getCookie('mt_pixel') === 'granted',
      ad_storage: getCookie('ad_storage') === 'granted',
      analytics_storage: getCookie('analytics_storage') === 'granted',
    },
    setOpen,
    setOpenSettings,
    setConsentCookie,
  }
})
