import { api } from './ky'

interface RejectInvite {
  inviteId: string
}

export async function rejectInvite({ inviteId }: RejectInvite) {
  await api.post(`invites/${inviteId}/accept`)
}
