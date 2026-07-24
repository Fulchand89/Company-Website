import { executeQuery } from "@/lib/db";

/**
 * Job Application Service for Hostinger MySQL Database
 * 
 * Features:
 * - Uses mysql2/promise reusable connection pool via executeQuery from @/lib/db.
 * - Safely verifies applications table using CREATE TABLE IF NOT EXISTS.
 * - Automatically checks existing columns without dropping or modifying data.
 * - Supports complete CRUD operations (Create, Read, Update, Delete) for career applications.
 */

let schemaChecked = false;

// Ensure applications table exists dynamically
export async function ensureApplicationsSchema() {
  if (schemaChecked) return;
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        position VARCHAR(255) NOT NULL,
        resume_url VARCHAR(555) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_applications_position (position),
        INDEX idx_applications_status (status),
        INDEX idx_applications_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Safely add missing status column if application table existed without it
    const cols = await executeQuery("SHOW COLUMNS FROM applications");
    const existingColNames = cols.map(c => c.Field.toLowerCase());
    if (!existingColNames.includes("status")) {
      await executeQuery("ALTER TABLE applications ADD COLUMN status VARCHAR(50) DEFAULT 'Pending' AFTER resume_url");
    }

    schemaChecked = true;
  } catch (err) {
    console.error("Applications schema auto-verification failed:", err);
  }
}

export const applicationService = {
  // Submit new application
  async createApplication({ name, email, phone, position, resumeUrl }) {
    await ensureApplicationsSchema();
    const result = await executeQuery(
      "INSERT INTO applications (name, email, phone, position, resume_url) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, position, resumeUrl]
    );
    return { id: result.insertId, name, email, phone, position, resumeUrl };
  },

  // Get all applications
  async getAllApplications() {
    await ensureApplicationsSchema();
    return await executeQuery(
      "SELECT id, name, email, phone, position, resume_url, status, created_at FROM applications ORDER BY created_at DESC"
    );
  },

  // Get paginated applications with search, filtering, and sorting
  async getPaginatedApplications(optionsOrPage = 1, limit = 10) {
    await ensureApplicationsSchema();
    let page = 1;
    let search = "";
    let position = "";
    let status = "";
    let dateFrom = "";
    let dateTo = "";
    let sort = "latest";

    // Handle backwards compatibility for page, limit signature
    if (typeof optionsOrPage === "object") {
      page = optionsOrPage.page || 1;
      limit = optionsOrPage.limit || 10;
      search = optionsOrPage.search || "";
      position = optionsOrPage.position || "";
      status = optionsOrPage.status || "";
      dateFrom = optionsOrPage.dateFrom || "";
      dateTo = optionsOrPage.dateTo || "";
      sort = optionsOrPage.sort || "latest";
    } else {
      page = optionsOrPage;
    }

    const offset = (page - 1) * limit;
    let whereClauses = [];
    let params = [];

    // Search filter (Name, Email, Phone)
    if (search && search.trim() !== "") {
      whereClauses.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)");
      const searchWildcard = `%${search.trim()}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard);
    }

    // Position filter
    if (position && position.trim() !== "") {
      whereClauses.push("position = ?");
      params.push(position.trim());
    }

    // Status filter
    if (status && status.trim() !== "") {
      whereClauses.push("status = ?");
      params.push(status.trim());
    }

    // Date range filter
    if (dateFrom) {
      whereClauses.push("created_at >= ?");
      params.push(`${dateFrom} 00:00:00`);
    }
    if (dateTo) {
      whereClauses.push("created_at <= ?");
      params.push(`${dateTo} 23:59:59`);
    }

    const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    // Count query
    const countQuery = `SELECT COUNT(*) as count FROM applications ${whereSql}`;
    const [countResult] = await executeQuery(countQuery, params);
    const total = countResult?.count || 0;

    // Sorting order
    let orderSql = "ORDER BY created_at DESC";
    if (sort === "oldest") {
      orderSql = "ORDER BY created_at ASC";
    } else if (sort === "name-asc") {
      orderSql = "ORDER BY name ASC";
    } else if (sort === "name-desc") {
      orderSql = "ORDER BY name DESC";
    }

    // Data query
    const dataQuery = `SELECT id, name, email, phone, position, resume_url, status, created_at FROM applications ${whereSql} ${orderSql} LIMIT ? OFFSET ?`;
    const dataParams = [...params, parseInt(limit, 10), parseInt(offset, 10)];
    const data = await executeQuery(dataQuery, dataParams);

    const totalPages = Math.ceil(total / limit);
    return { data, pagination: { total, page, limit, totalPages } };
  },

  // Get dynamic unique positions applied for
  async getUniquePositions() {
    await ensureApplicationsSchema();
    const results = await executeQuery("SELECT DISTINCT position FROM applications WHERE position IS NOT NULL AND position != '' ORDER BY position ASC");
    return results.map(r => r.position);
  },

  // Update application status
  async updateApplicationStatus(id, status) {
    await ensureApplicationsSchema();
    return await executeQuery("UPDATE applications SET status = ? WHERE id = ?", [status, id]);
  },

  // Delete application
  async deleteApplication(id) {
    await ensureApplicationsSchema();
    return await executeQuery("DELETE FROM applications WHERE id = ?", [id]);
  }
};
