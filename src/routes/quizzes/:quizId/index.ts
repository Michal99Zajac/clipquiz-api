import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'

import { QuizController } from '@/controllers/QuizController'
import {
  delete204ResponseJsonSchema,
  delete404ResponseJsonSchema,
  deleteParamsJsonSchema,
  read200ResponseJsonSchema,
  read404ResponseJsonSchema,
  readParamsJsonSchema,
  update200ResponseJsonSchema,
  update404ResponseJsonSchema,
  updateBodyJsonSchema,
  updateParamsJsonSchema,
} from '@/controllers/QuizController/schemas'

const quizRoute: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      params: readParamsJsonSchema,
      response: {
        200: read200ResponseJsonSchema,
        404: read404ResponseJsonSchema,
      },
    },
    handler: controller.read,
  })

  fastify.put('/', {
    schema: {
      params: updateParamsJsonSchema,
      body: updateBodyJsonSchema,
      response: {
        200: update200ResponseJsonSchema,
        404: update404ResponseJsonSchema,
      },
    },
    handler: controller.update,
  })

  fastify.delete('/', {
    schema: {
      params: deleteParamsJsonSchema,
      response: {
        204: delete204ResponseJsonSchema,
        404: delete404ResponseJsonSchema,
      },
    },
    handler: controller.delete,
  })
}

export default quizRoute
