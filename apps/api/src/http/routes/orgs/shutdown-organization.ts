import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissons'
import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Shutdown Organization',
          security: [{ bearerAuth: [] }],
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

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            `You do not have permission to shutdown the organization: ${slug}`
          )
        }

        prisma.$transaction([
          prisma.invite.deleteMany({
            where: {
              organizationId: organization.id,
            },
          }),
          prisma.project.deleteMany({
            where: {
              organizationId: organization.id,
            },
          }),
          prisma.member.deleteMany({
            where: {
              organizationId: organization.id,
            },
          }),
          prisma.organization.delete({
            where: {
              id: organization.id,
            },
          }),
        ])

        reply.status(204).send()
      }
    )
}
