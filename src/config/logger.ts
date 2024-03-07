import { PinoLoggerOptions } from 'fastify/types/logger'

import { env } from './env'

export const logger: Record<typeof env.NODE_ENV, PinoLoggerOptions | boolean> = {
  development: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        colorizeObjects: true,
        singleLine: true,
      },
    },
  },
  production: {
    level: 'info',
  },
  test: false,
}

export default logger
