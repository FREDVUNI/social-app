import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectTimeout: 10,
});
