import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated(): Promise<boolean> {
  // Check if the user is authenticated by verifying the presence of a token

  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/signin')
  }

  try {
    const { user } = await getProfile()
  } catch (error) {
    console.error('Authentication error:', error)
    redirect('/auth/signin')
  }
}
