'user server'

export async function removeMemberAction(formData: FormData) {
  const userId = formData.get('userId') as string
  const organizationSlug = formData.get('organization') as string

  if (!userId || !organizationSlug) {
    throw new Error('Missing userId or organization slug')
  }

  const { removeMember } = await import('@/app/org/actions')
  return removeMember({ userId, organizationSlug })
}
