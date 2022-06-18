import { Fragment } from 'react'
import { NumberInput, RaRecord, TextField } from 'react-admin'

import { coreQuestions } from '../register/questions/core'
import { InputType, Question, SimpleInput } from '../register/types'
import { UserAdmin } from './types'

export const registrationTransform = ({ currentComment, ...record }: RaRecord) => {
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

export function renderCoreQuestions(checker?: UserAdmin) {
  if (!checker) return null

  if (typeof checker.name != 'string') {
    return <p className="text-red-500 font-bold text-5xl">Please set your name first.</p>
  }

  return coreQuestions.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.core.core_Q${index + 1}`} />
          <NumberInput
            min={0}
            max={10}
            step={1}
            source={`score.core_Q${index + 1}.${checker.name}`}
          />
        </Fragment>
      )
    })
}

export function renderBranchQuestions(question: Question, branch: string, checker: any) {
  if (!checker) return null

  if (typeof checker.name != 'string') {
    return <p className="text-red-500 font-bold text-5xl">Please set your name first!!!</p>
  }
  return question.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.branch.${branch}_Q${index + 1}`} />
          <NumberInput
            min={0}
            max={10}
            step={1}
            source={`score.branch_Q${index + 1}.${checker.name}`}
          />
        </Fragment>
      )
    })
}
