import { ability, getCurrentOrgCookie } from '@/auth/auth'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'

export async function Tabs({}) {
  const currentOrgSlug = await getCurrentOrgCookie()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('read', 'Billing')

  const canGetMembers = permissions?.can('read', 'User')
  const canGetProjects = permissions?.can('read', 'Project')
  return (
    <div className="mx-auto max-w-7xl border-b-1 pb-2">
      <nav className="mx-auto flex max-w-7xl items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground data-[current=true]:text-foreground"
        >
          <NavLink href={`/org/${currentOrgSlug}`}>Projetos</NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground data-[current=true]:text-foreground"
        >
          <NavLink href={`/org/${currentOrgSlug}/members`}>Membros</NavLink>
        </Button>
        {(canUpdateOrganization || canGetBilling) && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrgSlug}/settings`}>
              Configurações e cobrança
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
