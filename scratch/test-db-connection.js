import fs from "fs";
import path from "path";

// Helper to load environment variables for standalone Node.js script execution
function loadEnvironmentVariables() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, "utf-8");
      envConfig.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...valueParts] = trimmed.split("=");
          const val = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
          if (key && !process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      });
    }
  }
}

loadEnvironmentVariables();

import { getDbPool, executeQuery, testDbConnection } from "../src/lib/db.js";

async function runVerification() {
  const dbHost = process.env.DB_HOST || "srv1823.hstgr.io";
  const dbPort = process.env.DB_PORT || "3306";
  const dbName = process.env.DB_NAME || "u879279162_gtwwebsite";
  const dbUser = process.env.DB_USER || "u879279162_gtwwebsite";

  console.log("==========================================");
  console.log("Hostinger MySQL Database Connection Test");
  console.log("==========================================");
  console.log(`Target DB_HOST: ${dbHost}`);
  console.log(`Target DB_PORT: ${dbPort}`);
  console.log(`Target DB_NAME: ${dbName}`);
  console.log(`Target DB_USER: ${dbUser}`);
  console.log("==========================================");

  try {
    // Step 1: Test Pool Initialization & Ping
    console.log("\n[1/3] Testing database ping & pool creation...");
    const pingResult = await testDbConnection();
    console.log("Ping Result:", pingResult);

    if (!pingResult.success) {
      console.log("\n[Note] Database connection failed. Please ensure active Hostinger MySQL credentials in .env or .env.local.");
      process.exit(1);
    }

    // Step 2: Test Table Auto-Verification & Schema Check
    console.log("\n[2/3] Checking existing database tables...");
    const tables = await executeQuery("SHOW TABLES");
    console.log("Existing Tables:", tables);

    // Step 3: Test CRUD Operations on 'contacts' table
    console.log("\n[3/3] Testing CRUD Operations on contacts table...");
    
    // Ensure contacts table exists
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // CREATE
    const insertResult = await executeQuery(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      ["Test User", "test@example.com", "1234567890", "Connection Verification Test"]
    );
    const testId = insertResult.insertId;
    console.log(`- CREATE Success (Inserted ID: ${testId})`);

    // READ
    const rows = await executeQuery("SELECT * FROM contacts WHERE id = ?", [testId]);
    console.log(`- READ Success (Fetched row count: ${rows.length})`);

    // UPDATE
    await executeQuery("UPDATE contacts SET message = ? WHERE id = ?", ["Updated Test Message", testId]);
    console.log("- UPDATE Success");

    // DELETE
    await executeQuery("DELETE FROM contacts WHERE id = ?", [testId]);
    console.log("- DELETE Success");

    console.log("\nAll CRUD operations completed successfully!");
  } catch (error) {
    console.error("Verification encountered an error:", error.message);
  } finally {
    const pool = getDbPool();
    await pool.end();
    console.log("Database connection pool gracefully closed.");
  }
}

runVerification();
