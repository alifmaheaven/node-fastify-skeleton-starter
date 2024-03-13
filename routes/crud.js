import { v4 as uuidv4 } from "uuid";
import verify from '../middleware/verify.js';

import { getData, createData, updateData, deleteData } from '../controllers/crudController.js'

export default function (fastify, opts, done) {
  // decorators here

  fastify.get(
    '/',
    {
      schema: {
        description: 'This For login',
        tags: ['crud'],
        querystring: {
          type: 'object',
          properties: {
            '*_exact': { type: 'array' },
            '*_except': { type: 'array' },
            '*_contains': { type: 'array' },
            '*_icontains': { type: 'array' },
            '*_startswith': { type: 'array' },
            '*_istartswith': { type: 'array' },
            '*_endswith': { type: 'array' },
            '*_iendswith': { type: 'array' },
            '*_gt': { type: 'array' },
            '*_gte': { type: 'array' },
            '*_lt': { type: 'array' },
            '*_lte': { type: 'array' },
            order_by_asc: { type: 'array' },
            order_by_desc: { type: 'array' },
            page: { type: 'number', default: 1 },
            per_page: { type: 'number', default: 10 },
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
                  meta: { 
                    type: 'object', 
                    properties: {
                      page: { type: 'number' },
                      per_page: { type: 'number' },
                      total: { type: 'number' },
                      total_pages: { type: 'number' },
                    }
                  },
                  data: { type: 'array' },
                },
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
      preValidation: verify,
    },
    getData
  );

  fastify.post(
    '/',
    {
      schema: {
        description: 'This For login',
        tags: ['crud'],
        body: {
          type: 'object',
          required: ['name', 'description', 'media'],
          properties: {
            // uuid: { type: 'string', format: 'uuid', nullable: true, default: uuidv4()},
            name: { type: 'string' },
            description: { type: 'string' },
            media: { type: 'string', nullable: false, default: null},
            // created_at: { type: 'string', format: 'date-time', nullable: true, default: new Date()},
            // updated_at: { type: 'string', format: 'date-time', nullable: true, default: new Date()},
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
                properties:{
                  uuid: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  media: { type: 'string', nullable: true,},
                  created_at: { type: 'string', format: 'date-time'},
                  updated_at: { type: 'string', format: 'date-time'},
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
      preValidation: verify,
    },
    createData
  );

  fastify.put(
    '/',
    {
      schema: {
        description: 'This For login',
        tags: ['crud'],
        required: ['uuid'],
        body: {
          type: 'object',
          properties: {
            uuid: { type: 'string', format: 'uuid'},
            name: { type: 'string' },
            description: { type: 'string' },
            media: { type: 'string', nullable: true,},
            updated_at: { type: 'string', format: 'date-time'},
            is_active: { type: 'boolean', nullable: true},
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
                properties:{
                  uuid: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  description: { type: 'string' },
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
    updateData
  )

  fastify.delete(
    '/',
    {
      schema: {
        description: 'This For login',
        tags: ['crud'],
        required: ['uuid'],
        body: {
          type: 'object',
          properties: {
            uuid: { type: 'string', format: 'uuid'},
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
                properties:{
                  uuid: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  description: { type: 'string' },
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
      preValidation: verify,
    },
    deleteData
  )

  fastify.get(
    '/socket', 
    verify,
    { 
      websocket: true
    },
    (connection, request) => {
      connection.socket.on('message', async (message) => {
        // const session = await sessionPromise()
        // do something with the message and session
        connection.socket.send( JSON.stringify({ message: "Hello World" }));
      })
      connection.socket.on('close', () => {
        // the connection was closed
        console.log('close');
      })
    }
  )
  
  done()
}