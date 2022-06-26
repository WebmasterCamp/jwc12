import { GetStaticPaths, GetStaticProps } from 'next'

export { Announcement as default } from '@/modules/announcement'

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
