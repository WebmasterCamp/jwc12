import { FunctionComponent } from 'react'

interface Props {
  title: string
  subtitle?: string
}

export const SectionTitle: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <div className="text-center text-white">
      <h1 className="text-4xl">{title}</h1>
      {subtitle && <p className="!mt-5 text-xl">{subtitle}</p>}
    </div>
  )
}
