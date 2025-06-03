'use server'

import { signUp } from '@/http/signup'
import { HTTPError } from 'ky'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .refine(
        (val) => {
          // Check if the name constains spaces for Full Name
          if (val.trim().length === 0) return false
          const nameParts = val.trim().split(' ')
          return (
            nameParts.length > 1 && nameParts.every((part) => part.length > 0)
          )
        },
        {
          message: 'Nome completo é obrigatório',
        }
      ),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export async function signUpAction(data: FormData) {
  const resultParse = signUpSchema.safeParse(Object.fromEntries(data))

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = resultParse.data

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    await signUp({
      name,
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
      message: 'Erro ao criar conta. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
