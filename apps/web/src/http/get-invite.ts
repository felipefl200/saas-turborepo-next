import { Role } from '@saas/auth'
import { api } from './ky'

interface GetInviteResponse {
  invite: {
    id: string
    role: Role
    email: string
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(inviteId: string): Promise<GetInviteResponse> {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()
  return result as GetInviteResponse
}
