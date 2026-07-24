-- Migration: 008_alter_existing_tables
-- Description: Safely upgrade pre-existing database tables to match full application requirements without data loss

-- 1. Upgrade users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) NOT NULL AFTER email;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user' AFTER password_hash;

-- 2. Upgrade applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending' AFTER resume_url;

-- 3. Upgrade blogs table with status and SEO/OG/Twitter columns
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft' AFTER author;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_image VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_url VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_type VARCHAR(100) DEFAULT 'article';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS twitter_card VARCHAR(100) DEFAULT 'summary_large_image';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS twitter_description TEXT DEFAULT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS twitter_image VARCHAR(255) DEFAULT NULL;
