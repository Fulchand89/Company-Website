import mysql from "mysql2/promise";

/**
 * Hostinger MySQL Database Connection Module
 * 
 * Features:
 * - Uses mysql2/promise for async/await database operations.
 * - Reuses a single connection pool across requests.
 * - Caches pool instance globally in development to prevent duplication during Next.js Hot Module Replacement (HMR).
 * - Reads all connection parameters strictly from process.env with Hostinger defaults.
 * - Trims and cleans environment variable inputs.
 * - Provides connection logging (Host, Port, Database, User) without exposing password.
 * - Graceful error handling and query execution helper.
 */

// Global pool reference for development caching
let pool;

/**
 * Returns or initializes the singleton MySQL connection pool.
 * Uses environment variables configured in .env / .env.local with Hostinger defaults.
 */
export function getDbPool() {
  if (!pool) {
    const rawHost = process.env.DB_HOST || "srv1823.hstgr.io";
    const rawPort = process.env.DB_PORT || "3306";
    const rawDatabase = process.env.DB_NAME || "u879279162_gtwwebsite";
    const rawUser = process.env.DB_USER || "u879279162_gtwwebsite";
    const rawPassword = process.env.DB_PASSWORD || "Gtwwebsite@123";

    // Clean and trim environment values to prevent quotation or space issues
    const host = rawHost.trim().replace(/^['"]|['"]$/g, "");
    const port = parseInt(rawPort.toString().trim(), 10) || 3306;
    const database = rawDatabase.trim().replace(/^['"]|['"]$/g, "");
    const user = rawUser.trim().replace(/^['"]|['"]$/g, "");
    const password = rawPassword.trim().replace(/^['"]|['"]$/g, "");

    // Configuration object for Hostinger MySQL connection pool
    const poolConfig = {
      host,
      port,
      database,
      user,
      password,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 15000, // 15s connection timeout for remote databases
    };

    // Connection logging (Host, Port, Database, User) without exposing password
    console.log("[MySQL Pool] Initializing Hostinger Database Connection Pool:");
    console.log(`  - Host: ${poolConfig.host}`);
    console.log(`  - Port: ${poolConfig.port}`);
    console.log(`  - Database: ${poolConfig.database}`);
    console.log(`  - User: ${poolConfig.user}`);

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
    return { success: true, message: "Hostinger Database connection established successfully." };
  } catch (error) {
    console.error("Database Connection Test Failed:", error.message);
    return { success: false, message: error.message };
  }
}