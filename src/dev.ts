import env from './config/env'
import fastify from './index'

// Start the dev server
fastify.listen({ host: env.HOST, port: env.PORT })
