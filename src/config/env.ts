import dotenv from 'dotenv'
import { bool, cleanEnv, host, port, str } from 'envalid'

// Load environment variables from .env file
dotenv.config()

// Validate environment variables
export const env = cleanEnv(process.env, {
  HOST: host({ default: '0.0.0.0' }),
  PORT: port({ default: 8080 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  // DATABASE
  DATABASE_HOST: host(),
  DATABASE_PORT: port({ default: 5432 }),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
  DATABASE_SSL: bool(),
  // REDIS
  REDIS_HOST: host(),
  REDIS_PORT: port(),
  REDIS_PASSWORD: str(),
  REDIS_USERNAME: str(),
  // SESSION
  SESSION_SECRET: str(),
})

export default env
