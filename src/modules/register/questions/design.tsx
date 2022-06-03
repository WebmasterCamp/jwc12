import { InferType } from 'yup'

import { BranchType, InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const designWeakQuestions: WeakQuestion = {
  name: BranchType.DESIGN,
  inputs: [
    {
      type: InputType.TEXTAREA,
      question: (
        <>
          <p>
            วันหนึ่ง{' '}
            <a href="https://thepeople.co/pamela-colman-smith-and-her-universal-rider-waite/">
              พาเมลา โคลแมน สมิธ
            </a>
            นักออกแบบไพ่ทาโรต์ผู้โด่งดังมีความใฝ่ฝันต้องการ<b>เปิดวางขายสำรับไพ่</b>
            เพื่อเป็นของสะสมให้กับ<b>กลุ่มลูกค้าทั่วโลก</b>
            พร้อมพลิกโฉมไพ่ของเธอให้<b>ก้าวเข้าสู่โลกดิจิตอล</b>ที่ใคร ๆ ก็สามารถ
            <b>เข้าถึงไพ่ของเธอได้อย่างง่ายดาย!</b>
          </p>
          <p>
            ในฐานะดีไซเนอร์ น้อง ๆ มีไอเดียที่จะช่วยสานต่อความฝันนี้ให้กลายเป็นจริงอย่างไร
            พร้อมอธิบายขั้นตอนการทำงานต่าง ๆ จนกว่าจะออกมาเป็นผลลัพธ์ที่น้อง ๆ คาดหวังไว้ให้พี่ ๆ
            ฟังหน่อย
          </p>
          <p>Hint: Design Process, Digital Transformation</p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <>
          <p>
            หากน้อง ๆ ได้รับคำทำนายหมายมั่นให้เป็นผู้กำหนดภาพลักษณ์ของเว็บขาย NFT Art
            สัญชาติไทยที่กำลังจะเปิดตัวเร็ว ๆ นี้ โดยน้อง ๆ จะต้องนำเสนอ Web Design Moodboard
            ที่รวบรวมไอเดียและแรงบันดาลใจต่าง ๆ เพื่อกำหนดทิศทางในการออกแบบ
            รวมถึงทำให้ทุกคนเห็นภาพเดียวกันก่อนนำไปพัฒนาต่อเป็น Style Guides ของเว็บจริง!
          </p>
          <p>
            น้อง ๆ จะทำ Moodboard ออกมาเป็นหน้าตาแบบไหน อธิบายแนวคิดและที่มาที่ไปของสิ่งต่าง ๆ
            ที่น้อง ๆ ต้องการรวบรวมเข้าไว้ด้วยกันให้พี่ ๆ เข้าใจด้วยนะ
          </p>
          <p>
            Hint: Color Palette, Typography, Design Adjectives, References e.g. image, illustration
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <>
          <p>
            ถ้าน้อง ๆ
            ได้รับคำไหว้วานจากนักอ่านดวงชะตาให้ประดิษฐ์คิดค้นไอเทมทำนายอนาคตที่มีความแปลกใหม่
            ล้ำสมัย และไม่ซ้ำใคร
          </p>
          <p>
            น้อง ๆ คิดว่าไอเทมนั้นคืออะไร
            ลักษณะของนักอ่านดวงชะตาที่จะมาใช้ไอเทมสิ่งนี้ได้ต้องเป็นคนแบบไหน มีฟังก์ชันอะไรบ้าง
            ลองอธิบายไอเดียของน้อง ๆ อย่างละเอียดมากที่สุดเท่าที่จะเป็นไปได้
            พร้อมสอนวิธีการใช้งานไอเทมชิ้นนั้นให้พี่ ๆ เข้าใจด้วยนะ
          </p>
          <p>Hint: Creative Thinking, Innovative Design</p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
  ],
}

export const designQuestions = makeQuestion(designWeakQuestions)

export const DesignQuestionSchema = buildYupObject(designQuestions)

export type DesignQuestionModel = InferType<typeof DesignQuestionSchema>
