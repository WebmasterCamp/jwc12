interface TableItemProps {
  id: string
  name: string
  surname: string
}

export const TableItem: React.FC<TableItemProps> = ({ id, name, surname }) => {
  return (
    <tr className="even:bg-slate-100">
      <td className="p-1 md:p-3">{id}</td>
      <td className="p-1 md:p-3">{name}</td>
      <td className="p-1 md:p-3">{surname}</td>
    </tr>
  )
}
