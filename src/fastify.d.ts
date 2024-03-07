import type { DataSource } from 'typeorm'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
    db: DataSource
  }

  export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
  >
}
