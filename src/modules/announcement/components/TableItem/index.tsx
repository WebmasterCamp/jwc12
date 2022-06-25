import clsx from 'clsx'

interface TableItemProps {
  id: string
  name: string
  surname: string
  background: 'white' | 'gray'
}

export const TableItem: React.FC<TableItemProps> = ({ id, name, surname, background }) => {
  return (
    <tr className={clsx(background === 'gray' && 'bg-slate-100')}>
      <td className="p-1 md:p-3 rounded-md">{id}</td>
      <td className="p-1 md:p-3 rounded-md">{name}</td>
      <td className="p-1 md:p-3 rounded-md">{surname}</td>
    </tr>
  )
}
