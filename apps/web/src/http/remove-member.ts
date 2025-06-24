import { api } from './ky'

interface RemoveMemberRequest {
  orgSlug: string
  memberId: string
}

export async function removeMember({
  orgSlug,
  memberId,
}: RemoveMemberRequest): Promise<void> {
  await api.delete(`organizations/${orgSlug}/members/${memberId}`)
}
