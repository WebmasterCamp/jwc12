import { useForm } from 'react-hook-form'

import { Input } from '@/components/Input'

export const FormStep1 = () => {
  const { register } = useForm()

  return (
    <div className="flex flex-col flex-1 gap-4">
      <h1 className="font-bold text-xl">ข้อมูลพื้นฐาน</h1>
      <div className="flex flex-row gap-4">
        <Input {...register('firstName')} label="firstName" placeholder="firstName" />
        <Input {...register('lastName')} label="lastName" placeholder="firstName" />
      </div>
      <div className="flex flex-row gap-4">
        <Input {...register('firstName')} label="firstName" placeholder="firstName" />
        <Input {...register('lastName')} label="lastName" placeholder="firstName" />
      </div>
      <Input {...register('firstName')} label="firstName" placeholder="firstName" />
      <Input {...register('lastName')} label="lastName" placeholder="firstName" />
    </div>
  )
}
