import { Role } from '@saas/auth'
import { api } from './ky'

interface GetPendingInvitesResponse {
  invites: {
    organization: {
      name: string
    }
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}

export async function getPendingInvites(): Promise<GetPendingInvitesResponse> {
  const result = await api
    .get('invites/pending')
    .json<GetPendingInvitesResponse>()
  return result
}
