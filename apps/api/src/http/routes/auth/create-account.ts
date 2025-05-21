import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) {
        return reply.status(409).send({
          message: 'User with this email already exists',
        })
      }

      const passwordHash = hashSync(
        password,
        Number(process.env.HASH_SALT) || 12
      )

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      return reply.status(201).send({
        message: 'User created successfully',
        id: user.id,
        name: user.name,
        email: user.email,
      })
    }
  )
}
