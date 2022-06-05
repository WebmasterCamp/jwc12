import { ReactNode, forwardRef } from 'react'
import toast from 'react-hot-toast'

import Image from 'next/image'

import clsx from 'clsx'
import useSWR from 'swr'

import { downloadImage, uploadImage } from '@/lib/db'

import { ErrorMessage } from '../ErrorMessage'

interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  uid: string | null
  name: string
  value?: string
  label?: ReactNode
  error?: string
  className?: string
  onChange?: (...event: any[]) => void
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
  ({ label, error, className, onChange, uid, value, name, ...props }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
      const file = event.target.files?.[0]
      if (!file) return
      if (file.size > MAX_IMAGE_SIZE) return toast.error('รูปภาพมีขนาดเกิน 2MB')
      const extension = file.name.split('.').pop() ?? '.jpg'
      const fileName = `/users/${uid}/${name}.${extension}`
      try {
        await uploadImage(fileName, file)
        onChange?.({
          target: { value: fileName, name },
        })
      } catch (err) {
        throw new Error('upload faield')
      }
    }

    const { data: imageUrl } = useSWR(value, downloadImage)

    return (
      <div className={clsx('relative h-48 flex flex-col gap-2', className)}>
        <label
          htmlFor={name}
          className={clsx(
            'relative border-gray-300 flex flex-1 justify-center items-center cursor-pointer rounded-md',
            'bg-gray-100 border-2 border-dashed',
            value && 'border-2 bg-transparent'
          )}
        >
          {!imageUrl ? label : <Image src={imageUrl} alt="" layout="fill" objectFit="contain" />}
        </label>
        <ErrorMessage message={error} />
        <input
          {...props}
          ref={ref}
          id={name}
          name={name}
          type="file"
          defaultValue=""
          onChange={handleChange}
          className={clsx(className, 'hidden')}
          accept="image/*"
        />
      </div>
    )
  }
)

Upload.displayName = 'Upload'
