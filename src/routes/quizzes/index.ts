import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'

import { QuizController } from '@/controllers/QuizController'
import {
  create201ResponseJsonSchema,
  createBodyJsonSchema,
  list200ResponseJsonSchema,
  listQuerystringJsonSchema,
} from '@/controllers/QuizController/schemas'

const quizzesRoute: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      querystring: listQuerystringJsonSchema,
      response: {
        200: list200ResponseJsonSchema,
      },
    },
    handler: controller.list,
  })

  fastify.post('/', {
    schema: {
      body: createBodyJsonSchema,
      response: {
        201: create201ResponseJsonSchema,
      },
    },
    handler: controller.create,
  })
}

export default quizzesRoute
