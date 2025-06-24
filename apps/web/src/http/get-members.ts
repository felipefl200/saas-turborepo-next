import { Role } from '@saas/auth'
import { api } from './ky'

interface GetMembersResponse {
  members: {
    id: string
    userId: string
    role: Role
    name: string
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers(org: string): Promise<GetMembersResponse> {
  const result = await api
    .get(`organizations/${org}/members`)
    .json<GetMembersResponse>()
  return result
}
