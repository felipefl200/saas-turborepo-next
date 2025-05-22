import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request.error'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create a new user',
        description:
          'Create a new user with the given name, email, and password',
        tags: ['auth'],
        response: {
          201: z.object({
            message: z.string(),
            id: z.string(),
            name: z.string(),
            email: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
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

      const [, domain] = email.split('@')
      const autoJoinDomainOrganization = await prisma.organization.findUnique({
        where: { domain, shouldAttachUsersByDomain: true },
      })

      if (userWithSameEmail) {
        throw new BadRequestError('User with this email already exists')
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
          member_on: autoJoinDomainOrganization
            ? {
                create: {
                  organizationId: autoJoinDomainOrganization.id,
                },
              }
            : undefined,
        },
      })

      return reply.status(201).send({
        message: 'User created successfully',
        id: user.id,
        name: user.name ?? '',
        email: user.email,
      })
    }
  )
}
