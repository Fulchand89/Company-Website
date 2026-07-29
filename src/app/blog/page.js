"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogSkeleton } from "@/components/Skeleton";
import Pagination from "@/components/Pagination";

const INITIAL_BLOGS = [
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState("");

  const blogCategories = [
    { name: "All Posts", slug: "" },
    { name: "Branding", slug: "branding" },
    { name: "Social", slug: "social" },
    { name: "Technology", slug: "technology" },
    { name: "Growth", slug: "growth" },
  ];

  // Sync state with URL parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tagParam = params.get("tag") || "";
      setSelectedTag(tagParam);
    }
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const tagQuery = selectedTag ? `&tag=${encodeURIComponent(selectedTag)}` : "";
        const res = await fetch(`/api/blog?page=${page}&limit=3${tagQuery}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setBlogs(data.data);
            setTotalPages(data.pagination?.totalPages || 1);
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page, selectedTag]);

  const handleTagClick = (tagSlug) => {
    setSelectedTag(tagSlug);
    setPage(1);
    if (typeof window !== "undefined") {
      const newUrl = tagSlug
        ? `${window.location.pathname}?tag=${encodeURIComponent(tagSlug)}`
        : window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };
  const allTags = [
    ...new Map(
      INITIAL_BLOGS.flatMap((blog) => blog.tags || []).map((tag) => [
        tag.slug,
        tag,
      ])
    ).values(),
  ];

  const displayList = blogs;

  return (
    <>
      <section className="hero-section">
        <div className="hero-content w-full h-[400px] text-white bg-[url('/assets/images/blog/blog-bg.png')] bg-center bg-cover bg-no-repeat py-35">
          <div className="text-center text-white my-5" style={{ paddingTop: "70px", paddingBottom: "0px" }}>
            <h1 className="font-bold text-4xl md:text-5xl">Our Blog</h1>
            <p className="text-xl mt-2">Insights, ideas, and stories from our team.</p>
          </div>
        </div>
      </section>

      <section className="w-full p-5 bg-white rounded-[32px] my-4 relative">
        {/* Active Tag Filter Banner */}
        {selectedTag && (
          <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between mx-3">
            <span className="text-slate-800 text-sm font-medium">
              Showing posts tagged with: <span className="text-[#dc3545] font-semibold">#{selectedTag}</span>
            </span>
            <button
              onClick={() => handleTagClick("")}
              className="px-3 py-1 text-xs font-semibold text-white bg-slate-650 hover:bg-slate-700 rounded-full transition-colors cursor-pointer border-none"
            >
              Clear Filter ✕
            </button>
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Blog </h2>


          <p className="text-gray-500 text-sm leading-relaxed w-full">
            We take pride in building lasting partnerships through quality work,
            timely delivery, and transparent communication. Our client testimonials
            reflect the trust and satisfaction we strive to achieve in every project.
          </p>
        </div>


        <div className="flex flex-wrap justify-center items-center gap-30 mb-10 px-3">
          {blogCategories.map((category) => (
            <button
              key={category.slug || "all"}
              onClick={() => handleTagClick(category.slug)}
              className={`px-6 py-2 rounded-full text-sm font-medium border transition ${selectedTag === category.slug
                  ? "bg-[#dc3545] text-white border-[#dc3545]"
                  : "bg-white text-[#dc3545] border-[#dc3545] hover:bg-red-50"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap justify-between gap-y-8 min-h-[300px]">
            {loading ? (
              <BlogSkeleton count={3} />
            ) : displayList.length === 0 ? (
              <p className="w-full text-center text-gray-400 py-10">No blog posts found.</p>
            ) : (
              displayList.map((post, index) => (
                <div key={post.id || index} className="w-full lg:w-1/3 px-3 md:w-1/2">
                  <div className="h-full flex flex-col gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {post.img && (
                      <Image
                        src={post.img}
                        alt={post.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    )}
                    <div className="px-4 pb-4 flex flex-col flex-grow">
                      {/* Responsive Tag Pills & Category */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5 items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 border border-slate-300 rounded-[24px] text-[#0f172a] text-xs font-semibold">
                          {post.category}
                        </span>
                        {post.tags && post.tags.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => handleTagClick(tag.slug)}
                            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-[24px] transition-colors cursor-pointer border-none ${selectedTag === tag.slug
                              ? "bg-[#dc3545] text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              }`}
                            aria-label={`Filter blogs by tag ${tag.name}`}
                          >
                            #{tag.name}
                          </button>
                        ))}
                      </div>
                      <h6 className="font-semibold text-[#0f172a] text-base leading-snug">{post.title}</h6>
                      <p className="text-[#6c757d] text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto pt-3">
                        <Link href={`/blog/${post.slug || post.id}`} className="text-[#dc3545] no-underline text-sm font-medium hover:underline inline-flex items-center gap-1">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          <div className="pt-6 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </section>
    </>
  );
} 