'use server'

import { signInWithPassword } from '@/http/signin-with-password'
import { HTTPError } from 'ky'
import { z } from 'zod'

const signInWithEmailAndPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const resultParse = signInWithEmailAndPasswordSchema.safeParse(
    Object.fromEntries(data)
  )

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = resultParse.data

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }
    console.error(error)

    return {
      success: false,
      message: 'Erro ao fazer login. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
