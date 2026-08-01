import { executeQuery } from "@/lib/db";

function parseJsonSafe(val, defaultVal = []) {
  if (!val) return defaultVal;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return defaultVal;
  }
}

let isSchemaEnsured = false;

/**
 * Ensures that the 'portfolio' database table exists and contains initial seed projects if empty.
 */
export async function ensureSchema() {
  if (isSchemaEnsured) return;
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        short_description TEXT DEFAULT NULL,
        full_description LONGTEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        image_alt VARCHAR(255) DEFAULT NULL,
        hero_image VARCHAR(500) DEFAULT NULL,
        client_name VARCHAR(255) DEFAULT NULL,
        client_location VARCHAR(255) DEFAULT NULL,
        industry VARCHAR(255) DEFAULT NULL,
        development_time VARCHAR(255) DEFAULT NULL,
        target_audience TEXT DEFAULT NULL,
        deliverables JSON DEFAULT NULL,
        gallery JSON DEFAULT NULL,
        technologies JSON DEFAULT NULL,
        project_url VARCHAR(255) DEFAULT NULL,
        completion_date DATE DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'published',
        featured BOOLEAN DEFAULT FALSE,
        display_order INT DEFAULT 0,
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
        og_type VARCHAR(100) DEFAULT 'website',
        twitter_card VARCHAR(100) DEFAULT 'summary_large_image',
        twitter_title VARCHAR(255) DEFAULT NULL,
        twitter_description TEXT DEFAULT NULL,
        twitter_image VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_portfolio_slug (slug),
        INDEX idx_portfolio_category (category),
        INDEX idx_portfolio_status (status),
        INDEX idx_portfolio_featured (featured),
        INDEX idx_portfolio_display_order (display_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await executeQuery(createTableQuery);

    // Auto-migrate missing columns cleanly without throwing ER_DUP_FIELDNAME errors
    try {
      const existingColsRows = await executeQuery("SHOW COLUMNS FROM portfolio");
      const existingColNames = (existingColsRows || []).map((r) => r.Field.toLowerCase());

      const columnsToAdd = [
        { name: "hero_image", type: "VARCHAR(500) DEFAULT NULL" },
        { name: "client_location", type: "VARCHAR(255) DEFAULT NULL" },
        { name: "industry", type: "VARCHAR(255) DEFAULT NULL" },
        { name: "development_time", type: "VARCHAR(255) DEFAULT NULL" },
        { name: "target_audience", type: "TEXT DEFAULT NULL" },
        { name: "deliverables", type: "JSON DEFAULT NULL" }
      ];

      for (const col of columnsToAdd) {
        if (!existingColNames.includes(col.name.toLowerCase())) {
          await executeQuery(`ALTER TABLE portfolio ADD COLUMN ${col.name} ${col.type}`);
        }
      }
    } catch (colErr) {
      console.warn("[portfolioService] Schema migration column check notice:", colErr);
    }

    // Check if table is empty or update initial project with full Case Study data
    const countCheck = await executeQuery("SELECT COUNT(*) as count FROM portfolio");
    if (countCheck[0]?.count === 0) {
      console.log("[portfolioService] Seeding initial portfolio items into MySQL...");
      
      const defaultDeliverables = JSON.stringify([
        {
          id: 1,
          number: "01",
          title: "UI UX Design",
          description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
          image: "/assets/images/protfolio/protfolio1.png"
        },
        {
          id: 2,
          number: "02",
          title: "Web Development",
          description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
          image: "/assets/images/hero/mind-reset.png"
        },
        {
          id: 3,
          number: "03",
          title: "Search Engine Optimization",
          description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
          image: "/assets/images/protfolio/protfolio3.png"
        }
      ]);

      const defaultTech = JSON.stringify(["HTML5", "CSS3", "Figma", "Laravel", "Swift", "Flutter", "Python", "Next.js", "WordPress"]);

      const defaultGallery = JSON.stringify([
        "/assets/images/hero/mind-reset.png",
        "/assets/images/protfolio/protfolio1.png",
        "/assets/images/protfolio/protfolio2.png",
        "/assets/images/protfolio/protfolio3.png"
      ]);

      const seedQuery = `
        INSERT INTO portfolio 
          (id, slug, title, category, short_description, full_description, image, image_alt, hero_image, client_name, client_location, industry, development_time, target_audience, deliverables, technologies, gallery, project_url, status, featured, display_order, seo_title, seo_description)
        VALUES
          (
            1,
            'mind-reset-website',
            'Mind Reset Website',
            'Website',
            'Mind Reset is an awareness-based approach created to support clarity and inner balance without force, pressure, or complex techniques. Rather than focusing on fixing or changing yourself, it invites a deeper understanding of your thoughts and emotions as they naturally arise.',
            'Mind Reset is an awareness-based approach created to support clarity and inner balance without force, pressure, or complex techniques. Rather than focusing on fixing or changing yourself, it invites a deeper understanding of your thoughts and emotions as they naturally arise. Through guided audios, reflective content, and supportive experiences, you are gently encouraged to observe your inner world with openness and ease.',
            '/assets/images/hero/mind-reset.png',
            'Mind Reset Website',
            '/assets/images/hero/mind-reset.png',
            'Smart Brain Academy',
            'Arabic',
            'Health & Wellness',
            '2 Month',
            'individuals seeking greater clarity, emotional balance, and a deeper understanding of their inner experience.',
            ?,
            ?,
            ?,
            'https://mindreset.example.com',
            'published',
            TRUE,
            1,
            'Mind Reset Website - Dynamic Case Study | Gupta Tech Web',
            'Mind Reset is an awareness-based approach created to support clarity and inner balance.'
          ),
          (
            2,
            'booking-luxor-website',
            'Booking Luxor Website',
            'Website',
            'Luxor travel and hotel booking platform designed for seamless excursion reservations, intuitive user UI, and high-conversion landing flows.',
            'Luxor travel and hotel booking platform designed for seamless excursion reservations, intuitive user UI, and high-conversion landing flows.',
            '/assets/images/protfolio/protfolio2.png',
            'Booking Luxor Website',
            '/assets/images/protfolio/protfolio2.png',
            'Luxor Tours',
            'Egypt',
            'Travel & Hospitality',
            '3 Month',
            'Travelers looking for premium Nile cruises and excursion bookings.',
            ?,
            ?,
            ?,
            'https://bookingluxor.example.com',
            'published',
            TRUE,
            2,
            'Booking Luxor Website - Case Study | Gupta Tech Web',
            'Luxor travel and hotel booking platform designed for seamless excursion reservations.'
          ),
          (
            3,
            'smart-brain-academy',
            'Smart Brain Academy',
            'Website',
            'Educational web platform offering interactive learning modules, student performance tracking, and live virtual classroom integrations.',
            'Educational web platform offering interactive learning modules, student performance tracking, and live virtual classroom integrations.',
            '/assets/images/protfolio/protfolio3.png',
            'Smart Brain Academy',
            '/assets/images/protfolio/protfolio3.png',
            'Smart Brain Inc',
            'United States',
            'Education & EdTech',
            '4 Month',
            'Students, teachers, and academic tutors worldwide.',
            ?,
            ?,
            ?,
            'https://smartbrain.example.com',
            'published',
            FALSE,
            3,
            'Smart Brain Academy - Case Study | Gupta Tech Web',
            'Educational web platform offering interactive learning modules.'
          ),
          (
            4,
            'pauwii-mobile-application',
            'Pauwii Mobile Application',
            'Applications',
            'Cross-platform mobile application providing real-time pet care services, veterinary appointment scheduling, and community pet forums.',
            'Cross-platform mobile application providing real-time pet care services, veterinary appointment scheduling, and community pet forums.',
            '/assets/images/protfolio/protfolio4.png',
            'Pauwii Mobile Application',
            '/assets/images/protfolio/protfolio4.png',
            'Pauwii Pet Tech',
            'Australia',
            'Pet Care & Services',
            '2 Month',
            'Pet owners and professional veterinarians.',
            ?,
            ?,
            ?,
            'https://pauwii.example.com',
            'published',
            TRUE,
            4,
            'Pauwii Mobile Application - Case Study | Gupta Tech Web',
            'Cross-platform mobile application providing real-time pet care services.'
          ),
          (
            5,
            'go-wheeler-mobile-application',
            'Go Wheeler Mobile Application',
            'Applications',
            'On-demand vehicle rental and ride hailing mobile app with live driver tracking, automated fare calculations, and digital wallet payment.',
            'On-demand vehicle rental and ride hailing mobile app with live driver tracking, automated fare calculations, and digital wallet payment.',
            '/assets/images/protfolio/protfolio5.png',
            'Go Wheeler Mobile Application',
            '/assets/images/protfolio/protfolio5.png',
            'Go Wheeler Mobility',
            'India',
            'Transportation & Mobility',
            '5 Month',
            'Commuters and vehicle rental operators.',
            ?,
            ?,
            ?,
            'https://gowheeler.example.com',
            'published',
            FALSE,
            5,
            'Go Wheeler Mobile Application - Case Study | Gupta Tech Web',
            'On-demand vehicle rental and ride hailing mobile app.'
          );
      `;
      await executeQuery(seedQuery, [
        defaultDeliverables, defaultTech, defaultGallery,
        defaultDeliverables, defaultTech, defaultGallery,
        defaultDeliverables, defaultTech, defaultGallery,
        defaultDeliverables, defaultTech, defaultGallery,
        defaultDeliverables, defaultTech, defaultGallery
      ]);
    }
    isSchemaEnsured = true;
  } catch (error) {
    console.error("[portfolioService] ensureSchema Error:", error);
  }
}

/**
 * Utility to generate clean URL slug from title string
 */
export function generateSlug(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Retrieves dynamic list of unique categories currently in database
 */
export async function getCategories() {
  await ensureSchema();
  try {
    const rows = await executeQuery(
      "SELECT DISTINCT category FROM portfolio WHERE status = 'published' AND category IS NOT NULL AND category != ''"
    );
    const dbCategories = (rows || []).map(r => r.category);

    const defaults = ["Website", "Applications", "Digital Marketing"];
    const combined = [...defaults];
    dbCategories.forEach(cat => {
      if (!combined.some(c => c.toLowerCase() === cat.toLowerCase())) {
        combined.push(cat);
      }
    });

    return combined.map(cat => ({
      name: cat,
      slug: cat.toLowerCase().replace(/[^a-z0-9]/g, "")
    }));
  } catch (error) {
    console.error("[portfolioService] getCategories Error:", error);
    return [
      { name: "Website", slug: "website" },
      { name: "Applications", slug: "applications" },
      { name: "Digital Marketing", slug: "digitalmarketing" }
    ];
  }
}

/**
 * Public GET: Retrieves published portfolio projects with pagination & category filtering
 */
export async function getPublicProjects({ category = "all", page = 1, limit = 20 } = {}) {
  await ensureSchema();
  const offset = (page - 1) * limit;

  let countSql = "SELECT COUNT(*) as total FROM portfolio WHERE status = 'published'";
  let dataSql = "SELECT * FROM portfolio WHERE status = 'published'";
  const params = [];

  if (category && category !== "all") {
    const lowerCat = category.toLowerCase();
    let catFilter = category;
    if (lowerCat === "web" || lowerCat === "website") catFilter = "Website";
    else if (lowerCat === "mobile" || lowerCat === "applications") catFilter = "Applications";
    else if (lowerCat === "marketing" || lowerCat === "digital-marketing" || lowerCat === "digitalmarketing") catFilter = "Digital Marketing";

    countSql += " AND (LOWER(category) = LOWER(?) OR LOWER(category) LIKE ?)";
    dataSql += " AND (LOWER(category) = LOWER(?) OR LOWER(category) LIKE ?)";
    params.push(catFilter, `%${lowerCat}%`);
  }

  dataSql += " ORDER BY display_order ASC, created_at DESC LIMIT ? OFFSET ?";

  const [countResult, rows] = await Promise.all([
    executeQuery(countSql, params),
    executeQuery(dataSql, [...params, limit, offset])
  ]);

  const total = countResult[0]?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const projects = (rows || []).map((item, index) => ({
    id: item.id,
    num: String(offset + index + 1).padStart(2, "0"),
    title: item.title,
    slug: item.slug,
    category: item.category,
    img: item.image,
    text: item.short_description || item.full_description?.replace(/<[^>]*>/g, "").slice(0, 180) + "...",
    fullDescription: item.full_description,
    client: item.client_name,
    projectUrl: item.project_url,
    status: item.status,
    featured: Boolean(item.featured),
    href: `/portfolio/${item.slug || item.id}`
  }));

  return {
    data: projects,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  };
}

/**
 * Retrieves a single project detail by slug or numeric ID with full Case Study data
 */
export async function getProjectBySlugOrId(slugOrId) {
  await ensureSchema();
  const rows = await executeQuery(
    "SELECT * FROM portfolio WHERE (slug = ? OR id = ?) AND status = 'published'",
    [slugOrId, slugOrId]
  );

  if (!rows || rows.length === 0) {
    return null;
  }

  const item = rows[0];

  // Fetch related items in same category or featured
  let relatedItems = [];
  try {
    relatedItems = await executeQuery(
      "SELECT id, slug, title, category, image FROM portfolio WHERE id != ? AND status = 'published' AND LOWER(category) = LOWER(?) ORDER BY created_at DESC LIMIT 3",
      [item.id, item.category]
    );
  } catch (err) {
    console.error("[portfolioService] Fetch related items failed:", err);
  }

  const deliverables = parseJsonSafe(item.deliverables, [
    {
      id: 1,
      number: "01",
      title: "UI UX Design",
      description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
      image: "/assets/images/protfolio/protfolio1.png"
    },
    {
      id: 2,
      number: "02",
      title: "Web Development",
      description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
      image: item.image || "/assets/images/hero/mind-reset.png"
    },
    {
      id: 3,
      number: "03",
      title: "Search Engine Optimization",
      description: "We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.",
      image: "/assets/images/protfolio/protfolio3.png"
    }
  ]);

  const technologies = parseJsonSafe(item.technologies, [
    "HTML5", "CSS3", "Figma", "Laravel", "Swift", "Flutter", "Python", "Next.js", "WordPress"
  ]);

  const gallery = parseJsonSafe(item.gallery, [
    item.image || "/assets/images/hero/mind-reset.png",
    "/assets/images/protfolio/protfolio1.png",
    "/assets/images/protfolio/protfolio2.png",
    "/assets/images/protfolio/protfolio3.png"
  ]);

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    shortDescription: item.short_description,
    fullDescription: item.full_description,
    image: item.image,
    imageAlt: item.image_alt || item.title,
    heroImage: item.hero_image || item.image,
    clientName: item.client_name || "Smart Brain Academy",
    clientLocation: item.client_location || "Arabic",
    industry: item.industry || item.category || "Health & Wellness",
    developmentTime: item.development_time || "2 Month",
    targetAudience: item.target_audience || "individuals seeking greater clarity, emotional balance, and a deeper understanding of their inner experience.",
    deliverables,
    technologies,
    gallery,
    projectUrl: item.project_url,
    status: item.status,
    featured: Boolean(item.featured),
    seoTitle: item.seo_title || `${item.title} - Dynamic Case Study | Gupta Tech Web`,
    seoDescription: item.seo_description || item.short_description || item.title,
    seoKeywords: item.seo_keywords || item.category,
    robots: item.robots || "index, follow",
    canonicalUrl: item.canonical_url,
    created_at: item.created_at,
    updated_at: item.updated_at,
    relatedItems: relatedItems || []
  };
}

/**
 * Admin GET: Returns paginated list of projects with search and filters
 */
export async function getAdminProjects({ search = "", category = "", status = "", page = 1, limit = 10 } = {}) {
  await ensureSchema();
  const offset = (page - 1) * limit;

  let countSql = "SELECT COUNT(*) as total FROM portfolio WHERE 1=1";
  let dataSql = "SELECT * FROM portfolio WHERE 1=1";
  const params = [];

  if (search) {
    countSql += " AND (title LIKE ? OR short_description LIKE ? OR client_name LIKE ?)";
    dataSql += " AND (title LIKE ? OR short_description LIKE ? OR client_name LIKE ?)";
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  if (category) {
    countSql += " AND LOWER(category) = LOWER(?)";
    dataSql += " AND LOWER(category) = LOWER(?)";
    params.push(category);
  }

  if (status) {
    countSql += " AND status = ?";
    dataSql += " AND status = ?";
    params.push(status);
  }

  dataSql += " ORDER BY display_order ASC, created_at DESC LIMIT ? OFFSET ?";

  const [countResult, rows] = await Promise.all([
    executeQuery(countSql, params),
    executeQuery(dataSql, [...params, limit, offset])
  ]);

  const total = countResult[0]?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data: rows || [],
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  };
}

/**
 * Admin POST: Creates a new portfolio project with Case Study fields
 */
export async function createProject(data) {
  await ensureSchema();

  const title = data.title?.trim();
  const category = data.category?.trim();
  const image = data.image?.trim() || "/assets/images/protfolio/protfolio1.png";
  const full_description = data.full_description || data.short_description || title;

  if (!title || !category) {
    throw new Error("Title and category are required.");
  }

  let slug = data.slug?.trim() ? generateSlug(data.slug) : generateSlug(title);
  if (!slug) slug = `project-${Date.now()}`;

  const existing = await executeQuery("SELECT id FROM portfolio WHERE slug = ?", [slug]);
  if (existing && existing.length > 0) {
    slug = `${slug}-${Date.now()}`;
  }

  const query = `
    INSERT INTO portfolio (
      slug, title, category, short_description, full_description,
      image, image_alt, hero_image, client_name, client_location, industry,
      development_time, target_audience, deliverables, technologies, gallery,
      project_url, status, featured, display_order,
      seo_title, seo_description, seo_keywords, robots, canonical_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const deliverablesJson = typeof data.deliverables === "string" ? data.deliverables : JSON.stringify(data.deliverables || []);
  const technologiesJson = typeof data.technologies === "string" ? data.technologies : JSON.stringify(data.technologies || []);
  const galleryJson = typeof data.gallery === "string" ? data.gallery : JSON.stringify(data.gallery || []);

  const params = [
    slug,
    title,
    category,
    data.short_description || null,
    full_description,
    image,
    data.image_alt || title,
    data.hero_image || image,
    data.client_name || null,
    data.client_location || null,
    data.industry || null,
    data.development_time || null,
    data.target_audience || null,
    deliverablesJson,
    technologiesJson,
    galleryJson,
    data.project_url || null,
    data.status || "published",
    data.featured ? 1 : 0,
    parseInt(data.display_order || 0, 10),
    data.seo_title || title,
    data.seo_description || data.short_description || null,
    data.seo_keywords || category,
    data.robots || "index, follow",
    data.canonical_url || null
  ];

  const result = await executeQuery(query, params);
  return { id: result.insertId, slug, ...data };
}

/**
 * Admin PUT: Updates an existing portfolio project with Case Study fields
 */
export async function updateProject(id, data) {
  await ensureSchema();

  const existing = await executeQuery("SELECT * FROM portfolio WHERE id = ?", [id]);
  if (!existing || existing.length === 0) {
    throw new Error("Portfolio project not found.");
  }

  const current = existing[0];
  const title = data.title?.trim() || current.title;
  const category = data.category?.trim() || current.category;
  const image = data.image?.trim() || current.image;
  const full_description = data.full_description || current.full_description;

  let slug = current.slug;
  if (data.slug && data.slug.trim() !== current.slug) {
    slug = generateSlug(data.slug);
    const slugCheck = await executeQuery("SELECT id FROM portfolio WHERE slug = ? AND id != ?", [slug, id]);
    if (slugCheck && slugCheck.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }
  }

  const deliverablesJson = data.deliverables !== undefined
    ? (typeof data.deliverables === "string" ? data.deliverables : JSON.stringify(data.deliverables))
    : current.deliverables;

  const technologiesJson = data.technologies !== undefined
    ? (typeof data.technologies === "string" ? data.technologies : JSON.stringify(data.technologies))
    : current.technologies;

  const galleryJson = data.gallery !== undefined
    ? (typeof data.gallery === "string" ? data.gallery : JSON.stringify(data.gallery))
    : current.gallery;

  const query = `
    UPDATE portfolio SET
      slug = ?,
      title = ?,
      category = ?,
      short_description = ?,
      full_description = ?,
      image = ?,
      image_alt = ?,
      hero_image = ?,
      client_name = ?,
      client_location = ?,
      industry = ?,
      development_time = ?,
      target_audience = ?,
      deliverables = ?,
      technologies = ?,
      gallery = ?,
      project_url = ?,
      status = ?,
      featured = ?,
      display_order = ?,
      seo_title = ?,
      seo_description = ?,
      seo_keywords = ?,
      robots = ?,
      canonical_url = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const params = [
    slug,
    title,
    category,
    data.short_description ?? current.short_description,
    full_description,
    image,
    data.image_alt ?? current.image_alt,
    data.hero_image ?? current.hero_image ?? image,
    data.client_name ?? current.client_name,
    data.client_location ?? current.client_location,
    data.industry ?? current.industry,
    data.development_time ?? current.development_time,
    data.target_audience ?? current.target_audience,
    deliverablesJson,
    technologiesJson,
    galleryJson,
    data.project_url ?? current.project_url,
    data.status ?? current.status,
    data.featured !== undefined ? (data.featured ? 1 : 0) : current.featured,
    parseInt(data.display_order ?? current.display_order, 10),
    data.seo_title ?? current.seo_title,
    data.seo_description ?? current.seo_description,
    data.seo_keywords ?? current.seo_keywords,
    data.robots ?? current.robots,
    data.canonical_url ?? current.canonical_url,
    id
  ];

  await executeQuery(query, params);
  return { id, slug, ...data };
}

/**
 * Admin DELETE: Deletes a portfolio project
 */
export async function deleteProject(id) {
  await ensureSchema();
  const existing = await executeQuery("SELECT * FROM portfolio WHERE id = ?", [id]);
  if (!existing || existing.length === 0) {
    throw new Error("Portfolio project not found.");
  }
  await executeQuery("DELETE FROM portfolio WHERE id = ?", [id]);
  return { success: true, id };
}

export const portfolioService = {
  ensureSchema,
  generateSlug,
  getCategories,
  getPublicProjects,
  getProjectBySlugOrId,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject
};

