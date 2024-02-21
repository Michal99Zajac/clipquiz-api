import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

import packageJson from '../../../package.json'

/**
 * This plugins adds Swagger support to Fastify
 *
 * @see https://github.com/fastify/fastify-swagger
 * @see https://github.com/fastify/fastify-swagger-ui
 */
export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'ClipQuiz API',
        description: packageJson.description,
        version: packageJson.version,
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
  })
})
