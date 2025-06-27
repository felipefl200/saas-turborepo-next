import { api } from './ky'

interface AcceptInvite {
  inviteId: string
}

export async function acceptInvite({ inviteId }: AcceptInvite) {
  await api.post(`invites/${inviteId}/accept`)
}
