import { api } from './ky'

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling(org: string): Promise<GetBillingResponse> {
  const result = await api
    .get(`organizations/${org}/billing`)
    .json<GetBillingResponse>()
  return result
}
