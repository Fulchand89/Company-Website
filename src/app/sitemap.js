import { executeQuery } from "@/lib/db";
import { ensureSchema } from "@/services/blogService";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";

  // Static routes in the system
  const staticRoutes = [
    "",
    "/about",
    "/careers",
    "/contact",
    "/portfolio",
    "/testimonial",
    "/service",
    "/service/app",
    "/industry",
    "/industry/e-commerce",
    "/industry/fintech-application",
    "/industry/healthcare",
    "/industry/realestate",
    "/industry/restaurant",
    "/industry/retail",
    "/industry/social-media-platform",
    "/industry/supply-chain",
    "/industry/travel",
    "/industry/tutor",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog routes mapping
  let dynamicRoutes = [];
  try {
    await ensureSchema();
    const blogs = await executeQuery("SELECT id, slug, modified_at FROM blogs WHERE status = 'published'");
    if (blogs && blogs.length > 0) {
      dynamicRoutes = blogs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug || post.id}`,
        lastModified: post.modified_at ? new Date(post.modified_at).toISOString() : new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.warn("Sitemap DB fetch failed, falling back to static list:", err);
  }

  // Fallback if DB query was empty/failed
  if (dynamicRoutes.length === 0) {
    const staticSlugs = [
      "8-creative-ways-to-repurpose-your-webinar-content",
      "why-webinars-are-the-1-lead-generation-marketing-strategy",
      "how-to-drive-qualified-pipeline-and-enable-sales-after-your-webinar-wraps",
      "understanding-serverless-architectures-in-modern-web-development",
      "ux-best-practices-for-designing-complex-admin-dashboards",
      "a-complete-guide-to-jwt-authentication-and-session-management"
    ];
    dynamicRoutes = staticSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...dynamicRoutes];
}

