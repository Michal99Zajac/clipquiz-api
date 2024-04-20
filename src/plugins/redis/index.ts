import fastifyRedis from '@fastify/redis'
import fp from 'fastify-plugin'

import { env } from '@/config/env'

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
export default fp(
  async (fastify) => {
    fastify.register(fastifyRedis, {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      username: env.REDIS_USERNAME,
    })
  },
  {
    name: 'redis-plugin',
  },
)
