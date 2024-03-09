import { FastifyReply, FastifyRequest, FastifyZodInstance } from 'fastify'

import Quiz from '@/models/Quiz'

import { CreateQuizBody, ListQuizzesQuerystring, QuizParams, UpdateQuizBody } from './schemas'

/**
 * Quiz controller.
 */
export class QuizController {
  fastify: FastifyZodInstance

  constructor(fastify: FastifyZodInstance) {
    this.fastify = fastify
  }

  /**
   * Get quizzes.
   */
  list = async (
    req: FastifyRequest<{ Querystring: ListQuizzesQuerystring }>,
    reply: FastifyReply,
  ) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
    const quizzes = await quizRepository.find({
      take: req.query.limit,
      skip: req.query.offset,
    })

    reply.send(quizzes)
  }

  /**
   * Create a quiz.
   */
  create = async (req: FastifyRequest<{ Body: CreateQuizBody }>, reply: FastifyReply) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
    const quiz = new Quiz()
    quiz.title = req.body.title

    await quizRepository.save(quiz)

    reply.code(201).send(quiz)
  }

  /**
   * Get a quiz.
   */
  read = async (req: FastifyRequest<{ Params: QuizParams }>, reply: FastifyReply) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
    const quiz = await quizRepository.findOne({
      where: {
        id: Number(req.params.quizId),
      },
      relations: ['questions', 'questions.answers'],
    })

    reply.send(quiz)
  }

  /**
   * Update a quiz.
   */
  update = async (
    req: FastifyRequest<{ Params: QuizParams; Body: UpdateQuizBody }>,
    reply: FastifyReply,
  ) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
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
  }

  /**
   * Delete a quiz.
   */
  delete = async (req: FastifyRequest<{ Params: QuizParams }>, reply: FastifyReply) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
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
  }
}

export default QuizController
