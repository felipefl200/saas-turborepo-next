'use server'

import { getCurrentOrgCookie } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'
import { Role } from '@saas/auth'
import { roleSchema } from '@saas/auth/src/types'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const resultParse = inviteSchema.safeParse(Object.fromEntries(data))

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = resultParse.data

  try {
    const currentOrg = await getCurrentOrgCookie()
    if (!currentOrg) {
      return {
        success: false,
        message: 'Organização não encontrada',
        errors: null,
      }
    }
    await createInvite({
      org: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}-invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return {
        success: false,
        message,
        errors: null,
      }
    }
    console.error(error)

    return {
      success: false,
      message: 'Erro ao criar convite. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Convite criado com sucesso',
    errors: null,
  }
}

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
