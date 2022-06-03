import yup from 'yup'

export enum BranchType {
  PROGRAMMING = 'programming',
  DESIGN = 'design',
  MARKETING = 'marketing',
  CONTENT = 'content',
}

export enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  UPLOAD = 'upload',
  EMAIL = 'email',
  DATE = 'date',
  NONE = 'none',
}

export interface Choice {
  name: string
  value: string
}

export interface WeakSimpleInput {
  question: React.ReactNode
  name?: string
  required?: string
  validate?: yup.TestConfig<any>
}

export interface SimpleInput extends WeakSimpleInput {
  name: string
}

export interface WeakChoiceInput extends WeakSimpleInput {
  choices: string[]
  min?: number
  max?: number
}

export interface ChoiceInput extends Omit<WeakChoiceInput, 'choices'> {
  name: string
  choices: Choice[]
}

export interface RadioInput extends WeakChoiceInput {
  name: string
}

export type WeakQuestionInputProps =
  | ({
      type:
        | InputType.TEXTAREA
        | InputType.TEXT
        | InputType.UPLOAD
        | InputType.EMAIL
        | InputType.DATE
    } & WeakSimpleInput)
  | ({
      type: InputType.RADIO
    } & WeakChoiceInput)
  | ({
      type: InputType.CHECKBOX
    } & WeakChoiceInput)
  | {
      type: InputType.NONE
      title: React.ReactNode
    }

export type QuestionInputProps =
  | ({
      type:
        | InputType.TEXTAREA
        | InputType.TEXT
        | InputType.UPLOAD
        | InputType.EMAIL
        | InputType.DATE
    } & SimpleInput)
  | ({
      type: InputType.RADIO
    } & RadioInput)
  | ({
      type: InputType.CHECKBOX
    } & ChoiceInput)
  | {
      type: InputType.NONE
      title: React.ReactNode
    }

export type WeakQuestion = {
  name: string
  inputs: WeakQuestionInputProps[]
}

export type Question = {
  name: string
  inputs: QuestionInputProps[]
}
