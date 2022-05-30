import { FormProvider, useForm } from 'react-hook-form'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FormCard } from '@/components/FormCard'
import { Tab, TabItem } from '@/components/Tab'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

const answerSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date()
  }),
})

type AnswerModel = yup.InferType<typeof answerSchema>

const StepPage: NextPage = () => {
  const method = useForm<AnswerModel>({
    resolver: yupResolver(answerSchema),
  })

  const router = useRouter()
  const step = parseInt(router.query.step as string)

  const handleNext = () => {
    router.push(`/step/${step + 1}`)
  }

  const handlePrev = () => {
    router.push(`/step/${step - 1}`)
  }

  if (step > stepItems.length || step <= 0) {
    return <>Not found</>
  }

  return (
    <FormProvider {...method}>
      <Container>
        <Tab>
          {stepItems.map((item, index) => (
            <TabItem key={index} label={item} index={index + 1} active={step === index + 1} />
          ))}
        </Tab>
        <FormCard className="flex flex-1 justify-center items-center flex-col gap-2">
          Step1Page
          <Button onClick={handlePrev}>Prev</Button>
          <Button onClick={handleNext}>Next</Button>
        </FormCard>
      </Container>
    </FormProvider>
  )
}

export default StepPage
