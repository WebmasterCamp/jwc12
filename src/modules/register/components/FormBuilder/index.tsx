import React, { Fragment } from 'react'
import { Controller } from 'react-hook-form'

import { useRouter } from 'next/router'

import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Checkbox, CheckboxGroup } from '@/components/Checkbox'
import { Dropdown } from '@/components/Dropdown'
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
  const { ready, form, step, question, submit, saveAnswers } = useRegister()
  if (!form) return null

  const {
    control,
    formState: { errors },
  } = form

  const onClickPrev = () => {
    router.push(`/register/step/${step - 1}`)
  }

  const disabled = !ready

  return (
    <form
      noValidate
      onSubmit={submit}
      onBlur={saveAnswers}
      className="text-black flex flex-wrap gap-y-2"
    >
      {question?.inputs.map((input, index) => {
        switch (input.type) {
          case InputType.NONE: {
            return <Fragment key={`${question.stepName}_${index}`}>{input.title}</Fragment>
          }
          case InputType.TEXT:
          case InputType.EMAIL:
          case InputType.DATE: {
            return (
              <InputContainer key={input.name}>
                {typeof input.question === 'string' ? (
                  <p className="inline">{input.question}</p>
                ) : (
                  input.question
                )}
                {!!input.required && <RequireMark />}
                <Controller
                  control={control}
                  name={input.name}
                  defaultValue=""
                  render={({ field: { value, ...rest }, formState: { errors } }) => (
                    <Input
                      {...rest}
                      value={value as string}
                      name={input.name}
                      type={input.type}
                      error={errors[input.name]?.message as string}
                      placeholder={input.placeholder}
                      disabled={disabled}
                    />
                  )}
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
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
                    <RadioGroup
                      value={value as string}
                      onChange={(e) => {
                        onChange(e)
                        saveAnswers()
                      }}
                      error={errors[input.name]?.message as string}
                      label={input.question}
                      required={!!input.required}
                      direction={input.direction}
                    >
                      {input.choices.map((choice) => (
                        <Radio
                          key={`${input.name}_${choice}`}
                          value={choice}
                          label={choice}
                          disabled={disabled}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </InputContainer>
            )
          }
          case InputType.DROPDOWN: {
            return (
              <InputContainer key={input.name}>
                <Controller
                  control={control}
                  name={input.name}
                  defaultValue=""
                  render={({ field: { onChange, value }, formState: { errors } }) => (
                    <Dropdown
                      name={input.name}
                      label={input.question}
                      placeholder={input.placeholder}
                      options={input.choices}
                      onChange={onChange}
                      value={value as string}
                      error={errors[input.name]?.message as string}
                      disabled={disabled}
                    />
                  )}
                />
              </InputContainer>
            )
          }
          case InputType.CHECKBOX: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
                <CheckboxGroup
                  error={errors[input.name]?.message as string}
                  label={input.question}
                  required={!!input.required}
                  direction={input.direction}
                  position={input.position}
                >
                  {input.choices.map((choice) => (
                    <Controller
                      key={`${input.name}_${choice.name}`}
                      control={control}
                      name={choice.name}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            value={choice.value}
                            label={choice.value}
                            name={choice.name}
                            checked={value as unknown as boolean}
                            disabled={disabled}
                          />
                        )
                      }}
                    />
                  ))}
                </CheckboxGroup>
              </InputContainer>
            )
          }
          case InputType.TEXTAREA: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
                {input.question}
                <Controller
                  control={control}
                  name={input.name}
                  defaultValue=""
                  render={({ field: { value, ...rest }, formState: { errors } }) => (
                    <TextArea
                      {...rest}
                      name={input.name}
                      value={value as string}
                      rows={4}
                      error={errors[input.name]?.message as string}
                      className="mt-4"
                      placeholder={input.placeholder}
                      disabled={disabled}
                    />
                  )}
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
