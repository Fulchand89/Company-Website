-- Migration: 009_seed_initial_data
-- Description: Seed initial default data for admin user and blog tags

-- Seed Admin User (Default admin: admin@crazydigitalworlds.com)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin User', 'admin@crazydigitalworlds.com', '$2b$10$wKzP3eC55u2kS8Q5T0H.y.Vb6wF2B6sK4U7Fz6Z9O5qW7v5p5q5q', 'admin')
ON DUPLICATE KEY UPDATE id=id;

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

-- Set existing blogs to 'published' so they appear on frontend
UPDATE blogs SET status = 'published' WHERE status IS NULL OR status = '' OR status = 'draft';
