import { InferType } from 'yup'

import { ExternalLink } from '@/components/ExternalLink'

import { QuestionWithNumber } from '../components/QuestionWithNumber'
import { BranchType, InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const programmingWeakQuestions: WeakQuestion = {
  name: BranchType.PROGRAMMING,
  inputs: [
    {
      type: InputType.NONE,
      title: (
        <h2>
          คำถามประจำสาขา <span className="text-primary">(Programming)</span>
        </h2>
      ),
    },
    {
      type: InputType.TEXTAREA,
      question: (
        <QuestionWithNumber number={1}>
          <p>
            น้อง ๆ ได้รับการไหว้วานจากแม่หมอคนหนึ่งให้ทำเว็บไซต์ส่วนตัวให้กับแม่หมอคนนั้น
            โดยมีดีไซน์ของเว็บไซต์ตามด้านบน ซึ่งน้อง ๆ
            จะใช้เทคโนโลยีอะไรก็ได้ในการสรรค์สร้างเว็บนั้นขึ้นมา หลังจากน้องทำเว็บไซต์เสร็จแล้ว
            ให้น้องทำการ Deploy และส่ง URL มาทางช่องด้านล่าง (หรือถ้าหากน้องไม่สามารถ Deploy
            ได้ให้ทำการ Zip ไฟล์และส่งเป็นลิงก์ไปยังไฟล์นั้น)
            ในส่วนของที่เป็นรูปภาพและแผนที่สามารถใส่รูปภาพใดก็ได้มาแทนที่
          </p>
          <div className="flex flex-wrap gap-x-10">
            <ExternalLink
              href="https://drive.google.com/file/d/1DRD-MegyLieFAIvDkgw60WmYozYr65CV/view?usp=sharing"
              target="_blank"
            >
              แบบ Desktop
            </ExternalLink>
            <ExternalLink
              href="https://drive.google.com/file/d/1DRD-MegyLieFAIvDkgw60WmYozYr65CV/view?usp=sharing"
              target="_blank"
            >
              แบบ Mobile
            </ExternalLink>
          </div>
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
            แม่หมออยากให้ลองยกตัวอย่างเว็บไซต์หรือแอปพลิเคชันที่ชอบ และอยากลองสร้างขึ้นมาบ้าง
            พร้อมบอกเหตุผลว่า ทำไมถึงอยากทำเว็บไซต์หรือแอปพลิเคชันนั้น
          </p>
        </QuestionWithNumber>
      ),
      required: 'กรุณาตอบคำถามนี้',
      placeholder: 'ตอบอะไรดีนะ...',
    },
  ],
}

export const programmingQuestions = makeQuestion(programmingWeakQuestions)

export const ProgrammingQuestionSchema = buildYupObject(programmingQuestions)

export type ProgrammingQuestionModel = InferType<typeof ProgrammingQuestionSchema>
