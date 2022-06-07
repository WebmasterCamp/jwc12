import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

import { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="text-lg font-bold text-gold-dark">{children}</h1>,
  p: ({ children }) => <p className="mb-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="ml-4 list-disc marker:text-brown flex-col gap-y-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="ml-4 list-decimal marker:text-brown flex flex-col gap-y-4">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
}

export const MDXLayout: React.FC<MDXRemoteProps> = (props) => {
  return (
    <div className="flex flex-col gap-y-4 leading-6 mb-4">
      <MDXRemote {...props} components={components} />
    </div>
  )
}
