import type { Authenticator } from '@fastify/passport'
import type { DataSource } from 'typeorm'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
    db: DataSource
    passport: Authenticator
  }

  interface PassportUser {
    message: string
  }
}

declare module '@fastify/secure-session' {
  interface SessionData {}
}
