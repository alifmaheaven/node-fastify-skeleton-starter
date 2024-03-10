import { config } from 'dotenv'
config()

// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

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

// fastify.setErrorHandler((error, request, reply) => {
//   response.bad(
//     error.message, 
//     error.inner.reduce((obj, { path, message }) => ({ ...obj, [path]: message }), {}), 
//     reply
//   );
// })

// declare config
// security
await fastify.register(cors, { 
  // put your options here
  origin: '*',
})

// documentation
await fastify.register(swagger,{
  swagger: {
    info: {
      title: 'Documentation API',
      description: 'Compleated API Documentation with auto generated swagger documentation',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    schemes: ['http', 'https'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' }
    ],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345'
      }
    }
  }
})
await fastify.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject},
  transformSpecificationClone: true
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