const mysql = require("mysql2/promise");

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "@Fullu89",
      database: "company_db",
      port: 3306
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
