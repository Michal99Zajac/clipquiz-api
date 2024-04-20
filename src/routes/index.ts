import { FastifyInstance } from 'fastify'

const quizzesRoute = async (fastify: FastifyInstance) => {
  fastify.get('/', {
    handler: async (req, reply) => {
      reply.send(req.user)
    },
  })
}

export default quizzesRoute
