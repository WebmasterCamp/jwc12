import { BulkExportButton } from 'react-admin'

import { Box } from '@mui/material'

export const RegisterActionButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <BulkExportButton />
    </Box>
  )
}
