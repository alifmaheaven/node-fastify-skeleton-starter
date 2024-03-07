import { config } from 'dotenv'
config()

// Import the framework and instantiate it
import Fastify from 'fastify'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'


// config

// variable
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';


const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}