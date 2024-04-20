import { FastifyInstance } from 'fastify'

import { GOOGLE_OAUTH2_SCOPE } from '@/config/const'
import env from '@/config/env'

const googleCallbackRoute = async (fastify: FastifyInstance) => {
  fastify.get('', {
    schema: {
      description: 'Google OAuth2 callback',
      tags: ['auth'],
    },
    preValidation: fastify.passport.authenticate('google', {
      scope: GOOGLE_OAUTH2_SCOPE,
    }),
    handler: (_, reply) => {
      reply.redirect(env.WEB_APP_URL)
    },
  })
}

export default googleCallbackRoute
