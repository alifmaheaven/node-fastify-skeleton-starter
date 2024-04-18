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
            name: { type: 'string' },
            thumb_url: { isFileType: true },
            img_url: { isFileType: true },
            status: {
              type: 'number',
              enum: [0, 1],
              default: 1
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