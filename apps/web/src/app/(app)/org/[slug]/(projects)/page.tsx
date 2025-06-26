import { ability, getCurrentOrgCookie } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import ProjectList from './project-list'

export default async function OrganizationPage(params: { slug: string }) {
  const permissions = await ability()
  const currentOrg = await getCurrentOrgCookie()
  return (
    <main className="mx-auto max-w-7xl space-y-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <h1 className="text-2xl font-bold">Projetos</h1>

        {permissions?.can('read', 'Project') ? (
          <Button size="sm" asChild>
            <Link
              href={`/org/${currentOrg}/create-project`}
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              Criar projeto
            </Link>
          </Button>
        ) : null}
      </div>
      {permissions?.can('read', 'Project') ? <ProjectList /> : null}
    </main>
  )
}
