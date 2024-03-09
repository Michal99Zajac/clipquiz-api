import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { QuizController } from '@/controllers/QuizController'
import {
  createQuizBodySchema,
  getQuizzesQuerystringSchema,
} from '@/controllers/QuizController/schemas'
import { quizSchema } from '@/schemas/quizSchema'

const quizzesRoute = async (fastify: FastifyZodInstance) => {
  fastify.get('/', {
    schema: {
      querystring: getQuizzesQuerystringSchema,
      response: {
        200: z.array(quizSchema),
      },
    },
    handler: new QuizController(fastify).list,
  })

  fastify.post('/', {
    schema: {
      body: createQuizBodySchema,
      response: {
        201: quizSchema,
      },
    },
    handler: new QuizController(fastify).create,
  })
}

export default quizzesRoute
