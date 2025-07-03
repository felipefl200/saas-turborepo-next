import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissons'
import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function transferOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Transfer organization ownership',
          security: [{ bearerAuth: [] }],
          body: z.object({
            newOwnerId: z.string().uuid(),
          }),
          params: z.object({
            slug: z.string().min(1).max(255),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            `You do not have permission to transfer ownership of the organization: ${slug}`
          )
        }

        const { newOwnerId } = request.body

        const transferToMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              userId: newOwnerId,
              organizationId: organization.id,
            },
          },
        })

        if (!transferToMembership) {
          throw new UnauthorizedError(
            `The user with ID ${newOwnerId} is not a member of the organization: ${slug}`
          )
        }

        prisma.$transaction([
          prisma.member.update({
            where: {
              organizationId_userId: {
                organizationId: organization.id,
                userId: newOwnerId,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),

          prisma.organization.update({
            where: { id: organization.id },
            data: {
              ownerId: newOwnerId,
            },
          }),
        ])

        reply.status(204).send()
      }
    )
}
