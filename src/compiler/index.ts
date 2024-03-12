import { StandaloneValidator } from '@fastify/ajv-compiler'
import { StandaloneSerializer } from '@fastify/fast-json-stringify-compiler'
import Fastify from 'fastify'
import fs from 'fs'
import path from 'path'

import app from '@/app'

import { generateFileName } from './helper'

const fastify = Fastify({
  jsonShorthand: false,
  schemaController: {
    compilersFactory: {
      buildValidator: StandaloneValidator({
        readMode: false,
        storeFunction(routeOpts, schemaValidationCode) {
          const fileName = generateFileName(routeOpts)
          const filePath = path.resolve(__dirname, '..', 'generated', fileName)

          fs.writeFileSync(filePath, schemaValidationCode)
        },
      }),
      buildSerializer: StandaloneSerializer({
        readMode: false,
        storeFunction(routeOpts, schemaSerializationCode) {
          const fileName = generateFileName(routeOpts)
          const filePath = path.resolve(__dirname, '..', 'generated', fileName)

          fs.writeFileSync(filePath, schemaSerializationCode)
        },
      }),
    },
  },
})

// Register the app
fastify.register(app)

// Compile the schemas
fastify.ready().then(() => {
  console.log('Compilation done!')
  fastify.close()
})
