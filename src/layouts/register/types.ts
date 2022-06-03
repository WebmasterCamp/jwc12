export enum InputType {
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  UPLOAD = 'upload',
}

export interface SimpleInput {
  question: React.ReactNode
  required?: string
}

export interface ChoiceInput extends SimpleInput {
  choices: string[]
  min?: number
  max?: number
}

export type FormInputProps =
  | ({
      type: InputType.TEXT
    } & SimpleInput)
  | ({
      type: InputType.RADIO
    } & ChoiceInput)
  | ({
      type: InputType.CHECKBOX
    } & ChoiceInput)
  | ({
      type: InputType.UPLOAD
    } & SimpleInput)

export type Form = {
  name: string
  inputs: FormInputProps[]
}
