import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'

import { ScoreController } from '@/controllers/ScoreController'
import {
  score200ResponseJsonSchema,
  score400ResponseJsonSchema,
  score404ResponseJsonSchema,
  scoreBodyJsonSchema,
  scoreParamsJsonSchema,
} from '@/controllers/ScoreController/schemas'

const scoreRoute: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  const controller = new ScoreController(fastify)

  fastify.post('/', {
    schema: {
      params: scoreParamsJsonSchema,
      body: scoreBodyJsonSchema,
      response: {
        200: score200ResponseJsonSchema,
        404: score404ResponseJsonSchema,
        400: score400ResponseJsonSchema,
      },
    },
    handler: controller.score,
  })
}

export default scoreRoute
