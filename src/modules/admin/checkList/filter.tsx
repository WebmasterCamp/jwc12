import { FilterList, FilterListItem, FilterLiveSearch } from 'react-admin'

import { Box, Card, CardContent } from '@mui/material'

import { useUser } from '../hook/user'

const IsCheckedFilter = () => {
  const { isLoading, identity } = useUser()

  const uid = identity?.id

  if (isLoading) return null

  return (
    <FilterList label="สถานะการตรวจ" icon={null}>
      <FilterListItem
        label="ตรวจแล้ว"
        value={{
          [`checkedBy.${uid}`]: true,
        }}
      />
      <FilterListItem
        label="ยังไม่ตรวจ"
        value={{
          [`checkedBy.${uid}`]: false,
        }}
      />
      {['programming', 'marketing', 'design', 'content'].map((x) => (
        <FilterListItem
          label={`สาขา ${x}`}
          value={{
            [`checkedBy.${uid}`]: true,
            confirmedBranch: x,
          }}
          key={x}
        />
      ))}
      <FilterListItem label="คัดแล้ว" value={{ include: true }} />
    </FilterList>
  )
}

export const FilterSidebar = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
        order: -1, // display on the left rather than on the right of the list
        width: '15em',
        marginRight: '1em',
        mt: '64px',
      }}
    >
      <Card>
        <CardContent>
          <p className="text-lg font-bold mb-2">
            คุณ {user?.name} ตรวจ {user?.branch}
          </p>
          <FilterLiveSearch source="id" />
          <IsCheckedFilter />
        </CardContent>
      </Card>
    </Box>
  )
}
