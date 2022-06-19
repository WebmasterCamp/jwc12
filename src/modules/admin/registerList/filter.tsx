import { FilterList, FilterListItem, FilterLiveSearch } from 'react-admin'

import { Box, Card, CardContent } from '@mui/material'

import { useUser } from '../hook/user'

const IsCheckedFilter = () => {
  const { user, isLoading } = useUser()

  const uid = user?.id ?? ''

  if (isLoading) return null

  return (
    <FilterList label="สถานะการตรวจ" icon={null}>
      <FilterListItem
        label="ยังไม่ตรวจ"
        value={{
          [`checkedBy.${uid}`]: false,
        }}
      />
      <FilterListItem
        label="ตรวจแล้ว"
        value={{
          [`checkedBy.${uid}`]: true,
        }}
      />
    </FilterList>
  )
}

export const FilterSidebar = () => {
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
          <FilterLiveSearch source="id" />
          <IsCheckedFilter />
        </CardContent>
      </Card>
    </Box>
  )
}
