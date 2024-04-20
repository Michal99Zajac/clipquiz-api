import { FastifyInstance } from 'fastify'

const authUserRoute = async (fastify: FastifyInstance) => {
  fastify.post('/', {
    schema: {
      description: 'Logout',
      tags: ['auth'],
    },
    handler: async (req, reply) => {
      req.session.delete()
      reply.send({ message: 'Logged out' })
    },
  })
}

export default authUserRoute
