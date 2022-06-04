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
  DROPDOWN = 'dropdown',
  NONE = 'none',
}

export interface WeakSimpleInput {
  question: React.ReactNode
  name?: string
  required?: string | boolean
  validate?: yup.TestConfig<any>
  placeholder?: string
}

export interface SimpleInput extends WeakSimpleInput {
  name: string
  required?: string
}

export interface WeakChoiceInput extends WeakSimpleInput {
  choices: string[]
  min?: number
  max?: number
  direction?: 'row' | 'column'
  position?: 'start' | 'center' | 'end'
}

export interface Choice {
  name: string
  value: string
}

export interface ChoiceInput extends Omit<WeakChoiceInput, 'choices'> {
  name: string
  choices: Choice[]
  required?: string
}

export interface SingleChoiceInput extends WeakChoiceInput {
  name: string
  required?: string
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
      type: InputType.DROPDOWN
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
    } & SingleChoiceInput)
  | ({
      type: InputType.DROPDOWN
    } & SingleChoiceInput)
  | ({
      type: InputType.CHECKBOX
    } & ChoiceInput)
  | {
      type: InputType.NONE
      title: React.ReactNode
    }

export type WeakQuestion = {
  stepName: string
  inputs: WeakQuestionInputProps[]
}

export type Question = {
  stepName: string
  inputs: QuestionInputProps[]
}
