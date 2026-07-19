import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

const ALL_BLOG_POSTS = [
  {
    id: 1,
    img: "/assets/images/hero/blog-img1.png",
    category: "Inspiration",
    title: "8 Creative Ways to Repurpose Your Webinar Content",
    excerpt: "Learn how to maximize your webinar content across multiple channels.",
    slug: "8-creative-ways-to-repurpose-your-webinar-content",
    tags: [
      { id: 1, name: "Webinar", slug: "webinar" },
      { id: 2, name: "Content Marketing", slug: "content-marketing" },
      { id: 3, name: "Marketing Strategy", slug: "marketing-strategy" }
    ]
  },
  {
    id: 2,
    img: "/assets/images/hero/blog-img2.png",
    category: "Marketing",
    title: "Why Webinars Are the #1 Lead Generation Marketing Strategy, You May Not Be Thinking About",
    excerpt: "Discover why webinars are the most effective lead generation tool.",
    slug: "why-webinars-are-the-1-lead-generation-marketing-strategy",
    tags: [
      { id: 3, name: "Marketing Strategy", slug: "marketing-strategy" },
      { id: 1, name: "Webinar", slug: "webinar" },
      { id: 4, name: "Lead Generation", slug: "lead-generation" }
    ]
  },
  {
    id: 3,
    img: "/assets/images/hero/blog-img3.png",
    category: "Sales",
    title: "How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps",
    excerpt: "A comprehensive guide to converting webinar attendees into customers.",
    slug: "how-to-drive-qualified-pipeline-and-enable-sales-after-your-webinar-wraps",
    tags: [
      { id: 5, name: "Sales", slug: "sales" },
      { id: 1, name: "Webinar", slug: "webinar" },
      { id: 6, name: "Pipeline", slug: "pipeline" }
    ]
  },
  {
    id: 4,
    img: "/assets/images/hero/blog-img1.png",
    category: "Technology",
    title: "Understanding Serverless Architectures in Modern Web Development",
    excerpt: "Explore the pros, cons, and performance dynamics of serverless functions.",
    slug: "understanding-serverless-architectures-in-modern-web-development",
    tags: [
      { id: 7, name: "Technology", slug: "technology" },
      { id: 8, name: "Serverless", slug: "serverless" },
      { id: 9, name: "Next.js", slug: "nextjs" }
    ]
  },
  {
    id: 5,
    img: "/assets/images/hero/blog-img2.png",
    category: "Design",
    title: "UX Best Practices for Designing Complex Admin Dashboards",
    excerpt: "How to build high-density information interfaces that remain readable and clean.",
    slug: "ux-best-practices-for-designing-complex-admin-dashboards",
    tags: [
      { id: 10, name: "Design", slug: "design" },
      { id: 11, name: "UX", slug: "ux" }
    ]
  },
  {
    id: 6,
    img: "/assets/images/hero/blog-img3.png",
    category: "Security",
    title: "A Complete Guide to JWT Authentication and Session Management",
    excerpt: "Deep dive into secure tokens, cookie configuration, and route protections.",
    slug: "a-complete-guide-to-jwt-authentication-and-session-management",
    tags: [
      { id: 12, name: "Security", slug: "security" },
      { id: 13, name: "JWT", slug: "jwt" }
    ]
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "3", 10);
    const tag = searchParams.get("tag"); // Tag slug or name

    const offset = (page - 1) * limit;

    try {
      let blogs = [];
      let total = 0;

      if (tag) {
        // Query database filtering by tag slug/name
        const countResult = await executeQuery(
          `SELECT COUNT(DISTINCT b.id) as count
           FROM blogs b
           JOIN blog_tags bt ON b.id = bt.blog_id
           JOIN tags t ON bt.tag_id = t.id
           WHERE t.slug = ? OR t.name = ?`,
          [tag, tag]
        );
        total = countResult[0]?.count || 0;

        blogs = await executeQuery(
          `SELECT DISTINCT b.*
           FROM blogs b
           JOIN blog_tags bt ON b.id = bt.blog_id
           JOIN tags t ON bt.tag_id = t.id
           WHERE t.slug = ? OR t.name = ?
           ORDER BY b.published_at DESC
           LIMIT ? OFFSET ?`,
          [tag, tag, limit, offset]
        );
      } else {
        // Query all blogs from database
        const countResult = await executeQuery("SELECT COUNT(*) as count FROM blogs");
        total = countResult[0]?.count || 0;

        blogs = await executeQuery(
          `SELECT * FROM blogs
           ORDER BY published_at DESC
           LIMIT ? OFFSET ?`,
          [limit, offset]
        );
      }

      // Format blog lists to match UI keys
      const formattedBlogs = blogs.map(b => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        img: b.img,
        author: b.author,
        published_at: b.published_at
      }));

      // Fetch and attach tags to the retrieved blogs
      if (formattedBlogs.length > 0) {
        const blogIds = formattedBlogs.map(b => b.id);
        const tagResults = await executeQuery(
          `SELECT bt.blog_id, t.id, t.name, t.slug 
           FROM blog_tags bt 
           JOIN tags t ON bt.tag_id = t.id 
           WHERE bt.blog_id IN (${blogIds.map(() => "?").join(",")})`,
          blogIds
        );

        formattedBlogs.forEach(b => {
          b.tags = tagResults
            .filter(t => t.blog_id === b.id)
            .map(t => ({ id: t.id, name: t.name, slug: t.slug }));
        });
      }

      const totalPages = Math.ceil(total / limit);

      return NextResponse.json({
        data: formattedBlogs,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      });

    } catch (dbError) {
      console.warn("Database error, falling back to static blogs:", dbError);

      // Filter static blogs by tag if requested
      let filteredBlogs = ALL_BLOG_POSTS;
      if (tag) {
        filteredBlogs = ALL_BLOG_POSTS.filter(post =>
          post.tags?.some(t => t.slug.toLowerCase() === tag.toLowerCase() || t.name.toLowerCase() === tag.toLowerCase())
        );
      }

      const total = filteredBlogs.length;
      const totalPages = Math.ceil(total / limit);
      const data = filteredBlogs.slice(offset, offset + limit);

      return NextResponse.json({
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      });
    }

  } catch (error) {
    console.error("GET Blog API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve blog posts" },
      { status: 500 }
    );
  }
}

