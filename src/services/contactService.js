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

    // Dynamically add 'service' column if it does not exist
    try {
      await executeQuery("ALTER TABLE contacts ADD COLUMN service VARCHAR(255) DEFAULT NULL");
      console.log("Added 'service' column to contacts table.");
    } catch (err) {
      if (!err.message.includes("Duplicate column name")) {
        console.warn("Could not add 'service' column:", err.message);
      }
    }

    // Dynamically add 'details' column if it does not exist
    try {
      await executeQuery("ALTER TABLE contacts ADD COLUMN details TEXT DEFAULT NULL");
      console.log("Added 'details' column to contacts table.");
    } catch (err) {
      if (!err.message.includes("Duplicate column name")) {
        console.warn("Could not add 'details' column:", err.message);
      }
    }

    // Dynamically add 'status' column if it does not exist
    try {
      await executeQuery(
        "ALTER TABLE contacts ADD COLUMN status ENUM('New','In Review','Approved','Rejected','Completed') NOT NULL DEFAULT 'New'"
      );
      console.log("Added 'status' column to contacts table.");
    } catch (err) {
      if (!err.message.includes("Duplicate column name")) {
        console.warn("Could not add 'status' column:", err.message);
      }
    }

    // Dynamically add 'is_read' column if it does not exist
    try {
      await executeQuery(
        "ALTER TABLE contacts ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0"
      );
      console.log("Added 'is_read' column to contacts table.");
    } catch (err) {
      if (!err.message.includes("Duplicate column name")) {
        console.warn("Could not add 'is_read' column:", err.message);
      }
    }

    // Dynamically add 'admin_notes' column if it does not exist
    try {
      await executeQuery("ALTER TABLE contacts ADD COLUMN admin_notes TEXT DEFAULT NULL");
      console.log("Added 'admin_notes' column to contacts table.");
    } catch (err) {
      if (!err.message.includes("Duplicate column name")) {
        console.warn("Could not add 'admin_notes' column:", err.message);
      }
    }

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
  async createContact({ name, email, phone, message, service, details }) {
    await ensureContactsSchema();
    const result = await executeQuery(
      "INSERT INTO contacts (name, email, phone, message, service, details, status, is_read) VALUES (?, ?, ?, ?, ?, ?, 'New', 0)",
      [name, email, phone || null, message, service || null, details || null]
    );
    return { id: result.insertId, name, email, phone, message, service, details, status: "New", is_read: 0 };
  },

  // READ: Fetch all contact submissions sorted by creation date
  async getAllContacts() {
    await ensureContactsSchema();
    return await executeQuery(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
  },

  // READ: Get paginated contact submissions for admin management, with optional status filter
  async getPaginatedContacts(page = 1, limit = 10, status = null) {
    await ensureContactsSchema();
    const offset = (page - 1) * limit;

    let countSql = "SELECT COUNT(*) as count FROM contacts";
    let dataSql = "SELECT * FROM contacts";
    const params = [];
    const countParams = [];

    if (status && status !== "All") {
      countSql += " WHERE status = ?";
      dataSql += " WHERE status = ?";
      countParams.push(status);
      params.push(status);
    }

    dataSql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [countResult] = await executeQuery(countSql, countParams);
    const total = countResult?.count || 0;
    const data = await executeQuery(dataSql, params);
    const totalPages = Math.ceil(total / limit);
    return { data, pagination: { total, page, limit, totalPages } };
  },

  // UPDATE: Update status and/or admin_notes for a contact
  async updateContact(id, { status, is_read, admin_notes }) {
    await ensureContactsSchema();
    const fields = [];
    const values = [];

    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }
    if (is_read !== undefined) {
      fields.push("is_read = ?");
      values.push(is_read ? 1 : 0);
    }
    if (admin_notes !== undefined) {
      fields.push("admin_notes = ?");
      values.push(admin_notes);
    }

    if (fields.length === 0) return null;

    values.push(id);
    return await executeQuery(
      `UPDATE contacts SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  },

  // DELETE: Remove contact submission by ID
  async deleteContact(id) {
    await ensureContactsSchema();
    return await executeQuery("DELETE FROM contacts WHERE id = ?", [id]);
  },
};
