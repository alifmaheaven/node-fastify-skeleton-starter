import { config } from "dotenv";
config();

import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/database.js";
import response from "../utils/response.js";

const createData = async (request, reply) => {
  try {
    response.ok("Create data success!", {}, reply);
  } catch (error) {
    console.log('Create data error', error);
    response.bad("Create data error!", {
      [error.column]: error.message
    }, reply);
  }
};
  

export { createData };
