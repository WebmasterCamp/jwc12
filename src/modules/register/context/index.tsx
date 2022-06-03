import { BaseSyntheticEvent, createContext, useContext, useMemo } from 'react'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

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
  step: number
  form: UseFormReturn<CoreQuestionModel>
  question: Question
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

interface RegisterProviderProps {
  step: number
  children: React.ReactNode
  branch?: BranchType
}

export const RegiserContext = createContext<RegisterContextData>({} as RegisterContextData)

export const useRegister = () => useContext(RegiserContext)

export const RegisterProvider: React.FC<RegisterProviderProps> = ({ step, branch, children }) => {
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
    if (step === 2) return addionalForm
    if (step === 3) return coreQuestionForm
    if (step === 4) {
      if (branch === BranchType.PROGRAMMING) return programmingQuestionForm
      if (branch === BranchType.DESIGN) return designQuestionForm
      if (branch === BranchType.CONTENT) return contentQuestionForm
      if (branch === BranchType.MARKETING) return marketingQuestionForm
    }
    return basicForm
  }, [step, branch])

  const question = useMemo(() => {
    if (step === 2) return additionalQuestions
    if (step === 3) return coreQuestions
    if (step === 4) {
      if (branch === BranchType.PROGRAMMING) return programmingQuestions
      if (branch === BranchType.DESIGN) return designQuestions
      if (branch === BranchType.CONTENT) return contentQuestions
      if (branch === BranchType.MARKETING) return marketingQuestions
    }
    return basicQuestions
  }, [step, branch])

  const success: SubmitHandler<CoreQuestionModel> = (data) => {
    console.log('Submit Success', data)
  }

  const error: SubmitErrorHandler<CoreQuestionModel> = (data, error) => {
    console.log('Error', data)
  }

  return (
    <RegiserContext.Provider
      value={{
        step,
        form,
        question,
        submit: form.handleSubmit(success, error),
      }}
    >
      {children}
    </RegiserContext.Provider>
  )
}
