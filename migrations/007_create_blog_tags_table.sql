-- Migration: 007_create_blog_tags_table
-- Description: Create blog_tags many-to-many junction table with foreign keys

-- UP
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id),
  CONSTRAINT fk_blog_tags_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_blog_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_blog_tags_tag (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOWN
-- DROP TABLE IF EXISTS blog_tags;
