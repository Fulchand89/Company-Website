import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { blogService, ensureSchema } from "@/services/blogService";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl?.searchParams || new URL(request.url).searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "3", 10);
    const tag = searchParams.get("tag"); // Tag slug or name
    const category = searchParams.get("category"); // Category name

    const offset = (page - 1) * limit;

    try {
      let blogs = [];
      let total = 0;

      // Fetch dynamic categories from database
      let dbCategories = [];
      try {
        dbCategories = await blogService.getAllCategories();
      } catch (catErr) {
        console.warn("Failed to fetch dynamic categories:", catErr);
      }

      // blogService.getAllCategories() already includes required categories (Branding, Social, Growth)

      if (tag) {
        // Query database filtering by tag slug/name and published status
        const [countResult, blogRows] = await Promise.all([
          executeQuery(
            `SELECT COUNT(DISTINCT b.id) as count
             FROM blogs b
             JOIN blog_tags bt ON b.id = bt.blog_id
             JOIN tags t ON bt.tag_id = t.id
             WHERE (t.slug = ? OR t.name = ?) AND b.status = 'published'`,
            [tag, tag]
          ),
          executeQuery(
            `SELECT DISTINCT b.*
             FROM blogs b
             JOIN blog_tags bt ON b.id = bt.blog_id
             JOIN tags t ON bt.tag_id = t.id
             WHERE (t.slug = ? OR t.name = ?) AND b.status = 'published'
             ORDER BY b.published_at DESC
             LIMIT ? OFFSET ?`,
            [tag, tag, limit, offset]
          )
        ]);
        total = countResult[0]?.count || 0;
        blogs = blogRows || [];
      } else if (category) {
        // Query database filtering by category and published status
        const [countResult, blogRows] = await Promise.all([
          executeQuery(
            `SELECT COUNT(*) as count FROM blogs WHERE status = 'published' AND LOWER(category) = LOWER(?)`,
            [category]
          ),
          executeQuery(
            `SELECT * FROM blogs
             WHERE status = 'published' AND LOWER(category) = LOWER(?)
             ORDER BY published_at DESC
             LIMIT ? OFFSET ?`,
            [category, limit, offset]
          )
        ]);
        total = countResult[0]?.count || 0;
        blogs = blogRows || [];
      } else {
        // Query all published blogs from database
        const [countResult, blogRows] = await Promise.all([
          executeQuery("SELECT COUNT(*) as count FROM blogs WHERE status = 'published'"),
          executeQuery(
            `SELECT * FROM blogs
             WHERE status = 'published'
             ORDER BY published_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
          )
        ]);
        total = countResult[0]?.count || 0;
        blogs = blogRows || [];
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
          b.tags = (tagResults || [])
            .filter(t => t.blog_id === b.id)
            .map(t => ({ id: t.id, name: t.name, slug: t.slug }));
        });
      }

      const totalPages = Math.ceil(total / limit) || 1;

      const responsePayload = {
        data: formattedBlogs,
        categories: dbCategories,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      };

      return NextResponse.json(responsePayload, {
        headers: { 
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store"
        }
      });

    } catch (dbError) {
      console.error("Database error:", dbError.message);
      return NextResponse.json({
        data: [],
        categories: ["Branding", "Social", "Growth"],
        pagination: { total: 0, page, limit, totalPages: 0 }
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

