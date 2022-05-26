import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const ContentWrapper: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="mt-10 rounded-2xl bg-white py-5 px-10 font-serif md:px-16 md:py-14">
      {children}
    </div>
  )
}
