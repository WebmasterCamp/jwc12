import { Form, InputType } from '../types'
import { buildYupObject } from './utils'

export const contentQuestions: Form = {
  name: 'content',
  inputs: [
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>ให้น้อง ๆ ลองอธิบายความสัมพันธ์ระหว่างคณิตศาสตร์และโหราศาสตร์</p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            ให้น้อง ๆ ลองเลือกไพ่ทาโรต์ หนึ่งใบเพื่อมาแทนตัวเอง น้อง ๆ
            จะเลือกไพ่ใบไหนแล้วทำไมถึงเลือกไพ่ใบนี้
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            ถ้าสมมุติว่าน้อง ๆ ต้องกลายมาเป็นคนจัดค่าย JWC ในปีนี้ น้อง ๆ จะทำ Content อะไรให้เพื่อน
            ๆ ของน้องอยากมาเข้าค่ายนี้ โดยให้น้อง ๆ ลองอธิบายกระบวนการคิด ไม่จำเป็นที่จะต้องสร้าง
            Content นั้นออกมาจริง
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
  ],
}

export const contentQuestionSchema = buildYupObject(contentQuestions)
