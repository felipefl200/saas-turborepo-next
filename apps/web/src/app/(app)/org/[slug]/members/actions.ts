'use server'

import { getCurrentOrgCookie } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'
import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrgCookie()

  await removeMember({
    orgSlug: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}-members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrgCookie()

  await updateMember({
    orgSlug: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}-members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrgCookie()

  await revokeInvite({
    orgSlug: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}-invites`)
}
