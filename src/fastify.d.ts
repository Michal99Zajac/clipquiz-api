import type { DataSource } from 'typeorm'

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
    db: DataSource
  }
}
