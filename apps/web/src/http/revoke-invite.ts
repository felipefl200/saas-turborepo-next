import { api } from './ky'

interface RevokeInviteRequest {
  orgSlug: string
  inviteId: string
}

export async function revokeInvite({
  orgSlug,
  inviteId,
}: RevokeInviteRequest): Promise<void> {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`, {
    next: {
      tags: [`${orgSlug}-invites`],
    },
  })
}
