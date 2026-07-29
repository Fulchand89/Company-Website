-- Migration: 012_create_team_members_and_teams
-- Description: Create team_members table and a compatible teams view/table to prevent Vercel errors

-- UP
-- 1. Create team_members table
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

-- 2. Create teams view to redirect queries looking for 'teams' table to 'team_members'
CREATE OR REPLACE VIEW teams AS SELECT * FROM team_members;

-- Seed default team members if empty
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

-- DOWN
-- DROP VIEW IF EXISTS teams;
-- DROP TABLE IF EXISTS team_members;
