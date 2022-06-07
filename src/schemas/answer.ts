import * as yup from 'yup'

const basicSchema = yup.object({
  profileUrl: yup.string().url().required(),
  gender: yup.string().url().required(),
  title: yup.string().url().required(),
  nameTh: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }),
  nameEn: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }),
  nickName: yup.string().required(),
  birthDate: yup.string().required(),
  religion: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
})

const residenceSchema = yup.object({
  address: yup.string().required(),
  road: yup.string().required(),
  subdistrict: yup.string().required(),
  district: yup.string().required(),
  province: yup.string().required(),
  postcode: yup.string().required(),
})

const educationSchema = yup.object({
  level: yup.string().required(),
  year: yup.string().required(),
  school: yup.string().required(),
})

const additionalSchema = yup.object({})

const emergencySchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  relation: yup.string().required(),
})

const branchSchema = yup.object({
  type: yup.string().required(),
  confirm: yup.boolean().required(),
})

/**
 * General questions
 */

const generalQuestionSchema = yup.object({})

/**
 * Specific Question schema for each branch
 */
export const designQuestionSchema = yup.object({})

export const programmingQuestionSchema = yup.object({})

export const marketingQuestionSchema = yup.object({})

export const contentQuestionSchema = yup.object({})
