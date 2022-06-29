import { BranchType } from '../register/types'

export interface AnnouncementCandidate {
  id: string
  branch: BranchType
}

export interface AnnouncementColumn<T extends AnnouncementCandidate> {
  key: keyof T
  label: string
}
