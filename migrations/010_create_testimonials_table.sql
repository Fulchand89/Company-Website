-- Migration: 010_create_testimonials_table
-- Description: Create testimonials table for user feedback and reviews

-- UP
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

-- Seed default testimonials if empty (handled by testimonialService on start as well, but added here for schema completeness)
INSERT INTO testimonials (name, project, text, img, rating, status) VALUES 
('Sarah Jenkins', 'Cloud Infrastructure Migration', 'Gupta Tech Web delivered our cloud migration project ahead of schedule. Their team demonstrated deep AWS expertise and helped us reduce our monthly infrastructure spend by 30%.', '/assets/images/hero/team-demo.png', 5, 'published'),
('Michael Chang', 'E-commerce Platform Redesign', 'The custom e-commerce solution built by Gupta Tech Web has doubled our conversion rate. The checkout process is seamless, and the mobile performance is outstanding.', '/assets/images/hero/team-demo.png', 5, 'published'),
('Emily Rodriguez', 'Brand Identity & UX', 'The UI/UX team completely overhauled our legacy application. The fresh, modern interface has dramatically increased our user retention and simplified the onboarding process.', '/assets/images/hero/team-demo.png', 5, 'published')
ON DUPLICATE KEY UPDATE id=id;

-- DOWN
-- DROP TABLE IF EXISTS testimonials;
