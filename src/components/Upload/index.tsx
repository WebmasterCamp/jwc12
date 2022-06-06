import { ReactNode, forwardRef, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import clsx from 'clsx'
import useSWR from 'swr'

import { downloadImage, uploadImage } from '@/db'

import { ErrorMessage } from '../ErrorMessage'
import { LoadingAnimation } from '../Loading'

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
  const [uploading, setUploading] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)
  const { data: imageUrl, isValidating } = useSWR([value, uploadCount], downloadImage, {
    revalidateOnFocus: false,
  })
  const pending = uploading || isValidating

  const onDrop = useCallback(
    async (files: File[]) => {
      if (uploading) return
      const file = files[0]
      if (!file) return
      if (file.size > MAX_IMAGE_SIZE) return toast.error('รูปภาพมีขนาดเกิน 2MB')
      const extension = file.name.split('.').pop() ?? '.jpg'
      const fileName = `/users/${uid}/${name}.${extension}`
      setUploading(true)
      try {
        await uploadImage(fileName, file)
        onChange?.({
          target: { value: fileName, name },
        })
        // hack: force revalidate
        setTimeout(() => setUploadCount((count) => count + 1), 0)
      } catch (err) {
        throw new Error('upload faield')
      } finally {
        setUploading(false)
      }
    },
    [name, onChange, uid, uploading]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    noClick: uploading,
    onDrop,
  })

  const content = !imageUrl ? (
    label
  ) : (
    <img className="w-full h-full rounded-[4px] object-cover" src={imageUrl} alt="" />
  )

  return (
    <div className={clsx('relative w-48 h-48 flex flex-col gap-2', className)}>
      <label
        className={clsx(
          'relative border-gray-300 flex flex-1 justify-center items-center cursor-pointer rounded-md',
          'bg-gray-100 border-2 border-dashed',
          isDragActive && 'border-blue-500',
          value && 'border-2 bg-transparent'
        )}
        {...getRootProps()}
      >
        {pending ? <LoadingAnimation className="w-[148px] h-[148px]" /> : content}
      </label>
      <input {...props} id={name} name={name} {...getInputProps()} />
      <ErrorMessage message={error} />
    </div>
  )
}
