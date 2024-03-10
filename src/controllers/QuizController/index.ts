import { FastifyReply, FastifyRequest, FastifyZodInstance } from 'fastify'

import Answer from '@/models/Answer'
import Question from '@/models/Question'
import Quiz from '@/models/Quiz'

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
  fastify: FastifyZodInstance

  constructor(fastify: FastifyZodInstance) {
    this.fastify = fastify
  }

  /**
   * Get quizzes.
   */
  list = async (req: FastifyRequest<{ Querystring: ListQuerystring }>, reply: FastifyReply) => {
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
  create = async (req: FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)

    // Fill the quiz with the request body
    let quiz = new Quiz()
    quiz.title = req.body.title
    quiz.description = req.body.description
    quiz.thumbnail = req.body.thumbnail
    quiz.videoUrl = req.body.videoUrl
    quiz.videoDuration = req.body.videoDuration
    quiz.questions = req.body.questions.map((q) => {
      const question = new Question()
      question.content = q.content
      question.occurrence = q.occurrence
      question.answers = q.answers.map((a) => {
        const answer = new Answer()
        answer.content = a.content
        answer.isCorrect = a.isCorrect
        return answer
      })

      return question
    })

    // Save the quiz
    quiz = await quizRepository.save(quiz)

    reply.code(201).send(quiz)
  }

  /**
   * Get a quiz.
   */
  read = async (req: FastifyRequest<{ Params: ReadParams }>, reply: FastifyReply) => {
    const quizRepository = this.fastify.db.getRepository(Quiz)
    const quiz = await quizRepository.findOne({
      where: {
        id: Number(req.params.quizId),
      },
      relations: ['questions', 'questions.answers'],
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
    quiz.description = req.body.description
    quiz.thumbnail = req.body.thumbnail
    quiz.videoUrl = req.body.videoUrl
    quiz.videoDuration = req.body.videoDuration

    // Save the updated quiz
    await quizRepository.save(quiz)

    // Return the updated quiz
    reply.send(quiz)
  }

  /**
   * Delete a quiz.
   */
  delete = async (req: FastifyRequest<{ Params: DeleteParams }>, reply: FastifyReply) => {
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
