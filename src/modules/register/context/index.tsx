import {
  BaseSyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import { useAuthStore } from '@/auth/store'
import { getRegistration, updateAnswers } from '@/lib/db'

import {
  AdditionalQuestionModel,
  AdditionalQuestionSchema,
  additionalQuestions,
} from '../questions/additional'
import { BasicQuestionModel, BasicQuestionSchema, basicQuestions } from '../questions/basic'
import { ContentQuestionModel, ContentQuestionSchema, contentQuestions } from '../questions/content'
import { CoreQuestionModel, CoreQuestionSchema, coreQuestions } from '../questions/core'
import { DesignQuestionModel, DesignQuestionSchema, designQuestions } from '../questions/design'
import {
  MarketingQuestionModel,
  MarketingQuestionSchema,
  marketingQuestions,
} from '../questions/marketing'
import {
  ProgrammingQuestionModel,
  ProgrammingQuestionSchema,
  programmingQuestions,
} from '../questions/programming'
import { BranchType, Question } from '../types'

interface RegisterContextData {
  ready: boolean
  step: number
  form?: UseFormReturn<CoreQuestionModel>
  question?: Question
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  saveAnswers: () => void
}

interface RegisterProviderProps {
  step: number
  children: React.ReactNode
  branch?: BranchType
}

export const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData)

export const useRegister = () => useContext(RegisterContext)

export const RegisterProvider: React.FC<RegisterProviderProps> = ({ step, branch, children }) => {
  const { updateStep } = useAuthStore()
  /**
   * First Step form
   */
  const basicForm = useForm<BasicQuestionModel>({
    resolver: yupResolver(BasicQuestionSchema),
  })

  /**
   * Second Step form
   */
  const addionalForm = useForm<AdditionalQuestionModel>({
    resolver: yupResolver(AdditionalQuestionSchema),
  })

  /**
   * Third Step form
   */
  const coreQuestionForm = useForm<CoreQuestionModel>({
    resolver: yupResolver(CoreQuestionSchema),
  })

  /**
   * 4 Branches Questions
   */
  const programmingQuestionForm = useForm<ProgrammingQuestionModel>({
    resolver: yupResolver(ProgrammingQuestionSchema),
  })
  const designQuestionForm = useForm<DesignQuestionModel>({
    resolver: yupResolver(DesignQuestionSchema),
  })
  const contentQuestionForm = useForm<ContentQuestionModel>({
    resolver: yupResolver(ContentQuestionSchema),
  })
  const marketingQuestionForm = useForm<MarketingQuestionModel>({
    resolver: yupResolver(MarketingQuestionSchema),
  })

  const form = useMemo(() => {
    if (step === 1) return basicForm
    if (step === 2) return addionalForm
    if (step === 3) return coreQuestionForm
    if (step === 4) {
      if (branch === BranchType.PROGRAMMING) return programmingQuestionForm
      if (branch === BranchType.DESIGN) return designQuestionForm
      if (branch === BranchType.CONTENT) return contentQuestionForm
      if (branch === BranchType.MARKETING) return marketingQuestionForm
    }
    throw new Error('Invalid step or branch')
  }, [step, branch])

  const question = useMemo(() => {
    if (step === 1) return basicQuestions
    if (step === 2) return additionalQuestions
    if (step === 3) return coreQuestions
    if (step === 4) {
      if (branch === BranchType.PROGRAMMING) return programmingQuestions
      if (branch === BranchType.DESIGN) return designQuestions
      if (branch === BranchType.CONTENT) return contentQuestions
      if (branch === BranchType.MARKETING) return marketingQuestions
    }
    throw new Error('Invalid step or branch')
  }, [step, branch])

  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function restoreForm() {
      setReady(false)
      const { answers } = await getRegistration()
      const keys = Object.keys(form.getValues())
      keys.forEach((key) => {
        if (key in answers) {
          form.setValue(key, answers[key])
        }
      })
      setReady(true)
    }
    restoreForm()
  }, [form])

  useEffect(() => {
    // update current step
    updateStep(step)
  }, [step])

  const saveAnswers = useCallback(() => {
    if (!ready) return
    const values = form.getValues()
    updateAnswers(values)
  }, [ready, form.getValues])

  const success: SubmitHandler<CoreQuestionModel> = (data) => {
    console.log('Submit Success', data)
    updateStep(step + 1, step + 1)
  }

  const error: SubmitErrorHandler<CoreQuestionModel> = (data, error) => {
    console.log('Error', data)
    toast.error('คุณกรอกข้อมูลไม่ครบถ้วน')
  }

  return (
    <RegisterContext.Provider
      value={{
        ready,
        step,
        form,
        question,
        submit: form.handleSubmit(success, error),
        saveAnswers,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}
