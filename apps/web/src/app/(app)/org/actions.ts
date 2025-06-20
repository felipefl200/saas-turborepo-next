'use server'

import { getCurrentOrgCookie } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { shutdownOrganization } from '@/http/shutdown-organization'
import { updateOrganization } from '@/http/update-organization'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { organizationSchema } from './organization-schema'

export async function createOrganizationAction(data: FormData) {
  const resultParse = organizationSchema.safeParse(Object.fromEntries(data))

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = resultParse.data

  if (process.env.NODE_ENV === 'development') {
    // Simula um atraso para desenvolvimento
    // Remover em produção
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    revalidateTag('organizations')
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
      message: 'Erro ao criar organização. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Organização criada com sucesso',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = await getCurrentOrgCookie()
  const resultParse = organizationSchema.safeParse(Object.fromEntries(data))

  if (!resultParse.success) {
    const errors = resultParse.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = resultParse.data

  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  try {
    await updateOrganization({
      orgSlug: currentOrg || '',
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    revalidateTag('organizations')
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
      message: 'Erro ao atualizar organização. Tente novamente mais tarde.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Organização atualizada com sucesso',
    errors: null,
  }
}

export async function shutdownOrganizationAction() {
  const organization = await getCurrentOrgCookie()

  if (!organization) {
    throw new Error('Nenhuma organização selecionada')
  }

  try {
    await shutdownOrganization({ orgSlug: organization })
    redirect('/')
  } catch (error) {
    throw error
  }
}
