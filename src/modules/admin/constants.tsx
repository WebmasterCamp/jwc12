import { contentQuestions } from '../register/questions/content'
import { coreQuestions } from '../register/questions/core'
import { designQuestions } from '../register/questions/design'
import { marketingQuestions } from '../register/questions/marketing'
import { programmingQuestions } from '../register/questions/programming'
import { BranchType, Question } from '../register/types'

interface BranchToQuestion extends Record<BranchType, Question> {
  core: Question
}

export const branchToQuestion: BranchToQuestion = {
  [BranchType.MARKETING]: marketingQuestions,
  [BranchType.PROGRAMMING]: programmingQuestions,
  [BranchType.CONTENT]: contentQuestions,
  [BranchType.DESIGN]: designQuestions,
  core: coreQuestions,
}
