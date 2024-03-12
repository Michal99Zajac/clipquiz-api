import { StandaloneValidator } from '@fastify/ajv-compiler'
import { StandaloneSerializer } from '@fastify/fast-json-stringify-compiler'
import Fastify from 'fastify'
import path from 'path'

import app from './app'
import { generateFileName, RouteOpts } from './compiler/helper'
import env from './config/env'
import logger from './config/logger'

/**
 * Restore the function from the generated file
 *
 * @param routeOpts The route definition
 * @returns The restored function
 */
function restoreFunction(routeOpts: RouteOpts) {
  const fileName = generateFileName(routeOpts)
  const filePath = path.resolve(__dirname, 'generated', fileName)
  return require(filePath)
}

/**
 * The Fastify instance
 */
const fastify = Fastify({
  logger: logger[env.NODE_ENV],
  jsonShorthand: false,
  schemaController: {
    compilersFactory: {
      buildValidator: StandaloneValidator({
        readMode: true,
        restoreFunction,
      }),
      buildSerializer: StandaloneSerializer({
        readMode: true,
        restoreFunction,
      }),
    },
  },
})

// Register the app
fastify.register(app)

export default fastify
