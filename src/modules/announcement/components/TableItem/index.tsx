import { AnnouncementCandidate, AnnouncementColumn } from '../../types'

interface TableItemProps<T extends AnnouncementCandidate> {
  candidate: T
  columns: AnnouncementColumn<T>[]
}

export function TableItem<T extends AnnouncementCandidate>({
  candidate,
  columns,
}: TableItemProps<T>) {
  return (
    <tr className="even:bg-slate-100">
      {columns.map((column) => (
        <td key={column.key as string} className="p-1 md:p-3">
          {candidate[column.key] as unknown as string}
        </td>
      ))}
    </tr>
  )
}
