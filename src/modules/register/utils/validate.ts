import * as yup from 'yup'

import { InputType, Question } from '../types'

export const buildYupObject = (form: Question) => {
  const schema: {
    [key: string]:
      | yup.StringSchema
      | yup.ObjectSchema<Record<string, yup.BooleanSchema>>
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
        console.log(input.name, input.required)
        if (input.required) s = s.required(input.required)
        if (input.type === InputType.EMAIL) s = s.email('กรุณากรอก email ให้ถูกต้อง')
        if (input.type === InputType.UPLOAD) s = s.url('กรุณากรอก URL ให้ถูกต้อง')
        if (input.type === InputType.RADIO)
          s = s.test('invalid', 'กรุณาเลือกให้ถูกต้อง', (value) => {
            return !!value && input.choices.includes(value)
          })
        if (input.validate) s = s.test(input.validate)
        schema[input.name] = s
        break
      }
      case InputType.DATE: {
        schema[input.name] = input.required
          ? yup.date().typeError('กรุณากรอกวันที่ให้ถูกต้อง').required(input.required)
          : yup.date().typeError('กรุณากรอกวันที่ให้ถูกต้อง')
        break
      }
      case InputType.CHECKBOX:
        const schemaChoice: { [key: string]: yup.BooleanSchema } = {}
        input.choices.forEach((choice) => {
          schemaChoice[choice.name] = yup.boolean()
        })

        schema[input.name] = input.required
          ? yup
              .object(schemaChoice)
              .required(input.required)
              .test('required', 'คุณเลือกไม่ตรงกับที่เงื่อนไขกำหนด', (value) => {
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

      default:
        break
    }
  })
  return yup.object(schema)
}
