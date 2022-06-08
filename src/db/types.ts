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
