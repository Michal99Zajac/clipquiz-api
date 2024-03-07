import Fastify from 'fastify'

import app from './app'
import env from './config/env'
import logger from './config/logger'

const fastify = Fastify({
  logger: logger[env.NODE_ENV],
})

fastify.register(app)

export default fastify

/* -------------------------------------------------------------------------- */
/*                                 DEV SERVER                                 */
/* -------------------------------------------------------------------------- */

if (require.main === module) {
  fastify.ready((error) => {
    if (error) fastify.log.error(error)

    // Clear the console
    fastify.log.info('\x1Bc')
  })

  // Start the dev server
  fastify.listen({
    host: env.HOST,
    port: env.PORT,
  })
}
