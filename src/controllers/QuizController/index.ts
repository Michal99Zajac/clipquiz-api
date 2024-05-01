import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import {
  CreateBody,
  DeleteParams,
  ListQuerystring,
  ReadParams,
  UpdateBody,
  UpdateParams,
} from './schemas'

/**
 * Quiz controller.
 */
export class QuizController {
  fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  /**
   * Get quizzes.
   */
  list = async (req: FastifyRequest<{ Querystring: ListQuerystring }>, reply: FastifyReply) => {
    const quizzes = await this.fastify.db.quiz.findMany({
      where: {
        OR: [
          {
            title: {
              contains: req.query.q,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: req.query.q,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: req.query.limit,
      skip: req.query.offset,
    })

    reply.send(quizzes)
  }

  /**
   * Create a quiz.
   */
  create = async (req: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const quiz = await this.fastify.db.quiz.create({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        thumbnailUrl: req.body.thumbnailUrl,
        videoUrl: req.body.videoUrl,
        duration: req.body.duration,
        questions: {
          create: req.body.questions.map((question) => ({
            content: question.content,
            timestamp: question.timestamp,
            answers: {
              create: question.answers.map((a) => ({
                content: a.content,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
    })

    reply.code(201).send(quiz)
  }

  /**
   * Get a quiz.
   */
  read = async (req: FastifyRequest<{ Params: ReadParams }>, reply: FastifyReply) => {
    const quiz = await this.fastify.db.quiz.findFirst({
      where: {
        id: Number(req.params.quizId),
      },
    })

    if (!quiz) {
      return reply.code(404).send({ message: 'Quiz not found' })
    }

    reply.send(quiz)
  }

  /**
   * Update a quiz.
   */
  update = async (
    req: FastifyRequest<{ Params: UpdateParams; Body: UpdateBody }>,
    reply: FastifyReply,
  ) => {
    const quizId = Number(req.params.quizId)

    // Find the quiz
    const quiz = await this.fastify.db.quiz.findFirst({
      where: {
        id: quizId,
      },
    })

    // If the quiz is not found, return a 404
    if (!quiz) {
      return reply.code(404).send({ message: 'Quiz not found' })
    }

    // Update the quiz
    return await this.fastify.db.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        thumbnailUrl: req.body.thumbnailUrl,
        videoUrl: req.body.videoUrl,
        duration: req.body.duration,
      },
    })
  }

  /**
   * Delete a quiz.
   */
  delete = async (req: FastifyRequest<{ Params: DeleteParams }>, reply: FastifyReply) => {
    const quizId = Number(req.params.quizId)

    // Find the quiz
    const quiz = await this.fastify.db.quiz.findFirst({
      where: {
        id: quizId,
      },
    })

    // If the quiz is not found, return a 404
    if (!quiz) {
      return reply.code(404).send({ message: 'Quiz not found' })
    }

    // Delete the quiz
    await this.fastify.db.quiz.delete({
      where: {
        id: quiz.id,
      },
    })

    // Return a 204
    reply.code(204).send()
  }
}

export default QuizController
