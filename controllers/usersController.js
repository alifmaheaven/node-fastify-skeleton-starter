import { config } from 'dotenv';
config();

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { pool } from '../config/database.js';

import response from '../utils/response.js';

const login = async (request, reply) => {
  const { username, password } = request.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  
  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, process.env.SCREET_KEY, { expiresIn: process.env.EXPIRED_TOKEN });
        response.ok('Login success', { token: token }, reply);
      } else {
        response.bad('Password wrong!', {password: 'Password wrong!'}, reply);
      }
    } else {
      response.bad('Username not found!', { username: 'Username not found!' }, reply);
    }
  } catch (error) {
    response.bad('Error', error, reply);
  }
}

const getData = async(request, reply) => {
  response.ok('Data already to you', {id: uuidv4()}, reply);
}

export { login, getData }