-- Migration: 011_create_events_table
-- Description: Create events table for company culture and corporate activities

-- UP
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

-- DOWN
-- DROP TABLE IF EXISTS events;
