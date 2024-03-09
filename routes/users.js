// -start- for validation
import yup from 'yup'
import validator from '../config/validator.js'
// -end-

import verify from '../middleware/verify.js';

import { login, getData } from '../controllers/usersController.js'

export default function (fastify, opts, done) {
  fastify.post(
  '/login', 
  validator(
    {
      body: yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      })
    }
  ),
  verify,
  login
  );

  fastify.get('/', getData)
  done()
}