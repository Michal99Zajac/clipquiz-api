import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { Quiz } from '@/models/Quiz'

const quizRoute = async (fastify: FastifyZodInstance): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: z.object({
        quizId: z.string().transform((val) => Number(val)),
      }),
      response: {
        200: z.object({
          hello: z.number(),
        }),
      },
    },
    handler: async (req, reply) => {
      const quiz = new Quiz()
      quiz.title = 'test'

      reply.send({ hello: req.params.quizId })
    },
  })
}

export default quizRoute
