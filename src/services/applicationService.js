import { executeQuery } from "@/lib/db";

export const applicationService = {
  // Submit new application
  async createApplication({ name, email, phone, position, resumeUrl }) {
    const result = await executeQuery(
      "INSERT INTO applications (name, email, phone, position, resume_url) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, position, resumeUrl]
    );
    return { id: result.insertId, name, email, phone, position, resumeUrl };
  },

  // Get all applications
  async getAllApplications() {
    return await executeQuery(
      "SELECT id, name, email, phone, position, resume_url, created_at FROM applications ORDER BY created_at DESC"
    );
  },

  // Get paginated applications with search, filtering, and sorting
  async getPaginatedApplications(optionsOrPage = 1, limit = 10) {
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
    const results = await executeQuery("SELECT DISTINCT position FROM applications WHERE position IS NOT NULL AND position != '' ORDER BY position ASC");
    return results.map(r => r.position);
  },

  // Update application status
  async updateApplicationStatus(id, status) {
    return await executeQuery("UPDATE applications SET status = ? WHERE id = ?", [status, id]);
  },

  // Delete application
  async deleteApplication(id) {
    return await executeQuery("DELETE FROM applications WHERE id = ?", [id]);
  }
};
