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
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'lastName',
      question: <p className="inline">นามสกุล</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'firstNameEn',
      question: <p className="inline">ชื่อจริง (ภาษาอังกฤษ)</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'lastNameEn',
      question: <p className="inline">นามสกุล (ภาษาอังกฤษ)</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'nickName',
      question: <p className="inline">ชื่อเล่น</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.DATE,
      name: 'birthDate',
      question: <p className="inline">วัน/เดือน/ปีเกิด</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'citizenId',
      question: <p className="inline">เลขบัตรประชาชน</p>,
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
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'road',
      question: <p className="inline">ถนน</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'subdistrict',
      question: <p className="inline">แขวง/ตำบล</p>,
      required: 'กรุณากรอกข้อมูล',
    },
    {
      type: InputType.TEXT,
      name: 'district',
      question: <p className="inline">เขต/อำเภอ</p>,
      required: 'กรุณากรอกข้อมูล',
    },
  ],
}

export const basicQuestions = makeQuestion(basicWeakQuestions)

export const BasicQuestionSchema = buildYupObject(basicQuestions)

export type BasicQuestionModel = InferType<typeof BasicQuestionSchema>
