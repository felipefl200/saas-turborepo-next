'use server'

import { getCurrentOrgCookie } from '@/auth/auth'
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(4, 'Nome do projeto deve ter pelo menos 4 caracteres'),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const resultParse = projectSchema.safeParse(Object.fromEntries(data))

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = resultParse.data

  try {
    const currentOrg = await getCurrentOrgCookie()
    if (!currentOrg) {
      return {
        success: false,
        message: 'Organização não encontrada',
        errors: null,
      }
    }
    await createProject({
      org: currentOrg,
      name,
      description,
    })

    // Invalidar cache do React Query para projects
    revalidateTag(`projects-${currentOrg}`)
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
      message: 'Erro ao criar projeto. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Projeto criado com sucesso',
    errors: null,
  }
}
