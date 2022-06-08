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
      noMark: true,
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
          <div className="flex flex-col gap-y-3">
            <img
              src="https://cdn.pixabay.com/photo/2017/09/08/18/20/garbage-2729608_1280.jpg"
              alt="โจทย์ marketing"
              className="rounded-md overflow-hidden"
            />
            <p className="italic text-xs text-gray-500 text-center">
              ภาพโดย{' '}
              <ExternalLink href="https://pixabay.com/th/users/ritae-19628/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2729608">
                RitaE
              </ExternalLink>{' '}
              จาก{' '}
              <ExternalLink href="https://pixabay.com/th/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2729608">
                Pixabay
              </ExternalLink>
            </p>
          </div>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
      noMark: true,
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
      noMark: true,
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
      noMark: true,
    },
  ],
}

export const marketingQuestions = makeQuestion(marketingWeakQuestions)

export const MarketingQuestionSchema = buildYupObject(marketingQuestions)

export type MarketingQuestionModel = InferType<typeof MarketingQuestionSchema>
