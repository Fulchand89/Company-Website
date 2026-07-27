import { executeQuery } from "@/lib/db";

/**
 * Job Service for Hostinger MySQL Database
 * 
 * Features:
 * - Uses mysql2/promise connection pool via executeQuery from @/lib/db.
 * - Safely verifies jobs table using CREATE TABLE IF NOT EXISTS.
 * - Preserves pre-existing job listings and schema structures.
 * - Supports full CRUD operations (Create, Read, Update, Delete) for career openings.
 */

let schemaChecked = false;

// Ensure jobs table exists dynamically
export async function ensureJobsSchema() {
  if (schemaChecked) return;
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        experience VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_jobs_department (department),
        INDEX idx_jobs_location (location)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    schemaChecked = true;
  } catch (err) {
    console.error("Jobs schema auto-verification failed:", err);
  }
}

export const jobService = {
  // Get all job listings
  async getAllJobs() {
    try {
      return await executeQuery("SELECT * FROM jobs ORDER BY created_at DESC");
    } catch (err) {
      await ensureJobsSchema();
      return await executeQuery("SELECT * FROM jobs ORDER BY created_at DESC").catch(() => []);
    }
  },

  // Get single job by ID
  async getJobById(id) {
    try {
      const results = await executeQuery("SELECT * FROM jobs WHERE id = ?", [id]);
      return results[0] || null;
    } catch (err) {
      await ensureJobsSchema();
      const results = await executeQuery("SELECT * FROM jobs WHERE id = ?", [id]).catch(() => []);
      return results[0] || null;
    }
  },

  // Create a new job opening
  async createJob({ title, department, location, type, experience, description }) {
    await ensureJobsSchema();
    const result = await executeQuery(
      "INSERT INTO jobs (title, department, location, type, experience, description) VALUES (?, ?, ?, ?, ?, ?)",
      [title, department, location, type, experience, description]
    );
    return { id: result.insertId, title, department, location, type, experience, description };
  },

  // Update a job opening
  async updateJob(id, { title, department, location, type, experience, description }) {
    await ensureJobsSchema();
    await executeQuery(
      "UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, experience = ?, description = ? WHERE id = ?",
      [title, department, location, type, experience, description, id]
    );
    return { id, title, department, location, type, experience, description };
  },

  // Get paginated jobs
  async getPaginatedJobs(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const [countResult, data] = await Promise.all([
        executeQuery("SELECT COUNT(*) as count FROM jobs"),
        executeQuery("SELECT * FROM jobs ORDER BY created_at DESC LIMIT ? OFFSET ?", [parseInt(limit, 10), parseInt(offset, 10)])
      ]);
      const total = countResult?.count || 0;
      const totalPages = Math.ceil(total / limit);
      return { data: data || [], pagination: { total, page, limit, totalPages } };
    } catch (err) {
      await ensureJobsSchema();
      return { data: [], pagination: { total: 0, page, limit, totalPages: 0 } };
    }
  },

  // Delete a job listing
  async deleteJob(id) {
    await ensureJobsSchema();
    return await executeQuery("DELETE FROM jobs WHERE id = ?", [id]);
  }
};
