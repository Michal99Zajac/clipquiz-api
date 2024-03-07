import { FastifyZodInstance } from 'fastify'
import z from 'zod'

import { Quiz } from '@/models/Quiz'
import { QuizSchema } from '@/schemas/Quiz'

const quizRoute = async (fastify: FastifyZodInstance): Promise<void> => {
  fastify.get('/', {
    schema: {
      params: z.object({
        quizId: z.string(),
      }),
      response: {
        200: QuizSchema.nullable(),
      },
    },
    handler: async (req, reply) => {
      const quizRepository = fastify.db.getRepository(Quiz)
      const quiz = await quizRepository.findOne({
        where: {
          id: Number(req.params.quizId),
        },
      })

      reply.send(quiz)
    },
  })

  fastify.put('/', {
    schema: {
      params: z.object({
        quizId: z.string(),
      }),
      body: z.object({
        title: z.string(),
      }),
      response: {
        200: QuizSchema,
        404: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (req, reply) => {
      const quizRepository = fastify.db.getRepository(Quiz)
      const quiz = await quizRepository.findOne({
        where: {
          id: Number(req.params.quizId),
        },
      })

      // If the quiz is not found, return a 404
      if (!quiz) {
        return reply.code(404).send({ message: 'Quiz not found' })
      }

      // Update the quiz title
      quiz.title = req.body.title
      await quizRepository.save(quiz)

      // Return the updated quiz
      reply.send(quiz)
    },
  })

  fastify.delete('/', {
    schema: {
      params: z.object({
        quizId: z.string(),
      }),
      response: {
        204: z.null(),
        404: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (req, reply) => {
      const quizRepository = fastify.db.getRepository(Quiz)
      const quiz = await quizRepository.findOne({
        where: {
          id: Number(req.params.quizId),
        },
      })

      // If the quiz is not found, return a 404
      if (!quiz) {
        return reply.code(404).send({ message: 'Quiz not found' })
      }

      // Delete the quiz
      await quizRepository.remove(quiz)

      // Return a 204
      reply.code(204).send()
    },
  })
}

export default quizRoute
