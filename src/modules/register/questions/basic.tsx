import { InferType } from 'yup'

import { Header } from '../components/Header'
import { provinces } from '../constants/province'
import { InputType, WeakQuestion } from '../types'
import { buildYupObject, phoneTestConfig } from '../utils/validate'
import { makeQuestion } from '../utils/weak'

function checkCitizenId(id: string) {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i)
  }
  const mod = sum % 11
  const check = (11 - mod) % 10
  if (check == parseInt(id.charAt(12))) {
    return true
  }
  return false
}

const basicWeakQuestions: WeakQuestion = {
  stepName: 'basic',
  inputs: [
    // Information Section ------------------------------------------------------------
    {
      type: InputType.NONE,
      title: <Header>ข้อมูลพื้นฐาน</Header>,
    },
    {
      type: InputType.UPLOAD,
      name: 'profile',
      question: (
        <div className="text-center text-gray-400">
          <p className="mb-4">อัพโหลดรูปประจำตัว</p>
          <p className="text-xs italic"> ภาพขนาดไม่เกิน 2MB</p>
        </div>
      ),
      required: 'กรุณาอัพโหลด รูปประจำตัว',
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
      type: InputType.NONE,
      title: <div className="basis-1/2" />,
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
      name: 'nickname',
      question: 'ชื่อเล่น',
      placeholder: 'ชื่อเล่น',
      required: true,
    },
    {
      type: InputType.DATE,
      name: 'birthDate',
      question: 'วันเกิด',
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
        test: checkCitizenId,
      },
    },
    {
      type: InputType.TEXT,
      name: 'telephone',
      question: 'เบอร์โทรศัพท์',
      placeholder: '088-888-8888',
      required: true,
      validate: phoneTestConfig,
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
      title: <Header>ที่อยู่ปัจจุบัน</Header>,
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
      type: InputType.DROPDOWN,
      name: 'province',
      question: 'จังหวัด',
      placeholder: 'จังหวัด',
      choices: provinces,
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
      title: <Header>ข้อมูลการศึกษา</Header>,
    },
    {
      type: InputType.DROPDOWN,
      name: 'educationLevel',
      question: 'กำลังศึกษาอยู่ในระดับชั้น',
      placeholder: 'กำลังศึกษาอยู่ในระดับชั้น',
      choices: [
        'มัธยมศึกษาปีที่ 4 หรือเทียบเท่า',
        'มัธยมศึกษาปีที่ 5 หรือเทียบเท่า',
        'มัธยมศึกษาปีที่ 6 หรือเทียบเท่า',
        'กำลังขึ้นปริญญาตรีปีที่ 1',
      ],
      required: true,
    },
    {
      type: InputType.TEXT,
      name: 'educationSchool',
      question: 'โรงเรียน',
      placeholder: 'โรงเรียน',
      required: true,
    },
    {
      type: InputType.DROPDOWN,
      name: 'educationProvince',
      question: 'จังหวัด',
      placeholder: 'จังหวัด',
      choices: provinces,
      required: true,
    },
  ],
}

export const basicQuestions = makeQuestion(basicWeakQuestions)

export const BasicQuestionSchema = buildYupObject(basicQuestions)

export type BasicQuestionModel = InferType<typeof BasicQuestionSchema>
