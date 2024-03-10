import { FastifyZodInstance } from 'fastify'

import { QuizController } from '@/controllers/QuizController'
import {
  delete204ResponseSchema,
  delete404ResponseSchema,
  deleteParamsSchema,
  read200ResponseSchema,
  read404ResponseSchema,
  readParamsSchema,
  update200ResponseSchema,
  update404ResponseSchema,
  updateBodySchema,
  updateParamsSchema,
} from '@/controllers/QuizController/schemas'

const quizRoute = async (fastify: FastifyZodInstance): Promise<void> => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      params: readParamsSchema,
      response: {
        200: read200ResponseSchema,
        404: read404ResponseSchema,
      },
    },
    handler: controller.read,
  })

  fastify.put('/', {
    schema: {
      params: updateParamsSchema,
      body: updateBodySchema,
      response: {
        200: update200ResponseSchema,
        404: update404ResponseSchema,
      },
    },
    handler: controller.update,
  })

  fastify.delete('/', {
    schema: {
      params: deleteParamsSchema,
      response: {
        204: delete204ResponseSchema,
        404: delete404ResponseSchema,
      },
    },
    handler: controller.delete,
  })
}

export default quizRoute
