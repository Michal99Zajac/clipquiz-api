import { FastifyInstance } from 'fastify'

import { ScoreController } from '@/controllers/ScoreController'
import {
  score200Response,
  score400Response,
  score404Response,
  scoreBodySchema,
  scoreParams,
} from '@/controllers/ScoreController/schemas'

const scoreRoute = async (fastify: FastifyInstance): Promise<void> => {
  const controller = new ScoreController(fastify)

  fastify.post('/', {
    schema: {
      params: scoreParams,
      body: scoreBodySchema,
      response: {
        200: score200Response,
        404: score404Response,
        400: score400Response,
      },
    },
    handler: controller.score,
  })
}

export default scoreRoute
