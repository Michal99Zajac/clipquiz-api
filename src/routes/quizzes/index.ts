import { FastifyPluginAsync } from 'fastify'

const quizzesRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    reply.send({ hello: 'world' })
  })
}

export default quizzesRoute
