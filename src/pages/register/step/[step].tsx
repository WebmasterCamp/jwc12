import { ReactNode } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { withAuth } from '@/auth/withAuth'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { FormCard } from '@/components/FormCard'
import { Redirect } from '@/components/Redirect'
import { RegisterTopBar } from '@/components/RegisterTopBar'
import { Tab, TabItem } from '@/components/Tab'
import { withRegistrationData } from '@/db'
import { Registration } from '@/db/types'
import { FormBuilder } from '@/modules/register/components/FormBuilder'
import { FormSummary } from '@/modules/register/components/FormSummary'
import { RegisterProvider } from '@/modules/register/context'

const stepItems = ['ข้อมูลพื้นฐาน', 'ข้อมูลเพิ่มเติม', 'คำถามจากส่วนกลาง', 'คำถามประจำสาขา', 'สรุป']

interface StepPageProps {
  step: number
}

type InnerPageProps = StepPageProps & {
  registration: Registration | undefined
}

const StepPage: NextPage<StepPageProps> = withRegistrationData<InnerPageProps>(
  ({ step, registration }) => {
    const {
      consented = false,
      furthestStep = 1,
      submitted = false,
      confirmedBranch = '',
    } = registration || {}

    // has not consent to registration rules
    if (!consented) {
      return <Redirect to={`/register`} replace />
    }

    // has submitted the registration
    if (submitted) {
      return <Redirect to={`/register/complete`} replace />
    }

    // has gone further than the furthest step
    if (step > furthestStep) {
      return <Redirect to={`/register/step/${furthestStep}`} replace />
    }

    const wrapper = (children: ReactNode) => (
      <>
        <Container maxWidth="4xl" className="mb-6 self-center m-auto">
          <RegisterTopBar />
          <Tab furthestStep={furthestStep} currentStep={step}>
            {stepItems.map((item, index) => (
              <TabItem key={index} label={item} index={index + 1} />
            ))}
          </Tab>
          {children}
        </Container>
        <Footer />
      </>
    )

    if (step === 5) return wrapper(<FormSummary />)

    const formKey = step >= 4 ? `${step}-${confirmedBranch}` : `${step}`
    return (
      <RegisterProvider key={formKey} step={step}>
        {wrapper(
          <FormCard className="flex flex-1 flex-col">
            <FormBuilder />
          </FormCard>
        )}
      </RegisterProvider>
    )
  }
)

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
