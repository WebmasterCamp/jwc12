import { InferType } from 'yup'

import { Gap } from '../components/Gap'
import { Header } from '../components/Header'
import { QuestionWithNumber } from '../components/QuestionWithNumber'
import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

export const coreWeakQuestions: WeakQuestion = {
  stepName: 'core',
  inputs: [
    {
      type: InputType.NONE,
      title: <Header>คำถามจากส่วนกลาง</Header>,
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={1}>
          <p>
            จำนวนไพ่ทาโรต์ใน 1 สำรับนั้นมี 78 ใบ หากน้อง ๆ ค้นพบว่า น้อง ๆ
            มีพลังวิเศษที่สามารถสร้างไพ่ใบที่ 79 ได้น้อง ๆ จะสร้างไพ่ใบที่ 79 ให้มีความสามารถพิเศษ
            ที่จะเปลี่ยนแปลงโชคชะตาอนาคต ให้กับผู้ที่ได้ไพ่ใบนี้ ในเรื่องไหน อย่างไร
            และจะต้องตั้งชื่อไพ่ใบนั้น พร้อมสโลแกนของไพ่ ที่จะทำให้ไพ่ใบนี้ของน้องกลายเป็นไพ่ที่เลิศ
            สุดยอด วิเศษ มหัศจรรย์ มีพลังอันดับ 1 สูงสุด ยอดเยี่ยม ยิ่งใหญ่ เกรียงไกรที่สุดในสำหรับ
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={2}>
          <p>
            ขณะนี้มีกระจกลอยลงมา น้อง ๆ มองเข้าไปในกระจกแล้วเห็นตัวเอง
            เห็นสิ่งที่ตัวเองกำลังทำอยู่ในช่วงเวลานี้ เห็นเพื่อน ๆ เห็นสิ่งที่น้อง ๆ ชอบ
            และภาพก็ค่อย ๆ เปลี่ยนไป น้อง ๆ ยังคงเห็นตัวเอง แต่! เป็นตัวเองในอีก 10 ปีข้างหน้า
            เห็นสิ่งที่น้อง ๆ กำลังทำในตอนนั้น และสิ่งที่น้อง ๆ เป็นในตอนนั้น อยากให้น้อง ๆ
            บรรยายถึงภาพที่น้อง ๆ เห็นว่าเป็นอย่างไร ทั้งในภาพปัจจุบันและภาพอนาคต
            พร้อมบอกเหตุผลว่าทำไมจึงเป็นเช่นนั้น
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={3}>
          <p>
            กระจกลอยหายไป แล้วมีลูกแก้ววิเศษวางอยู่ตรงหน้าน้อง ๆ เมื่อมองลงไป
            จึงทำให้เห็นภาพตนเองในอดีต ว่าน้อง ๆ
            ได้รับงานกลุ่มและได้ทำการแบ่งงานกันเรียบร้อยระหว่างตัวน้อง ๆ กับเพื่อน ๆ ในกลุ่ม
            แต่เมื่อใกล้จะถึงเวลาส่งงาน น้อง ๆ พบว่าเพื่อนในกลุ่มยังทำงานไม่เสร็จเรียบร้อยดี
            ซึ่งน้อง ๆ ต้องส่งงานนั้นในอีก 1 ชั่วโมง น้อง ๆ
            จะแก้ไขปัญหาอย่างไรเพื่อให้สามารถส่งงานได้ตรงตามกำหนดเวลา
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={4}>
          <p>
            กระจกลอยกลับมาอีกครั้ง ปรากฏภาพเป็นตัวเองที่ไม่ติดค่าย JWC12 หากน้อง ๆ
            สามารถพูดอะไรบางอย่างกับตัวเองที่ไม่ติดคนนั้นได้ น้อง ๆ จะบอกอะไรหรือจะบอกให้เขาทำอะไร
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
  ],
}

export const coreQuestions = makeQuestion(coreWeakQuestions)

export const CoreQuestionSchema = buildYupObject(coreQuestions)

export type CoreQuestionModel = InferType<typeof CoreQuestionSchema>