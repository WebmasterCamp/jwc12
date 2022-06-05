import { contentQuestions } from '../questions/content'
import { designQuestions } from '../questions/design'
import { marketingQuestions } from '../questions/marketing'
import { programmingQuestions } from '../questions/programming'
import { BranchType } from '../types'

export const selectBranchQuestion = (branch?: BranchType) => {
  if (branch === BranchType.PROGRAMMING) return programmingQuestions
  if (branch === BranchType.DESIGN) return designQuestions
  if (branch === BranchType.CONTENT) return contentQuestions
  if (branch === BranchType.MARKETING) return marketingQuestions
}
