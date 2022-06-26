import { InterviewCandidate } from '@/db/types'

interface TableItemProps {
  candidate: InterviewCandidate
}

export const TableItem: React.FC<TableItemProps> = ({ candidate }) => {
  return (
    <tr className="even:bg-slate-100">
      <td className="p-1 md:p-3">{candidate.id}</td>
      <td className="p-1 md:p-3">{`${candidate.firstName} ${candidate.lastName}`}</td>
      <td className="p-1 md:p-3">{candidate.interviewTime}</td>
    </tr>
  )
}
