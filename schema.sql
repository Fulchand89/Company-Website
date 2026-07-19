-- Create Database
CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;


-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position VARCHAR(255) NOT NULL,
  resume_url VARCHAR(555) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin User (Password: admin123)
-- In production, make sure to hash the password properly using bcrypt.
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin User', 'admin@crazydigitalworlds.com', '$2b$10$wKzP3eC55u2kS8Q5T0H.y.Vb6wF2B6sK4U7Fz6Z9O5qW7v5p5q5q', 'admin')
ON DUPLICATE KEY UPDATE id=id;


-- 4. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  img VARCHAR(255) NOT NULL,
  img_alt VARCHAR(255) DEFAULT NULL,
  author VARCHAR(255) DEFAULT 'Gupta Tech Web',
  seo_title VARCHAR(255) DEFAULT NULL,
  seo_description TEXT DEFAULT NULL,
  seo_keywords VARCHAR(255) DEFAULT NULL,
  robots VARCHAR(100) DEFAULT 'index, follow',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Tags Table
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- 6. Blog Tags Relationship Table
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Seed Tags
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

-- Seed Blogs
INSERT INTO blogs (slug, title, excerpt, content, category, img, img_alt, author, seo_title, seo_description, seo_keywords, robots) VALUES
('8-creative-ways-to-repurpose-your-webinar-content', 
 '8 Creative Ways to Repurpose Your Webinar Content', 
 'Learn how to maximize your webinar content across multiple channels.', 
 '<h2>Why Repurpose Webinar Content?</h2><p>Webinars are a powerful tool for lead generation, but their value doesn''t have to end when the live session closes.</p><h3>1. Turn Webinars into Blog Posts</h3><p>Summarize the main points of your webinar into a readable blog post like this one.</p><h3>2. Create Short Video Clips</h3><p>Cut key insights into 1-minute clips for LinkedIn or YouTube Shorts.</p><h2>Optimizing the Repurposing Workflow</h2><p>By establishing a clear workflow, you can turn a single 1-hour webinar into weeks of content.</p>', 
 'Inspiration', 
 '/assets/images/hero/blog-img1.png', 
 'Webinar content repurposing graphic', 
 'Gupta Tech Web', 
 '8 Creative Ways to Repurpose Your Webinar Content | Gupta Tech Web', 
 'Learn how to maximize your webinar content across multiple channels, including blogs, social clips, and email templates.', 
 'webinar, repurpose content, marketing strategy, video production', 
 'index, follow'),

('why-webinars-are-the-1-lead-generation-marketing-strategy', 
 'Why Webinars Are the #1 Lead Generation Marketing Strategy, You May Not Be Thinking About', 
 'Discover why webinars are the most effective lead generation tool.', 
 '<h2>The Power of Live Interaction</h2><p>No other marketing channel gives you 45 minutes of direct attention from a qualified lead.</p><h3>Higher Engagement Rates</h3><p>Webinars consistently outperform static content in terms of audience engagement and retention.</p><h2>Measuring Webinar ROI</h2><p>Track metrics such as registration-to-attendee conversion and post-webinar pipeline.</p>', 
 'Marketing', 
 '/assets/images/hero/blog-img2.png', 
 'Webinar lead generation presentation', 
 'Gupta Tech Web', 
 'Why Webinars Are the #1 Lead Generation Strategy | Gupta Tech Web', 
 'Discover why webinars are the most effective lead generation tool and how to implement them in your B2B marketing mix.', 
 'lead generation, webinars, marketing strategy, B2B marketing', 
 'index, follow'),

('how-to-drive-qualified-pipeline-and-enable-sales-after-your-webinar-wraps', 
 'How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps', 
 'A comprehensive guide to converting webinar attendees into customers.', 
 '<h2>Post-Webinar Follow-Up Strategies</h2><p>The real sales work starts after the webinar is over.</p><h3>1. Segment Your Audience</h3><p>Group attendees by their engagement score and questions asked.</p><h3>2. Enable Sales Teams</h3><p>Provide sales reps with snippet videos and key takeaways to share with prospects.</p>', 
 'Sales', 
 '/assets/images/hero/blog-img3.png', 
 'Sales pipeline tracking graph', 
 'Gupta Tech Web', 
 'How to Drive Qualified Pipeline Post-Webinar | Gupta Tech Web', 
 'A comprehensive guide to converting webinar attendees into customers and enabling sales reps with post-event insights.', 
 'sales pipeline, webinar sales, sales enablement, lead conversion', 
 'index, follow'),

('understanding-serverless-architectures-in-modern-web-development', 
 'Understanding Serverless Architectures in Modern Web Development', 
 'Explore the pros, cons, and performance dynamics of serverless functions.', 
 '<h2>What is Serverless?</h2><p>Serverless computing allows developers to build and run applications without thinking about servers.</p><h3>The Benefits of Scaling</h3><p>Automatic scaling means your application handles spikes effortlessly and you only pay for what you use.</p><h2>Common Misconceptions</h2><p>Cold starts and vendor lock-in are common concerns that have modern solutions.</p>', 
 'Technology', 
 '/assets/images/hero/blog-img1.png', 
 'Serverless architecture diagram concept', 
 'Gupta Tech Web', 
 'Understanding Serverless Architectures | Gupta Tech Web', 
 'Explore the pros, cons, and performance dynamics of serverless functions and modern cloud deployments.', 
 'serverless, cloud computing, Next.js, lambda functions', 
 'index, follow'),

('ux-best-practices-for-designing-complex-admin-dashboards', 
 'UX Best Practices for Designing Complex Admin Dashboards', 
 'How to build high-density information interfaces that remain readable and clean.', 
 '<h2>Designing for Information Density</h2><p>Admin dashboards require presenting large amounts of data clearly.</p><h3>Information Hierarchy</h3><p>Organize data from high-level summaries at the top to granular details below.</p><h2>Simplifying Navigation</h2><p>A consistent sidebar navigation is key to complex dashboard usability.</p>', 
 'Design', 
 '/assets/images/hero/blog-img2.png', 
 'Sleek admin dashboard user interface mockups', 
 'Gupta Tech Web', 
 'UX Best Practices for Admin Dashboards | Gupta Tech Web', 
 'Learn how to build high-density information interfaces that remain readable, clean, and highly usable for admins.', 
 'UX design, dashboards, UI design, information design', 
 'index, follow'),

('a-complete-guide-to-jwt-authentication-and-session-management', 
 'A Complete Guide to JWT Authentication and Session Management', 
 'Deep dive into secure tokens, cookie configuration, and route protections.', 
 '<h2>What is JWT?</h2><p>JSON Web Tokens are an open standard for securely transmitting information between parties as a JSON object.</p><h3>Token Storage Best Practices</h3><p>Store access tokens in memory and refresh tokens in HttpOnly cookies to mitigate XSS risks.</p><h2>Handling Session Expiry</h2><p>Implement seamless token refresh mechanisms to maintain user sessions safely.</p>', 
 'Security', 
 '/assets/images/hero/blog-img3.png', 
 'JWT secure authentication lock graphic', 
 'Gupta Tech Web', 
 'Complete Guide to JWT Auth & Session Management | Gupta Tech Web', 
 'Deep dive into secure tokens, cookie configuration, and route protections for modern web applications.', 
 'JWT, authentication, session management, web security', 
 'index, follow')
ON DUPLICATE KEY UPDATE id=id;

-- Seed Blog Tags relationships (assuming auto-increment starts at 1)
INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 3), (2, 1), (2, 4),
(3, 5), (3, 1), (3, 6),
(4, 7), (4, 8), (4, 9),
(5, 10), (5, 11),
(6, 12), (6, 13);

