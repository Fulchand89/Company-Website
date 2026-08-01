-- Migration: 013_create_portfolio_table
-- Description: Create portfolio table with SEO, OpenGraph, and Twitter metadata support + Seed initial portfolio items

-- UP
CREATE TABLE IF NOT EXISTS portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,

  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,

  category VARCHAR(100) NOT NULL,

  short_description TEXT DEFAULT NULL,
  full_description LONGTEXT NOT NULL,

  image VARCHAR(255) NOT NULL,
  image_alt VARCHAR(255) DEFAULT NULL,

  gallery JSON DEFAULT NULL,

  client_name VARCHAR(255) DEFAULT NULL,
  project_url VARCHAR(255) DEFAULT NULL,

  technologies JSON DEFAULT NULL,

  completion_date DATE DEFAULT NULL,

  status VARCHAR(50) DEFAULT 'published',
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,

  -- SEO
  seo_title VARCHAR(255) DEFAULT NULL,
  seo_description TEXT DEFAULT NULL,
  seo_keywords VARCHAR(255) DEFAULT NULL,
  robots VARCHAR(100) DEFAULT 'index, follow',
  canonical_url VARCHAR(255) DEFAULT NULL,
  focus_keyword VARCHAR(255) DEFAULT NULL,

  -- Open Graph
  og_title VARCHAR(255) DEFAULT NULL,
  og_description TEXT DEFAULT NULL,
  og_image VARCHAR(255) DEFAULT NULL,
  og_url VARCHAR(255) DEFAULT NULL,
  og_type VARCHAR(100) DEFAULT 'website',

  -- Twitter
  twitter_card VARCHAR(100) DEFAULT 'summary_large_image',
  twitter_title VARCHAR(255) DEFAULT NULL,
  twitter_description TEXT DEFAULT NULL,
  twitter_image VARCHAR(255) DEFAULT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_portfolio_slug (slug),
  INDEX idx_portfolio_category (category),
  INDEX idx_portfolio_status (status),
  INDEX idx_portfolio_featured (featured),
  INDEX idx_portfolio_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEED INITIAL DATA IF TABLE IS EMPTY
INSERT IGNORE INTO portfolio 
  (id, slug, title, category, short_description, full_description, image, image_alt, client_name, project_url, status, featured, display_order, seo_title, seo_description)
VALUES
  (
    1,
    'mind-reset-website',
    'Mind Reset Website',
    'Website',
    'Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.',
    '<h2>Project Overview</h2><p>Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.</p><h3>Key Features</h3><ul><li>Customized dashboard for students and tutors</li><li>Integrated scheduling & booking system</li><li>Secure payment processing</li></ul>',
    '/assets/images/hero/mind-reset.png',
    'Mind Reset Website',
    'Smart Brain Academy',
    'https://mindreset.example.com',
    'published',
    TRUE,
    1,
    'Mind Reset Website | Gupta Tech Web Portfolio',
    'Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem.'
  ),
  (
    2,
    'booking-luxor-website',
    'Booking Luxor Website',
    'Website',
    'Luxor travel and hotel booking platform designed for seamless excursion reservations, intuitive user UI, and high-conversion landing flows.',
    '<h2>Project Overview</h2><p>Luxor travel and hotel booking platform designed for seamless excursion reservations, intuitive user UI, and high-conversion landing flows.</p><h3>Key Features</h3><ul><li>Real-time booking availability calendar</li><li>Interactive Egypt travel packages</li><li>Multi-currency payment gateway</li></ul>',
    '/assets/images/protfolio/protfolio2.png',
    'Booking Luxor Website',
    'Luxor Tours',
    'https://bookingluxor.example.com',
    'published',
    TRUE,
    2,
    'Booking Luxor Website | Gupta Tech Web Portfolio',
    'Luxor travel and hotel booking platform designed for seamless excursion reservations.'
  ),
  (
    3,
    'smart-brain-academy',
    'Smart Brain Academy',
    'Website',
    'Educational web platform offering interactive learning modules, student performance tracking, and live virtual classroom integrations.',
    '<h2>Project Overview</h2><p>Educational web platform offering interactive learning modules, student performance tracking, and live virtual classroom integrations.</p><h3>Key Features</h3><ul><li>Interactive quiz engines & video courses</li><li>Live progress analytics</li><li>Automated certification issuance</li></ul>',
    '/assets/images/protfolio/protfolio3.png',
    'Smart Brain Academy',
    'Smart Brain Academy Inc',
    'https://smartbrain.example.com',
    'published',
    FALSE,
    3,
    'Smart Brain Academy | Gupta Tech Web Portfolio',
    'Educational web platform offering interactive learning modules and student tracking.'
  ),
  (
    4,
    'pauwii-mobile-application',
    'Pauwii Mobile Application',
    'Applications',
    'Cross-platform mobile application providing real-time pet care services, veterinary appointment scheduling, and community pet forums.',
    '<h2>Project Overview</h2><p>Cross-platform mobile application providing real-time pet care services, veterinary appointment scheduling, and community pet forums.</p><h3>Key Features</h3><ul><li>GPS pet tracking & health logs</li><li>One-click vet appointment booking</li><li>Push notification reminders</li></ul>',
    '/assets/images/protfolio/protfolio4.png',
    'Pauwii Mobile Application',
    'Pauwii Pet Tech',
    'https://pauwii.example.com',
    'published',
    TRUE,
    4,
    'Pauwii Mobile Application | Gupta Tech Web Portfolio',
    'Cross-platform mobile application providing real-time pet care services.'
  ),
  (
    5,
    'go-wheeler-mobile-application',
    'Go Wheeler Mobile Application',
    'Applications',
    'On-demand vehicle rental and ride hailing mobile app with live driver tracking, automated fare calculations, and digital wallet payment.',
    '<h2>Project Overview</h2><p>On-demand vehicle rental and ride hailing mobile app with live driver tracking, automated fare calculations, and digital wallet payment.</p><h3>Key Features</h3><ul><li>Real-time driver location mapping</li><li>In-app digital payment wallet</li><li>Automated receipt generation</li></ul>',
    '/assets/images/protfolio/protfolio5.png',
    'Go Wheeler Mobile Application',
    'Go Wheeler Mobility',
    'https://gowheeler.example.com',
    'published',
    FALSE,
    5,
    'Go Wheeler Mobile Application | Gupta Tech Web Portfolio',
    'On-demand vehicle rental and ride hailing mobile app.'
  );

-- DOWN
-- DROP TABLE IF EXISTS portfolio;