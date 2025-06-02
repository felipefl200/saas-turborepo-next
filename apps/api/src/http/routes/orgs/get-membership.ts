import { Role } from '@/generated/prisma/client'
import { auth } from '@/http/middlewares/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organization/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership in an organization',
          params: z.object({
            slug: z.string().min(1).max(255),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: z.nativeEnum(Role),
                userId: z.string().uuid(),
                organizationId: z.string().min(1).max(255),
              }),
            }),
          },
        },
      },

      async (request) => {
        const { slug } = request.params

        const { membership } = await request.getUserMembership(slug)

        return {
          membership: {
            id: membership.id,
            role: membership.role,
            userId: membership.userId,
            organizationId: membership.organizationId,
          },
        }
      }
    )
}
