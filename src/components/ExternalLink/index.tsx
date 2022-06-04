import clsx from 'clsx'

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  return (
    <a
      href="https://thepeople.co/pamela-colman-smith-and-her-universal-rider-waite/"
      target="_blank"
      rel="noreferrer"
      {...props}
      className={clsx('underline text-primary', props.className)}
    />
  )
}
