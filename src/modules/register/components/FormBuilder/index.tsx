import React, { Fragment } from 'react'
import { Controller, FieldError } from 'react-hook-form'

import { useRouter } from 'next/router'

import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

import { useAuthStore } from '@/auth/store'
import { Button } from '@/components/Button'
import { Checkbox, CheckboxGroup } from '@/components/Checkbox'
import { Dropdown } from '@/components/Dropdown'
import { Input } from '@/components/Input'
import { Radio, RadioGroup } from '@/components/Radio'
import { TextArea } from '@/components/TextArea'
import { Upload } from '@/components/Upload'

import { useRegister } from '../../context'
import { SPECIAL_FIELD } from '../../context/constants'
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
  const { uid } = useAuthStore()
  const { ready, form, step, question, branch, submit, saveAnswers } = useRegister()
  if (!form) return null

  const {
    register,
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
        const disableSpecialField =
          input.type !== InputType.NONE ? input.name in SPECIAL_FIELD && !!branch : false
        switch (input.type) {
          case InputType.NONE: {
            return <Fragment key={`${question.stepName}_${index}`}>{input.title}</Fragment>
          }
          case InputType.TEXT:
          case InputType.EMAIL:
          case InputType.DATE: {
            return (
              <InputContainer key={input.name}>
                <Controller
                  control={control}
                  name={input.name}
                  defaultValue=""
                  render={({ field: { value, ...rest }, formState: { errors } }) => (
                    <Input
                      {...rest}
                      value={value as string}
                      type={input.type}
                      label={input.question}
                      error={errors[input.name]?.message as string}
                      placeholder={input.placeholder}
                      disabled={disabled || disableSpecialField}
                      noMark={input.noMark}
                    />
                  )}
                />
              </InputContainer>
            )
          }
          case InputType.UPLOAD: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
                <Controller
                  control={control}
                  name={input.name}
                  defaultValue=""
                  render={({ field: { name, value, onChange, onBlur }, formState: { errors } }) => (
                    <Upload
                      uid={uid}
                      name={name}
                      onChange={(e) => {
                        onChange(e)
                        saveAnswers()
                      }}
                      onBlur={onBlur}
                      value={value as string}
                      label={input.question}
                      placeholder={input.placeholder}
                      error={errors[input.name]?.message as string}
                      required={!!input.required}
                      disabled={disabled || disableSpecialField}
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
                  render={({ field: { onChange, value }, formState: { errors } }) => (
                    <RadioGroup
                      value={value as string}
                      onChange={(e) => {
                        onChange(e)
                        saveAnswers()
                      }}
                      error={errors[input.name]?.message as string}
                      label={input.question}
                      required={!!input.required}
                      noMark={!!input.noMark}
                      direction={input.direction}
                    >
                      {input.choices.map((choice) => (
                        <Radio
                          key={`${input.name}_${choice.name}`}
                          value={choice.value}
                          label={choice.label}
                          disabled={disabled || disableSpecialField}
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
                      required={!!input.required}
                      disabled={disabled || disableSpecialField}
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
                      name={`${input.name}.${choice.name}`}
                      defaultValue=""
                      render={({ field: { value, name, ...rest } }) => (
                        <div
                          className={clsx(
                            'flex flex-row flex-1 gap-x-4',
                            input.position === 'center' && 'justify-center',
                            input.position === 'end' && 'justify-end',
                            input.position === 'start' && 'justify-start'
                          )}
                        >
                          <div>
                            <Checkbox
                              {...rest}
                              name={choice.name}
                              label={choice.label}
                              checked={value as unknown as boolean}
                              disabled={disabled || disableSpecialField}
                            />
                          </div>
                          {input.needOtherInput && choice.name.split('.').pop() === 'other' && (
                            <div className="basis-full sm:basis-1/2">
                              <Input
                                {...register(`${input.name}.${choice.name}_input`)}
                                placeholder="โปรดระบุ"
                                disabled={disabled || !value}
                                required={!value}
                                error={
                                  (errors[`${input.name}`] as { [key: string]: FieldError })?.[
                                    `${choice.name}_input`
                                  ]?.message as string
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                    />
                  ))}
                </CheckboxGroup>
              </InputContainer>
            )
          }
          case InputType.TEXTAREA: {
            return (
              <InputContainer key={input.name} className="sm:basis-auto">
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
                      label={input.question}
                      error={errors[input.name]?.message as string}
                      placeholder={input.placeholder}
                      disabled={disabled || disableSpecialField}
                      required={!!input.required}
                      noMark={!!input.noMark}
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
      {/* {process.env.MODE === 'DEVELOPMENT' && <DevTool control={control} />} */}
    </form>
  )
}
