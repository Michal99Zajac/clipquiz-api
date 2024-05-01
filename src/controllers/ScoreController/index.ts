import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { Score200Response, ScoreBody, ScoreParams } from './schemas'

/**
 * Quiz controller.
 */
export class ScoreController {
  fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  /**
   * Get score of the quiz.
   */
  score = async (
    req: FastifyRequest<{ Params: ScoreParams; Body: ScoreBody }>,
    reply: FastifyReply,
  ) => {
    const quiz = await this.fastify.db.quiz.findFirst({
      where: {
        id: req.params.quizId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    })

    // Check if quiz exists
    if (!quiz) {
      return reply.status(404).send({ message: 'Quiz not found' })
    }

    // Create response
    const response: Score200Response = {
      score: 0,
      quiz: {
        id: quiz.id,
        videoUrl: quiz.videoUrl,
        duration: quiz.duration,
        thumbnailUrl: quiz.thumbnailUrl,
        title: quiz.title,
        description: quiz.description,
        questions: [],
      },
    }

    // Calculate score
    quiz.questions.forEach((question) => {
      // get answerId from request body
      const answerId = req.body.answers[question.id]

      // Check if answer for the question is provided
      if (!answerId) {
        return reply.status(400).send({ message: 'Answer is required for all questions' })
      }

      // Find answer by id
      const answer = question.answers.find((a) => a.id === answerId)

      // Check if answer belongs to the question
      if (!answer) {
        return reply.status(400).send({ message: 'Answer not found' })
      }

      // Add question to response
      response.quiz.questions.push({
        id: question.id,
        content: question.content,
        timestamp: question.timestamp,
        isCorrect: answer.isCorrect,
        answers: question.answers.map((a) => ({
          id: a.id,
          content: a.content,
          isCorrect: a.isCorrect,
          isAnswer: a.id === answerId,
        })),
      })
    })

    // Calculate score
    const correctAnswers = response.quiz.questions.filter((q) => q.isCorrect).length
    const totalQuestions = response.quiz.questions.length
    response.score = Math.ceil((correctAnswers / totalQuestions) * 100)

    reply.send(response)
  }
}

export default ScoreController
