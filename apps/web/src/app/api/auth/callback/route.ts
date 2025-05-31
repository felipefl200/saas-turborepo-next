import { signInWithGithub } from '@/http/signin-with-github'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')
  if (!code) {
    return NextResponse.json(
      { message: 'Missing github OAuth code parameter' },
      { status: 400 }
    )
  }

  const { token } = await signInWithGithub({ code })

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
