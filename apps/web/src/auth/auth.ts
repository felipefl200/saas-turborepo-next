import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated(): Promise<boolean> {
  // Check if the user is authenticated by verifying the presence of a token
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function getCurrentOrgCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('org')?.value
}

export async function getCurrentMembership() {
  const org = await getCurrentOrgCookie()
  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)
  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()
  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/signin')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch (error) {
    console.error('Authentication error:', error)
  }

  return redirect('api/auth/signout')
}
