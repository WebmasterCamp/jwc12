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
      type: InputType.TEXT,
      name: 'firstName',
      question: <p className="inline">ชื่อจริง</p>,
      placeholder: 'ชื่อจริง',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'lastName',
      question: <p className="inline">นามสกุล</p>,
      placeholder: 'นามสกุล',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'firstNameEn',
      question: <p className="inline">ชื่อจริง (ภาษาอังกฤษ)</p>,
      placeholder: 'ชื่อจริง (ภาษาอังกฤษ)',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'lastNameEn',
      question: <p className="inline">นามสกุล (ภาษาอังกฤษ)</p>,
      placeholder: 'นามสกุล (ภาษาอังกฤษ)',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'nickName',
      question: <p className="inline">ชื่อเล่น</p>,
      placeholder: 'ชื่อเล่น',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.DATE,
      name: 'birthDate',
      question: <p className="inline">วัน/เดือน/ปีเกิด</p>,
      placeholder: 'dd/mm/yyyy',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'citizenId',
      question: <p className="inline">เลขบัตรประชาชน</p>,
      placeholder: 'xxxxxxxxxxxxx',
      required: 'กรุณากรอกข้อมูล',
      validate: {
        name: 'invalid',
        message: 'เลขบัตรประชาชนไม่ถูกต้อง',
        test: (value: string) => /^[0-9]{13}$/.test(value),
      },
    },
    {
      type: InputType.TEXT,
      name: 'telephone',
      question: <p className="inline">เบอร์โทรศัพท์</p>,
      placeholder: 'xxxxxxxxxx',
      required: 'กรุณากรอกข้อมูล',
      validate: {
        name: 'invalid',
        message: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
        test: (value: string) => /^[0-9]{10}$/.test(value),
      },
    },
    {
      type: InputType.EMAIL,
      name: 'email',
      question: <p className="inline">อีเมล</p>,
      placeholder: 'example@gmail.com',
      required: 'กรุณากรอกข้อมูล',
    },
    // Address Section ------------------------------------------------------------
    {
      type: InputType.NONE,
      title: <h2>ที่อยู่ปัจจุบัน</h2>,
    },
    {
      type: InputType.TEXT,
      name: 'address',
      question: <p className="inline">ที่อยู่</p>,
      placeholder: 'ที่อยู่',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'road',
      question: <p className="inline">ถนน</p>,
      placeholder: 'ถนน',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'subdistrict',
      question: <p className="inline">แขวง/ตำบล</p>,
      placeholder: 'แขวง/ตำบล',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'district',
      question: <p className="inline">เขต/อำเภอ</p>,
      placeholder: 'เขต/อำเภอ',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'province',
      question: <p className="inline">จังหวัด</p>,
      placeholder: 'จังหวัด',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'postalCode',
      question: <p className="inline">รหัสไปรษณี</p>,
      placeholder: 'รหัสไปรษณี',
      required: 'กรุณากรอกข้อมูล',
      validate: {
        name: 'invalid',
        message: 'รหัสไปรณีไม่ถูกต้อง',
        test: (value: string) => /^[0-9]$/.test(value),
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
      question: <p className="inline">กำลังศึกษาอยู่ในระดับ</p>,
      choices: [
        'มัธยมศึกษาปีที่ 4',
        'มัธยมศึกษาปีที่ 5',
        'มัธยมศึกษาปีที่ 6',
        'กำลังขึ้นปริญาตรีปีที่ 1',
      ],
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'school',
      question: <p className="inline">โรงเรียน</p>,
      placeholder: 'โรงเรียน',
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'schoolProvince',
      question: <p className="inline">จังหวัด</p>,
      placeholder: 'จังหวัด',
      required: 'กรุณากรอกข้อมูล',
    },
  ],
}

export const basicQuestions = makeQuestion(basicWeakQuestions)

export const BasicQuestionSchema = buildYupObject(basicQuestions)

export type BasicQuestionModel = InferType<typeof BasicQuestionSchema>
