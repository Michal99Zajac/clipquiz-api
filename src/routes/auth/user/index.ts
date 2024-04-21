import { FastifyInstance } from 'fastify'

const authUserRoute = async (fastify: FastifyInstance) => {
  fastify.get('/', {
    schema: {
      description: 'Get authenticated user',
      tags: ['auth'],
    },
    handler: async (req, reply) => {
      const user = fastify.authenticate(req, reply)

      reply.send(user)
    },
  })
}

export default authUserRoute
