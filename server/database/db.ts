import { createPool } from "mariadb";
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5
});
export async function executeQuery(query: any, params: any = []) {
  let connection: any;
  try {
    connection = await pool.getConnection();
    let result = await connection.query(query, params);
    return result;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
