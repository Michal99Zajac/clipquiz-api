import { FastifyZodInstance } from 'fastify'

import { QuizController } from '@/controllers/QuizController'
import {
  create201ResponseSchema,
  createBodySchema,
  list200ResponseSchema,
  listQuerystringSchema,
} from '@/controllers/QuizController/schemas'

const quizzesRoute = async (fastify: FastifyZodInstance) => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      querystring: listQuerystringSchema,
      response: {
        200: list200ResponseSchema,
      },
    },
    handler: controller.list,
  })

  fastify.post('/', {
    schema: {
      body: createBodySchema,
      response: {
        201: create201ResponseSchema,
      },
    },
    handler: controller.create,
  })
}

export default quizzesRoute
