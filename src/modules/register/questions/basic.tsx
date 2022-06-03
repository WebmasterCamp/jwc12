import { InferType } from 'yup'

import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const basicWeakQuestions: WeakQuestion = {
  name: 'basic',
  inputs: [
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลพื้นฐาน</h2>,
    },
    {
      type: InputType.TEXT,
      question: <p className="inline">ชื่อจริง</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      question: <p className="inline">นามสกุล</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      question: <p className="inline">ชื่อจริง (ภาษาอังกฤษ)</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      question: <p className="inline">นามสกุล (ภาษาอังกฤษ)</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      question: <p className="inline">ชื่อเล่น</p>,
      required: 'กรุณากรอกข้อมูล',
    },
  ],
}

export const basicQuestions = makeQuestion(basicWeakQuestions)

export const BasicQuestionSchema = buildYupObject(basicQuestions)

export type BasicQuestionModel = InferType<typeof BasicQuestionSchema>
