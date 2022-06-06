import { Fragment, ReactNode } from 'react'

import { Button } from '@/components/Button'
import { FormCard } from '@/components/FormCard'
import { ImagePreview } from '@/components/ImagePreview'
import { InputContainer } from '@/components/InputContainer'
import { Loading } from '@/components/Loading'
import { updateRegistration, useRegistrationData } from '@/db'
import { saveToast } from '@/utils/saveToast'

import { SPECIAL_FIELD } from '../../context/constants'
import { additionalQuestions } from '../../questions/additional'
import { basicQuestions } from '../../questions/basic'
import { coreQuestions } from '../../questions/core'
import { InputType, Question } from '../../types'
import { selectBranchQuestion } from '../../utils/question'

interface SummaryBuilderProps {
  question?: Question
  answers?: any
}

const SummaryBuilder: React.FC<SummaryBuilderProps> = ({ question, answers }) => {
  const { data: registration } = useRegistrationData()
  const branch = registration!!.confirmedBranch

  return (
    <div className="flex flex-wrap gap-y-2 text-black">
      {question?.inputs.map((input, index) => {
        if (input.hideInSummary) return null
        if (input.type === InputType.RADIO && input.name === SPECIAL_FIELD.BRANCH) {
          const choice = input.choices.find((choice) => choice.value === branch)
          return <div className="p-2 -mt-4">{choice?.label ?? choice?.value}</div>
        }
        switch (input.type) {
          case InputType.NONE: {
            return (
              <Fragment key={`${question.stepName}_${index}`}>
                <div className="w-full">{input.title}</div>
              </Fragment>
            )
          }
          case InputType.TEXT:
          case InputType.EMAIL:
          case InputType.DATE: {
            return (
              <AnswerPreview
                key={input.name}
                question={input.question}
                answer={answers[input.name]}
              />
            )
          }
          case InputType.RADIO:
          case InputType.DROPDOWN: {
            const value = answers[input.name]
            const choice = input.choices.find((choice) => choice.value === value)
            return (
              <AnswerPreview
                key={input.name}
                question={input.question}
                answer={choice?.label ?? choice?.value}
              />
            )
          }
          case InputType.TEXTAREA: {
            return (
              <AnswerPreview
                key={input.name}
                className="basis-full sm:basis-full"
                question={input.question}
                answer={<p>{answers[input.name]}</p>}
              />
            )
          }
          case InputType.CHECKBOX: {
            const answer = answers[input.name]
            return (
              <AnswerPreview
                key={input.name}
                question={input.question}
                answer={
                  <ul>
                    {input.choices.map((choice) => {
                      if (answer[choice.name] !== true) return null
                      let display = `- ${choice.label ?? choice.value}`
                      if (choice.name === 'other') {
                        display += `: ${answer['other_input']}`
                      }
                      return <li key={`${input.name}_${choice.name}`}>{display}</li>
                    })}
                  </ul>
                }
              />
            )
          }
          case InputType.UPLOAD: {
            return (
              <ImagePreview key={input.name} className="w-full p-2" value={answers[input.name]} />
            )
          }
        }
      })}
    </div>
  )
}

function AnswerPreview({
  className,
  question,
  answer,
}: {
  className?: string
  question: ReactNode
  answer: ReactNode
}) {
  return (
    <InputContainer className={className}>
      <div className="text-gray-500">{question}</div>
      <div>{answer}</div>
    </InputContainer>
  )
}

export const FormSummary = () => {
  const { data: registration } = useRegistrationData()
  const answers = registration!!.answers
  const branch = registration!!.confirmedBranch

  const handleSubmit = async () => {
    await saveToast(
      updateRegistration({
        answers,
        submitted: true,
      })
    )
  }

  if (!answers) return <Loading />

  return (
    <FormCard className="flex flex-col">
      <SummaryBuilder question={basicQuestions} answers={answers['basic']} />
      <SummaryBuilder question={additionalQuestions} answers={answers['additional']} />
      <SummaryBuilder question={coreQuestions} answers={answers['core']} />
      <SummaryBuilder question={selectBranchQuestion(branch)} answers={answers['branch']} />
      <Button className="mt-4" onClick={handleSubmit}>
        ส่งใบสมัคร
      </Button>
    </FormCard>
  )
}
