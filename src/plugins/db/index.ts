import fp from 'fastify-plugin'
import { DataSource } from 'typeorm'

import { Quiz } from '../../models/Quiz'

/**
 * This plugins adds some utilities to handle database ORM (TypeORM)
 *
 * @see https://github.com/typeorm/typeorm
 */
export default fp(async (fastify) => {
  if (!fastify.db) {
    const db = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Quiz],
      synchronize: true,
      logging: false,
    })
    await db.initialize()

    fastify.decorate('db', db)

    fastify.addHook('onClose', (fastify) => {
      if (fastify.db === db) {
        fastify.db.destroy()
      }
    })
  }
})
