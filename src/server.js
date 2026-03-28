import 'dotenv/config';
import express from 'express';

import { db } from './config/db.js'
const app = express()
app.use(express.json());

const port = process.env.PORT;

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("DB connected successfully");
    connection.release();

    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    })
  } catch (err) {
    console.error("DB connection failed: ", err);
  }
})();