import mysql from "mysql2/promise";

let pool;

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "localhost",
      user: process.env.DB_USER ?? "root",
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME ?? "gtnew",
      port: parseInt(process.env.DB_PORT ?? "3306", 10),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;

}

export async function executeQuery(query, params = []) {
  const dbPool = getDbPool();
  try {
    const [results] = await dbPool.query(query, params);
    return results;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  }
}