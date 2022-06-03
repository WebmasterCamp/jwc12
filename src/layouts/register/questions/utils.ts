import * as yup from 'yup'

import { Form } from '../types'

export const buildYupObject = (form: Form) => {
  const schema: { [key: string]: yup.StringSchema | yup.AnyObjectSchema } = {}
  const name = form.name

  form.inputs.forEach((input, index) => {
    const key = `${name}_Q${index}`
    switch (input.type) {
      case 'text':
        schema[key] = input.required
          ? yup.string().trim().required(input.required)
          : yup.string().trim()
        break
      case 'radio':
        schema[key] = input.required
          ? yup.string().trim().required(input.required)
          : yup.string().trim()
        break
      case 'checkbox':
        const schemaChoice: { [key: string]: yup.BooleanSchema } = {}
        input.choices.forEach((_, index) => {
          const keyChoice = `${key}_C${index}`
          schemaChoice[keyChoice] = yup.boolean()
        })
        schema[key] = input.required
          ? yup
              .object(schemaChoice)
              .required(input.required)
              .test('required', 'คุณเลือกไม่ตรงกับที่เงื่อนไขกำหนด', (value) => {
                let sum = Object.keys(value).reduce((acc, key) => {
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
        schema[key] = input.required
          ? yup.string().trim().url().required(input.required)
          : yup.string().trim().url()
        break
      default:
        break
    }
  })
  return yup.object(schema)
}
