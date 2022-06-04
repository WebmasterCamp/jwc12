import { InferType } from 'yup'

import { ExternalLink } from '@/components/ExternalLink'

import { Gap } from '../components/Gap'
import { Header } from '../components/Header'
import { QuestionWithNumber } from '../components/QuestionWithNumber'
import { BranchType, InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const marketingWeakQuestions: WeakQuestion = {
  stepName: BranchType.MARKETING,
  inputs: [
    {
      type: InputType.NONE,
      title: (
        <Header>
          คำถามประจำสาขา <span className="text-gold-darker">(Marketing)</span>
        </Header>
      ),
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={1}>
          <p>
            หากแม่หมอต้องการที่จะขาย Wallpaper เสริมดวงชะตาของตัวเองให้ปัง น้อง ๆ
            จะมีวิธีการทำการตลาดให้แม่หมอเจอย่างไร
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={2}>
          <p>
            แม่หมอต้องการให้น้อง ๆ สังเกตภาพด้านบนนี้ เมื่อเห็นภาพนี้แล้วเห็นโอกาสอะไร
            ถ้าคิดธุรกิจมาได้อยากทำธุรกิจอะไร พร้อมให้เหตุผล
          </p>
          <div>
            <ExternalLink href="https://www.scg.com/sdsymposium/2020/wp-content/uploads/2020/10/IMG_9567.jpg / ที่มาของภาพ: https://www.scg.com/sdsymposium/2020/pillar/%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%A2%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D/">
              รูปอยู่ตรงนี้
            </ExternalLink>
          </div>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={3}>
          <p>
            แม่หมออยากให้น้อง ๆ ยกตัวอย่างบริษัทที่คิดว่าทำการตลาดได้น่าสนใจ
            พร้อมบอกเหตุผลว่าเพราะอะไรถึงน่าสนใจ
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
    { type: InputType.NONE, title: <Gap /> },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={4}>
          <p>
            สมมติว่าน้อง ๆ เป็นผู้ดูแล (Admin) เพจดูดวงแห่งหนึ่ง
            มีลูกค้าเข้ามาจองคิวเพื่อขอนัดคิวและได้คิวเรียบร้อยแล้ว แต่พอถึงเวลานัดจริง
            ระบบมีการขัดข้อง ทำให้คิวของลูกค้าหายไปจากระบบ
            ทำให้วันนั้นลูกค้าไม่ได้คิวดูดวงตามที่นัดไว้ ลูกค้าจึงคอมเพลนเข้าไปทางเพจดูดวงนั้น น้อง
            ๆ จะมีวิธีการสื่อสารกับลูกค้าอย่างไร ให้ลูกค้าเกิดความพึงพอใจสูงสุด
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
  ],
}

export const marketingQuestions = makeQuestion(marketingWeakQuestions)

export const MarketingQuestionSchema = buildYupObject(marketingQuestions)

export type MarketingQuestionModel = InferType<typeof MarketingQuestionSchema>
