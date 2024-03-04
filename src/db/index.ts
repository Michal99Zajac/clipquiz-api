import { DataSource } from 'typeorm'

import env from '@/config/env'
import Quiz from '@/models/Quiz'

/**
 * Database data source
 */
export default new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  ssl: env.DATABASE_SSL,
  entities: [Quiz],
  migrationsRun: false,
  synchronize: false,
  logging: false,
  // point to the migrations folder
  migrations: [`${__dirname}/../migrations/*`],
})
