import { executeQuery } from "@/lib/db";

/**
 * Blog Service for Hostinger MySQL Database
 * 
 * Features:
 * - Uses mysql2/promise reusable connection pool via executeQuery from @/lib/db.
 * - Safely auto-verifies blogs, tags, and blog_tags tables using CREATE TABLE IF NOT EXISTS.
 * - Preserves pre-existing tables and content without deleting or modifying current schema.
 * - Supports complete CRUD operations (Create, Read, Update, Delete) for blog articles and SEO metadata.
 */

// Helper to slugify a string for clean SEO URLs
export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

let schemaInitialized = false;

// Ensure database schema matches target requirements dynamically without overwriting existing data
export async function ensureSchema() {
  if (schemaInitialized) return;
  try {
    // 1. Ensure blogs table exists
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT DEFAULT NULL,
        content LONGTEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        img VARCHAR(255) NOT NULL,
        img_alt VARCHAR(255) DEFAULT NULL,
        author VARCHAR(255) DEFAULT 'Gupta Tech Web',
        status VARCHAR(50) DEFAULT 'draft',
        seo_title VARCHAR(255) DEFAULT NULL,
        seo_description TEXT DEFAULT NULL,
        seo_keywords VARCHAR(255) DEFAULT NULL,
        robots VARCHAR(100) DEFAULT 'index, follow',
        canonical_url VARCHAR(255) DEFAULT NULL,
        focus_keyword VARCHAR(255) DEFAULT NULL,
        og_title VARCHAR(255) DEFAULT NULL,
        og_description TEXT DEFAULT NULL,
        og_image VARCHAR(255) DEFAULT NULL,
        og_url VARCHAR(255) DEFAULT NULL,
        og_type VARCHAR(100) DEFAULT 'article',
        twitter_card VARCHAR(100) DEFAULT 'summary_large_image',
        twitter_title VARCHAR(255) DEFAULT NULL,
        twitter_description TEXT DEFAULT NULL,
        twitter_image VARCHAR(255) DEFAULT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_blogs_slug (slug),
        INDEX idx_blogs_category (category),
        INDEX idx_blogs_status (status),
        INDEX idx_blogs_published_at (published_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Ensure tags table exists
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        INDEX idx_tags_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Ensure blog_tags junction table exists
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS blog_tags (
        blog_id INT NOT NULL,
        tag_id INT NOT NULL,
        PRIMARY KEY (blog_id, tag_id),
        CONSTRAINT fk_blog_tags_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_blog_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
        INDEX idx_blog_tags_tag (tag_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    const cols = await executeQuery("SHOW COLUMNS FROM blogs");
    const existingColNames = cols.map(c => c.Field.toLowerCase());

    const columnsToEnsure = [
      { name: "status", definition: "VARCHAR(50) DEFAULT 'draft'" },
      { name: "canonical_url", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "focus_keyword", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "og_title", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "og_description", definition: "TEXT DEFAULT NULL" },
      { name: "og_image", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "og_url", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "og_type", definition: "VARCHAR(100) DEFAULT 'article'" },
      { name: "twitter_card", definition: "VARCHAR(100) DEFAULT 'summary_large_image'" },
      { name: "twitter_title", definition: "VARCHAR(255) DEFAULT NULL" },
      { name: "twitter_description", definition: "TEXT DEFAULT NULL" },
      { name: "twitter_image", definition: "VARCHAR(255) DEFAULT NULL" }
    ];

    for (const col of columnsToEnsure) {
      if (!existingColNames.includes(col.name.toLowerCase())) {
        console.log(`Adding missing column ${col.name} to blogs table...`);
        await executeQuery(`ALTER TABLE blogs ADD COLUMN ${col.name} ${col.definition}`);
      }
    }

    // Set existing seed blogs to 'published' so they show on the frontend listing immediately
    await executeQuery("UPDATE blogs SET status = 'published' WHERE status IS NULL OR status = ''");

    schemaInitialized = true;
    console.log("Database schema verification for blogs table completed successfully.");
  } catch (err) {
    console.error("Failed to dynamically verify or update database schema for blogs:", err);
  }
}

export const blogService = {
  // Generate unique slug
  async getUniqueSlug(title, excludeId = null) {
    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = "blog-post";

    let slug = baseSlug;
    let counter = 1;
    while (true) {
      let query = "SELECT id FROM blogs WHERE slug = ?";
      let params = [slug];
      if (excludeId !== null) {
        query = "SELECT id FROM blogs WHERE slug = ? AND id != ?";
        params = [slug, excludeId];
      }
      const results = await executeQuery(query, params);
      if (!results || results.length === 0) {
        return slug;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  },

  // Get paginated blogs for admin panel (includes drafts)
  async getPaginatedBlogsForAdmin({ search = "", category = "", status = "", page = 1, limit = 10 }) {
    await ensureSchema();
    const offset = (page - 1) * limit;

    let whereClauses = [];
    let params = [];

    if (search) {
      whereClauses.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
      const searchWildcard = `%${search}%`;
      params.push(searchWildcard, searchWildcard, searchWildcard);
    }

    if (category) {
      whereClauses.push("category = ?");
      params.push(category);
    }

    if (status) {
      whereClauses.push("status = ?");
      params.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Get count query
    const countQuery = `SELECT COUNT(*) as count FROM blogs ${whereSql}`;
    const [countResult] = await executeQuery(countQuery, params);
    const total = countResult?.count || 0;

    // Get data query
    const dataQuery = `
      SELECT * FROM blogs 
      ${whereSql} 
      ORDER BY published_at DESC 
      LIMIT ? OFFSET ?
    `;
    const dataParams = [...params, parseInt(limit, 10), parseInt(offset, 10)];
    const data = await executeQuery(dataQuery, dataParams);

    // Fetch and attach tags to each blog
    if (data.length > 0) {
      const blogIds = data.map(b => b.id);
      const tagsQuery = `
        SELECT bt.blog_id, t.id, t.name, t.slug 
        FROM blog_tags bt 
        JOIN tags t ON bt.tag_id = t.id 
        WHERE bt.blog_id IN (${blogIds.map(() => "?").join(",")})
      `;
      const tagsResults = await executeQuery(tagsQuery, blogIds);

      data.forEach(blog => {
        blog.tags = tagsResults
          .filter(t => t.blog_id === blog.id)
          .map(t => ({ id: t.id, name: t.name, slug: t.slug }));
      });
    }

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    };
  },

  // Get single blog by ID
  async getBlogById(id) {
    await ensureSchema();
    const results = await executeQuery("SELECT * FROM blogs WHERE id = ?", [id]);
    if (!results || results.length === 0) return null;

    const blog = results[0];

    // Fetch tags
    const tags = await executeQuery(
      `SELECT t.id, t.name, t.slug 
       FROM tags t 
       JOIN blog_tags bt ON t.id = bt.tag_id 
       WHERE bt.blog_id = ?`,
      [blog.id]
    );
    blog.tags = tags || [];

    return blog;
  },

  // Create a new blog
  async createBlog(blogData) {
    await ensureSchema();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      img,
      img_alt,
      author = "Gupta Tech Web",
      status = "draft",
      published_at,
      // SEO Fields
      seo_title,
      seo_description,
      seo_keywords,
      robots = "index, follow",
      canonical_url,
      focus_keyword,
      // OG Fields
      og_title,
      og_description,
      og_image,
      og_url,
      og_type = "article",
      // Twitter Fields
      twitter_card = "summary_large_image",
      twitter_title,
      twitter_description,
      twitter_image,
      // Tags
      tags = []
    } = blogData;

    // Resolve unique slug
    const finalSlug = slug ? await this.getUniqueSlug(slug) : await this.getUniqueSlug(title);
    const finalPublishedAt = published_at ? new Date(published_at) : new Date();

    const insertResult = await executeQuery(
      `INSERT INTO blogs (
        title, slug, excerpt, content, category, img, img_alt, author, status, published_at,
        seo_title, seo_description, seo_keywords, robots, canonical_url, focus_keyword,
        og_title, og_description, og_image, og_url, og_type,
        twitter_card, twitter_title, twitter_description, twitter_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, finalSlug, excerpt, content, category, img, img_alt, author, status, finalPublishedAt,
        seo_title, seo_description, seo_keywords, robots, canonical_url, focus_keyword,
        og_title, og_description, og_image, og_url, og_type,
        twitter_card, twitter_title, twitter_description, twitter_image
      ]
    );

    const blogId = insertResult.insertId;

    // Map tags
    if (tags && tags.length > 0) {
      await this.associateTags(blogId, tags);
    }

    return { id: blogId, slug: finalSlug, ...blogData };
  },

  // Update an existing blog
  async updateBlog(id, blogData) {
    await ensureSchema();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      img,
      img_alt,
      author = "Gupta Tech Web",
      status = "draft",
      published_at,
      // SEO Fields
      seo_title,
      seo_description,
      seo_keywords,
      robots = "index, follow",
      canonical_url,
      focus_keyword,
      // OG Fields
      og_title,
      og_description,
      og_image,
      og_url,
      og_type = "article",
      // Twitter Fields
      twitter_card = "summary_large_image",
      twitter_title,
      twitter_description,
      twitter_image,
      // Tags
      tags = []
    } = blogData;

    // Resolve unique slug if slug was edited or provided, else keep existing
    const existing = await this.getBlogById(id);
    if (!existing) throw new Error("Blog not found");

    let finalSlug = existing.slug;
    if (slug && slug !== existing.slug) {
      finalSlug = await this.getUniqueSlug(slug, id);
    } else if (title && title !== existing.title && !slug) {
      finalSlug = await this.getUniqueSlug(title, id);
    }

    const finalPublishedAt = published_at ? new Date(published_at) : existing.published_at;

    await executeQuery(
      `UPDATE blogs SET
        title = ?, slug = ?, excerpt = ?, content = ?, category = ?, img = ?, img_alt = ?, author = ?, status = ?, published_at = ?,
        seo_title = ?, seo_description = ?, seo_keywords = ?, robots = ?, canonical_url = ?, focus_keyword = ?,
        og_title = ?, og_description = ?, og_image = ?, og_url = ?, og_type = ?,
        twitter_card = ?, twitter_title = ?, twitter_description = ?, twitter_image = ?
      WHERE id = ?`,
      [
        title, finalSlug, excerpt, content, category, img, img_alt, author, status, finalPublishedAt,
        seo_title, seo_description, seo_keywords, robots, canonical_url, focus_keyword,
        og_title, og_description, og_image, og_url, og_type,
        twitter_card, twitter_title, twitter_description, twitter_image,
        id
      ]
    );

    // Update tags
    await executeQuery("DELETE FROM blog_tags WHERE blog_id = ?", [id]);
    if (tags && tags.length > 0) {
      await this.associateTags(id, tags);
    }

    return { id, slug: finalSlug, ...blogData };
  },

  // Delete a blog
  async deleteBlog(id) {
    await ensureSchema();
    // Delete relations first just in case
    await executeQuery("DELETE FROM blog_tags WHERE blog_id = ?", [id]);
    return await executeQuery("DELETE FROM blogs WHERE id = ?", [id]);
  },

  // Helper to map and insert tags dynamically
  async associateTags(blogId, tagNames) {
    for (let name of tagNames) {
      name = name.trim();
      if (!name) continue;

      const slug = slugify(name);

      // Check if tag exists
      let tagId;
      const tagResults = await executeQuery("SELECT id FROM tags WHERE slug = ? OR name = ?", [slug, name]);
      if (tagResults && tagResults.length > 0) {
        tagId = tagResults[0].id;
      } else {
        const insertTagResult = await executeQuery("INSERT INTO tags (name, slug) VALUES (?, ?)", [name, slug]);
        tagId = insertTagResult.insertId;
      }

      // Link tag to blog
      await executeQuery("INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)", [blogId, tagId]);
    }
  },

  // Get distinct list of categories currently used
  async getAllCategories() {
    await ensureSchema();
    const results = await executeQuery("SELECT DISTINCT category FROM blogs WHERE category IS NOT NULL AND category != '' ORDER BY category ASC");
    return results.map(r => r.category);
  },

  // Get all existing tags
  async getAllTags() {
    await ensureSchema();
    return await executeQuery("SELECT * FROM tags ORDER BY name ASC");
  }
};
