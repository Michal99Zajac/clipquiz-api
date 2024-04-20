import dotenv from 'dotenv'
import { bool, cleanEnv, host, port, str, url } from 'envalid'

// Load environment variables from .env file
dotenv.config()

// Validate environment variables
export const env = cleanEnv(process.env, {
  HOST: host({ default: '0.0.0.0' }),
  PORT: port({ default: 8080 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  // WEB
  WEB_APP_URL: url(),
  // DATABASE
  DATABASE_HOST: host(),
  DATABASE_PORT: port({ default: 5432 }),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
  DATABASE_SSL: bool(),
  // SESSION
  SESSION_SECRET: str(),
  SESSION_SALT: str(),
  // GOOGLE OAUTH2
  GOOGLE_OAUTH2_CLIENT_ID: str(),
  GOOGLE_OAUTH2_SECRET: str(),
})

export default env
