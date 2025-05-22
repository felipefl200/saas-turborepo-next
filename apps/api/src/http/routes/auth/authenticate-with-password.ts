import { prisma } from '@/lib/prisma'
import { compareSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        summary: 'Authenticate with password',
        // description:
        //   'Authenticate with password and return a JWT token. The token is valid for 1 hour.',
        tags: ['auth'],
        response: {
          201: z.object({
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        throw new UnauthorizedError('Invalid credentials')
      }

      if (userFromEmail.passwordHash === null) {
        throw new UnauthorizedError(
          'User does not have a password set. Please use a different authentication method.'
        )
      }

      const isPasswordValid = compareSync(password, userFromEmail.passwordHash)

      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid credentials')
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: '30s',
          },
        }
      )

      const { passwordHash, ...user } = userFromEmail
      return reply.status(200).send({
        token,
      })
    }
  )
}
