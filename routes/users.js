import verify from '../middleware/verify.js';

import { login, getData } from '../controllers/usersController.js'

export default function (fastify, opts, done) {
  // decorators here
  fastify.post(
  '/login', 
  {
    schema: {
      description: 'This For login',
      tags: ['user'],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        }
      },
      response: {
        default: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: { 
              type: 'object',
              properties: {
                username: { type: 'string' },
                password: { type: 'string' },
                token: { type: 'string' },
              }
            }
          }
        },
      },
      security: [
        {
          "Bearer": []
        }
      ]
    },
  },
  login
  );

  fastify.put('/',{}, verify, getData);
  
  done()
}