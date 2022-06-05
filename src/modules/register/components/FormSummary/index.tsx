import { Fragment, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Answers, getRegistration } from '@/lib/db'

import { useRegister } from '../../context'
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
    <>
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
          case InputType.CHECKBOX:
            return (
              <div>
                {input.question}
                <div>
                  {answer[input.name].map((choosed: string) => {
                    return <p>{choosed}</p>
                  })}
                </div>
              </div>
            )
        }
      })}
    </>
  )
}

export const FormSummary = () => {
  const router = useRouter()
  const { branch } = useRegister()

  const [answers, setAnswers] = useState<Answers>()

  useEffect(() => {
    async function fetchAnswer() {
      const { answers } = await getRegistration()
      setAnswers(answers)
    }
    fetchAnswer()
  }, [])

  const handleSubmit = () => {
    router.push('/register/complete')
  }

  if (!answers) return <Loading />

  return (
    <div>
      <SummaryBuilder question={basicQuestions} answer={answers['basic']} />
      <SummaryBuilder question={additionalQuestions} answer={answers['additional']} />
      <SummaryBuilder question={coreQuestions} answer={answers['core']} />
      <SummaryBuilder question={selectBranchQuestion(branch)} answer={answers['branch']} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
