import { executeQuery } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User, Tag, ChevronRight } from "lucide-react";

const STATIC_BLOG_POSTS = [
  {
    id: 1,
    img: "/assets/images/hero/blog-img1.png",
    category: "Inspiration",
    title: "8 Creative Ways to Repurpose Your Webinar Content",
    excerpt: "Learn how to maximize your webinar content across multiple channels.",
    slug: "8-creative-ways-to-repurpose-your-webinar-content",
    keywords: "Inspiration, Content Marketing, Webinars",
    content: `<h2>Why Repurpose Webinar Content?</h2>
<p>Webinars are a powerful tool for lead generation, but their value doesn't have to end when the live session closes. Many organizations spend hours producing a single webinar, only to let it sit in an archive.</p>
<h3>1. Turn Webinars into Blog Posts</h3>
<p>Summarize the main points of your webinar into a readable blog post. This helps reach audiences who prefer reading over watching, and provides search engines with text content to index.</p>
<h3>2. Create Short Video Clips</h3>
<p>Cut key insights into 1-minute clips for social media platforms like LinkedIn or Twitter. Short, punchy video formats are highly engaging and drive traffic back to the full recording.</p>
<h2>Optimizing the Repurposing Workflow</h2>
<p>By establishing a clear post-event workflow, you can turn a single 1-hour webinar into weeks of valuable content across multiple channels.</p>`,
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
    keywords: "Marketing, Lead Generation, Webinars",
    content: `<h2>The Power of Live Interaction</h2>
<p>No other marketing channel gives you 45 minutes of direct attention from a qualified lead. Webinars offer a unique opportunity to build trust and demonstrate expertise in real-time.</p>
<h3>Higher Engagement Rates</h3>
<p>Webinars consistently outperform static content. The live Q&amp;A sessions and interactive polls keep the audience actively engaged throughout the session.</p>
<h2>Measuring Webinar ROI</h2>
<p>Track metrics such as registration-to-attendee conversion rate, audience feedback, and post-webinar pipeline generation to measure true impact.</p>`,
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
    keywords: "Sales, Webinar Pipeline, Sales Enablement",
    content: `<h2>Post-Webinar Follow-Up Strategies</h2>
<p>The real sales work starts after the webinar is over. Without a structured follow-up, precious leads will quickly grow cold.</p>
<h3>1. Segment Your Audience</h3>
<p>Group attendees based on their level of engagement, questions asked, and whether they watched the live event or the on-demand recording.</p>
<h3>2. Enable Sales Teams</h3>
<p>Provide your sales team with key takeaways, attendee questions, and tailored outreach templates to start warmer conversations.</p>
<h2>Measuring Sales Conversion</h2>
<p>Integrate webinar data with your CRM to track pipeline progression and closing rates directly attributed to the event.</p>`,
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
    keywords: "Technology, Serverless, Next.js, Cloud",
    content: `<h2>What is Serverless?</h2>
<p>Serverless computing allows developers to build and run applications without thinking about managing infrastructure. Cloud providers handle the provisioning, scaling, and maintenance automatically.</p>
<h3>The Benefits of Scaling</h3>
<p>Automatic scaling means your application handles spikes effortlessly and scales down to zero when there is no traffic, saving deployment costs.</p>
<h2>Common Misconceptions</h2>
<p>Cold starts and vendor lock-in are common concerns. Fortunately, edge runtimes and hybrid frameworks like Next.js alleviate these issues significantly.</p>`,
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
    keywords: "Design, UX, Dashboards, UI Design",
    content: `<h2>Designing for Information Density</h2>
<p>Admin dashboards require presenting large amounts of data clearly. The challenge is balancing high density with legibility and avoiding cognitive overload.</p>
<h3>Information Hierarchy</h3>
<p>Organize data from high-level summaries at the top to granular details below. Use cards, grids, and consistent padding to structure information.</p>
<h2>Simplifying Navigation</h2>
<p>A consistent, collapsible sidebar navigation is key to complex dashboard usability, allowing users to jump between sections effortlessly.</p>`,
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
    keywords: "Security, JWT, Authentication, Sessions",
    content: `<h2>What is JWT?</h2>
<p>JSON Web Tokens are an open standard for securely transmitting information between parties as a JSON object. They are compact, self-contained, and digitally signed.</p>
<h3>Token Storage Best Practices</h3>
<p>Store access tokens in memory and refresh tokens in HttpOnly, secure cookies to mitigate Cross-Site Scripting (XSS) risks.</p>
<h2>Handling Session Expiry</h2>
<p>Implement seamless token refresh mechanisms to maintain user sessions safely without forcing frequent logins.</p>`,
    tags: [
      { id: 12, name: "Security", slug: "security" },
      { id: 13, name: "JWT", slug: "jwt" }
    ]
  }
];

// Helper to fetch blog post by ID or Slug
async function getBlogPost(idOrSlug) {
  try {
    const results = await executeQuery(
      "SELECT * FROM blogs WHERE id = ? OR slug = ?", 
      [idOrSlug, idOrSlug]
    );
    if (results && results.length > 0) {
      const post = results[0];
      
      // Fetch tags
      const tags = await executeQuery(
        `SELECT t.id, t.name, t.slug 
         FROM tags t 
         JOIN blog_tags bt ON t.id = bt.tag_id 
         WHERE bt.blog_id = ?`,
        [post.id]
      );

      // Fetch related blogs based on category or sharing any tag
      let relatedPosts = [];
      try {
        relatedPosts = await executeQuery(
          `SELECT DISTINCT b.id, b.slug, b.title, b.category, b.img, b.published_at 
           FROM blogs b
           LEFT JOIN blog_tags bt ON b.id = bt.blog_id
           WHERE b.id != ? AND (b.category = ? OR bt.tag_id IN (
             SELECT tag_id FROM blog_tags WHERE blog_id = ?
           ))
           ORDER BY b.published_at DESC
           LIMIT 3`,
          [post.id, post.category, post.id]
        );
      } catch (err) {
        console.error("Related posts fetch error:", err);
      }

      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.img,
        imgAlt: post.img_alt || post.title,
        author: post.author || "Gupta Tech Web",
        publishedAt: post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString(),
        modifiedAt: post.modified_at ? new Date(post.modified_at).toISOString() : new Date().toISOString(),
        seoTitle: post.seo_title || post.title,
        seoDescription: post.seo_description || post.excerpt,
        seoKeywords: post.seo_keywords || post.category || "Technology",
        robots: post.robots || "index, follow",
        tags: tags || [],
        relatedPosts: relatedPosts || []
      };
    }
  } catch (err) {
    console.warn("Database error in getBlogPost, falling back to static posts:", err);
  }

  // Static Fallback
  const post = STATIC_BLOG_POSTS.find(
    p => p.id.toString() === idOrSlug.toString() || p.slug === idOrSlug
  );

  if (post) {
    // Statically compute related posts
    const relatedPosts = STATIC_BLOG_POSTS.filter(
      p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.some(pt => pt.slug === t.slug)))
    ).slice(0, 3);

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.img,
      imgAlt: post.title,
      author: "Gupta Tech Web",
      publishedAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      seoTitle: `${post.title} | Gupta Tech Web`,
      seoDescription: post.excerpt,
      seoKeywords: post.keywords,
      robots: "index, follow",
      tags: post.tags || [],
      relatedPosts: relatedPosts || []
    };
  }

  // Not found fallback
  return {
    id: 999,
    slug: "not-found",
    title: `Blog Post Not Found`,
    excerpt: "The requested blog post could not be located.",
    content: "<p>The blog post you are looking for does not exist or has been moved.</p>",
    category: "Insights",
    image: "/assets/images/og-default.png",
    imgAlt: "Not found illustration",
    author: "Gupta Tech Web",
    publishedAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    seoTitle: "Blog Post Not Found | Gupta Tech Web",
    seoDescription: "The requested blog post could not be located.",
    seoKeywords: "Technology, Blog",
    robots: "noindex, nofollow",
    tags: [],
    relatedPosts: []
  };
}

// Helpers for Reading Time, Heading Injection, and TOC
function calculateReadingTime(htmlContent) {
  if (!htmlContent) return 1;
  const cleanText = htmlContent.replace(/<[^>]*>/g, "");
  const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200; // standard reading speed
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function generateTableOfContents(htmlContent) {
  if (!htmlContent) return [];
  const matches = [...htmlContent.matchAll(/<(h2|h3)[^>]*>(.*?)<\/\1>/gi)];
  return matches.map((match) => {
    const tag = match[1].toLowerCase();
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { tag, text, id };
  });
}

function injectHeadingIds(htmlContent) {
  if (!htmlContent) return "";
  return htmlContent.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (attrs.includes("id=")) {
      return match;
    }
    return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
  });
}

// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getBlogPost(id);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
  const canonicalUrl = `${baseUrl}/blog/${post.slug || post.id}`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: post.robots,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "Gupta Tech Web",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imgAlt,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getBlogPost(id);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
  const postUrl = `${baseUrl}/blog/${post.slug || post.id}`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`;
  
  // Calculate dynamic parameters
  const readingTime = calculateReadingTime(post.content);
  const toc = generateTableOfContents(post.content);
  const contentWithHeadingIds = injectHeadingIds(post.content);

  // Structured Data (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "headline": post.title,
    "description": post.seoDescription || post.excerpt,
    "image": [imageUrl],
    "datePublished": post.publishedAt,
    "dateModified": post.modifiedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gupta Tech Web",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-slate-300">
        
        {/* Breadcrumb UI */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs md:text-sm text-slate-400 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="text-slate-600" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight size={14} className="text-slate-600" />
          <span className="text-white font-medium line-clamp-1 max-w-[200px] md:max-w-none" aria-current="page">
            {post.title}
          </span>
        </nav>

        {/* Hero Section of Article */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#dc3545] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author, Date, Reading Time, and Tags */}
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-slate-400 border-b border-slate-800 pb-6 mb-6">
            <span className="flex items-center gap-1.5">
              <User size={16} className="text-[#dc3545]" />
              <span>By {post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[#dc3545]" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-[#dc3545]" />
              <span>{readingTime} min read</span>
            </span>
          </div>

          {/* Tag Badges rendering */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="flex items-center text-slate-400 text-xs gap-1 mr-1">
                <Tag size={14} /> Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full transition-all no-underline"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Banner image with descriptive Alt tag, lazy loading and Next.js Image component */}
        {post.image && (
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-10 border border-slate-800">
            <Image
              src={post.image}
              alt={post.imgAlt}
              fill
              priority={true} // First image above fold gets priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        )}

        {/* Main Content Layout with sidebar for Table of Contents */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Main Article Text */}
          <article className="w-full lg:w-3/4 order-2 lg:order-1 prose prose-invert max-w-none">
            {/* Table of Contents - Mobile Only */}
            {toc.length > 0 && (
              <div className="lg:hidden p-5 bg-slate-950 border border-slate-800 rounded-xl mb-8">
                <h5 className="font-semibold text-white text-base mb-3 flex items-center gap-2">
                  Table of Contents
                </h5>
                <ul className="space-y-2 text-sm text-slate-400">
                  {toc.map((item, idx) => (
                    <li key={idx} className={item.tag === 'h3' ? 'pl-4 list-none' : 'list-none'}>
                      <a href={`#${item.id}`} className="hover:text-red-400 transition-colors flex items-center gap-1.5 no-underline">
                        <span className="text-[#dc3545] text-xs">■</span>
                        <span>{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="blog-rich-content leading-relaxed text-slate-300 space-y-6"
              dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
            />
          </article>

          {/* Table of Contents Sticky Sidebar - Desktop Only */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:w-1/4 order-1 lg:order-2 sticky top-24 bg-slate-950 border border-slate-900 rounded-xl p-5 w-full">
              <h5 className="font-semibold text-white text-base mb-4 pb-2 border-b border-slate-900">
                Table of Contents
              </h5>
              <nav aria-label="Table of contents" className="toc-navigation">
                <ul className="space-y-3 text-sm text-slate-400 list-none p-0 m-0">
                  {toc.map((item, idx) => (
                    <li key={idx} className={`p-0 m-0 ${item.tag === 'h3' ? 'pl-4' : ''}`}>
                      <a 
                        href={`#${item.id}`} 
                        className="hover:text-red-400 transition-colors block py-0.5 no-underline leading-normal truncate"
                        title={item.text}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

        </div>

        {/* Related Blogs Section */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-900">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-6">
              Related Articles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((related) => (
                <article key={related.id} className="bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full group transition-all">
                  {related.img && (
                    <div className="relative w-full h-[160px]">
                      <Image
                        src={related.img}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        loading="lazy"
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-[#dc3545] uppercase tracking-wider block mb-1.5">
                      {related.category}
                    </span>
                    <h6 className="font-semibold text-white text-sm md:text-base leading-snug line-clamp-2 mb-3 group-hover:text-red-400 transition-colors">
                      {related.title}
                    </h6>
                    <div className="mt-auto pt-2">
                      <Link 
                        href={`/blog/${related.slug || related.id}`} 
                        className="text-[#dc3545] text-xs font-semibold no-underline hover:underline inline-flex items-center gap-1"
                      >
                        Read Post <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
