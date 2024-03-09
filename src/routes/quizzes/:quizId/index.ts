import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { QuizController } from '@/controllers/QuizController'
import { quizParamsSchema, updateQuizBodySchema } from '@/controllers/QuizController/schemas'
import { notFoundSchema } from '@/schemas/notFoundSchema'
import { quizSchema } from '@/schemas/quizSchema'
import { quizWithQuestionSchema } from '@/schemas/quizWithQuestionSchema'

const quizRoute = async (fastify: FastifyZodInstance): Promise<void> => {
  const controller = new QuizController(fastify)

  fastify.get('/', {
    schema: {
      params: quizParamsSchema,
      response: {
        200: quizWithQuestionSchema.nullable(),
      },
    },
    handler: controller.read,
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
    handler: controller.update,
  })

  fastify.delete('/', {
    schema: {
      params: quizParamsSchema,
      response: {
        204: z.null(),
        404: notFoundSchema,
      },
    },
    handler: controller.delete,
  })
}

export default quizRoute
