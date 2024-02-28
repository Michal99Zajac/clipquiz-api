import awsLambdaFastify from '@fastify/aws-lambda'
import Fastify from 'fastify'

import app from '@/app'

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
})

// Register your application a normal plugin.
fastify.register(app)

export const handler = awsLambdaFastify(fastify)
