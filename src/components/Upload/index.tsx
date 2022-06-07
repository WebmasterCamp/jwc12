import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import clsx from 'clsx'
import useSWR from 'swr'

import { downloadImage, uploadImage } from '@/db'
import { createBlurhash } from '@/utils/createBlurhash'
import { extractBlurhash } from '@/utils/extractBlurhash'
import { useBlobUrl } from '@/utils/useBlobUrl'

import { BlurhashImage } from '../BlurhashImage'
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
  const { data: imageUrl, isValidating } = useSWR(value, downloadImage, {
    revalidateOnFocus: false,
  })
  const [blurhash, setBlurhash] = useState<string | null>(null)
  useEffect(() => setBlurhash(extractBlurhash(value)), [value])

  const pending = uploading || isValidating

  const onDrop = useCallback(
    async (files: File[]) => {
      if (uploading) return
      const file = files[0]
      if (!file) return
      if (file.size > MAX_IMAGE_SIZE) return toast.error('รูปภาพมีขนาดเกิน 2MB')
      const extension = file.name.split('.').pop() ?? '.jpg'
      const fileName = `/users/${uid}/${name}.${extension}`
      const newHash = await createBlurhash(file)
      const fileNameWithHash = `${fileName}?${new URLSearchParams({
        blurhash: newHash,
      }).toString()}`
      setBlurhash(newHash)
      setUploading(true)
      try {
        await uploadImage(fileName, file)
        onChange?.({
          target: { value: fileNameWithHash, name },
        })
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
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    maxFiles: 1,
    noClick: uploading,
    onDrop,
  })

  return (
    <div className={clsx('relative w-[196px] h-[196px] flex flex-col gap-2', className)}>
      <label
        className={clsx(
          'relative border-gray-300 flex flex-1 justify-center items-center cursor-pointer rounded-md',
          'bg-gray-100 border-2 border-dashed',
          isDragActive && 'border-blue-500',
          value && 'border-2 bg-transparent'
        )}
        {...getRootProps()}
      >
        {pending && !blurhash && <LoadingAnimation className="w-[148px] h-[148px]" />}
        <BlurhashImage
          className="w-48 h-48 rounded-[4px] overflow-hidden"
          src={imageUrl}
          blurhash={blurhash}
          alt=""
        />
      </label>
      <input {...props} id={name} name={name} {...getInputProps()} />
      <ErrorMessage message={error} />
    </div>
  )
}
