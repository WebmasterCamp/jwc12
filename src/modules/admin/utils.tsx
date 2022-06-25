import { Fragment } from 'react'
import { NumberInput, RaRecord, TextField, TextInput } from 'react-admin'

import { coreQuestions } from '../register/questions/core'
import { BranchType, InputType, Question, SimpleInput } from '../register/types'
import { UserAdmin } from './types'

export const registrationTransform = ({ currentComment, which, branch, ...record }: RaRecord) => {
  // There is no need for text field
  const checker = currentComment.author
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
  for (let [questionKey, questionScore] of Object.entries(score)) {
    // Check only if there is at least one record
    if (typeof questionScore === 'number') {
      // There is a number!!
      isThereScore = true
      totalScore += questionScore
      const [questionType, qRaw] = questionKey.split('_')
      // It is a single digit number. At least, we don't have more than 9 questions.
      const qNumber = Number.parseInt(qRaw[1])
      // This question belongs to the person who edited the form.
      const correctBrnach =
        (branch === 'core' && questionType === 'core') ||
        (branch !== 'core' && questionType === 'branch')
      if (correctBrnach && qNumber == which) {
        checked = true
      }
      if (questionScore === 0) hasZero = true
    }
    // for (let [personCheck, personScore] of Object.entries(questionScore as any)) {
    //   if (typeof personScore === 'number') {
    //     // Score belong to the person that enter the form.
    //     if (personCheck === checker) {
    //       // There is at least one field checked.
    //       checked = true
    //     }
    //     totalScore += personScore
    //     // If someone put score, that mean they are checked.
    //     isThereScore = true
    //     if (personScore === 0) hasZero = true
    //   }
    // }
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
      if (record.comments == undefined) {
        record.comments = []
      }
      if (typeof currentComment.body !== 'string' || currentComment.body.length == 0) {
        console.log('Enter no comment case')
        return record.comments
      }
      if (typeof record.comments === 'object') {
        console.log('oncase')
        return [...record.comments, currentComment]
      }
      console.log('Undefined case')
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

  return coreQuestions.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.core.core_Q${index + 1}`} />
          <NumberInput min={0} max={10} step={1} source={`score.core_Q${index + 1}.${user.name}`} />
        </Fragment>
      )
    })
}

export function renderQuestion(question: Question, branch: string, checker: UserAdmin | undefined) {
  if (!checker) return null
  if (typeof checker.name != 'string') {
    return <p className="text-red-500 font-bold text-5xl">Please set your name first!!!</p>
  }
  if (typeof checker.which != 'number') {
    return <p className="text-red-500 font-bold text-5xl">Please set which one to check first!!!</p>
  }
  // -1 for the index (`which` is 1-based.)
  const theQuestion = question.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((x) => x as SimpleInput)[checker.which - 1]
  const rootSource = branch === 'core' ? 'core' : 'branch'
  const questionSource = `${branch === 'core' ? 'core' : branch}_Q${checker.which}`
  const destination = `score.${rootSource}_Q${checker.which}`
  return (
    <>
      <h2 className="text-lg ">{theQuestion.question}</h2>
      <h3 className="text-xl font-semibold">คำตอบ</h3>
      <TextField
        className="whitespace-pre-wrap"
        source={`answers.${rootSource}.${questionSource}`}
      />
      <NumberInput label="คะแนนที่ให้" min={0} max={10} source={destination} />
      <NumberInput
        source="which"
        className="!hidden"
        defaultValue={checker.which}
        validate={(va) => (va === checker.which ? undefined : "Don't change it.")}
      />
      <TextInput
        source="branch"
        className="!hidden"
        defaultValue={branch}
        validate={(va: any) => (va === branch ? undefined : "I said don't change it")}
      />
    </>
  )
}

// export function renderAllQuestions()
