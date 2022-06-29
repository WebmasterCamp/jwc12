import { useEffect, useRef } from 'react'

import clsx from 'clsx'

import { BranchType } from '@/modules/register/types'

import { branchColorMapping } from '../../constants'
import { AnnouncementCandidate, AnnouncementColumn } from '../../types'
import { Paper } from '../Paper'
import { TableItem } from '../TableItem'

export interface CandidateListProps<T extends AnnouncementCandidate> {
  header: string
  branch: BranchType
  candidates: T[]
  columns: AnnouncementColumn<T>[]
}

export function CandidateList<T extends AnnouncementCandidate>({
  header,
  branch,
  candidates,
  columns,
}: CandidateListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    containerRef.current?.scrollIntoView()
  }, [])

  return (
    <Paper ref={containerRef}>
      <h6 className="font-bold">
        {`${header} สาขา `}
        <span className={clsx('capitalize', branchColorMapping[branch])}>{branch}</span>
      </h6>
      <table className="w-full mt-4 rounded-md">
        <thead>
          <tr className="w-full">
            {columns.map((column) => (
              <th key={column.key as string} className="text-left p-1 md:p-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <TableItem key={candidate.id} candidate={candidate} columns={columns} />
          ))}
        </tbody>
      </table>
    </Paper>
  )
}
