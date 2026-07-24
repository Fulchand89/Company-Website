const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function loadEnv() {
  const files = [".env.local", ".env"];
  for (const file of files) {
    const envPath = path.join(__dirname, "..", file);
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, "utf-8");
      envConfig.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const parts = trimmed.split("=");
        const key = parts[0].trim();
        let value = parts.slice(1).join("=").trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      });
    }
  }
}

loadEnv();

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: (process.env.DB_HOST || "srv1823.hstgr.io").trim(),
      user: (process.env.DB_USER || "u879279162_gtwwebsite").trim(),
      password: (process.env.DB_PASSWORD || "Gtwwebsite@123").trim(),
      database: (process.env.DB_NAME || "u879279162_gtwwebsite").trim(),
      port: parseInt((process.env.DB_PORT || "3306").trim(), 10),
      connectTimeout: 15000,
    });

    // Check if status column already exists first
    const [columns] = await connection.query("SHOW COLUMNS FROM applications LIKE 'status'");
    if (columns.length === 0) {
      console.log("Adding 'status' column to 'applications' table...");
      await connection.query("ALTER TABLE applications ADD COLUMN status VARCHAR(50) DEFAULT 'New'");
      console.log("Column 'status' added successfully.");
    } else {
      console.log("'status' column already exists in 'applications' table.");
    }

    await connection.end();
  } catch (err) {
    console.error("Database connection or query failed:", err.message);
  }
}

main();
