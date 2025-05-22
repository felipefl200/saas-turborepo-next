import { authMiddleware } from '@/http/middlewares/auth-middleware'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request.error'

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/profile',
      {
        schema: {
          summary: 'Get authenticated user profile',
          tags: ['auth'],
          response: {
            200: z.object({
              user: z.object({
                id: z.string(),
                name: z.string().nullable(),
                email: z.string().email(),
                avatarUrl: z.string().nullable(),
              }),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },

      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        if (!userId) {
          throw new BadRequestError('User not found')
        }
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        return reply.status(200).send({ user })
      }
    )
}
