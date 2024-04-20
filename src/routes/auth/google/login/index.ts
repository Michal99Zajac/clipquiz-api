import { FastifyInstance } from 'fastify'

import { GOOGLE_OAUTH2_SCOPE } from '@/config/const'

const googleLoginRoute = async (fastify: FastifyInstance) => {
  fastify.get('/', {
    schema: {
      description: 'Login with Google',
      tags: ['auth'],
    },
    handler: fastify.passport.authenticate('google', {
      scope: GOOGLE_OAUTH2_SCOPE,
    }),
  })
}

export default googleLoginRoute
