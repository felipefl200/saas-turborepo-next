'use server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/signin-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signInWithEmailAndPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export async function signInWithEmailAndPassword(data: FormData) {
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
    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não recebido.',
        errors: null,
      }
    }
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: false,
    })

    const inviteId = cookieStore.get('inviteId')?.value
    console.log('Invite ID:', inviteId)

    if (inviteId) {
      try {
        await acceptInvite({ inviteId })
        cookieStore.delete('inviteId')
      } catch (error) {}
    }
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

  return redirect('/')
}
