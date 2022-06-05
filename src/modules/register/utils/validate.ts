import * as yup from 'yup'

import { InputType, Question } from '../types'

export const phoneTestConfig: yup.TestConfig<string> = {
  name: 'invalid phone number',
  message: 'กรุณากรอกเบอร์มือถือให้ถูกต้อง',
  test: (value: string) => {
    return /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/.test(value)
  },
}

export const buildYupObject = (form: Question) => {
  const schema: {
    [key: string]:
      | yup.StringSchema
      | yup.ObjectSchema<Record<string, yup.BooleanSchema | yup.StringSchema>>
      | yup.DateSchema
  } = {}
  form.inputs.forEach((input) => {
    if (input.type === InputType.NONE) return
    switch (input.type) {
      case InputType.TEXT:
      case InputType.TEXTAREA:
      case InputType.RADIO:
      case InputType.DROPDOWN:
      case InputType.UPLOAD:
      case InputType.EMAIL: {
        let s = yup.string()
        if (input.required) s = s.required(input.required)
        if (input.type === InputType.EMAIL) {
          s = s.email('กรุณากรอก email ให้ถูกต้อง')
        }
        /**
         * The result must be a string of the radio
         */
        if (input.type === InputType.RADIO) {
          s = s.test('invalid', 'กรุณาเลือกให้ถูกต้อง', (value) => {
            return !!value && input.choices.some((choice) => choice.value === value)
          })
        }
        /**
         * Custom validate configuration
         */
        if (input.validate) {
          s = s.test(input.validate)
        }
        schema[input.name] = s
        break
      }
      case InputType.DATE: {
        schema[input.name] = input.required
          ? yup.date().typeError('กรุณากรอกวันที่ให้ถูกต้อง').required(input.required)
          : yup.date().typeError('กรุณากรอกวันที่ให้ถูกต้อง')
        break
      }
      case InputType.CHECKBOX: {
        let schemaChoice: { [key: string]: yup.BooleanSchema | yup.StringSchema } = {}
        input.choices.forEach((choice) => {
          if (choice.name.split('.').pop() === 'other') {
            schemaChoice = {
              ...schemaChoice,
              [`${choice.name}`]: yup.boolean(),
              [`${choice.name}_input`]: yup.string().when(`${choice.name}`, {
                is: (value: boolean) => value,
                then: yup.string().required('กรุณากรอกข้อมูล'),
                otherwise: yup.string(),
              }),
            }
          } else {
            schemaChoice[choice.name] = yup.boolean()
          }
        })
        schema[input.name] = input.required
          ? yup
              .object(schemaChoice)
              .required(input.required)
              .test('required', 'คุณเลือกไม่ตรงกับที่เงื่อนไขกำหนด', (value: any) => {
                const sum = Object.keys(value).reduce((acc, key) => {
                  return acc + (value[key] ? 1 : 0)
                }, 0)
                if (input.min && input.max) return sum >= input.min && sum <= input.max
                if (input.min) return sum >= input.min
                if (input.max) return sum <= input.max
                return true
              })
          : yup.object(schemaChoice)
        break
      }
      default:
        break
    }
  })
  return yup.object(schema)
}
