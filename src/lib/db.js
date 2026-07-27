import mysql from "mysql2/promise";
import dns from "dns";

// Force Node.js DNS resolver to prefer IPv4 over IPv6 to prevent remote MySQL connection timeouts (ETIMEDOUT) on dual-stack hosts.
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

/**
 * Hostinger MySQL Database Connection Module
 * 
 * Features:
 * - Uses mysql2/promise for async/await database operations.
 * - Reuses a single connection pool across requests.
 * - Caches pool instance globally in development to prevent duplication during Next.js Hot Module Replacement (HMR).
 * - Reads all connection parameters strictly from process.env with Hostinger defaults.
 * - Enforces remote Hostinger database host (overriding any legacy localhost/127.0.0.1 values).
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
    let host = rawHost.trim().replace(/^['"]|['"]$/g, "");
    const port = parseInt(rawPort.toString().trim(), 10) || 3306;
    let database = rawDatabase.trim().replace(/^['"]|['"]$/g, "");
    let user = rawUser.trim().replace(/^['"]|['"]$/g, "");
    const password = rawPassword.trim().replace(/^['"]|['"]$/g, "");

    // STRICT GUARD: Force remote Hostinger DB host if localhost/127.0.0.1 is passed or empty
    if (!host || host === "localhost" || host === "127.0.0.1" || host === "::1") {
      console.warn(`[MySQL Pool Warning] Invalid host '${host}' detected. Overriding with Hostinger server 'srv1823.hstgr.io'.`);
      host = "srv1823.hstgr.io";
    }

    if (!user || user === "root") {
      user = "u879279162_gtwwebsite";
    }

    if (!database || database === "company_db" || database === "gtnew") {
      database = "u879279162_gtwwebsite";
    }

    // Configuration object for Hostinger MySQL connection pool (optimized for serverless & remote latency)
    const poolConfig = {
      host,
      port,
      database,
      user,
      password,
      waitForConnections: true,
      connectionLimit: 4, // Keep pool small for serverless lambda instances
      maxIdle: 4,
      idleTimeout: 30000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 5000, // 5s connection timeout for remote databases
    };

    // Connection logging (Host, Port, Database, User) without exposing password
    console.log("[MySQL Pool] Initializing Hostinger Database Connection Pool:");
    console.log(`  - Host: ${poolConfig.host}`);
    console.log(`  - Port: ${poolConfig.port}`);
    console.log(`  - Database: ${poolConfig.database}`);
    console.log(`  - User: ${poolConfig.user}`);

    // Cache the pool globally across both production lambdas and dev HMR to reuse TCP connections
    if (!globalThis._mysqlPool) {
      globalThis._mysqlPool = mysql.createPool(poolConfig);
    }
    pool = globalThis._mysqlPool;
  }

  return pool;
}

/**
 * Reusable helper to execute SQL queries with parameter binding.
 * Includes a 5-second execution timeout guard so remote DB latency doesn't hang the website.
 * 
 * @param {string} query - The SQL query to execute with ? placeholders.
 * @param {Array} params - Array of parameters to safely bind to the query.
 * @param {number} timeoutMs - Max execution time before failing fast (default 5000ms).
 * @returns {Promise<any>} The results returned by the database query.
 */
export async function executeQuery(query, params = [], timeoutMs = 5000) {
  try {
    const dbPool = getDbPool();
    
    // Execute query with timeout protection for remote latency
    const queryPromise = dbPool.query(query, params).then(([results]) => results);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Database query timed out after ${timeoutMs}ms`)), timeoutMs)
    );

    return await Promise.race([queryPromise, timeoutPromise]);
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