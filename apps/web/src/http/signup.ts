import { api } from './ky'

interface SignUp {
  name: string
  email: string
  password: string
}

type SignUpResponse = never

export async function signUp({ name, email, password }: SignUp) {
  const result = await api
    .post('auth/signup', {
      json: { name, email, password },
    })
    .json<SignUpResponse>()

  return result
}
