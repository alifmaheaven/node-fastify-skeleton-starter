import { config } from 'dotenv';
config();

import jwt from 'jsonwebtoken';
import response from '../utils/response.js';

const verifyToken = async (request, reply, next) => {
  const bearerHeader = request.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    request.token = bearerToken;
    await jwt.verify(request.token, process.env.SCREET_KEY, async (err, auth_data) => {
      if (err) {
        response.unauthorized("Session Expired", null, reply);
      } else {
        // asign data to request
        request.auth_data = await auth_data;
        next();
      }
    });
  } else {
    response.unauthorized("Authorization not found", null, reply);
  }
};

export default verifyToken;
