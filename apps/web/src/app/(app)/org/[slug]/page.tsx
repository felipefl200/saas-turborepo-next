export default async function OrganizationPage(params: { slug: string }) {
  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4">
      <h1 className="text-2xl font-bold">{JSON.stringify(params)}</h1>
    </main>
  )
}
