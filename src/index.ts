import Fastify from 'fastify'

import app from './app'
import env from './config/env'
import logger from './config/logger'

// Create the Fastify instance
const fastify = Fastify({
  logger: logger[env.NODE_ENV],
})

// Register the app
fastify.register(app)

// Run the app
fastify.ready()

// Start the server
fastify.listen({
  host: env.HOST,
  port: env.PORT,
})
