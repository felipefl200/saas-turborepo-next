import { HTTPError } from 'ky'
import { api } from './ky'

interface ShutdownOrganizationRequest {
  orgSlug: string
}

export async function shutdownOrganization({
  orgSlug,
}: ShutdownOrganizationRequest): Promise<void> {
  console.log(`Tentando deletar organização: ${orgSlug}`)

  try {
    const response = await api.delete(`organizations/${orgSlug}`)
    console.log('Resposta da API:', response.status, response.statusText)
  } catch (error) {
    console.error('Erro detalhado ao deletar organização:', error)

    if (error instanceof HTTPError) {
      console.error('Status:', error.response.status)
      console.error('Status Text:', error.response.statusText)

      try {
        const errorBody = await error.response.json()
        console.error('Corpo da resposta de erro:', errorBody)
        throw new Error(
          `Erro ${error.response.status}: ${errorBody.message || 'Erro interno do servidor'}`
        )
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', parseError)
        throw new Error(
          `Erro ${error.response.status}: ${error.response.statusText}`
        )
      }
    }

    // Erro de rede ou outros tipos de erro
    if (
      error instanceof TypeError &&
      error.message.includes('Failed to fetch')
    ) {
      throw new Error(
        'Erro de conexão. Verifique se o servidor está funcionando.'
      )
    }

    throw error
  }
}
