import { InferType } from 'yup'

import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const additionalWeakQuestions: WeakQuestion = {
  name: 'additional',
  inputs: [
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลพื้นฐาน</h2>,
    },
    {
      type: InputType.TEXT,
      question: 'ชื่อจริง',
      required: 'กรุณากรอกชื่อจริง',
    },
    {
      type: InputType.TEXT,
      question: 'นามสกุล',
      required: 'กรุณากรอกนามสกุล',
    },
  ],
}

export const additionalQuestions = makeQuestion(additionalWeakQuestions)

export const AdditionalQuestionSchema = buildYupObject(additionalQuestions)

export type AdditionalQuestionModel = InferType<typeof AdditionalQuestionSchema>
