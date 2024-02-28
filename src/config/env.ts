import { bool, cleanEnv, host, port, str } from 'envalid'

export const env = cleanEnv(process.env, {
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 8080 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  // DATABASE
  DATABASE_HOST: host({ default: 'localhost' }),
  DATABASE_PORT: port({ default: 5432 }),
  DATABASE_USERNAME: str({ default: 'postgres' }),
  DATABASE_PASSWORD: str({ default: 'postgres' }),
  DATABASE_NAME: str({ default: 'postgres' }),
  DATABASE_SSL: bool({ default: false }),
})

export default env
