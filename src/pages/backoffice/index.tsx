import dynamic from 'next/dynamic'

const App = dynamic(async () => (await import('@/modules/admin')).AdminBackOffice, {
  ssr: false,
})

const AdminPage = () => {
  return <App />
}

export default AdminPage
