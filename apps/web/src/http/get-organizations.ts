import { api } from './ky'

interface GetOrganizations {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations(): Promise<GetOrganizations> {
  const result = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<GetOrganizations>()
  return result
}
