import mysql from "mysql2/promise";

/**
 * Hostinger MySQL Database Connection Module
 * 
 * Requirements:
 * - Uses mysql2/promise for async/await database operations.
 * - Reuses a single connection pool across requests.
 * - Caches pool instance globally in development to prevent duplication during Next.js Hot Module Replacement (HMR).
 * - Reads all connection parameters strictly from process.env (.env.local).
 * - Provides graceful error handling and query execution helper.
 */

// Global pool reference for development caching
let pool;

/**
 * Returns or initializes the singleton MySQL connection pool.
 * Uses environment variables configured in .env.local.
 */
export function getDbPool() {
  if (!pool) {
    // Configuration object reading credentials from environment variables
    const poolConfig = {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306", 10),
      database: process.env.DB_NAME || "u879279162_gtwwebsite",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 10000, // 10s connection timeout for remote databases
    };

    if (process.env.NODE_ENV === "production") {
      // Direct pool initialization in production
      pool = mysql.createPool(poolConfig);
    } else {
      // In development mode, cache the pool on globalThis to survive Next.js HMR reloads
      if (!globalThis._mysqlPool) {
        globalThis._mysqlPool = mysql.createPool(poolConfig);
      }
      pool = globalThis._mysqlPool;
    }
  }

  return pool;
}

/**
 * Reusable helper to execute SQL queries with parameter binding.
 * Handles pool retrieval, query execution, error logging, and error handling gracefully.
 * 
 * @param {string} query - The SQL query to execute with ? placeholders.
 * @param {Array} params - Array of parameters to safely bind to the query.
 * @returns {Promise<any>} The results returned by the database query.
 */
export async function executeQuery(query, params = []) {
  try {
    const dbPool = getDbPool();
    // Execute query via connection pool
    const [results] = await dbPool.query(query, params);
    return results;
  } catch (error) {
    // Log query execution error with contextual information
    console.error("Database Query Execution Error:", {
      message: error.message,
      code: error.code,
      sqlState: error.sqlState,
      query,
    });
    
    // Gracefully handle or re-throw error for upstream service handling
    throw error;
  }
}

/**
 * Verification helper to test connection status to Hostinger MySQL.
 * 
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function testDbConnection() {
  try {
    const dbPool = getDbPool();
    const connection = await dbPool.getConnection();
    await connection.ping();
    connection.release();
    return { success: true, message: "Database connection established successfully." };
  } catch (error) {
    console.error("Database Connection Test Failed:", error.message);
    return { success: false, message: error.message };
  }
}