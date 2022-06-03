import * as yup from 'yup'

import { Question } from '../types'

export const buildYupObject = (form: Question) => {
  const schema: {
    [key: string]: yup.StringSchema | yup.ObjectSchema<Record<string, yup.BooleanSchema>>
  } = {}
  form.inputs.forEach((input) => {
    if (input.type === 'none') return
    switch (input.type) {
      case 'text':
      case 'textarea':
        schema[input.name] = input.required
          ? yup.string().trim().required(input.required)
          : yup.string().trim()
        break
      case 'radio':
        schema[input.name] = input.required
          ? yup.string().trim().required(input.required)
          : yup.string().trim()
        break
      case 'checkbox':
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
      case 'upload':
        schema[input.name] = input.required
          ? yup.string().trim().url().required(input.required)
          : yup.string().trim().url()
        break
      default:
        break
    }
  })
  return yup.object(schema)
}
