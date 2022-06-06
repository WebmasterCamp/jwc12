import {
  BaseSyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import { updateAnswers, updateRegistration, useRegistrationData } from '@/db'

import { stepNames } from '../questions'
import { AdditionalQuestionSchema, additionalQuestions } from '../questions/additional'
import { BasicQuestionSchema, basicQuestions } from '../questions/basic'
import { ContentQuestionSchema } from '../questions/content'
import { CoreQuestionModel, CoreQuestionSchema, coreQuestions } from '../questions/core'
import { DesignQuestionSchema } from '../questions/design'
import { MarketingQuestionSchema } from '../questions/marketing'
import { ProgrammingQuestionSchema } from '../questions/programming'
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

  const formProps = useMemo<UseFormProps>(() => {
    switch (step) {
      case 1:
        return {
          resolver: yupResolver(BasicQuestionSchema),
          defaultValues: answers.basic,
        }
      case 2:
        return {
          resolver: yupResolver(AdditionalQuestionSchema),
          defaultValues: answers.additional,
        }
      case 3:
        return {
          resolver: yupResolver(CoreQuestionSchema),
          defaultValues: answers.core,
        }
      case 4:
      case 5:
        switch (branch) {
          case BranchType.PROGRAMMING:
            return {
              resolver: yupResolver(ProgrammingQuestionSchema),
              defaultValues: answers.branch,
            }
          case BranchType.DESIGN:
            return {
              resolver: yupResolver(DesignQuestionSchema),
              defaultValues: answers.branch,
            }
          case BranchType.CONTENT:
            return {
              resolver: yupResolver(ContentQuestionSchema),
              defaultValues: answers.branch,
            }
          case BranchType.MARKETING:
            return {
              resolver: yupResolver(MarketingQuestionSchema),
              defaultValues: answers.branch,
            }
        }
    }
    throw new Error('Invalid step or branch')
  }, [answers, step, branch])

  const form = useForm(formProps)

  const question = useMemo(() => {
    if (step === 1) return basicQuestions
    if (step === 2) return additionalQuestions
    if (step === 3) return coreQuestions
    if ((step === 4 || step === 5) && branch) {
      return selectBranchQuestion(branch)
    }
    throw new Error('Invalid step or branch')
  }, [step, branch])

  useEffect(() => {
    // update current step
    updateStep(step)
  }, [updateStep, step])

  const { getValues } = form
  const saveAnswers = useCallback(() => {
    const values = getValues()
    const stepName = stepNames[step - 1]
    updateAnswers(answers, stepName, values)
  }, [answers, getValues, step])

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
