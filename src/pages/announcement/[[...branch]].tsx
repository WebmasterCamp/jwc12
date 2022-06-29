import { GetStaticPaths, GetStaticProps } from 'next'

export { InterviewCandidateAnnouncement as default } from '@/modules/announcement/interviewAnnouncement'

export const getStaticPaths: GetStaticPaths = async () => {
  const branches = ['programming', 'design', 'marketing', 'content']
  const branchPaths = branches.map((branch) => ({
    params: {
      branch: [branch],
    },
  }))
  const paths = [{ params: { branch: [] } }, ...branchPaths]
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  }
}
