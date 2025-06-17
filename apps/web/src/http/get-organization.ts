import { api } from './ky'

interface GetOrganization {
  organization: {
    id: string
    name: string
    slug: string
    domain: string | null
    avatarUrl: string | null
    shouldAttachUsersByDomain: boolean
    owner: string
    createdAt: string
    updatedAt: string
  }
}

export async function getOrganization(
  orgSlug: string
): Promise<GetOrganization> {
  const result = await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganization>()
  return result
}
