import { InferType } from 'yup'

import { Header } from '../components/Header'
import { SPECIAL_FIELD } from '../context/constants'
import { InputType, WeakQuestion } from '../types'
import { buildYupObject, phoneTestConfig } from '../utils/validate'
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
      name: 'healthCongenitalDisease',
      question: 'โรคประจำตัว',
      placeholder: 'ex. ภูมิแพ้',
    },
    {
      type: InputType.TEXT,
      name: 'healthDrug',
      question: 'ยาประจำตัว',
      placeholder: 'ยาประจำตัว',
    },
    {
      type: InputType.TEXT,
      name: 'healthAllergicDrug',
      question: 'ยาที่แพ้',
      placeholder: 'ยาที่แพ้',
    },
    {
      type: InputType.TEXT,
      name: 'healthAllergicThing',
      question: 'สิ่งที่แพ้',
      placeholder: 'ex. ขนสัตว์, กุ้ง',
    },
    {
      type: InputType.TEXT,
      name: 'healthDietaryRestriction',
      question: 'ข้อจำกัดด้านอาหาร',
      placeholder: 'ex. มังสวิรัติ, อาหารคาว, อาหารเผ็ด, ฮาลาล',
    },
    {
      type: InputType.DROPDOWN,
      name: 'shirtSize',
      question: 'ไซส์เสื้อ',
      placeholder: 'ไซส์เสื้อ',
      choices: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      required: true,
    },
    {
      type: InputType.NONE,
      title: (
        <div className="p-2 w-full text-center">
          <table className="w-full border-2 border-gray-300">
            <tr className="text-center border-2 border-gray-300">
              <th colSpan={3} className="p-3 border-2 border-gray-300">
                ตารางขนาดเสื้อ
              </th>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <th className="p-3 border-2 border-gray-300">ไซส์</th>
              <th className="p-3 border-2 border-gray-300">รอบอก</th>
              <th className="p-3 border-2 border-gray-300">ยาว</th>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">S</td>
              <td className="p-2 border-2 border-gray-300">33&quot;</td>
              <td className="p-2 border-2 border-gray-300">25&quot;</td>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">M</td>
              <td className="p-2 border-2 border-gray-300">36&quot;</td>
              <td className="p-2 border-2 border-gray-300">27&quot;</td>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">L</td>
              <td className="p-2 border-2 border-gray-300">40&quot;</td>
              <td className="p-2 border-2 border-gray-300">28&quot;</td>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">XL</td>
              <td className="p-2 border-2 border-gray-300">44&quot;</td>
              <td className="p-2 border-2 border-gray-300">30&quot;</td>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">2XL</td>
              <td className="p-2 border-2 border-gray-300">48&quot;</td>
              <td className="p-2 border-2 border-gray-300">31&quot;</td>
            </tr>
            <tr className="text-center border-2 border-gray-300">
              <td className="p-2 border-2 border-gray-300">3XL</td>
              <td className="p-2 border-2 border-gray-300">52&quot;</td>
              <td className="p-2 border-2 border-gray-300">32&quot;</td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      type: InputType.TEXTAREA,
      name: 'activity',
      question: 'กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ',
      placeholder: 'ex. งานแข่งขัน การประกวด การแสดง ฯลฯ',
    },

    {
      type: InputType.CHECKBOX,
      name: 'knowFrom',
      question: 'รู้จักค่าย YWC จากไหน',
      choices: [
        { value: 'Facebook', name: 'facebook' },
        { value: 'Instagram', name: 'instagram' },
        { value: 'Twitter', name: 'twitter' },
        { value: 'เพื่อน', name: 'friend' },
        { value: 'สถานศึกษา', name: 'school' },
      ],
      placeholder: 'ex. งานแข่งขัน การประกวด การแสดง ฯลฯ',
      required: true,
      direction: 'column',
      needOtherInput: true,
    },
    {
      type: InputType.TEXTAREA,
      name: 'remark',
      question: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
      placeholder: 'มีอะไรอยากบอกไหม (ข้อมูลอื่นๆ ที่จำเป็น)',
    },
    {
      type: InputType.NONE,
      title: <Header>ข้อมูลผู้ปกครอง</Header>,
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
      placeholder: '088-888-8888',
      required: true,
      validate: phoneTestConfig,
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
      title: <Header>ข้อมูลติดต่อฉุกเฉิน</Header>,
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
      placeholder: '088-888-8888',
      required: true,
      validate: phoneTestConfig,
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
      title: <Header>เลือกสาขา</Header>,
    },
    {
      type: InputType.RADIO,
      name: SPECIAL_FIELD.BRANCH,
      question: (
        <div className="w-full flex justify-center">
          <picture>
            <source srcSet="/images/registrationFormPicture-2x.png 2x" />
            <img src="/images/registrationFormPicture.png" className="w-full" alt="" />
          </picture>
        </div>
      ),
      choices: [
        { value: 'content', name: 'content', label: 'สาขา Content' },
        { value: 'design', name: 'design', label: 'สาขา Design' },
        { value: 'marketing', name: 'marketing', label: 'สาขา Marketing' },
        { value: 'programming', name: 'programming', label: 'สาขา Programming' },
      ],
      required: true,
      noMark: true,
    },
    {
      type: InputType.CHECKBOX,
      name: SPECIAL_FIELD.BRANCH_CONIRM,
      question: null,
      choices: [{ value: 'ยืนยันการเลือกสาขา', label: 'ยืนยันการเลือกสาขา', name: 'confirm' }],
      required: true,
      direction: 'column',
      position: 'center',
      hideInSummary: true,
      validate: {
        name: 'required',
        message: 'กรุณายืนยันการเลือกสาขา',
        test: (value) => value['confirm'],
      },
    },
    {
      type: InputType.NONE,
      title: (
        <p className="text-sm text-red-500 text-center w-full">
          **หากยืนยันการเลือกสาขาแล้ว จะไม่สามารถเปลี่ยนสาขาได้ภายหลัง
        </p>
      ),
      hideInSummary: true,
    },
  ],
}

export const additionalQuestions = makeQuestion(additionalWeakQuestions)

export const AdditionalQuestionSchema = buildYupObject(additionalQuestions)

export type AdditionalQuestionModel = InferType<typeof AdditionalQuestionSchema>
