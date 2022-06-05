import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { NextPage } from 'next'

import { yupResolver } from '@hookform/resolvers/yup'
import { InferType, boolean, object } from 'yup'

import { useAuthStore } from '@/auth/store'
import { withAuth } from '@/auth/withAuth'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Container } from '@/components/Container'
import { FormCard } from '@/components/FormCard'
import { Redirect } from '@/components/Redirect'
import { RegisterTopBar } from '@/components/RegisterTopBar'

const ConsentSchema = object({
  consent: boolean().test('required', 'ยอมรับเดี๋ยวนี้', (value) => !!value),
})

type ConsentModel = InferType<typeof ConsentSchema>

const RegisterPage: NextPage = () => {
  const { currentStep, consent, user, signOut, updateConsent } = useAuthStore()

  const { control, handleSubmit } = useForm<ConsentModel>({
    resolver: yupResolver(ConsentSchema),
    reValidateMode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<ConsentModel> = async (data) => {
    updateConsent(data.consent ?? false)
  }

  const onError: SubmitErrorHandler<ConsentModel> = () => {
    toast.error('กรุณายอมรับข้อตกลงก่อนสมัคร')
  }

  if (consent) {
    return <Redirect to={`/register/step/${currentStep}`} replace />
  }

  return (
    <Container maxWidth="4xl" className="flex flex-col self-center m-auto max-h-screen">
      <RegisterTopBar displayName={user?.displayName} signOut={signOut} />
      <FormCard className="flex flex-col text-black gap-y-4 grow-1 min-h-0 bg-white">
        <h2 className="text-xl text-center font-bold">อ่านให้ดีก่อนไปต่อ</h2>
        <div className="flex border-2 border-gold rounded-md p-4 overflow-y-auto">
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy Wating for Policy Wating for Policy Wating for Policy Wating for Policy
          Wating for Policy
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-2 min-w-0"
        >
          <Controller
            control={control}
            name="consent"
            defaultValue={false}
            render={({ field: { value, ...rest } }) => (
              <Checkbox value="ยอมรับเงื่อนไข" label="ยอมรับเงื่อนไข" {...rest} />
            )}
          />
          <Button type="submit" className="w-full">
            ยืนยัน
          </Button>
        </form>
      </FormCard>
    </Container>
  )
}

export default withAuth(RegisterPage)
