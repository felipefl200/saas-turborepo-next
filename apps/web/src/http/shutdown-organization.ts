import { api } from './ky'

interface ShutdownOrganizationRequest {
  orgSlug: string
}

export async function shutdownOrganization({
  orgSlug,
}: ShutdownOrganizationRequest): Promise<void> {
  await api.delete(`organizations/${orgSlug}`)
}
