import { ability } from '@/auth/auth'
import { redirect } from 'next/navigation'
import ProjectForm from './project-form'

export default async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }
  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4">
      <ProjectForm />
    </main>
  )
}
