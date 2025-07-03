import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Create a new organization',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1).max(255),
            domain: z.string().min(1).max(255).nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
          response: {
            201: z.object({
              organization: z.object({
                id: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { name, domain, shouldAttachUsersByDomain } = request.body

        if (domain) {
          const organizationByDomain = await prisma.organization.findFirst({
            where: { domain },
          })

          if (organizationByDomain) {
            throw new BadRequestError('Domain already in use')
          }
        }

        const organization = await prisma.organization.create({
          data: {
            name,
            domain,
            slug: generateSlug(name),
            ownerId: userId,
            shouldAttachUsersByDomain,
            members: {
              create: {
                userId,
                role: 'ADMIN',
              },
            },
          },
        })

        return reply.status(201).send({
          organization: {
            id: organization.id,
          },
        })
      }
    )
}
