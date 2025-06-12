import { api } from './ky'

interface GetProjectsResponse {
  projects: {
    description: string
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(org: string): Promise<GetProjectsResponse> {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>()
  return result
}
