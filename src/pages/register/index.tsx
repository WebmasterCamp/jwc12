import { Controller, SubmitErrorHandler, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { NextPage } from 'next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { yupResolver } from '@hookform/resolvers/yup'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { InferType, boolean, object } from 'yup'

import { useAuthStore } from '@/auth/store'
import { withAuth } from '@/auth/withAuth'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Container } from '@/components/Container'
import { FormCard } from '@/components/FormCard'
import { Redirect } from '@/components/Redirect'
import { RegisterTopBar } from '@/components/RegisterTopBar'
import { updateRegistration, withRegistrationData } from '@/db'
import { Registration } from '@/db/types'
import { MDXLayout } from '@/docs/layout'

const ConsentSchema = object({
  consented: boolean().test('required', 'ยอมรับเดี๋ยวนี้', (value) => !!value),
})

type ConsentModel = InferType<typeof ConsentSchema>

interface RegisterPageProps {
  registration: Registration | undefined
  source: MDXRemoteSerializeResult
}

const RegisterPage: NextPage<RegisterPageProps> = withRegistrationData<RegisterPageProps>(
  ({ registration, source }) => {
    const { user, signOut } = useAuthStore()
    const { consented = false, currentStep = 1, submitted = false } = registration || {}

    const { control, handleSubmit } = useForm<ConsentModel>({
      resolver: yupResolver(ConsentSchema),
      reValidateMode: 'onSubmit',
    })

    const watchedConsented = useWatch({ control, name: 'consented' })

    const onSubmit: SubmitHandler<ConsentModel> = async (data) => {
      if (!data.consented) return
      await updateRegistration({
        consented: true,
      })
    }

    const onError: SubmitErrorHandler<ConsentModel> = () => {
      toast.error('กรุณายอมรับข้อตกลงก่อนสมัคร')
    }

    if (submitted) {
      return <Redirect to={`/register/complete`} replace />
    }

    if (consented) {
      return <Redirect to={`/register/step/${currentStep ?? 1}`} replace />
    }

    return (
      <Container maxWidth="4xl" className="flex flex-col self-center m-auto max-h-screen">
        <RegisterTopBar displayName={user?.displayName} signOut={signOut} />
        <FormCard className="flex flex-col text-black gap-y-4 grow-1 min-h-0 bg-white">
          <h2 className="text-xl text-center font-bold">
            กรุณายอมรับข้อกำหนดและเงื่อนไข การเข้าร่วมโครงการเพื่อดำเนินการสมัคร
          </h2>
          <div className="border-2 border-gold rounded-md p-4 overflow-y-auto">
            <MDXLayout {...source} />
          </div>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col items-center gap-y-2"
          >
            <Controller
              control={control}
              name="consented"
              defaultValue={false}
              render={({ field: { value, ...rest } }) => (
                <Checkbox
                  {...rest}
                  label="ข้าพเจ้าได้อ่านและยอมรับข้อกำหนดและเงื่อนไขการเข้าร่วมโครงการเป็นที่เรียบร้อยแล้ว"
                />
              )}
            />
            <Button type="submit" className="w-full" disabled={!watchedConsented}>
              ยืนยัน
            </Button>
          </form>
        </FormCard>
      </Container>
    )
  }
)

export default withAuth(RegisterPage)

export async function getStaticProps() {
  const source = readFileSync(resolve(__dirname, '../../../src/docs/register.mdx'), 'utf8')
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
