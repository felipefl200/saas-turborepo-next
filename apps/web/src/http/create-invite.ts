import { Role } from '@saas/auth'
import { api } from './ky'

interface CreateInvite {
  org: string
  email: string
  role: Role
}

type CreateInviteResponse = void

export async function createInvite({ email, role, org }: CreateInvite) {
  const result = await api
    .post(`organizations/${org}/invites`, {
      json: { email, role },
      next: { tags: [`${org}-invites`] },
    })
    .json<CreateInviteResponse>()
}
