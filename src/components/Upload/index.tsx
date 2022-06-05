import { ReactNode, forwardRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

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

export function Upload({
  label,
  error,
  className,
  onChange,
  uid,
  value,
  name,
  ...props
}: UploadProps) {
  const { data: imageUrl } = useSWR(value, downloadImage)

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0]
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
    },
    [name, onChange, uid]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop,
  })

  return (
    <div className={clsx('relative h-48 flex flex-col gap-2', className)}>
      <label
        className={clsx(
          'relative border-gray-300 flex flex-1 justify-center items-center cursor-pointer rounded-md',
          'bg-gray-100 border-2 border-dashed',
          isDragActive && 'border-blue-500',
          value && 'border-2 bg-transparent'
        )}
        {...getRootProps()}
      >
        {!imageUrl ? label : <img className="h-48 object-contain" src={imageUrl} alt="" />}
      </label>
      <input {...props} id={name} name={name} {...getInputProps()} />
      <ErrorMessage message={error} />
    </div>
  )
}
