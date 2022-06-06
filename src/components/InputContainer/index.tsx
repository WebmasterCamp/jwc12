import clsx from 'clsx'

export function InputContainer(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx(`p-2 basis-auto w-full sm:basis-1/2`, props.className)}>
      {props.children}
    </div>
  )
}
