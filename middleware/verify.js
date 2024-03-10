import { config } from 'dotenv';
config();

import jwt from 'jsonwebtoken';
import response from '../utils/response.js';

const SCREET_KEY = process.env.SCREET_KEY;

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, SCREET_KEY, (err, authData) => {
      if (err) {
        response.unauthorized("Session Expired", null, res);
      } else {
        next();
      }
    });
  } else {
    response.unauthorized("Authorization not found", null, res);
  }
};

export default verifyToken;
