import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'
import { getUserPermissions } from '@/utils/get-user-permissons'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Create a new project',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1).max(255),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string().min(1).max(255),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            'You do not have permission to create a project in this organization.'
          )
        }

        const { name, description } = request.body

        const project = await prisma.project.create({
          data: {
            name,
            slug: generateSlug(name),
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
        })

        reply.status(201).send({
          projectId: project.id,
        })
      }
    )
}
