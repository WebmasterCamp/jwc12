import {
  BaseSyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import { getRegistration, updateAnswers, updateRegistration, useRegistrationData } from '@/db'

import { stepNames } from '../questions'
import {
  AdditionalQuestionModel,
  AdditionalQuestionSchema,
  additionalQuestions,
} from '../questions/additional'
import { BasicQuestionModel, BasicQuestionSchema, basicQuestions } from '../questions/basic'
import { ContentQuestionModel, ContentQuestionSchema } from '../questions/content'
import { CoreQuestionModel, CoreQuestionSchema, coreQuestions } from '../questions/core'
import { DesignQuestionModel, DesignQuestionSchema } from '../questions/design'
import { MarketingQuestionModel, MarketingQuestionSchema } from '../questions/marketing'
import { ProgrammingQuestionModel, ProgrammingQuestionSchema } from '../questions/programming'
import { BranchType, Question } from '../types'
import { selectBranchQuestion } from '../utils/question'
import { SPECIAL_FIELD } from './constants'

interface RegisterContextData {
  branch: BranchType | null
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
}

export const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData)

export const useRegister = () => useContext(RegisterContext)

export const RegisterProvider: React.FC<RegisterProviderProps> = ({ step, children }) => {
  const router = useRouter()
  const { data: registration, updateStep } = useRegistrationData()
  if (!registration) {
    throw new Error('No registration data')
  }
  const { answers, confirmedBranch: branch } = registration
  const answersRef = useRef(answers)
  useEffect(() => {
    answersRef.current = answers
  }, [answers])

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
    if ((step === 4 || step === 5) && branch) {
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
    if ((step === 4 || step === 5) && branch) {
      return selectBranchQuestion(branch)
    }
    throw new Error('Invalid step or branch')
  }, [step, branch])

  const stepName = stepNames[step - 1]
  useEffect(() => {
    async function restoreForm() {
      const answers = answersRef.current
      const keys = Object.keys(form.getValues())
      const stepAnswers = answers[stepName]
      keys.forEach((key) => {
        if (key in stepAnswers) {
          form.setValue(key, stepAnswers[key])
        }
      })
    }
    restoreForm()
  }, [form, stepName])

  useEffect(() => {
    // update current step
    updateStep(step)
  }, [updateStep, step])

  const { getValues } = form
  const saveAnswers = useCallback(() => {
    const values = getValues()
    updateAnswers(answersRef.current, stepName, values)
  }, [getValues, stepName])

  const success: SubmitHandler<CoreQuestionModel> = async (data) => {
    async function submitStep() {
      console.log('Submit Success', data)
      await updateStep(step + 1, step + 1)
      if (SPECIAL_FIELD.BRANCH in data && !!data[SPECIAL_FIELD.BRANCH]) {
        await updateRegistration({
          confirmedBranch: data[SPECIAL_FIELD.BRANCH] as BranchType,
        })
      }
      router.push(`/register/step/${step + 1}`)
    }
    await toast.promise(submitStep(), {
      loading: 'กำลังบันทึกข้อมูล',
      success: 'บันทึกข้อมูลสำเร็จ',
      error: 'บันทึกข้อมูลไม่สำเร็จ',
    })
  }

  const error: SubmitErrorHandler<CoreQuestionModel> = (error, event) => {
    console.log('Error', error)
    toast.error('คุณกรอกข้อมูลไม่ครบถ้วน')
  }

  return (
    <RegisterContext.Provider
      value={{
        ready: true,
        step,
        form,
        question,
        branch,
        submit: form.handleSubmit(success, error),
        saveAnswers,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}
