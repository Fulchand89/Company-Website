import { executeQuery } from "@/lib/db";

export const contactService = {
  // Create contact submission
  async createContact({ name, email, phone, message }) {
    const result = await executeQuery(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone || null, message]
    );
    return { id: result.insertId, name, email, phone, message };
  },

  // Get all contact messages (for admin dashboard view)
  async getAllContacts() {
    return await executeQuery(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
  },

  // Get paginated contact messages
  async getPaginatedContacts(page = 1, limit = 10) {
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

  // Delete contact submission
  async deleteContact(id) {
    return await executeQuery("DELETE FROM contacts WHERE id = ?", [id]);
  }
};
