import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import type { NextPage } from 'next'

import { yupResolver } from '@hookform/resolvers/yup'
import { InferType, boolean, object } from 'yup'

import { useAuthStore } from '@/auth/store'
import { withAuth } from '@/auth/withAuth'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Container } from '@/components/Container'
import { ErrorMessage } from '@/components/ErrorMessage'
import { FormCard } from '@/components/FormCard'
import { Redirect } from '@/components/Redirect'

const ConsentSchema = object({
  consent: boolean().test('required', 'ยอมรับเดี๋ยวนี้', (value) => !!value),
})

type ConsentModel = InferType<typeof ConsentSchema>

const RegisterPage: NextPage = () => {
  const { currentStep, consent } = useAuthStore()
  const { control, handleSubmit } = useForm<ConsentModel>({
    resolver: yupResolver(ConsentSchema),
    reValidateMode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<ConsentModel> = async (data) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<ConsentModel> = (data, err) => {}

  if (consent) {
    return <Redirect to={`/register/step/${currentStep}`} replace />
  }

  return (
    <Container>
      <FormCard className="flex flex-1 flex-col text-black">
        <div>Wating for Policy</div>
        <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
          <Controller
            control={control}
            name="consent"
            defaultValue={false}
            render={({ field: { value, ...rest }, formState: { errors } }) => (
              <>
                <Checkbox value="ยอมรับเงื่อนไข" label="ยอมรับเงื่อนไข" {...rest} />
                <ErrorMessage message={errors.consent?.message} />
              </>
            )}
          />
          <Button type="submit">ยืนยัน</Button>
        </form>
      </FormCard>
    </Container>
  )
}

export default withAuth(RegisterPage)
