const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local file not found at:', envPath);
    return;
  }
  
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    let value = parts.slice(1).join('=').trim();
    
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1);
    }
    
    process.env[key] = value;
  });
}

loadEnv();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'company_db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
};

console.log('--- DB Connection Info ---');
console.log('Host:', config.host);
console.log('User:', config.user);
console.log('Database:', config.database);
console.log('Port:', config.port);
console.log('--------------------------');

async function testConnection() {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Successfully connected to the database!');
    
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('Tables in database:', rows.map(r => Object.values(r)[0]));
    
    await connection.end();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();
