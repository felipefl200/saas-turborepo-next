import { ShutdownOrganizationButton } from '@/app/(app)/org/[slug]/settings/shudown-organization-button'
import { ability, getCurrentOrgCookie } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'
import OrganizationForm from '../../organization-form'

export default async function SettingsPage() {
  const currentOrg = await getCurrentOrgCookie()
  const permissions = await ability()
  const canUpdateBilling = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('read', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganization(currentOrg!)
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        {canUpdateBilling && (
          <Card>
            <CardHeader>
              <CardTitle>Ajustes da Organização</CardTitle>
              <CardDescription>
                Aqui você pode atualizar as informações da sua organização, como
                nome, endereço e outros detalhes importantes.
              </CardDescription>
              <CardContent>
                <OrganizationForm
                  isUpdating
                  initialData={{
                    name: organization.name,
                    domain: organization.domain,
                    shouldAttachUsersByDomain:
                      organization.shouldAttachUsersByDomain,
                  }}
                />
              </CardContent>
            </CardHeader>
          </Card>
        )}
      </div>
      {canGetBilling && <div>Billing</div>}
      {canShutdownOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Encerrar Organização</CardTitle>
            <CardDescription>
              Aqui você pode encerrar sua organização. Esta ação é irreversível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShutdownOrganizationButton organization={organization.slug} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
