import React, { PropsWithChildren } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'

import { useRegister } from '../../context'
import { InputType } from '../../types'

const InputContainer = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={clsx(`p-2 basis-auto w-full sm:basis-1/2`, props.className)}>
      {props.children}
    </div>
  )
}

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
          case InputType.NONE: {
            return (
              <div key={`${question.name}_${index}`} className="w-full text-xl font-bold p-2">
                {input.title}
              </div>
            )
          }
          case InputType.TEXT:
          case InputType.EMAIL:
          case InputType.DATE: {
            return (
              <InputContainer key={input.name}>
                {input.question}{' '}
                {!!input.required && <span className="text-red-500 inline-block">*</span>}
                <Input
                  {...register(input.name)}
                  type={input.type}
                  error={errors[input.name]?.message as string}
                />
              </InputContainer>
            )
          }
          case InputType.RADIO: {
            return null
          }
          case InputType.TEXTAREA: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
                {input.question}
                <TextArea
                  {...register(input.name)}
                  rows={4}
                  error={errors[input.name]?.message as string}
                />
              </InputContainer>
            )
          }
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
