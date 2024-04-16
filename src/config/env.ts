import { bool, cleanEnv, host, port, str } from 'envalid'

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
})

export default env
