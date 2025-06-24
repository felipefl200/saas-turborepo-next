import { Role } from '@saas/auth'
import { api } from './ky'

interface UpdateMemberRequest {
  orgSlug: string
  memberId: string
  role: Role
}

export async function updateMember({
  orgSlug,
  memberId,
  role,
}: UpdateMemberRequest): Promise<void> {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: { role },
  })
}
