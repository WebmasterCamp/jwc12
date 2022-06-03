interface ErrorMessageProps {
  message?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (message) return null
  return <div className="text-red-500 text-xs italic">{message}</div>
}
