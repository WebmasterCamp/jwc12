import { ReactNode } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { useAuthStore } from '@/auth/store'
import { withAuth } from '@/auth/withAuth'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { FormCard } from '@/components/FormCard'
import { RegisterTopBar } from '@/components/RegisterTopBar'
import { Tab, TabItem } from '@/components/Tab'
import { FormBuilder } from '@/modules/register/components/FormBuilder'
import { FormSummary } from '@/modules/register/components/FormSummary'
import { RegisterProvider } from '@/modules/register/context'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

interface StepPageProps {
  step: number
}

const StepPage: NextPage<StepPageProps> = ({ step }) => {
  const { farthestStep, user, signOut } = useAuthStore()

  const wrapper = (children: ReactNode) => (
    <>
      <Container maxWidth="4xl" className="mb-6 self-center m-auto">
        <RegisterTopBar displayName={user?.displayName} signOut={signOut} />
        <Tab farthestStep={farthestStep} currentStep={step}>
          {stepItems.map((item, index) => (
            <TabItem key={index} label={item} index={index + 1} />
          ))}
        </Tab>
        <FormCard className="flex flex-1 flex-col">{children}</FormCard>
      </Container>
      <Footer />
    </>
  )

  if (step === 5) return wrapper(<FormSummary />)
  return <RegisterProvider step={step}>{wrapper(<FormBuilder />)}</RegisterProvider>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { step: string } }[] = []
  for (let i = 1; i <= stepItems.length; i++) {
    paths.push({ params: { step: i.toString() } })
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<StepPageProps> = async (ctx) => {
  const step = parseInt(ctx.params?.step as string)
  return {
    props: { step },
  }
}

export default withAuth(StepPage)
