import awsLambdaFastify from '@fastify/aws-lambda'

import fastify from '@/index'

// Export a handler function for AWS Lambda, using the awsLambdaFastify wrapper on the Fastify instance.
// This handler becomes the entry point for AWS Lambda to execute the Fastify application in response to events,
// such as HTTP requests. The awsLambdaFastify function converts Lambda's event format to a Fastify request
// and translates Fastify's response back to a Lambda-compatible response.
export const handler = awsLambdaFastify(fastify)
