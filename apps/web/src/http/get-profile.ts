import { api } from './ky'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const result = await api.get('profile').json<GetProfileResponse>()
  return result
}
