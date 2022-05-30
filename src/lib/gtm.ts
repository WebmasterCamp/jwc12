import TagManager, { TagManagerArgs } from 'react-gtm-module'

type Consent = 'granted' | 'denied'

export interface ConsentParams {
  mt_pixel?: Consent
  ad_storage?: Consent
  analytics_storage?: Consent
}

export type ConsentKeys = keyof ConsentParams

export enum GTMCustomEvent {
  EXAMPLE = 'example',
}

export class GTM {
  static initialize(args: TagManagerArgs) {
    TagManager.initialize(args)
  }

  /**
   * Trigger event 'consent.update' to update consents from cookie named 'consents'
   */
  static consentUpdate() {
    TagManager.dataLayer({
      dataLayer: { event: 'consent.update' },
    })
  }

  static event(event: GTMCustomEvent, data: any) {
    TagManager.dataLayer({
      dataLayer: {
        event,
        ...data,
      },
    })
  }
}
