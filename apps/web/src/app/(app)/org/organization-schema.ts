import { z } from 'zod'

export const organizationSchema = z
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

export type OrganizationFormData = z.infer<typeof organizationSchema>
