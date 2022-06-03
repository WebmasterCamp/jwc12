import { Form, InputType } from '../types'
import { buildYupObject } from './utils'

export const marketingQuestions: Form = {
  name: 'marketing',
  inputs: [
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            หากแม่หมอต้องการที่จะขาย Wallpaper เสริมดวงชะตาของตัวเองให้ปัง น้อง ๆ
            จะมีวิธีการทำการตลาดให้แม่หมอเจอย่างไร
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
            แม่หมอต้องการให้น้อง ๆ สังเกตภาพด้านบนนี้ เมื่อเห็นภาพนี้แล้วเห็นโอกาสอะไร
            ถ้าคิดธุรกิจมาได้อยากทำธุรกิจอะไร พร้อมให้เหตุผล
          </p>
          <a href="https://www.scg.com/sdsymposium/2020/wp-content/uploads/2020/10/IMG_9567.jpg / ที่มาของภาพ: https://www.scg.com/sdsymposium/2020/pillar/%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%A2%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D/">
            รูปอยู่ตรงนี้
          </a>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
    {
      type: InputType.TEXT,
      question: (
        <>
          <p>
            แม่หมออยากให้น้อง ๆ ยกตัวอย่างบริษัทที่คิดว่าทำการตลาดได้น่าสนใจ
            พร้อมบอกเหตุผลว่าเพราะอะไรถึงน่าสนใจ
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
            สมมติว่าน้อง ๆ เป็นผู้ดูแล (Admin) เพจดูดวงแห่งหนึ่ง
            มีลูกค้าเข้ามาจองคิวเพื่อขอนัดคิวและได้คิวเรียบร้อยแล้ว แต่พอถึงเวลานัดจริง
            ระบบมีการขัดข้อง ทำให้คิวของลูกค้าหายไปจากระบบ
            ทำให้วันนั้นลูกค้าไม่ได้คิวดูดวงตามที่นัดไว้ ลูกค้าจึงคอมเพลนเข้าไปทางเพจดูดวงนั้น น้อง
            ๆ จะมีวิธีการสื่อสารกับลูกค้าอย่างไร ให้ลูกค้าเกิดความพึงพอใจสูงสุด
          </p>
        </>
      ),
      required: 'กรุณาตอบคำถามนี้',
    },
  ],
}

export const marketingQuestionSchema = buildYupObject(marketingQuestions)
