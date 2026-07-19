import { executeQuery } from "@/lib/db";

export const userService = {
  // Get all users
  async getAllUsers() {
    return await executeQuery(
      "SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC"
    );
  },

  // Get user by ID
  async getUserById(id) {
    const results = await executeQuery(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return results[0] || null;
  },

  // Get user by Email
  async getUserByEmail(email) {
    const results = await executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return results[0] || null;
  },

  // Create new user
  async createUser({ name, email, passwordHash, role = "user" }) {
    const result = await executeQuery(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, email, passwordHash, role]
    );
    return { id: result.insertId, name, email, role };
  },

  // Update user
  async updateUser(id, { name, email, role }) {
    await executeQuery(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, id]
    );
    return { id, name, email, role };
  },

  // Update user password
  async updatePassword(id, passwordHash) {
    return await executeQuery(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [passwordHash, id]
    );
  },

  // Delete user
  async deleteUser(id) {
    return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
  }
};
