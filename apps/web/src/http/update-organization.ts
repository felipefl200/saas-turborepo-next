import { api } from './ky'

interface UpdateOrganization {
  orgSlug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = never

export async function updateOrganization({
  orgSlug,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganization) {
  const result = await api
    .put(`organizations/${orgSlug}`, {
      json: { name, domain, shouldAttachUsersByDomain },
    })
    .json<UpdateOrganizationResponse>()

  return result
}
