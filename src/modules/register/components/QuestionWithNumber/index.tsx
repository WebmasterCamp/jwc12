export const QuestionWithNumber: React.FC<{ number: number; children: React.ReactNode }> = ({
  number,
  children,
}) => {
  return (
    <div className="flex gap-x-2">
      <span>{number}.</span>
      <div className="flex flex-col gap-y-3">{children}</div>
    </div>
  )
}
