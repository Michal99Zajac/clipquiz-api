import { PrismaClient } from '@prisma/client'
import fp from 'fastify-plugin'

/**
 * This plugin is used to connect to the database using Prisma.
 *
 * @see https://github.com/prisma/prisma
 */
export default fp(
  async (fastify) => {
    if (!fastify.db) {
      // Create a new Prisma client
      const db = new PrismaClient()

      // Connect to the database
      await db.$connect()

      // Decorate the fastify instance with the database connection
      fastify.decorate('db', db)

      // Gracefully close the database connection
      fastify.addHook('onClose', (fastify) => {
        if (fastify.db === db) {
          fastify.db.$disconnect()
        }
      })
    }
  },
  {
    name: 'db-plugin',
  },
)
