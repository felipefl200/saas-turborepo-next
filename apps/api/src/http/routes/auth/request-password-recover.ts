import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password-recover',
    {
      schema: {
        summary: 'Get password recovery link',
        tags: ['auth'],
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            recoveryToken: z.string(),
          }),
          400: z.object({
            message: z.null(),
          }),
        },
      },
    },

    async (request, reply) => {
      const { email } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // we don't want to expose if the user exists or not
        // to prevent user enumeration attacks
        // so we just return a generic error message
        return reply.status(200).send()
      }

      const token = await prisma.token.create({
        data: {
          userId: user.id,
          type: 'PASSWORD_RECOVER',
        },
      })

      // send email to user with the token

      return reply.status(200).send({
        recoveryToken: token.id,
      })
    }
  )
}
