import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch (error) {
        throw new UnauthorizedError('Invalid token')
      }
    }
  })
})
