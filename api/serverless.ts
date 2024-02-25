import * as dotenv from 'dotenv'

import app from '@/app'

dotenv.config()

// Require the framework
import Fastify from 'fastify'

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
})

// Register your application a normal plugin.
fastify.register(app)

export default async (req: Request, res: Response) => {
  await fastify.ready()
  fastify.server.emit('request', req, res)
}
