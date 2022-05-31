import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FormCard } from '@/components/FormCard'
import { FormStep1 } from '@/components/FormStep1'
import { Tab, TabItem } from '@/components/Tab'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

const StepPage: NextPage = () => {
  // const method = useForm<AnswerModel>({
  //   resolver: yupResolver(answerSchema),
  // })

  // const { handleSubmit } = method

  const router = useRouter()
  const step = parseInt(router.query.step as string)

  // const onSubmit: SubmitHandler<AnswerModel> = (data, event) => {
  //   event?.preventDefault()
  //   console.log(data)
  //   router.push(`/step/${step + 1}`)
  // }

  // const onError: SubmitErrorHandler<AnswerModel> = (err, event) => {
  //   event?.preventDefault()
  //   console.error(err)
  // }

  const onClickPrev = () => {
    router.push(`/step/${step - 1}`)
  }

  if (step > stepItems.length || step <= 0) {
    return <>Not found</>
  }

  return (
    <Container>
      <Tab>
        {stepItems.map((item, index) => (
          <TabItem key={index} label={item} index={index + 1} active={step === index + 1} />
        ))}
      </Tab>
      <FormCard className="flex flex-1 flex-col">
        <form
          // onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-1 flex-col gap-10 text-black justify-between"
          noValidate
        >
          {step === 1 && <FormStep1 />}
          {step === 2 && <FormStep1 />}
          {step === 3 && <FormStep1 />}
          {step === 4 && <FormStep1 />}
          {step === 5 && <FormStep1 />}
          <div className="flex flex-row space-x-4">
            <Button onClick={onClickPrev} className="w-full" variant="outlined">
              Prev
            </Button>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </FormCard>
    </Container>
  )
}

export default StepPage
