import { executeQuery } from "@/lib/db";

let schemaInitialized = false;

// Default initial seed testimonials if table is empty
const SEED_TESTIMONIALS = [
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
    status: "published",
  },
];

// Ensure database schema for testimonials table
export async function ensureTestimonialSchema() {
  if (schemaInitialized) return;
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        project VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        img VARCHAR(255) NOT NULL,
        rating INT DEFAULT 5,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_testimonials_status (status),
        INDEX idx_testimonials_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Ensure columns exist (for upgrades)
    const cols = await executeQuery("SHOW COLUMNS FROM testimonials");
    const existingColNames = cols.map(c => c.Field.toLowerCase());

    const columnsToEnsure = [
      { name: "rating", definition: "INT DEFAULT 5" },
      { name: "status", definition: "VARCHAR(50) DEFAULT 'draft'" },
    ];

    for (const col of columnsToEnsure) {
      if (!existingColNames.includes(col.name.toLowerCase())) {
        console.log(`Adding missing column ${col.name} to testimonials table...`);
        await executeQuery(`ALTER TABLE testimonials ADD COLUMN ${col.name} ${col.definition}`);
      }
    }

    // Set existing seed testimonials to 'published' so they show on the frontend immediately
    await executeQuery("UPDATE testimonials SET status = 'published' WHERE status IS NULL OR status = ''");

    // Auto-seed initial data if table is empty
    const [countResult] = await executeQuery("SELECT COUNT(*) as count FROM testimonials");
    if (countResult?.count === 0) {
      console.log("Seeding initial testimonials into database...");
      for (const item of SEED_TESTIMONIALS) {
        await executeQuery(
          `INSERT INTO testimonials (name, project, text, img, rating, status) VALUES (?, ?, ?, ?, ?, ?)`,
          [item.name, item.project, item.text, item.img, item.rating, item.status]
        );
      }
    }

    schemaInitialized = true;
    console.log("Database schema verification for testimonials table completed successfully.");
  } catch (err) {
    console.error("Failed to dynamically verify or update database schema for testimonials:", err);
  }
}

export const testimonialService = {
  // Get published testimonials (for public frontend) with optional pagination
  async getAllPublishedTestimonials({ page = 1, limit = 10 } = {}) {
    await ensureTestimonialSchema();
    const offset = (page - 1) * limit;

    const [countResult] = await executeQuery("SELECT COUNT(*) as count FROM testimonials WHERE status = 'published'");
    const total = countResult?.count || 0;

    const data = await executeQuery(
      "SELECT * FROM testimonials WHERE status = 'published' ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [parseInt(limit, 10), parseInt(offset, 10)]
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: data || [],
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages
      }
    };
  },

  // Get paginated testimonials for admin panel (includes drafts)
  async getPaginatedTestimonialsForAdmin({ search = "", status = "", page = 1, limit = 10 }) {
    await ensureTestimonialSchema();
    const offset = (page - 1) * limit;

    let whereClauses = [];
    let params = [];

    if (search) {
      whereClauses.push("(name LIKE ? OR project LIKE ? OR text LIKE ?)");
      const searchWildcard = `%${search}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard);
    }

    if (status) {
      whereClauses.push("status = ?");
      params.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Get count
    const countQuery = `SELECT COUNT(*) as count FROM testimonials ${whereSql}`;
    const [countResult] = await executeQuery(countQuery, params);
    const total = countResult?.count || 0;

    // Get data
    const dataQuery = `
      SELECT * FROM testimonials 
      ${whereSql} 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    const dataParams = [...params, parseInt(limit, 10), parseInt(offset, 10)];
    const data = await executeQuery(dataQuery, dataParams);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data || [],
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages
      }
    };
  },

  // Get single testimonial by ID
  async getTestimonialById(id) {
    await ensureTestimonialSchema();
    const results = await executeQuery("SELECT * FROM testimonials WHERE id = ?", [id]);
    if (!results || results.length === 0) return null;
    return results[0];
  },

  // Create a new testimonial
  async createTestimonial(data) {
    await ensureTestimonialSchema();
    const {
      name,
      project,
      text,
      img,
      rating = 5,
      status = "draft",
    } = data;

    const insertResult = await executeQuery(
      `INSERT INTO testimonials (name, project, text, img, rating, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, project, text, img, parseInt(rating, 10) || 5, status]
    );

    return { id: insertResult.insertId, ...data };
  },

  // Update an existing testimonial
  async updateTestimonial(id, data) {
    await ensureTestimonialSchema();
    const existing = await this.getTestimonialById(id);
    if (!existing) throw new Error("Testimonial not found");

    const {
      name,
      project,
      text,
      img,
      rating = 5,
      status = "draft",
    } = data;

    await executeQuery(
      `UPDATE testimonials SET
        name = ?, project = ?, text = ?, img = ?, rating = ?, status = ?
      WHERE id = ?`,
      [name, project, text, img, parseInt(rating, 10) || 5, status, id]
    );

    return { id, ...data };
  },

  // Delete a testimonial
  async deleteTestimonial(id) {
    await ensureTestimonialSchema();
    return await executeQuery("DELETE FROM testimonials WHERE id = ?", [id]);
  },
};
