import { Fragment } from 'react'
import { NumberInput, RaRecord, TextField } from 'react-admin'

import { BranchType, InputType, Question, SimpleInput } from '../register/types'
import { UserAdmin } from './types'

export const registrationTransform = ({ currentComment, checker, ...record }: RaRecord) => {
  const score = record.score
  // True when someone put the score.
  let isThereScore = false
  // There is any zero in score. Zero is a number not null.
  let hasZero = false
  // Total score for calculation
  let totalScore = 0
  // True when person filled the form add the score
  let checked = false

  // Summation of score
  // Loop over question score
  for (let questionScore of Object.values(score)) {
    // Loop over score by each person
    // Please don't care about TypeScript.
    for (let [personCheck, personScore] of Object.entries(questionScore as any)) {
      if (typeof personScore === 'number') {
        // Score belong to the person that enter the form.
        if (personCheck === checker) {
          // There is at least one field checked.
          checked = true
        }
        totalScore += personScore
        // If someone put score, that mean they are checked.
        isThereScore = true
        if (personScore === 0) hasZero = true
      }
    }
  }
  // If someone puts score, put calculated total score.
  if (isThereScore) {
    record.totalScore = totalScore
  } else {
    // Otherwise, set it to null
    record.totalScore = null
  }
  // If there is a zero, red flag them.
  if (isThereScore && hasZero) {
    record.hasZero = true
  } else {
    record.hasZero = false
  }

  // Utitlity: so no need to check again unless something happens.
  // If there is no such field already, replaces it with an empty object so the property can be set.
  record.checkedBy = record.checkedBy || {}

  record.checkedBy[checker] = checked
  return {
    ...record,
    comments: (function () {
      // Actually array
      if (typeof currentComment.body !== 'string' || currentComment.body.length == 0)
        return record.comments
      if (typeof record.comments === 'object') {
        return [...record.comments, currentComment]
      }
      return [currentComment]
    })(),
    // score: {
    //   ...record.score,
    //   total: Object.values(score)
    // }
  }
}

export function renderQuestions(
  user: UserAdmin | undefined,
  question?: Question,
  branch?: BranchType | 'core'
) {
  if (!user) return null

  const filteredQuestions = question?.inputs.filter((it) => it.type === InputType.TEXTAREA)

  const section = branch === 'core' ? 'core' : 'branch'

  return filteredQuestions?.map((it, index) => {
    const input = it as SimpleInput
    return (
      <Fragment key={input.name}>
        <h2>{input.question}</h2>
        <TextField source={`answers.${section}.${branch}_Q${index + 1}`} />
        <NumberInput
          min={0}
          max={10}
          step={1}
          source={`score.${branch}_Q${index + 1}.${user?.name}`}
        />
      </Fragment>
    )
  })
}
