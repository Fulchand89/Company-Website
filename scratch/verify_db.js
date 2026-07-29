const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Read env variables manually
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

async function run() {
  const config = {
    host: env.DB_HOST || 'srv1823.hstgr.io',
    port: parseInt(env.DB_PORT || '3306', 10),
    database: env.DB_NAME || 'u879279162_gtwwebsite',
    user: env.DB_USER || 'u879279162_gtwwebsite',
    password: env.DB_PASSWORD || 'Gtwwebsite@123',
    connectTimeout: 10000
  };

  console.log('Connecting to Hostinger MySQL Database:', {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user
  });

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('Success! Established connection to database.');

    const [tables] = await connection.query('SHOW TABLES');
    console.log('\nExisting Tables:');
    tables.forEach(row => {
      console.log(` - ${Object.values(row)[0]}`);
    });

  } catch (error) {
    console.error('Database connection / verification failed:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

run();
