import clsx from 'clsx'

import { InterviewCandidate } from '@/db/types'
import { BranchType } from '@/modules/register/types'

import { branchColorMapping } from '../../constants'
import { Paper } from '../Paper'
import { TableItem } from '../TableItem'

export interface CandidateListProps {
  branch: BranchType
  candidates: InterviewCandidate[]
}

export function CandidateList({ branch, candidates }: CandidateListProps) {
  return (
    <Paper className="mb-20">
      <h6 className="font-bold">
        รายชื่อผู้ผ่านการคัดเลือกเข้ารอบสัมภาษณ์ สาขา{' '}
        <span className={clsx('capitalize', branchColorMapping[branch])}>{branch}</span>
      </h6>
      <table className="w-full mt-4 rounded-md">
        <thead>
          <tr className="w-full">
            <th className="text-left p-1 md:p-3">รหัส</th>
            <th className="text-left p-1 md:p-3">ชื่อ</th>
            <th className="text-left p-1 md:p-3">นามสกุล</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((item) => (
            <TableItem key={item.id} id={item.id} name={item.firstName} surname={item.lastName} />
          ))}
        </tbody>
      </table>
    </Paper>
  )
}
