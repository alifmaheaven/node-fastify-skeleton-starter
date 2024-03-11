import { config } from "dotenv";
config();

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../config/database.js";

import response from "../utils/response.js";

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
        const token = jwt.sign({ uuid: user.uuid }, process.env.SCREET_KEY, {
          expiresIn: parseInt(process.env.EXPIRED_TOKEN),
        });
        response.ok("Login success", { token: token }, reply);
      } else {
        response.bad("Password wrong!", { password: "Password wrong!" }, reply);
      }
    } else {
      response.bad(
        "Username not found!",
        { username: "Username not found!" },
        reply
      );
    }
  } catch (error) {
    response.bad("Error", error, reply);
  }
};
const register = async (request, reply) => {
  // get only data inside head of table
  const fields = await pool.query(`SELECT * FROM users WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(request.body).filter(([key]) => fields.fields.map(({name})=> name).includes(key)));
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    uuid: uuidv4(),
    password: await bcrypt.hash(get_only_data_inside_head_of_table.password, 8),
  }
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `INSERT INTO users (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

  try {
    const result = await pool.query(query, values);

    response.ok("Register success", result.rows[0], reply);
  } catch (error) {
    console.log('error Register Users',error);
    response.bad("Error", error, reply);
  }
};

const profile = async (request, reply) => {
  const { uuid } = request.auth_data;
  const query = `SELECT * FROM users WHERE uuid = $1`;
  const values = [uuid];

  try {
    const result = await pool.query(query, values);
    response.ok("Profile", result.rows[0], reply);
  } catch (error) {
    response.bad("Error", error, reply);
  }
};

const logout = async (request, reply) => {
  response.ok("Logout success", null, reply);
}

const getData = async (request, reply) => {
  response.ok("Data already to you", { id: uuidv4() }, reply);
};

export { login, register, profile, getData };
