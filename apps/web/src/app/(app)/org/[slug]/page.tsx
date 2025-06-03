import Header from '@/components/header'

export default async function OrganizationPage(params) {
  return (
    <div className="py-4">
      <Header />
      Organization: {JSON.stringify(params)}
    </div>
  )
}
