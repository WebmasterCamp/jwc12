import { ReactNode } from 'react'

import { Choice, InputType, Question, WeakQuestion } from '../types'

const getRequiredMessage = (
  required: string | boolean | undefined,
  question: ReactNode
): string | undefined => {
  if (typeof required === 'string') return required
  if (required === true) {
    required = `กรุณากรอกข้อมูล`
    if (typeof question === 'string') required = `กรุณากรอก ${question}`
  }
  return undefined
}

export function makeQuestion(question: WeakQuestion): Question {
  return {
    ...question,
    inputs: question.inputs.map((input, index) => {
      if (input.type === InputType.NONE) return input
      if (input.type === InputType.CHECKBOX) {
        const { choices, name, ...rest } = input
        const checkboxName = name ? name : `${question.name}_Q${index}`
        const newChoices: Choice[] = choices.map((choice) => ({
          name: `${checkboxName}.${choice}`,
          value: choice,
        }))
        return {
          ...rest,
          name: checkboxName,
          required: getRequiredMessage(input.required, input.question),
          choices: newChoices,
        }
      }
      const key = input.name ? input.name : `${question.name}_Q${index}`
      return {
        ...input,
        name: key,
        required: getRequiredMessage(input.required, input.question),
      }
    }),
  }
}
