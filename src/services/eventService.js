import { executeQuery } from "@/lib/db";

let isSchemaEnsured = false;

export async function ensureEventSchema() {
  if (isSchemaEnsured) return;
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        img VARCHAR(500) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await executeQuery(createTableQuery);

    const countResult = await executeQuery("SELECT COUNT(*) AS total FROM events");
    if (countResult[0]?.total === 0) {
      const defaultEvents = [
        ["Annual Tech Conference", "/assets/images/about/Event1.png", "active", 1],
        ["Office Hackathon & Brainstorming", "/assets/images/about/Event2.png", "active", 2],
        ["Team Building & Outing", "/assets/images/about/Event3.png", "active", 3],
        ["Interactive Workshops", "/assets/images/about/Event4.png", "active", 4],
        ["Celebrations & Culture", "/assets/images/about/Event5.png", "active", 5],
      ];
      for (const item of defaultEvents) {
        await executeQuery(
          "INSERT INTO events (title, img, status, display_order) VALUES (?, ?, ?, ?)",
          item
        );
      }
    }
    isSchemaEnsured = true;
  } catch (error) {
    console.error("Error ensuring Event DB Schema:", error);
  }
}

export const eventService = {
  async getAllEvents() {
    try {
      const rows = await executeQuery(
        "SELECT * FROM events WHERE status = 'active' ORDER BY display_order ASC, created_at DESC"
      );
      return rows;
    } catch (error) {
      await ensureEventSchema();
      return await executeQuery(
        "SELECT * FROM events WHERE status = 'active' ORDER BY display_order ASC, created_at DESC"
      );
    }
  },

  async getPaginatedEvents(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const countRes = await executeQuery("SELECT COUNT(*) AS total FROM events");
      const totalItems = countRes[0]?.total || 0;
      const totalPages = Math.ceil(totalItems / limit) || 1;

      const rows = await executeQuery(
        "SELECT * FROM events ORDER BY display_order ASC, created_at DESC LIMIT ? OFFSET ?",
        [limit, offset]
      );

      return {
        data: rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          limit,
        },
      };
    } catch (error) {
      await ensureEventSchema();
      const offset = (page - 1) * limit;
      const countRes = await executeQuery("SELECT COUNT(*) AS total FROM events");
      const totalItems = countRes[0]?.total || 0;
      const totalPages = Math.ceil(totalItems / limit) || 1;

      const rows = await executeQuery(
        "SELECT * FROM events ORDER BY display_order ASC, created_at DESC LIMIT ? OFFSET ?",
        [limit, offset]
      );

      return {
        data: rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          limit,
        },
      };
    }
  },

  async createEvent({ title, img, status = "active", display_order = 0 }) {
    await ensureEventSchema();
    const result = await executeQuery(
      "INSERT INTO events (title, img, status, display_order) VALUES (?, ?, ?, ?)",
      [title, img, status, display_order]
    );
    return { id: result.insertId, title, img, status, display_order };
  },

  async updateEvent(id, { title, img, status, display_order }) {
    await ensureEventSchema();
    await executeQuery(
      "UPDATE events SET title = ?, img = ?, status = ?, display_order = ? WHERE id = ?",
      [title, img, status, display_order, id]
    );
    return { id, title, img, status, display_order };
  },

  async deleteEvent(id) {
    await ensureEventSchema();
    await executeQuery("DELETE FROM events WHERE id = ?", [id]);
    return true;
  },
};
