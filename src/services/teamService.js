import { executeQuery } from "@/lib/db";

let schemaInitialized = false;

// Default initial seed team members if table is empty
const SEED_TEAM_MEMBERS = [
  {
    name: "Jennifer",
    designation: "CEO & Founder",
    img: "/assets/images/hero/team-demo.png",
    bio: "Visionary leader with 15+ years of experience driving technology and business innovation.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", twitter: "https://twitter.com" }),
    display_order: 1,
    featured: 1,
    status: "active",
  },
  {
    name: "Alexander Reed",
    designation: "Chief Technology Officer",
    img: "/assets/images/hero/team-demo.png",
    bio: "Architecting high-scale enterprise systems and leading engineering teams.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", github: "https://github.com" }),
    display_order: 2,
    featured: 1,
    status: "active",
  },
  {
    name: "Sophia Chen",
    designation: "VP of Product & Design",
    img: "/assets/images/hero/team-demo.png",
    bio: "Passionate about creating user-centered designs and seamless digital experiences.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", twitter: "https://twitter.com" }),
    display_order: 3,
    featured: 1,
    status: "active",
  },
  {
    name: "Marcus Vance",
    designation: "Head of AI & Engineering",
    img: "/assets/images/hero/team-demo.png",
    bio: "Specializing in Machine Learning pipelines and cloud architecture.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", github: "https://github.com" }),
    display_order: 4,
    featured: 1,
    status: "active",
  },
  {
    name: "Emily Watson",
    designation: "Lead UX Consultant",
    img: "/assets/images/hero/team-demo.png",
    bio: "Crafting intuitive digital touchpoints and brand strategies.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com" }),
    display_order: 5,
    featured: 0,
    status: "active",
  },
  {
    name: "David Kim",
    designation: "Senior DevOps Engineer",
    img: "/assets/images/hero/team-demo.png",
    bio: "Ensuring zero-downtime deployments and cloud infrastructure resilience.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", github: "https://github.com" }),
    display_order: 6,
    featured: 0,
    status: "active",
  },
  {
    name: "Rachel Green",
    designation: "Digital Marketing Strategist",
    img: "/assets/images/hero/team-demo.png",
    bio: "Accelerating brand growth through data-driven performance marketing.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", twitter: "https://twitter.com" }),
    display_order: 7,
    featured: 0,
    status: "active",
  },
  {
    name: "Daniel Miller",
    designation: "Senior Full-Stack Developer",
    img: "/assets/images/hero/team-demo.png",
    bio: "Building robust web and mobile applications with modern tech stacks.",
    social_links: JSON.stringify({ linkedin: "https://linkedin.com", github: "https://github.com" }),
    display_order: 8,
    featured: 0,
    status: "active",
  },
];

// Ensure database schema for team_members table
export async function ensureTeamSchema() {
  if (schemaInitialized) return;
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL,
        bio TEXT DEFAULT NULL,
        social_links LONGTEXT DEFAULT NULL,
        display_order INT DEFAULT 0,
        featured TINYINT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_team_status (status),
        INDEX idx_team_display_order (display_order),
        INDEX idx_team_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Ensure columns exist (for upgrades)
    const cols = await executeQuery("SHOW COLUMNS FROM team_members");
    const existingColNames = cols.map(c => c.Field.toLowerCase());

    const columnsToEnsure = [
      { name: "bio", definition: "TEXT DEFAULT NULL" },
      { name: "social_links", definition: "LONGTEXT DEFAULT NULL" },
      { name: "display_order", definition: "INT DEFAULT 0" },
      { name: "featured", definition: "TINYINT DEFAULT 0" },
      { name: "status", definition: "VARCHAR(50) DEFAULT 'active'" },
    ];

    for (const col of columnsToEnsure) {
      if (!existingColNames.includes(col.name.toLowerCase())) {
        console.log(`Adding missing column ${col.name} to team_members table...`);
        await executeQuery(`ALTER TABLE team_members ADD COLUMN ${col.name} ${col.definition}`);
      }
    }

    // Auto-seed initial data if table is empty
    const [countResult] = await executeQuery("SELECT COUNT(*) as count FROM team_members");
    if (countResult?.count === 0) {
      console.log("Seeding initial team members into database...");
      for (const item of SEED_TEAM_MEMBERS) {
        await executeQuery(
          `INSERT INTO team_members (name, designation, img, bio, social_links, display_order, featured, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.name,
            item.designation,
            item.img,
            item.bio,
            item.social_links,
            item.display_order,
            item.featured,
            item.status,
          ]
        );
      }
    }

    schemaInitialized = true;
    console.log("Database schema verification for team_members table completed successfully.");
  } catch (err) {
    console.error("Failed to dynamically verify or update database schema for team_members:", err);
  }
}

export const teamService = {
  // Get all active team members (for public frontend)
  async getAllActiveTeamMembers() {
    await ensureTeamSchema();
    const results = await executeQuery(
      "SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at DESC"
    );
    return results || [];
  },

  // Get paginated team members for admin panel (includes inactive)
  async getPaginatedTeamMembersForAdmin({ search = "", status = "", page = 1, limit = 10 }) {
    await ensureTeamSchema();
    const offset = (page - 1) * limit;

    let whereClauses = [];
    let params = [];

    if (search) {
      whereClauses.push("(name LIKE ? OR designation LIKE ? OR bio LIKE ?)");
      const searchWildcard = `%${search}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard);
    }

    if (status) {
      whereClauses.push("status = ?");
      params.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Get count
    const countQuery = `SELECT COUNT(*) as count FROM team_members ${whereSql}`;
    const [countResult] = await executeQuery(countQuery, params);
    const total = countResult?.count || 0;

    // Get data
    const dataQuery = `
      SELECT * FROM team_members 
      ${whereSql} 
      ORDER BY display_order ASC, created_at DESC 
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
        totalPages,
      },
    };
  },

  // Get single team member by ID
  async getTeamMemberById(id) {
    await ensureTeamSchema();
    const results = await executeQuery("SELECT * FROM team_members WHERE id = ?", [id]);
    if (!results || results.length === 0) return null;
    return results[0];
  },

  // Create a new team member
  async createTeamMember(data) {
    await ensureTeamSchema();
    const {
      name,
      designation,
      img,
      bio = "",
      social_links = null,
      display_order = 0,
      featured = 0,
      status = "active",
    } = data;

    const socialLinksJson = typeof social_links === "object" ? JSON.stringify(social_links) : social_links;

    const insertResult = await executeQuery(
      `INSERT INTO team_members (name, designation, img, bio, social_links, display_order, featured, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        designation,
        img,
        bio,
        socialLinksJson,
        parseInt(display_order, 10) || 0,
        featured ? 1 : 0,
        status,
      ]
    );

    return { id: insertResult.insertId, ...data };
  },

  // Update an existing team member
  async updateTeamMember(id, data) {
    await ensureTeamSchema();
    const existing = await this.getTeamMemberById(id);
    if (!existing) throw new Error("Team member not found");

    const {
      name,
      designation,
      img,
      bio = "",
      social_links = null,
      display_order = 0,
      featured = 0,
      status = "active",
    } = data;

    const socialLinksJson = typeof social_links === "object" ? JSON.stringify(social_links) : social_links;

    await executeQuery(
      `UPDATE team_members SET
        name = ?, designation = ?, img = ?, bio = ?, social_links = ?, display_order = ?, featured = ?, status = ?
      WHERE id = ?`,
      [
        name,
        designation,
        img,
        bio,
        socialLinksJson,
        parseInt(display_order, 10) || 0,
        featured ? 1 : 0,
        status,
        id,
      ]
    );

    return { id, ...data };
  },

  // Delete a team member
  async deleteTeamMember(id) {
    await ensureTeamSchema();
    return await executeQuery("DELETE FROM team_members WHERE id = ?", [id]);
  },
};
