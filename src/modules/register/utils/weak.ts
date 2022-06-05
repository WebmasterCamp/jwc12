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
    return required
  }
  return undefined
}

export function makeQuestion(question: WeakQuestion): Question {
  let inputCount = 0
  return {
    ...question,
    inputs: question.inputs.map((input) => {
      switch (input.type) {
        case InputType.NONE: {
          return input
        }
        case InputType.DROPDOWN:
        case InputType.RADIO: {
          const key = input.name ? `${input.name}` : `${question.stepName}_Q${inputCount}`
          const choices: string[] = input.choices.map((choice) => {
            if (typeof choice === 'string') return choice
            return choice.value
          })
          return {
            ...input,
            name: key,
            choices: choices,
            required: getRequiredMessage(input.required, input.question),
          }
        }
        case InputType.CHECKBOX: {
          const { choices, name, ...rest } = input
          const checkboxName = name ? `${name}` : `${question.stepName}_Q${inputCount}`
          const newChoices: Choice[] = choices.map((choice) => {
            if (typeof choice !== 'string') {
              return {
                ...choice,
                name: `${checkboxName}.${choice.name}`,
              }
            }
            return {
              name: `${checkboxName}.${choice}`,
              value: choice,
            }
          })
          return {
            ...rest,
            name: checkboxName,
            required: getRequiredMessage(input.required, input.question),
            choices: newChoices,
          }
        }
        default: {
          const key = input.name ? `${input.name}` : `${question.stepName}_Q${inputCount}`
          return {
            ...input,
            name: key,
            required: getRequiredMessage(input.required, input.question),
          }
        }
      }
    }),
  }
}
