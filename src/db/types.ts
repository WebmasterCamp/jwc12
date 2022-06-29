import { Timestamp } from 'firebase/firestore'

import { StepName } from '@/modules/register/questions'
import { BranchType } from '@/modules/register/types'

export type Answers = {
  [key in StepName]: any
}

export interface Registration {
  answers: Answers
  currentStep: number
  furthestStep: number
  consented: boolean
  confirmedBranch: BranchType | null
  submitted: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface RegistrationStats {
  all: number
  programming: number
  design: number
  marketing: number
  content: number
}

type QuestionNumber = '1' | '2' | '3' | '4' | '5' | '6'

type QuestionName = `${BranchType | 'core'}_Q${QuestionNumber}`

interface Comment {
  author: string
  comment: string
}

export interface Check {
  scores: Record<QuestionName, number>
  comments: Comment[]
  totalScore: number
  hasZero: boolean
}

export interface InterviewCandidate {
  id: string
  branch: BranchType
  firstName: string
  lastName: string
  interviewTime: string
}

export interface InterviewCandidatesDocument {
  data: InterviewCandidate[]
}

export interface Camper {
  id: string
  branch: BranchType
  name: string
}

export interface CamperListDocument {
  data: Camper[]
}
