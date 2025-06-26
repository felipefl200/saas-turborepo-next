import { isAuthenticated } from '@/auth/auth'
import Header from '@/components/header'
import { Tabs } from '@/components/tabs'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet?: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/signin')
  }

  return (
    <>
      <div className="space-y-2 py-4">
        <Header />
        <Tabs />
        {children}
        {sheet}
      </div>
    </>
  )
}
