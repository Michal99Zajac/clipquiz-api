import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fp from 'fastify-plugin'

import { SESSION_COOKIE, SESSION_TTL } from '@/config/const'
import { env } from '@/config/env'

/**
 * Generate a session id
 *
 * @param id The session id
 * @returns The generated session id
 */
const generateSessionId = (id: string) => `session-${id}`

/**
 * This plugins adds session support
 *
 * @see https://github.com/fastify/session
 */
export default fp(
  async (fastify) => {
    fastify.register(fastifyCookie)
    fastify.register(fastifySession, {
      secret: env.SESSION_SECRET,
      store: {
        set(sessionId, session, callback) {
          fastify.redis.set(generateSessionId(sessionId), JSON.stringify(session), callback)
        },
        get(sessionId, callback) {
          fastify.redis.get(generateSessionId(sessionId), (err, session) => {
            if (err) {
              return callback(err)
            }

            if (!session) {
              return callback(null, null)
            }

            callback(null, JSON.parse(session))
          })
        },
        destroy(sessionId, callback) {
          fastify.redis.del(generateSessionId(sessionId), callback)
        },
      },
      cookieName: SESSION_COOKIE,
      cookie: {
        path: '/',
        secure: env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: SESSION_TTL,
      },
    })
  },
  {
    name: 'session-plugin',
    dependencies: ['redis-plugin'],
  },
)
