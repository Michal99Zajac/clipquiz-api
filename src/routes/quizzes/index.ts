import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { Quiz } from '@/models/Quiz'
import { QuizSchema } from '@/schemas/Quiz'

const quizzesRoute = async (fastify: FastifyZodInstance) => {
  fastify.get('/', {
    schema: {
      querystring: z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
      response: {
        200: z.array(QuizSchema),
      },
    },
    handler: async (req, reply) => {
      const quizRepository = fastify.db.getRepository(Quiz)
      const quizzes = await quizRepository.find({
        take: req.query.limit,
        skip: req.query.offset,
      })

      reply.send(quizzes)
    },
  })

  fastify.post('/', {
    schema: {
      body: z.object({
        title: z.string(),
      }),
      response: {
        201: QuizSchema,
      },
    },
    handler: async (req, reply) => {
      const quizRepository = fastify.db.getRepository(Quiz)
      const quiz = new Quiz()
      quiz.title = req.body.title

      await quizRepository.save(quiz)

      reply.code(201).send(quiz)
    },
  })
}

export default quizzesRoute
