import * as dotenv from 'dotenv'

import app from './app'

dotenv.config()

// Require the framework
import Fastify from 'fastify'

// Instantiate Fastify with some config
const server = Fastify({
  logger: {
    level: 'info',
  },
})

// Register your application as a normal plugin.
server.register(app)

server.ready(() => {
  // clear console
  console.log('\x1Bc')
})

server.listen({
  port: 8080,
})
