import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import type { DataSource } from 'typeorm'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

declare global {
  export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
  >
}

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
    db: DataSource
  }
}
