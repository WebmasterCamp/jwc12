import { InferType } from 'yup'

import { QuestionWithNumber } from '../components/QuestionWithNumber'
import { BranchType, InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

export const contentWeakQuestions: WeakQuestion = {
  name: BranchType.CONTENT,
  inputs: [
    {
      type: InputType.TEXTAREA,
      question: (
        <>
          <p>
            ให้น้อง ๆ ลองอธิบายความสัมพันธ์ระหว่าง<b>คณิตศาสตร์</b>และ<b>โหราศาสตร์</b>
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={1}>
          <p>
            ให้น้อง ๆ ลองเลือกไพ่ทาโรต์ หนึ่งใบเพื่อมาแทนตัวเอง น้อง ๆ
            จะเลือกไพ่ใบไหนแล้วทำไมถึงเลือกไพ่ใบนี้
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={2}>
          <p>
            ถ้าสมมุติว่าน้อง ๆ ต้องกลายมาเป็นคนจัดค่าย JWC ในปีนี้ น้อง ๆ จะทำ Content อะไรให้เพื่อน
            ๆ ของน้องอยากมาเข้าค่ายนี้ โดยให้น้อง ๆ ลองอธิบายกระบวนการคิด ไม่จำเป็นที่จะต้องสร้าง
            Content นั้นออกมาจริง
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
  ],
}

export const contentQuestions = makeQuestion(contentWeakQuestions)

export const ContentQuestionSchema = buildYupObject(contentQuestions)

export type ContentQuestionModel = InferType<typeof ContentQuestionSchema>
