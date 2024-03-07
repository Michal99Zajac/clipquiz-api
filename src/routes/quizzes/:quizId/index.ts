import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { QuizController } from '@/controllers/QuizController'
import { quizParamsSchema, updateQuizBodySchema } from '@/controllers/QuizController/schemas'
import { notFoundSchema } from '@/schemas/NotFound'
import { quizSchema } from '@/schemas/Quiz'

const quizRoute = async (fastify: FastifyZodInstance): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: quizParamsSchema,
      response: {
        200: quizSchema.nullable(),
      },
    },
    handler: new QuizController(fastify).getQuiz,
  })

  fastify.put('/', {
    schema: {
      params: quizParamsSchema,
      body: updateQuizBodySchema,
      response: {
        200: quizSchema,
        404: notFoundSchema,
      },
    },
    handler: new QuizController(fastify).updateQuiz,
  })

  fastify.delete('/', {
    schema: {
      params: z.object({
        quizId: z.string(),
      }),
      response: {
        204: z.null(),
        404: notFoundSchema,
      },
    },
    handler: new QuizController(fastify).deleteQuiz,
  })
}

export default quizRoute
