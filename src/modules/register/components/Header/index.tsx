import clsx from 'clsx'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return <h2 className={clsx('w-full text-xl font-bold p-2', className)}>{children}</h2>
}
