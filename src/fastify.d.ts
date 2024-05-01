import type { Authenticator } from '@fastify/passport'
import type { PrismaClient } from '@prisma/client'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { preValidationHookHandler, FastifyRegister } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
    db: PrismaClient
    passport: Authenticator
    authenticate: (req: FastifyRequest, reply: FastifyReply) => any // TODO: Define the return type
  }

  interface PassportUser {
    message: string
  }
}

declare module '@fastify/secure-session' {
  interface SessionData {}
}
