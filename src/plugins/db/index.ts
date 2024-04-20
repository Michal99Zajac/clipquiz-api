import fp from 'fastify-plugin'

import db from '@/db'

/**
 * This plugins adds some utilities to handle database ORM (TypeORM)
 *
 * @see https://github.com/typeorm/typeorm
 */
export default fp(
  async (fastify) => {
    if (!fastify.db) {
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
  },
  {
    name: 'db-plugin',
  },
)
