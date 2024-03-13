import { v4 as uuidv4 } from "uuid";
import verify from '../middleware/verify.js';

import { login, register, profile } from '../controllers/authenticationController.js'

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
    },
  },
  login
  );

  fastify.post(
    '/register',
    {
      schema: {
        description: 'This For Register',
        tags: ['user'],
        body: {
          type: 'object',
          required: ['name', 'username', 'password', 'email'],
          properties: {
            uuid: { type: 'string', format: 'uuid', nullable: true, default: uuidv4()},
            name: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
            image: { type: 'string' },
            created_at: { type: 'string', format: 'date-time', nullable: true, default: new Date()},
            updated_at: { type: 'string', format: 'date-time', nullable: true, default: new Date()},
            is_active: { type: 'boolean', nullable: true, default: true},
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
                  uuid: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  username: { type: 'string' },
                  password: { type: 'string' },
                  email: { type: 'string' },
                  image: { type: 'string'},
                  created_at: { type: 'string'},
                  updated_at: { type: 'string'},
                }
              }
            }
          },
        },
        security: [
          {
            "Bearer": []
          }
        ],
      },
      preValidation: verify
    },
    register
  )

  fastify.get(
    '/profile',
    {
      schema: {
        description: 'This For Profile',
        tags: ['user'],
        response: {
          default: {
            type: 'object',
            properties: {
              code: { type: 'number' },
              message: { type: 'string' },
              data: { 
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  username: { type: 'string' },
                  password: { type: 'string' },
                  email: { type: 'string' },
                  image: { type: 'string' },
                  created_at: { type: 'string'},
                  updated_at: { type: 'string'},
                }
              }
            }
          },
        },
        security: [
          {
            "Bearer": []
          }
        ],
      },
      preValidation: verify
    },
    profile
  )
  done()
}