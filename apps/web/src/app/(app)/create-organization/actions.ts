'use server'

import { createOrganization } from '@/http/create-organization'
import { HTTPError } from 'ky'
import { z } from 'zod'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, 'Nome da organização deve ter pelo menos 4 caracteres'),
    domain: z
      .string()
      .nullable()
      .refine(
        (val) => {
          if (val) {
            const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return domainRegex.test(val)
          }
          return true
        },
        {
          message: 'Domínio deve ser um endereço válido, ex: dominio.com',
        }
      ),

    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((val) => val === true || val === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain && !data.domain) {
        return false
      }
      return true
    },
    {
      message:
        'Se deseja adicionar usuários pelo domínio, o domínio deve ser informado.',
      path: ['shouldAttachUsersByDomain'],
    }
  )

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

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
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
