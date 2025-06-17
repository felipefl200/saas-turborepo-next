import OrganizationForm from '@/app/(app)/org/organization-form'

export default function CreateOrganizationPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4">
      <h1 className="text-2xl font-bold">Create Organization</h1>
      <OrganizationForm />
    </main>
  )
}
