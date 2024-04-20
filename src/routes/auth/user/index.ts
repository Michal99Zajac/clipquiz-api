import { FastifyInstance } from 'fastify'

const authUserRoute = async (fastify: FastifyInstance) => {
  fastify.get('/', {
    schema: {
      description: 'Get authenticated user',
      tags: ['auth'],
    },
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      reply.send(req.user)
    },
  })
}

export default authUserRoute
