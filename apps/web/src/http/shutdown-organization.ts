import { api } from './ky'

interface ShutdownOrganizationRequest {
  orgSlug: string
}

export async function shutdownOrganization({
  orgSlug,
}: ShutdownOrganizationRequest) {
  await api.delete(`organizations/${orgSlug}`)
}
