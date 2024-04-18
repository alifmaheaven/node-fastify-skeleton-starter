import { config } from 'dotenv'
config()

// Import the framework and instantiate it
import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';

// import routes
import authenticationRoute from './routes/authentication.js';
import crudRoute from './routes/crud.js';
import uploadRoute from './routes/upload.js';

const build = async (opts = {}) => {
  const app = Fastify(opts);

  // security
  await app.register(cors, { 
    // put your options here
    origin: '*',
  });

  // websocket
  await app.register(websocket, {
    options: { maxPayload: 1048576 }
  })

  // multipart
  await app.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 1000000, // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 1000000,  // For multipart forms, the max file size
      files: 1,           // Max number of file fields
      headerPairs: 2000   // Max number of header key=>value pairs
    }
  });

  // documentation
  await app.register(swagger,{
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
      consumes: ['application/json','multipart/form-data'],
      schemes: ['http', 'https'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'crud', description: 'CRUD related end-points' },
        { name: 'upload', description: 'Upload related end-points'}
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
  });
  await app.register(swaggerUI, {
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
  });

  // router
  await app.get('/', async function handler (request, reply) {
    return { message: "Hello World" }
  })
  await app.register(authenticationRoute, { prefix: '/api/v1/authentication' });
  await app.register(crudRoute, { prefix: '/api/v1/crud' });
  await app.register(uploadRoute, { prefix: '/api/v1/upload' });

  // return after definition
  return app;
};

export default build;