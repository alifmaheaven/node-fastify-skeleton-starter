import { config } from 'dotenv'
config()

// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'

import response from './config/response.js'


// import routes
import usersRoute from './routes/users.js'


// config

// variable
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';


const fastify = Fastify({
  // logger: true,
})

fastify.setErrorHandler((error, request, reply) => {
  response.bad(
    error.message, 
    error.inner.reduce((obj, { path, message }) => ({ ...obj, [path]: message }), {}), 
    reply
  );
})

// declare config
await fastify.register(cors, { 
  // put your options here
  origin: '*',
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})
fastify.register(usersRoute, { prefix: '/api/v1/users' })

// Run the server!
try {
  await fastify.listen({ port: port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}