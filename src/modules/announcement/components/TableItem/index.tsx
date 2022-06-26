import { useMemo } from 'react'

import { format, parseISO } from 'date-fns'
import { th } from 'date-fns/locale'

import { InterviewCandidate } from '@/db/types'

interface TableItemProps {
  candidate: InterviewCandidate
}

export const TableItem: React.FC<TableItemProps> = ({ candidate }) => {
  const displayTime = useMemo(() => {
    const date = parseISO(candidate.datetime)
    return format(date, 'd MMMM — HH:mm น.', { locale: th })
  }, [candidate.datetime])
  return (
    <tr className="even:bg-slate-100">
      <td className="p-1 md:p-3">{candidate.id}</td>
      <td className="p-1 md:p-3">{`${candidate.firstName} ${candidate.lastName}`}</td>
      <td className="p-1 md:p-3">{displayTime}</td>
    </tr>
  )
}
