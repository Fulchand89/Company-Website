-- Migration: 005_create_blogs_table
-- Description: Create blogs table with full SEO, OpenGraph, and Twitter metadata support

-- UP
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

-- DOWN
-- DROP TABLE IF EXISTS blogs;
