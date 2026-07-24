-- Database Schema Script (Missing Tables Only)
-- Database: gtnew / company_db
-- Target Tables: contacts, blogs, tags, blog_tags

USE gtnew;

-- 1. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contacts_email (email),
  INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Blogs Table (Articles, News & SEO Content)
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

-- 3. Tags Table (Taxonomy)
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  INDEX idx_tags_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Blog Tags Junction Table
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id),
  CONSTRAINT fk_blog_tags_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_blog_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_blog_tags_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data: Default Blog Tags
INSERT INTO tags (name, slug) VALUES 
('Webinar', 'webinar'),
('Content Marketing', 'content-marketing'),
('Marketing Strategy', 'marketing-strategy'),
('Lead Generation', 'lead-generation'),
('Sales', 'sales'),
('Pipeline', 'pipeline'),
('Technology', 'technology'),
('Serverless', 'serverless'),
('Next.js', 'nextjs'),
('Design', 'design'),
('UX', 'ux'),
('Security', 'security'),
('JWT', 'jwt')
ON DUPLICATE KEY UPDATE id=id;
