import { api } from './ky'

interface CreateOrganization {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = never

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganization) {
  const result = await api
    .post('organizations', {
      next: {
        tags: ['organizations'],
      },
      json: { name, domain, shouldAttachUsersByDomain },
    })
    .json<CreateOrganizationResponse>()

  return result
}
