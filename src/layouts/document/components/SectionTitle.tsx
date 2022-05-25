import { FunctionComponent } from 'react'

interface Props {
  title: string
  subtitle?: string
}

export const SectionTitle: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <div className="space-y-3 text-center font-sans font-bold text-white">
      <h1 className="text-4xl">{title}</h1>
      {subtitle && <p className="text-xl">{subtitle}</p>}
    </div>
  )
}
