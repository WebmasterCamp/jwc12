import { ReactNode, useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'

import { BranchType } from '../register/types'
import { CandidateList } from './components/CandidateList'
import { Paper } from './components/Paper'
import { SquareBranchCard } from './components/SquareBranchCard'
import { AnnouncementCandidate, AnnouncementColumn } from './types'

export interface AnnouncementTemplateProps<T extends AnnouncementCandidate> {
  title: string
  tableHeader: string
  linkPrefix: string
  candidates?: T[]
  columns: AnnouncementColumn<T>[]
  children: ReactNode
}

export function AnnouncementTemplate<T extends AnnouncementCandidate>({
  title,
  tableHeader,
  linkPrefix,
  candidates,
  columns,
  children,
}: AnnouncementTemplateProps<T>) {
  const router = useRouter()
  const branch = router.query.branch?.[0] as BranchType | undefined

  const filteredDataByBranch = useMemo(() => {
    const filteredData = candidates?.filter((candidate) => candidate.branch === branch) ?? []
    return filteredData
  }, [candidates, branch])

  return (
    <div>
      <Link href="/" passHref>
        <a className="block h-[47px] w-[96px] mx-6 my-4 sm:h-[72px] sm:w-[146px] sm:mx-10 sm:mt-10">
          <Logo />
        </a>
      </Link>
      <Container maxWidth="3xl">
        <h1 className="text-center text-3xl text-white font-bold mb-8">{title}</h1>
        <Paper>{children}</Paper>
        {/* Branch selection */}
        <h1 className="text-center text-3xl text-white font-bold mb-8 mt-16">โปรดเลือกสาขา</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 sm:mb-0">
          <SquareBranchCard
            linkPrefix={linkPrefix}
            branch={BranchType.CONTENT}
            selected={branch === BranchType.CONTENT}
          />
          <SquareBranchCard
            linkPrefix={linkPrefix}
            branch={BranchType.DESIGN}
            selected={branch === BranchType.DESIGN}
          />
          <SquareBranchCard
            linkPrefix={linkPrefix}
            branch={BranchType.MARKETING}
            selected={branch === BranchType.MARKETING}
          />
          <SquareBranchCard
            linkPrefix={linkPrefix}
            branch={BranchType.PROGRAMMING}
            selected={branch === BranchType.PROGRAMMING}
          />
        </div>

        {branch && (
          <CandidateList
            key={branch}
            header={tableHeader}
            branch={branch}
            candidates={filteredDataByBranch}
            columns={columns}
          />
        )}
        <div className="h-20" />
      </Container>
      <Footer />
    </div>
  )
}
