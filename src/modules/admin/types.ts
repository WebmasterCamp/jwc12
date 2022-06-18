import { Identifier } from 'react-admin'

import { BranchType } from '../register/types'

export interface UserAdmin {
  id: Identifier
  name: string
  admin: string
  branch: BranchType | 'core',
  // ตรวจข้อไหน
  which: number
}
