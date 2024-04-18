import verify from '../middleware/verify.js';
import { createData } from '../controllers/uploadController.js'

export default function (fastify, opts, done) {
  // decorators here

  fastify.post(
    '/',
    {
      schema: {
        description: 'This For login',
        tags: ['upload'],
        consumes: ['multipart/form-data'],
        body: {
          type: 'object',
          properties: {
            file: {
              type: "string",
              format: "binary",
            }
          },
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
                  url: { type: 'string' },
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
  
  done()
}