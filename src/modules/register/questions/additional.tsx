import { InferType } from 'yup'

import { Header } from '../components/Header'
import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const additionalWeakQuestions: WeakQuestion = {
  stepName: 'additional',
  inputs: [
    {
      type: InputType.NONE,
      title: <Header>ข้อมูลเพิ่มเติม</Header>,
    },
    {
      type: InputType.TEXT,
      name: 'health.congenitalDisease',
      question: 'โรคประจำตัว',
      placeholder: 'ex. ภูมิแพ้',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'health.drug',
      question: 'ยาประจำตัว',
      placeholder: 'ยาประจำตัว',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'health.allergicDrug',
      question: 'ยาที่แพ้',
      placeholder: 'ยาที่แพ้',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'health.allergicThing',
      question: 'สิ่งที่แพ้',
      placeholder: 'ex. ขนสัตว์, กุ้ง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'health.dietaryRestriction',
      question: 'ข้อจำกัดด้านอาหาร',
      placeholder: 'ex. มังสวิรัติ, อาหารคาว, อาหารเผ็ด, ฮาลาล',
      required: true,
    },
    {
      type: InputType.DROPDOWN,
      name: 'shirtSize',
      question: 'ไซส์เสื้อ',
      placeholder: 'ไซส์เสื้อ',
      choices: ['S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    },
    {
      type: InputType.TEXTAREA,
      name: 'activity',
      question: 'กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ',
      placeholder: 'ex. งานแข่งขัน การประกวด การแสดง ฯลฯ',
      required: true,
    },
    {
      type: InputType.CHECKBOX,
      name: 'knowFrom',
      question: 'รู้จักค่าย YWC จากไหน',
      choices: ['Facebook', 'Instagram', 'Twitter', 'เพื่อน', 'ผู้ปกครอง', 'สถานศึกษา', 'อื่น ๆ'],
      placeholder: 'ex. งานแข่งขัน การประกวด การแสดง ฯลฯ',
      required: true,
      direction: 'column',
    },
    {
      type: InputType.TEXTAREA,
      name: 'remark',
      question: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
      placeholder: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <Header>ข้อมูลผู้ปกครอง</Header>,
    },
    {
      type: InputType.TEXT,
      name: 'parent.firstName',
      question: 'ชื่อจริง',
      placeholder: 'ชื่อจริง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parent.lastName',
      question: 'นามสกุล',
      placeholder: 'นามสกุล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parent.phone',
      question: 'เบอร์โทรติดต่อ',
      placeholder: 'xxxxxxxxxx',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'parent.releationship',
      question: 'ความสัมพันธ์',
      placeholder: 'ex. มารดา, บิดา',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <Header>ข้อมูลติดต่อฉุกเฉิน</Header>,
    },
    {
      type: InputType.TEXT,
      name: 'emergency.firstName',
      question: 'ชื่อจริง',
      placeholder: 'ชื่อจริง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergency.lastName',
      question: 'นามสกุล',
      placeholder: 'นามสกุล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergency.phone',
      question: 'เบอร์โทรติดต่อ',
      placeholder: 'xxxxxxxxxx',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'emergency.releationship',
      question: 'ความสัมพันธ์',
      placeholder: 'ex. มารดา, บิดา',
      required: true,
    },
    {
      type: InputType.NONE,
      title: <Header>เลือกสาขา</Header>,
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
      choices: ['ยืนยันการเลือกสาขา'],
      required: true,
      direction: 'column',
      position: 'center',
    },
    {
      type: InputType.NONE,
      title: (
        <p className="text-sm text-red-500 text-center w-full">
          **หากยืนยันการเลือกสาขาแล้ว จะไม่สามารถเปลี่ยนสาขาได้ภายหลัง
        </p>
      ),
    },
  ],
}

export const additionalQuestions = makeQuestion(additionalWeakQuestions)

export const AdditionalQuestionSchema = buildYupObject(additionalQuestions)

export type AdditionalQuestionModel = InferType<typeof AdditionalQuestionSchema>
