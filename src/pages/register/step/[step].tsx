import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { FormCard } from '@/components/FormCard'
import { Tab, TabItem } from '@/components/Tab'
import { FormBuilder } from '@/modules/register/components/FormBuilder'
import { RegisterProvider } from '@/modules/register/context'
import { BranchType } from '@/modules/register/types'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

const StepPage: NextPage = () => {
  const router = useRouter()
  const step = parseInt(router.query.step as string)

  if (step > stepItems.length || step <= 0) {
    return <>Not found</>
  }

  return (
    <RegisterProvider step={step} branch={BranchType.PROGRAMMING}>
      <Container className="mb-12 max-w-4xl self-center m-auto">
        <Tab>
          {stepItems.map((item, index) => (
            <TabItem key={index} label={item} index={index + 1} active={step === index + 1} />
          ))}
        </Tab>
        <FormCard className="flex flex-1 flex-col">
          <FormBuilder />
        </FormCard>
      </Container>
      <Footer />
    </RegisterProvider>
  )
}

export default StepPage
