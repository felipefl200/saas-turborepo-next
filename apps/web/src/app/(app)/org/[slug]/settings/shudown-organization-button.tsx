import { getCurrentOrgCookie } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'
import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function ShutdownOrganizationButton() {
  async function handleShutdown() {
    'use server'
    const currentOrg = await getCurrentOrgCookie()
    console.log('Shutting down organization:', currentOrg)
    if (!currentOrg) {
      throw new Error('No organization selected')
    }

    await shutdownOrganization({ orgSlug: currentOrg })
    redirect('/')
  }
  return (
    <form action={handleShutdown}>
      <Button variant="destructive" className="w-full" type="submit">
        <XCircle className="mr-2 size-4" />
        Encerrar Organização
      </Button>
    </form>
  )
}
