import { env } from './config/env'
import fastify from './index'

// Clear the console when the server is ready
fastify.ready((error) => {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }

  fastify.log.info('\x1Bc')
})

// Start the dev server
fastify.listen({
  host: env.HOST,
  port: env.PORT,
})
