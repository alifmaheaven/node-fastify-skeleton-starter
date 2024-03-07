import { config } from 'dotenv'
config()

// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'


// config

// variable
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';


const fastify = Fastify({
  logger: true
})

// declare config
await fastify.register(cors, { 
  // put your options here
  origin: '*',
})

// Declare a route
// fastify.get('/', async function handler (request, reply) {
//   return { hello: 'world' }
// })

// Run the server!
try {
  await fastify.listen({ port: port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}