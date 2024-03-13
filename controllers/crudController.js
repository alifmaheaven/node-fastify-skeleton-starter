import { config } from "dotenv";
config();

import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/database.js";
import response from "../utils/response.js";
import pagination from "../utils/pagination.js";

const getData = async (request, reply) => {
  const DB_NAME = "rooms";
  try {
    const result = await pagination(request, reply, DB_NAME, pool);
    console.log('result', result);
    response.ok("Successfuly get data!", result, reply);
  } catch (error) {
    console.log('Get data error', error);
    response.bad("Error", error, reply);
  }
};

const createData = async (request, reply) => {
  const DB_NAME = "rooms";
  // get only data inside head of table
  const fields = await pool.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(request.body).filter(([key, value]) => fields.fields.map(({name})=> name).includes(key) && value));
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    user_id: request.auth_data.uuid,
    room_code: Math.floor(100000 + Math.random() * 900000),
    uuid: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
  }
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `INSERT INTO ${DB_NAME} (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

  try {
    const result = await pool.query(query, values);
    response.ok("Create data success!", result.rows[0], reply);
  } catch (error) {
    console.log('Create data error', error);
    response.bad("Create data error!", {
      [error.column]: error.message
    }, reply);
  }
};

const updateData = async (request, reply) => {
  const DB_NAME = "rooms";
  const { uuid } = request.body;
  // get only data inside head of table
  const fields = await pool.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(request.body).filter(([key, value]) => fields.fields.map(({name})=> name).includes(key) && value));
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    updated_at: new Date(),
  }
  // delete uuid
  delete get_only_data_inside_head_of_table.uuid;
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `UPDATE ${DB_NAME} SET (${keys.join(', ')}) = (${placeholders.join(', ')}) WHERE uuid = $${keys.length + 1} RETURNING *`;

  try {
    const result = await pool.query(query, [...values, uuid]);
    return response.ok("Update data success!", result.rows[0], reply);
  } catch (error) {
    console.log('Update data error', error);
    return response.bad("Error", {
      [error.column]: error.message
    }, reply);
  }
}

const deleteData = async (request, reply) => {
  const DB_NAME = "rooms";
  const { uuid } = request.body;
  const query = `UPDATE ${DB_NAME} SET is_active = false WHERE uuid = $1 RETURNING *`;
  const values = [uuid];

  try {
    const result = await pool.query(query, values);
    response.ok("Delete data success!", result.rows[0], reply);
  } catch (error) {
    console.log('Delete data error', error);
    response.bad("Error", {
      [error.column]: error.message
    }, reply);
  }
}
  

export { getData, createData, updateData, deleteData };
