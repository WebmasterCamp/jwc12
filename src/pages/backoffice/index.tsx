import dynamic from 'next/dynamic'

const App = dynamic(() => import('@/components/admin/Admin'), { ssr: false })

const AdminPage = () => {
  return <App />
}

export default AdminPage
