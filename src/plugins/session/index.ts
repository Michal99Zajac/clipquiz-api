import fastifySession from '@fastify/secure-session'
import fp from 'fastify-plugin'

import { SESSION_COOKIE_NAME, SESSION_NAME, SESSION_TTL } from '@/config/const'
import { env } from '@/config/env'

/**
 * This plugins adds session support
 *
 * @see https://github.com/fastify/fastify-secure-session
 */
export default fp(
  async (fastify) => {
    fastify.register(fastifySession, {
      sessionName: SESSION_NAME,
      cookieName: SESSION_COOKIE_NAME,
      secret: env.SESSION_SECRET,
      salt: env.SESSION_SALT,
      expiry: SESSION_TTL,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        maxAge: SESSION_TTL,
      },
    })
  },
  {
    name: 'session-plugin',
  },
)
