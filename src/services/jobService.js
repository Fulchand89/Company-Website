import { executeQuery } from "@/lib/db";

export const jobService = {
  // Get all job listings
  async getAllJobs() {
    return await executeQuery(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );
  },

  // Get single job by ID
  async getJobById(id) {
    const results = await executeQuery(
      "SELECT * FROM jobs WHERE id = ?",
      [id]
    );
    return results[0] || null;
  },

  // Create a new job opening
  async createJob({ title, department, location, type, experience, description }) {
    const result = await executeQuery(
      "INSERT INTO jobs (title, department, location, type, experience, description) VALUES (?, ?, ?, ?, ?, ?)",
      [title, department, location, type, experience, description]
    );
    return { id: result.insertId, title, department, location, type, experience, description };
  },

  // Update a job opening
  async updateJob(id, { title, department, location, type, experience, description }) {
    await executeQuery(
      "UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, experience = ?, description = ? WHERE id = ?",
      [title, department, location, type, experience, description, id]
    );
    return { id, title, department, location, type, experience, description };
  },

  // Get paginated jobs
  async getPaginatedJobs(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [countResult] = await executeQuery("SELECT COUNT(*) as count FROM jobs");
    const total = countResult?.count || 0;
    const data = await executeQuery(
      "SELECT * FROM jobs ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [parseInt(limit, 10), parseInt(offset, 10)]
    );
    const totalPages = Math.ceil(total / limit);
    return { data, pagination: { total, page, limit, totalPages } };
  },

  // Delete a job listing
  async deleteJob(id) {
    return await executeQuery("DELETE FROM jobs WHERE id = ?", [id]);
  }
};
