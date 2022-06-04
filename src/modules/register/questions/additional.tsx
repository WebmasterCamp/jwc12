import { InferType } from 'yup'

import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const additionalWeakQuestions: WeakQuestion = {
  name: 'additional',
  inputs: [
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลเพิ่มเติม</h2>,
    },
    {
      type: InputType.TEXT,
      question: 'โรคประจำตัว',
      placeholder: 'ex. ภูมิแพ้',
      required: true,
    },
    {
      type: InputType.TEXT,
      question: 'ยาประจำตัว',
      placeholder: 'ยาประจำตัว',
      required: true,
    },
    {
      type: InputType.TEXT,
      question: 'ยาที่แพ้',
      placeholder: 'ยาที่แพ้',
      required: true,
    },
    {
      type: InputType.TEXT,
      question: 'สิ่งที่แพ้',
      placeholder: 'ex. ขนสัตว์, กุ้ง',
      required: true,
    },
    {
      type: InputType.TEXT,
      question: 'ข้อจำกัดด้านอาหาร',
      placeholder: 'ex. มังสวิรัติ, อาหารคาว, อาหารเผ็ด, ฮาลาล',
      required: true,
    },
    {
      type: InputType.TEXT,
      question: 'ไซส์เสื้อ',
      placeholder: 'ไซส์เสื้อ',
      required: true,
    },
    {
      type: InputType.TEXTAREA,
      question: 'กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ',
      placeholder: 'ex. งานแข่งขัน การประกวด การแสดง ฯลฯ',
      required: true,
    },
    {
      type: InputType.TEXTAREA,
      question: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
      placeholder: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลผู้ปกครอง</h2>,
    },
    {
      type: InputType.TEXT,
      name: 'parentFirstName',
      question: 'ชื่อจริง',
      placeholder: 'ชื่อจริง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parentLastName',
      question: 'นามสกุล',
      placeholder: 'นามสกุล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parentPhone',
      question: 'เบอร์โทรติดต่อ',
      placeholder: 'xxxxxxxxxx',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parentReleationship',
      question: 'ความสัมพันธ์',
      placeholder: 'ex. มารดา, บิดา',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลติดต่อฉุกเฉิน</h2>,
    },
    {
      type: InputType.TEXT,
      name: 'emergencyFirstName',
      question: 'ชื่อจริง',
      placeholder: 'ชื่อจริง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergencyLastName',
      question: 'นามสกุล',
      placeholder: 'นามสกุล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergencyPhone',
      question: 'เบอร์โทรติดต่อ',
      placeholder: 'xxxxxxxxxx',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergencyReleationship',
      question: 'ความสัมพันธ์',
      placeholder: 'ex. มารดา, บิดา',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <h2>เลือกสาขา</h2>,
    },
    {
      type: InputType.RADIO,
      name: 'branch',
      question: (
        <img src="https://i.pinimg.com/originals/e2/06/64/e206645f3d2b5438ac9423bcc6934a4b.jpg" />
      ),
      choices: ['สาขา Content', 'สาขา Design', 'สาขา Marketing', 'สาขา Programming'],
      required: true,
    },
    {
      type: InputType.CHECKBOX,
      name: 'branchConfirm',
      question: null,
      afterQuestion: (
        <p className="text-sm text-red-500">
          **หากยืนยันการเลือกสาขาแล้ว จะไม่สามารถเปลี่ยนสาขาได้ภายหลัง
        </p>
      ),
      choices: ['ยืนยันการเลือกสาขา'],
      required: true,
      direction: 'column',
      position: 'center',
    },
  ],
}

export const additionalQuestions = makeQuestion(additionalWeakQuestions)

export const AdditionalQuestionSchema = buildYupObject(additionalQuestions)

export type AdditionalQuestionModel = InferType<typeof AdditionalQuestionSchema>
