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

    const [rows] = await connection.query("DESCRIBE applications");
    console.log("COLUMNS:", JSON.stringify(rows, null, 2));
    await connection.end();
  } catch (err) {
    console.error("Database connection or query failed:", err.message);
  }
}
main();
