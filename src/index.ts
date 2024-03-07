import Fastify from 'fastify'
import { PinoLoggerOptions } from 'fastify/types/logger'

import app from './app'
import env from './config/env'

const logger: PinoLoggerOptions = {
  level: 'info',
}

const fastify = Fastify({
  // Disable the logger in test environment
  logger: env.NODE_ENV === 'test' ? false : logger,
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
