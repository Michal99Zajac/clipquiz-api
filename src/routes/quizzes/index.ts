import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { QuizController } from '@/controllers/QuizController'
import {
  createQuizBodySchema,
  listQuizzesQuerystringSchema,
} from '@/controllers/QuizController/schemas'
import { quizSchema } from '@/schemas/quizSchema'
import { quizWithQuestionSchema } from '@/schemas/quizWithQuestionSchema'

const quizzesRoute = async (fastify: FastifyZodInstance) => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      querystring: listQuizzesQuerystringSchema,
      response: {
        200: z.array(quizSchema),
      },
    },
    handler: controller.list,
  })

  fastify.post('/', {
    schema: {
      body: createQuizBodySchema,
      response: {
        201: quizWithQuestionSchema,
      },
    },
    handler: controller.create,
  })
}

export default quizzesRoute
