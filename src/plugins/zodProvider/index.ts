import fp from 'fastify-plugin'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

/**
 * This plugins adds Zod support to Fastify
 *
 * @see https://github.com/turkerdev/fastify-type-provider-zod
 */
export default fp(async (fastify) => {
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)
  fastify.withTypeProvider<ZodTypeProvider>()
})
