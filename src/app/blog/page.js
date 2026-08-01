"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogSkeleton } from "@/components/Skeleton";
import Pagination from "@/components/Pagination";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    { name: "All Posts", slug: "" }
  ]);

  // Handle pagination page change and sync URL query
  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("page", newPage);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  // Existing effect to fetch blogs already reacts to `page` changes

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        let queryParams = `page=${page}&limit=3`;
        if (selectedCategory) {
          queryParams += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        if (selectedTag) {
          queryParams += `&tag=${encodeURIComponent(selectedTag)}`;
        }

        const res = await fetch(`/api/blog?${queryParams}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setBlogs(data.data);
            setTotalPages(data.pagination?.totalPages || 1);
          }

          if (data.categories && data.categories.length > 0) {
            const dynamicCats = [
              { name: "All Posts", slug: "" },
              ...data.categories.map((c) => {
                const catName = typeof c === "string" ? c : c.name || c;
                return {
                  name: catName,
                  slug: catName.toLowerCase().replace(/[^a-z0-9]/g, "")
                };
              })
            ];
            setCategories(dynamicCats);
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page, selectedCategory, selectedTag]);

  const handleCategoryClick = (catName) => {
    const isAll = !catName || catName === "All Posts";
    setSelectedCategory(isAll ? "" : catName);
    setSelectedTag("");
    setPage(1);
    if (typeof window !== "undefined") {
      const newUrl = !isAll
        ? `${window.location.pathname}?category=${encodeURIComponent(catName)}`
        : window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  const handleTagClick = (tagSlug) => {
    setSelectedTag(tagSlug);
    setSelectedCategory("");
    setPage(1);
    if (typeof window !== "undefined") {
      const newUrl = tagSlug
        ? `${window.location.pathname}?tag=${encodeURIComponent(tagSlug)}`
        : window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  const displayList = blogs || [];

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
        {/* Active Filter Banner */}
        {(selectedCategory || selectedTag) && (
          <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between mx-3">
            <span className="text-slate-800 text-sm font-medium">
              Showing posts {selectedCategory ? `in category: ` : `tagged with: `}
              <span className="text-[#dc3545] font-semibold">
                {selectedCategory ? selectedCategory : `#${selectedTag}`}
              </span>
            </span>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedTag("");
                setPage(1);
                if (typeof window !== "undefined") {
                  window.history.pushState({ path: window.location.pathname }, "", window.location.pathname);
                }
              }}
              className="px-3 py-1 text-xs font-semibold text-white bg-slate-600 hover:bg-slate-700 rounded-full transition-colors cursor-pointer border-none"
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

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-3 md:gap-4 mb-10 px-3">
          {categories.map((category) => {
            const isActive =
              (!selectedCategory && category.slug === "") ||
              (selectedCategory && selectedCategory.toLowerCase() === category.name.toLowerCase());
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#dc3545] text-white border-[#dc3545] shadow-md shadow-red-900/20"
                    : "bg-white text-[#dc3545] border-[#dc3545] hover:bg-red-50"
                }`}
              >
                {category.name}
              </button>
            );
          })}
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
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
} 