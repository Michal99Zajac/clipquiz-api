import cors from '@fastify/cors'
import fp from 'fastify-plugin'

/**
 * This plugins adds some utilities to handle CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(
  async (fastify) => {
    await fastify.register(cors)
  },
  {
    name: 'cors-plugin',
  },
)
