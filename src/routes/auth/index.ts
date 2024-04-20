import { FastifyInstance } from 'fastify'

const authRoute = async (fastify: FastifyInstance) => {
  fastify.get('/google', {
    handler: fastify.passport.authenticate('google', {
      scope: ['profile'],
    }),
  })

  fastify.get('/google/callback', {
    preValidation: fastify.passport.authenticate('google', {
      scope: ['profile'],
    }),
    handler: (_, reply) => {
      reply.send('Authenticated')
    },
  })
}

export default authRoute
