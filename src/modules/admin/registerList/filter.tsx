import { FilterList, FilterListItem } from 'react-admin'

import { Box, Card, CardContent } from '@mui/material'

import { useUser } from '../hook/user'

const IsCheckedFilter = () => {
  const { isLoading } = useUser()

  if (isLoading) return null

  return (
    <FilterList label="สาขา" icon={null}>
      <FilterListItem label="design" value={{ confirmedBranch: 'design' }} />
      <FilterListItem label="programming" value={{ confirmedBranch: 'programming' }} />
      <FilterListItem label="marketing" value={{ confirmedBranch: 'marketing' }} />
      <FilterListItem label="content" value={{ confirmedBranch: 'content' }} />
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
          <IsCheckedFilter />
        </CardContent>
      </Card>
    </Box>
  )
}
