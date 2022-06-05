import { Fragment, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import useSWR from 'swr'

import { useAuthStore } from '@/auth/store'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Answers, getRegistration } from '@/lib/db'

import { additionalQuestions } from '../../questions/additional'
import { basicQuestions } from '../../questions/basic'
import { coreQuestions } from '../../questions/core'
import { InputType, Question } from '../../types'
import { selectBranchQuestion } from '../../utils/question'

interface SummaryBuilderProps {
  question?: Question
  answer?: any
}

const SummaryBuilder: React.FC<SummaryBuilderProps> = ({ question, answer }) => {
  return (
    <div className="text-black">
      {question?.inputs.map((input, index) => {
        switch (input.type) {
          case InputType.NONE:
            return <Fragment key={`${question.stepName}_${index}`}>{input.title}</Fragment>
          case InputType.TEXT:
          case InputType.EMAIL:
          case InputType.DATE:
          case InputType.RADIO:
          case InputType.DROPDOWN:
            return (
              <div>
                {input.question}
                <p>{answer[input.name]}</p>
              </div>
            )
          case InputType.TEXTAREA:
            return (
              <div>
                {input.question}
                <p>{answer[input.name]}</p>
              </div>
            )
          case InputType.DROPDOWN:
          case InputType.CHECKBOX: {
            return (
              <div>
                {input.question}
                <div>{JSON.stringify(answer[input.name])}</div>
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export const FormSummary = () => {
  const router = useRouter()
  const { uid, branch } = useAuthStore()

  const { data: registration } = useSWR(uid, getRegistration)
  const answers = registration?.answers

  const handleSubmit = () => {
    // TODO save confirmation
    router.push('/register/complete')
  }

  if (!answers) return <Loading />

  return (
    <div className="flex flex-col">
      <SummaryBuilder question={basicQuestions} answer={answers['basic']} />
      <SummaryBuilder question={additionalQuestions} answer={answers['additional']} />
      <SummaryBuilder question={coreQuestions} answer={answers['core']} />
      <SummaryBuilder question={selectBranchQuestion(branch)} answer={answers['branch']} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
