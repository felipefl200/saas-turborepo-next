import { Role } from '@saas/auth'
import { api } from './ky'

interface GetinvitesResponse {
  invites: {
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }[]
}

export async function getInvites(org: string): Promise<GetinvitesResponse> {
  const result = await api
    .get(`organizations/${org}/invites`)
    .json<GetinvitesResponse>()
  return result
}
