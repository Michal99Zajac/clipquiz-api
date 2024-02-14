import * as dotenv from 'dotenv'

import api, { options } from '../src/app'

dotenv.config()

// Require the framework
import Fastify from 'fastify'

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
})

// Register your application as a normal plugin.
app.register(api, options)

export default async (req: Request, res: Response) => {
  await app.ready()
  app.server.emit('request', req, res)
}
