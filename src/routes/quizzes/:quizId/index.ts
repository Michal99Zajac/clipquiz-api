import z from 'zod'

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
      reply.send({ hello: req.params.quizId })
    },
  })
}

export default quizRoute
