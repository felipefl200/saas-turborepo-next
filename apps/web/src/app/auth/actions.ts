import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInUrl = new URL(
    '/login/oauth/authorize',
    'https://github.com'
  )

  githubSignInUrl.searchParams.set(
    'client_id',
    env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''
  )
  githubSignInUrl.searchParams.set(
    'redirect_uri',
    env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || ''
  )
  githubSignInUrl.searchParams.set('scope', 'user')

  return redirect(githubSignInUrl.toString())
}
