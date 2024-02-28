import fp from 'fastify-plugin'
import { DataSource } from 'typeorm'

import { env } from '@/config/env'
import { Quiz } from '@/models/Quiz'

/**
 * This plugins adds some utilities to handle database ORM (TypeORM)
 *
 * @see https://github.com/typeorm/typeorm
 */
export default fp(async (fastify) => {
  if (!fastify.db) {
    const db = new DataSource({
      type: 'postgres',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      entities: [Quiz],
      synchronize: true,
      logging: false,
      ssl: true,
    })

    // Connect to the database
    await db.initialize()

    // Decorate the fastify instance with the database connection
    fastify.decorate('db', db)

    // Gracefully close the database connection
    fastify.addHook('onClose', (fastify) => {
      if (fastify.db === db) {
        fastify.db.destroy()
      }
    })
  }
})
