import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode | undefined
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/signin')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
