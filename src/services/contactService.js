import { executeQuery } from "@/lib/db";

// Flag to prevent redundant database schema checks across requests
let schemaChecked = false;

/**
 * Automatically ensures that the 'contacts' table exists in Hostinger MySQL.
 * Uses CREATE TABLE IF NOT EXISTS to leave existing tables and data completely untouched.
 */
export async function ensureContactsSchema() {
  if (schemaChecked) return;
  try {
    // Execute DDL query using reusable database connection pool
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contacts_email (email),
        INDEX idx_contacts_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    schemaChecked = true;
  } catch (err) {
    console.error("Contacts schema auto-verification failed:", err);
  }
}

/**
 * Contact Service handling CRUD operations for contact submissions
 */
export const contactService = {
  // CREATE: Insert new contact form submission into MySQL
  async createContact({ name, email, phone, message }) {
    await ensureContactsSchema();
    const result = await executeQuery(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone || null, message]
    );
    return { id: result.insertId, name, email, phone, message };
  },

  // READ: Fetch all contact submissions sorted by creation date
  async getAllContacts() {
    await ensureContactsSchema();
    return await executeQuery(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
  },

  // READ: Get paginated contact submissions for admin management
  async getPaginatedContacts(page = 1, limit = 10) {
    await ensureContactsSchema();
    const offset = (page - 1) * limit;
    const [countResult] = await executeQuery("SELECT COUNT(*) as count FROM contacts");
    const total = countResult?.count || 0;
    const data = await executeQuery(
      "SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [parseInt(limit, 10), parseInt(offset, 10)]
    );
    const totalPages = Math.ceil(total / limit);
    return { data, pagination: { total, page, limit, totalPages } };
  },

  // DELETE: Remove contact submission by ID
  async deleteContact(id) {
    await ensureContactsSchema();
    return await executeQuery("DELETE FROM contacts WHERE id = ?", [id]);
  }
};
