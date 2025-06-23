import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissons'
import { roleSchema } from '@saas/auth/src/types'

import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get members of a project',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string().min(1).max(255),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  userId: z.string().uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  email: z.string().email(),
                  avatarUrl: z.string().url().nullable(),
                })
              ),
            }),
          },
        },
      },

      async (request, reply) => {
        const { orgSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('read', 'User')) {
          throw new UnauthorizedError(
            'You do not have permission to get members.'
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            role: 'asc',
          },
        })

        const membersWithRoles = members.map((member) => {
          return {
            id: member.id,
            userId: member.user.id,
            role: member.role,
            name: member.user.name,
            email: member.user.email,
            avatarUrl: member.user.avatarUrl,
          }
        })

        return reply.status(200).send({ members: membersWithRoles })
      }
    )
}
