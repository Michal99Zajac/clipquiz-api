import cors from '@fastify/cors'
import fp from 'fastify-plugin'

import env from '@/config/env'

/**
 * This plugins adds some utilities to handle CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(
  async (fastify) => {
    await fastify.register(cors, {
      origin: env.CLIENT_URL,
    })
  },
  {
    name: 'cors-plugin',
  },
)
