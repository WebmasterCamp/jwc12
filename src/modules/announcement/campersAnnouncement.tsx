import { useMemo } from 'react'

import { Loading } from '@/components/Loading'
import { useCampers } from '@/db/hooks'
import { Camper } from '@/db/types'

import { AnnouncementTemplate } from './template'
import { AnnouncementColumn } from './types'

const columns: AnnouncementColumn<Camper>[] = [
  {
    key: 'id',
    label: 'รหัส',
  },
  {
    key: 'name',
    label: 'ชื่อ - นามสกุล',
  },
  {
    key: 'confirmAmount',
    label: 'ยอดโอน (บาท)',
  },
]

export function CampersAnnouncement() {
  const { pending, data } = useCampers()

  const campers = useMemo(() => data?.data ?? [], [data])

  if (pending) {
    return <Loading />
  }

  return (
    <AnnouncementTemplate
      title="Campers"
      tableHeader="รายชื่อ camper"
      linkPrefix="/campers/"
      candidates={campers}
      columns={columns}
    >
      <h2 className="text-lg font-bold mb-4">TODO</h2>
      <p className="mb-6">Update this</p>
    </AnnouncementTemplate>
  )
}
