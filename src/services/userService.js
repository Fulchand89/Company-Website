import { executeQuery } from "@/lib/db";

/**
 * User Management Service for Hostinger MySQL Database
 * 
 * Features:
 * - Queries Hostinger MySQL database using mysql2/promise connection pool.
 * - Safely verifies users table using CREATE TABLE IF NOT EXISTS.
 * - Dynamically adapts to existing user tables without data loss.
 * - Supports full CRUD operations (Create, Read, Update, Delete) for admin/user accounts.
 */

let schemaChecked = false;

// Ensure users table and required columns exist
export async function ensureUsersSchema() {
  if (schemaChecked) return;
  try {
    // 1. Create table if missing
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_users_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Safely add missing columns for pre-existing databases
    const cols = await executeQuery("SHOW COLUMNS FROM users");
    const existingColNames = cols.map(c => c.Field.toLowerCase());

    if (!existingColNames.includes("password_hash")) {
      if (existingColNames.includes("password")) {
        await executeQuery("ALTER TABLE users CHANGE COLUMN password password_hash VARCHAR(255) NOT NULL");
      } else {
        await executeQuery("ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL AFTER email");
      }
    }

    if (!existingColNames.includes("role")) {
      await executeQuery("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user' AFTER password_hash");
    }

    if (!existingColNames.includes("created_at")) {
      await executeQuery("ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER role");
    }

    if (!existingColNames.includes("updated_at")) {
      await executeQuery("ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at");
    }

    schemaChecked = true;
  } catch (err) {
    console.error("Users schema verification warning:", err);
  }
}

export const userService = {
  // Get all users
  async getAllUsers() {
    await ensureUsersSchema();
    return await executeQuery(
      "SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC"
    );
  },

  // Get user by ID
  async getUserById(id) {
    await ensureUsersSchema();
    const results = await executeQuery(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return results[0] || null;
  },

  // Get user by Email
  async getUserByEmail(email) {
    await ensureUsersSchema();
    const results = await executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email.toLowerCase().trim()]
    );
    return results[0] || null;
  },

  // Create new user
  async createUser({ name, email, passwordHash, role = "user" }) {
    await ensureUsersSchema();
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    
    const result = await executeQuery(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [cleanName, cleanEmail, passwordHash, role]
    );
    return { id: result.insertId, name: cleanName, email: cleanEmail, role };
  },

  // Update user
  async updateUser(id, { name, email, role }) {
    await ensureUsersSchema();
    const cleanEmail = email ? email.toLowerCase().trim() : undefined;
    const cleanName = name ? name.trim() : undefined;
    
    await executeQuery(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [cleanName, cleanEmail, role, id]
    );
    return { id, name: cleanName, email: cleanEmail, role };
  },

  // Update user password
  async updatePassword(id, passwordHash) {
    await ensureUsersSchema();
    return await executeQuery(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [passwordHash, id]
    );
  },

  // Delete user
  async deleteUser(id) {
    await ensureUsersSchema();
    return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
  }
};
