import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function resetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password-reset',
    {
      schema: {
        summary: 'Reset password',
        description: 'Request a password reset link',
        tags: ['auth'],
        body: z.object({
          token: z.string(),
          password: z.string().min(6),
        }),
        response: {
          204: z.object({
            message: z.null(),
          }),
          400: z.object({
            message: z.null(),
          }),
        },
      },
    },

    async (request, reply) => {
      const { token, password } = request.body

      const tokenRecord = await prisma.token.findUnique({
        where: { id: token },
      })

      if (!tokenRecord) {
        throw new BadRequestError('Invalid token')
      }

      if (tokenRecord.type !== 'PASSWORD_RECOVER') {
        throw new BadRequestError('Invalid token')
      }

      const passwordHash = hashSync(password)

      await prisma.$transaction([
        prisma.user.update({
          where: { id: tokenRecord.userId },
          data: {
            passwordHash,
          },
        }),

        prisma.token.delete({
          where: { id: tokenRecord.id },
        }),
      ])

      return reply.status(204).send()
    }
  )
}
