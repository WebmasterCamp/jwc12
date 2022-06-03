import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FormCard } from '@/components/FormCard'
import { Tab, TabItem } from '@/components/Tab'
import { FormStep1 } from '@/layouts/register/FormStep1'
import { FormBuilder } from '@/modules/register/components/FormBuilder'
import { RegisterProvider } from '@/modules/register/context'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

const StepPage: NextPage = () => {
  const router = useRouter()
  const step = parseInt(router.query.step as string)

  if (step > stepItems.length || step <= 0) {
    return <>Not found</>
  }

  return (
    <RegisterProvider step={step}>
      <Container>
        <Tab>
          {stepItems.map((item, index) => (
            <TabItem key={index} label={item} index={index + 1} active={step === index + 1} />
          ))}
        </Tab>
        <FormCard className="flex flex-1 flex-col">
          <FormBuilder />
        </FormCard>
      </Container>
    </RegisterProvider>
  )
}

export default StepPage
