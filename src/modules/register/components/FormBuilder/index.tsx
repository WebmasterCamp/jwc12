import { Fragment } from 'react'

import { useRouter } from 'next/router'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import { useRegister } from '../../context'
import { InputType } from '../../types'

export const FormBuilder = () => {
  const router = useRouter()
  const { form, step, question, submit } = useRegister()
  const {
    register,
    formState: { errors },
  } = form

  const onClickPrev = () => {
    router.push(`/register/step/${step - 1}`)
  }

  return (
    <form noValidate onSubmit={submit} className="text-black flex flex-wrap gap-y-2">
      {question.inputs.map((input, index) => {
        switch (input.type) {
          case InputType.NONE:
            return (
              <div key={`${question.name}_${index}`} className="w-full text-xl font-bold p-2">
                {input.title}
              </div>
            )
          case InputType.TEXT:
            return (
              <div key={input.name} className="basis-1/2 p-2">
                {input.question}{' '}
                {!!input.required && <span className="text-red-500 inline-block">*</span>}
                <Input {...register(input.name)} error={errors[input.name]?.message as string} />
              </div>
            )
          case InputType.TEXTAREA:
            return (
              <div key={input.name} className="basis-1/2 p-2">
                {input.question}
                <Input {...register(input.name)} />
              </div>
            )
          default:
            return null
        }
      })}
      <div className="flex flex-row space-x-4 mt-8 w-full p-2">
        <Button onClick={onClickPrev} className="w-full" variant="outlined">
          Prev
        </Button>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  )
}
