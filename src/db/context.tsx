import { ComponentType, ReactNode, createContext, useCallback, useContext } from 'react'

import { Loading } from '@/components/Loading'

import { updateRegistration } from '.'
import { UseDocumentState, useDocument, useRegistrationRef } from './hooks'
import { Registration } from './types'

type RegistrationDataContextValue = UseDocumentState<Registration> & {
  updateStep: (current: number, furthest?: number) => Promise<void>
}

const RegistrationDataContext = createContext<RegistrationDataContextValue>({
  pending: true,
  data: undefined,
  updateStep: async () => {},
})

export function useRegistrationData() {
  return useContext(RegistrationDataContext)
}

export function RegistrationDataProvider({ children }: { children: ReactNode }) {
  const { pending, data } = useRegistrationDoc()

  const updateStep = useCallback(
    async (current: number, furthest?: number) => {
      const { currentStep = 1, furthestStep = 1 } = data || {}

      let shouldUpdate = false
      const update: Partial<Registration> = {}
      if (current !== currentStep) {
        shouldUpdate = true
        update.currentStep = current
      }
      if (furthest && furthest > furthestStep) {
        shouldUpdate = true
        update.furthestStep = furthest
      }
      if (!shouldUpdate) return
      await updateRegistration(update)
    },
    [data]
  )

  return (
    <RegistrationDataContext.Provider value={{ pending, data, updateStep }}>
      {children}
    </RegistrationDataContext.Provider>
  )
}

function useRegistrationDoc() {
  const ref = useRegistrationRef()
  return useDocument(ref)
}

export function withRegistrationData<T extends { registration: Registration | undefined }>(
  Comp: ComponentType<T>
) {
  return function WithRegistrationData(props: Omit<T, 'registration'>) {
    const { data, pending } = useRegistrationData()
    if (pending) {
      return <Loading />
    }
    return <Comp {...(props as T)} registration={data} />
  }
}
