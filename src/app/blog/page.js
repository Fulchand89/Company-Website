"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState("");

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
        if (!res.ok) throw new Error("Failed to load blog posts.");
        const data = await res.json();
        setBlogs(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        console.error(err);
        setError("Could not load blog posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page, selectedTag]);

  const handleTagClick = (tagSlug) => {
    setSelectedTag(tagSlug);
    setPage(1); // Reset to first page
    if (typeof window !== "undefined") {
      const newUrl = tagSlug
        ? `${window.location.pathname}?tag=${encodeURIComponent(tagSlug)}`
        : window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

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

      <section className="p-5 bg-white rounded-[32px] mx-4 my-4">
        {/* Active Tag Filter Banner */}
        {selectedTag && (
          <div className="mb-6 p-4 bg-slate-55 border border-slate-100 rounded-xl flex items-center justify-between mx-3">
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between gap-y-8">
              {blogs.map((post, index) => (
                <div key={index} className="w-full lg:w-1/3 px-3 md:w-1/2">
                  <div className="h-full flex flex-col gap-4 bg-white rounded-xl overflow-hidden shadow-sm">
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
                    <div className="px-4 pb-4">
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
                      <h6 className="font-semibold text-[#0f172a]">{post.title}</h6>
                      <p className="text-[#6c757d] text-sm mt-2">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug || post.id}`} className="text-[#dc3545] no-underline text-sm font-medium">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
