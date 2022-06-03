import React from 'react'
import { Controller } from 'react-hook-form'

import { useRouter } from 'next/router'

import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Radio, RadioGroup } from '@/components/Radio'
import { RequireMark } from '@/components/RequireMark/indext'
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
  if (!form) return null

  const {
    register,
    control,
    formState: { errors },
  } = form

  const onClickPrev = () => {
    router.push(`/register/step/${step - 1}`)
  }

  return (
    <form noValidate onSubmit={submit} className="text-black flex flex-wrap gap-y-2">
      {question?.inputs.map((input, index) => {
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
                {input.question}
                {!!input.required && <RequireMark />}
                <Input
                  {...register(input.name)}
                  type={input.type}
                  error={errors[input.name]?.message as string}
                  placeholder={input.placeholder}
                />
              </InputContainer>
            )
          }
          case InputType.RADIO: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
                <Controller
                  control={control}
                  name={input.name}
                  render={({ field: { onChange, value }, formState: { errors } }) => (
                    <RadioGroup
                      value={value as string}
                      onChange={onChange}
                      error={errors[input.name]?.message as string}
                      label={input.question}
                      required={!!input.required}
                    >
                      {input.choices.map((choice) => (
                        <Radio key={`${input.name}_${choice}`} value={choice} label={choice} />
                      ))}
                    </RadioGroup>
                  )}
                />
              </InputContainer>
            )
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
