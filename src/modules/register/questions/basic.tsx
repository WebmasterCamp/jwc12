import { InferType } from 'yup'

import { InputType, WeakQuestion } from '../types'
import { buildYupObject } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

const basicWeakQuestions: WeakQuestion = {
  name: 'basic',
  inputs: [
    // Information Section ------------------------------------------------------------
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลพื้นฐาน</h2>,
    },
    {
      type: InputType.DROPDOWN,
      name: 'title',
      question: 'คำนำหน้าชื่อ',
      placeholder: 'คำนำหน้าชื่อ',
      choices: ['เด็กชาย', 'เด็กหญิง', 'นาย', 'นางสาว'],
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'firstName',
      question: 'ชื่อจริง',
      placeholder: 'ชื่อจริง',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'lastName',
      question: 'นามสกุล',
      placeholder: 'นามสกุล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'firstNameEn',
      question: 'ชื่อจริง (ภาษาอังกฤษ)',
      placeholder: 'ชื่อจริง (ภาษาอังกฤษ)',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'lastNameEn',
      question: 'นามสกุล (ภาษาอังกฤษ)',
      placeholder: 'นามสกุล (ภาษาอังกฤษ)',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'nickName',
      question: 'ชื่อเล่น',
      placeholder: 'ชื่อเล่น',
      required: true,
    },
    {
      type: InputType.DATE,
      name: 'birthDate',
      question: 'วัน/เดือน/ปีเกิด',
      placeholder: 'dd/mm/yyyy',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'citizenId',
      question: 'เลขบัตรประชาชน',
      placeholder: 'xxxxxxxxxxxxx',
      required: true,
      validate: {
        name: 'invalid',
        message: 'เลขบัตรประชาชนไม่ถูกต้อง',
        test: (value: string) => /^[0-9]{13}$/.test(value),
      },
    },
    {
      type: InputType.TEXT,
      name: 'telephone',
      question: 'เบอร์โทรศัพท์',
      placeholder: 'xxxxxxxxxx',
      required: true,
      validate: {
        name: 'invalid',
        message: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
        test: (value: string) => /^[0-9]{10}$/.test(value),
      },
    },
    {
      type: InputType.EMAIL,
      name: 'email',
      question: 'อีเมล',
      placeholder: 'example@gmail.com',
      required: true,
    },
    // Address Section ------------------------------------------------------------
    {
      type: InputType.NONE,
      title: <h2>ที่อยู่ปัจจุบัน</h2>,
    },
    {
      type: InputType.TEXT,
      name: 'address',
      question: 'ที่อยู่',
      placeholder: 'ที่อยู่',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'road',
      question: 'ถนน',
      placeholder: 'ถนน',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'subdistrict',
      question: 'แขวง/ตำบล',
      placeholder: 'แขวง/ตำบล',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'district',
      question: 'เขต/อำเภอ',
      placeholder: 'เขต/อำเภอ',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'province',
      question: 'จังหวัด',
      placeholder: 'จังหวัด',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'postalCode',
      question: 'รหัสไปรษณีย์',
      placeholder: 'รหัสไปรษณีย์',
      required: true,
      validate: {
        name: 'invalid',
        message: 'รหัสไปรษณีย์ไม่ถูกต้อง',
        test: (value: string) => /^[0-9]{5}$/.test(value),
      },
    },
    // Education Section ------------------------------------------------------------
    {
      type: InputType.NONE,
      title: <h2>ข้อมูลการศึกษา</h2>,
    },
    {
      type: InputType.RADIO,
      name: 'educationLevel',
      question: 'กำลังศึกษาอยู่ในระดับชั้น',
      placeholder: 'กำลังศึกษาอยู่ในระดับชั้น',
      choices: [
        'มัธยมศึกษาปีที่ 4',
        'มัธยมศึกษาปีที่ 5',
        'มัธยมศึกษาปีที่ 6',
        'กำลังขึ้นปริญญาตรีปีที่ 1',
      ],
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'school',
      question: 'โรงเรียน',
      placeholder: 'โรงเรียน',
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'schoolProvince',
      question: 'จังหวัด',
      required: true,
    },
  ],
}

export const basicQuestions = makeQuestion(basicWeakQuestions)

export const BasicQuestionSchema = buildYupObject(basicQuestions)

export type BasicQuestionModel = InferType<typeof BasicQuestionSchema>
