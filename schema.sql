-- ==========================================
-- Gupta Tech Web Complete Database Schema
-- Compatible with Localhost, Vercel, and Hostinger MySQL Databases
-- Ready to run directly in phpMyAdmin
-- ==========================================

-- Select Database (uncomment and edit if needed)
-- USE u879279162_gtwwebsite;

-- 1. Users Table (Admin & Staff Authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  reset_token VARCHAR(255) DEFAULT NULL,
  reset_token_expiry DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Admin User (Default admin: admin@crazydigitalworlds.com)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin User', 'admin@crazydigitalworlds.com', '$2b$10$wKzP3eC55u2kS8Q5T0H.y.Vb6wF2B6sK4U7Fz6Z9O5qW7v5p5q5q', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- 2. Careers / Job Openings Table
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_jobs_department (department),
  INDEX idx_jobs_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Job Applications Table (Candidates)
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position VARCHAR(255) NOT NULL,
  resume_url VARCHAR(555) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applications_position (position),
  INDEX idx_applications_status (status),
  INDEX idx_applications_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Contact Form Submissions Table
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

-- 5. Blogs Table (Articles, News & SEO Content)
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

-- 6. Tags Table (Taxonomy)
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  INDEX idx_tags_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Blog Tags
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

-- 7. Blog Tags Junction Table
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id),
  CONSTRAINT fk_blog_tags_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_blog_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_blog_tags_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Testimonials Table (Reviews)
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

-- Seed default testimonials
INSERT INTO testimonials (name, project, text, img, rating, status) VALUES 
('Sarah Jenkins', 'Cloud Infrastructure Migration', 'Gupta Tech Web delivered our cloud migration project ahead of schedule. Their team demonstrated deep AWS expertise and helped us reduce our monthly infrastructure spend by 30%.', '/assets/images/hero/team-demo.png', 5, 'published'),
('Michael Chang', 'E-commerce Platform Redesign', 'The custom e-commerce solution built by Gupta Tech Web has doubled our conversion rate. The checkout process is seamless, and the mobile performance is outstanding.', '/assets/images/hero/team-demo.png', 5, 'published'),
('Emily Rodriguez', 'Brand Identity & UX', 'The UI/UX team completely overhauled our legacy application. The fresh, modern interface has dramatically increased our user retention and simplified the onboarding process.', '/assets/images/hero/team-demo.png', 5, 'published')
ON DUPLICATE KEY UPDATE id=id;

-- 9. Events Table (Company Activities & Milestones)
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  img VARCHAR(500) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default events
INSERT INTO events (title, img, status, display_order) VALUES 
('Annual Tech Conference', '/assets/images/about/Event1.png', 'active', 1),
('Office Hackathon & Brainstorming', '/assets/images/about/Event2.png', 'active', 2),
('Team Building & Outing', '/assets/images/about/Event3.png', 'active', 3),
('Interactive Workshops', '/assets/images/about/Event4.png', 'active', 4),
('Celebrations & Culture', '/assets/images/about/Event5.png', 'active', 5)
ON DUPLICATE KEY UPDATE id=id;

-- 10. Team Members Table (Company Staff Profile)
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

-- Seed default team members
INSERT INTO team_members (name, designation, img, bio, social_links, display_order, featured, status) VALUES 
('Jennifer', 'CEO & Founder', '/assets/images/hero/team-demo.png', 'Visionary leader with 15+ years of experience driving technology and business innovation.', '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}', 1, 1, 'active'),
('Alexander Reed', 'Chief Technology Officer', '/assets/images/hero/team-demo.png', 'Architecting high-scale enterprise systems and leading engineering teams.', '{"linkedin": "https://linkedin.com", "github": "https://github.com"}', 2, 1, 'active'),
('Sophia Chen', 'VP of Product & Design', '/assets/images/hero/team-demo.png', 'Passionate about creating user-centered designs and seamless digital experiences.', '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}', 3, 1, 'active'),
('Marcus Vance', 'Head of AI & Engineering', '/assets/images/hero/team-demo.png', 'Specializing in Machine Learning pipelines and cloud architecture.', '{"linkedin": "https://linkedin.com", "github": "https://github.com"}', 4, 1, 'active'),
('Emily Watson', 'Lead UX Consultant', '/assets/images/hero/team-demo.png', 'Crafting intuitive digital touchpoints and brand strategies.', '{"linkedin": "https://linkedin.com"}', 5, 0, 'active'),
('David Kim', 'Senior DevOps Engineer', '/assets/images/hero/team-demo.png', 'Ensuring zero-downtime deployments and cloud infrastructure resilience.', '{"linkedin": "https://linkedin.com", "github": "https://github.com"}', 6, 0, 'active'),
('Rachel Green', 'Digital Marketing Strategist', '/assets/images/hero/team-demo.png', 'Accelerating brand growth through data-driven performance marketing.', '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}', 7, 0, 'active'),
('Daniel Miller', 'Senior Full-Stack Developer', '/assets/images/hero/team-demo.png', 'Building robust web and mobile applications with modern tech stacks.', '{"linkedin": "https://linkedin.com", "github": "https://github.com"}', 8, 0, 'active')
ON DUPLICATE KEY UPDATE id=id;

-- 11. Compatibility View: Teams Table Alias (Resolves Vercel schema mismatch errors)
CREATE OR REPLACE VIEW teams AS SELECT * FROM team_members;
