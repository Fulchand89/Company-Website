"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, Image as ImageIcon, Upload, Globe, Check, X, FileText, Settings, Heart } from "lucide-react";
import Pagination from "@/components/Pagination";

export default function BlogsManagementPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Search and filter parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form Modal state
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // content, media, seo, social
  const [editingBlog, setEditingBlog] = useState(null);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); // 'img', 'og_image', 'twitter_image'

  // Form fields
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    img: "",
    img_alt: "",
    author: "Gupta Tech Web",
    status: "draft",
    published_at: "",
    // SEO
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    robots: "index, follow",
    canonical_url: "",
    focus_keyword: "",
    // OG
    og_title: "",
    og_description: "",
    og_image: "",
    og_url: "",
    og_type: "article",
    // Twitter
    twitter_card: "summary_large_image",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    // Tags (as comma-separated string in form, array on submit)
    tagsString: "",
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/blogs?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load blog posts.");
      const data = await res.json();
      
      setBlogs(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      if (data.categories) setCategories(data.categories);
      if (data.tags) setExistingTags(data.tags);
    } catch (err) {
      console.error(err);
      setError("Could not load blogs. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, selectedCategory, selectedStatus]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchBlogs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setForm(prev => {
      const updated = { ...prev, title: titleVal };
      if (!isSlugManual) {
        updated.slug = slugify(titleVal);
      }
      return updated;
    });
  };

  const handleSlugChange = (e) => {
    setIsSlugManual(true);
    setForm({ ...form, slug: slugify(e.target.value) });
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setIsSlugManual(false);
    setActiveTab("content");
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Technology",
      img: "",
      img_alt: "",
      author: "Gupta Tech Web",
      status: "draft",
      published_at: new Date().toISOString().substring(0, 16), // YYYY-MM-DDTHH:mm
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      robots: "index, follow",
      canonical_url: "",
      focus_keyword: "",
      og_title: "",
      og_description: "",
      og_image: "",
      og_url: "",
      og_type: "article",
      twitter_card: "summary_large_image",
      twitter_title: "",
      twitter_description: "",
      twitter_image: "",
      tagsString: "",
    });
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setIsSlugManual(true);
    setActiveTab("content");
    
    // Parse tag list to comma string
    const tagsStr = blog.tags ? blog.tags.map(t => t.name).join(", ") : "";
    
    // Format published_at for input datetime-local: YYYY-MM-DDTHH:MM
    let pubDateStr = "";
    if (blog.published_at) {
      const d = new Date(blog.published_at);
      // Correct for timezone offset to get local string
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      pubDateStr = d.toISOString().substring(0, 16);
    }

    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Technology",
      img: blog.img || "",
      img_alt: blog.img_alt || "",
      author: blog.author || "Gupta Tech Web",
      status: blog.status || "draft",
      published_at: pubDateStr,
      seo_title: blog.seo_title || "",
      seo_description: blog.seo_description || "",
      seo_keywords: blog.seo_keywords || "",
      robots: blog.robots || "index, follow",
      canonical_url: blog.canonical_url || "",
      focus_keyword: blog.focus_keyword || "",
      og_title: blog.og_title || "",
      og_description: blog.og_description || "",
      og_image: blog.og_image || "",
      og_url: blog.og_url || "",
      og_type: blog.og_type || "article",
      twitter_card: blog.twitter_card || "summary_large_image",
      twitter_title: blog.twitter_title || "",
      twitter_description: blog.twitter_description || "",
      twitter_image: blog.twitter_image || "",
      tagsString: tagsStr,
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(fieldName);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/blogs/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm(prev => {
          const updated = { ...prev, [fieldName]: data.url };
          // If editing Alt, default it to slug-like text
          if (fieldName === "img" && !prev.img_alt) {
            updated.img_alt = prev.title || "Blog Featured Image";
          }
          return updated;
        });
      } else {
        const err = await res.json();
        alert(err.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred uploading image.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingBlog ? `/api/admin/blogs/${editingBlog.id}` : "/api/admin/blogs";
    const method = editingBlog ? "PUT" : "POST";

    // Split tags string to list
    const tags = form.tagsString
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      ...form,
      tags
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchBlogs();
        setShowModal(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save blog post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving blog.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post? All tag associations will be removed.")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog.");
    }
  };

  const handleTogglePublish = async (blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          status: newStatus,
          img: blog.img,
          // Re-map tags mapping array directly
          tags: blog.tags ? blog.tags.map(t => t.name) : []
        })
      });

      if (res.ok) {
        setBlogs(blogs.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to toggle publish state.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Blog Management</h1>
          <p className="text-gray-400 text-sm mt-1">Create, edit, publish and configure SEO/metadata for blog posts</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search blogs by title, category, content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => { setPage(1); setSelectedCategory(e.target.value); }}
            className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => { setPage(1); setSelectedStatus(e.target.value); }}
            className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blogs Listing Table */}
      <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6">
        {loading ? (
          <div className="text-center py-12">
            <span className="text-gray-400 text-sm">Loading blogs...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                  <th className="pb-3 w-16">Cover</th>
                  <th className="pb-3">Title & Category</th>
                  <th className="pb-3">Author</th>
                  <th className="pb-3">Publish Date</th>
                  <th className="pb-3">Tags</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-zinc-800/10">
                      <td className="py-4">
                        {blog.img ? (
                          <img
                            src={blog.img}
                            alt={blog.title}
                            className="w-12 h-10 object-cover rounded-lg border border-gray-800"
                          />
                        ) : (
                          <div className="w-12 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-gray-700">
                            <ImageIcon className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="max-w-xs sm:max-w-sm">
                          <p className="font-semibold text-white line-clamp-1">{blog.title}</p>
                          <span className="inline-block mt-1 text-[10px] bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {blog.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-300">{blog.author}</td>
                      <td className="py-4 text-gray-300">
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) : "N/A"}
                      </td>
                      <td className="py-4 text-gray-300">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {blog.tags && blog.tags.length > 0 ? (
                            blog.tags.slice(0, 2).map((t) => (
                              <span key={t.id} className="text-[10px] text-red-400 bg-red-950/20 border border-red-900/30 px-1.5 py-0.5 rounded-md">
                                #{t.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-600 text-xs">No tags</span>
                          )}
                          {blog.tags && blog.tags.length > 2 && (
                            <span className="text-[10px] text-gray-400">+{blog.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handleTogglePublish(blog)}
                          title="Click to toggle status"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                            blog.status === "published"
                              ? "bg-emerald-950/30 text-emerald-400 border-emerald-900/40 hover:bg-emerald-950/60"
                              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                          }`}
                        >
                          {blog.status === "published" ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Published
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5" /> Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 text-right space-x-3">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-500 hover:text-red-400 font-medium cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-4 border-t border-gray-800/40">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* Multitab Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-[#161618] border border-gray-800 rounded-3xl shadow-2xl relative text-white flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">
                  {editingBlog ? `Edit Blog: ${form.title}` : "Create Blog Post"}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">Manage fields, media, SEO tags and OpenGraph configurations</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800/50 cursor-pointer border-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 pt-4 border-b border-gray-800 bg-[#121214] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "content"
                    ? "border-red-600 text-white font-bold bg-red-950/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" /> Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`px-4 py-2 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "media"
                    ? "border-red-600 text-white font-bold bg-red-950/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Media & Tags
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`px-4 py-2 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "seo"
                    ? "border-red-600 text-white font-bold bg-red-950/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" /> Search Engine SEO
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("social")}
                className={`px-4 py-2 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "social"
                    ? "border-red-600 text-white font-bold bg-red-950/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Settings className="w-4 h-4" /> Social Metas
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* TAB 1: Content Details */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Blog Title *</label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={handleTitleChange}
                        placeholder="e.g. 8 Creative Ways to Repurpose Webinar Content"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">URL Slug (Auto-generated) *</label>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={handleSlugChange}
                        placeholder="e.g. 8-creative-ways-to-repurpose-webinar-content"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Author</label>
                      <input
                        type="text"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        placeholder="Author Name"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Published At Date</label>
                      <input
                        type="datetime-local"
                        value={form.published_at}
                        onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Short Description (Excerpt) *</label>
                    <textarea
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="Brief excerpt summarising the article details..."
                      rows="2"
                      className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Full Content (HTML Supported) *</label>
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="<h2>Section Title</h2><p>Article body paragraphs...</p>"
                      rows="8"
                      className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 font-mono"
                      required
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Media and Categorization */}
              {activeTab === "media" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Category *</label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        placeholder="e.g. Technology, Sales, Marketing"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={form.tagsString}
                        onChange={(e) => setForm({ ...form, tagsString: e.target.value })}
                        placeholder="e.g. Webinar, Marketing, Sales"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">Separate multiple tags with commas (e.g. Next.js, Design)</span>
                    </div>
                  </div>

                  <div className="border border-gray-800 bg-[#111] p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Featured Image Configurations</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Image URL Path *</label>
                        <input
                          type="text"
                          value={form.img}
                          onChange={(e) => setForm({ ...form, img: e.target.value })}
                          placeholder="/assets/images/hero/blog-img1.png or external link"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Image Alt Text (SEO)</label>
                        <input
                          type="text"
                          value={form.img_alt}
                          onChange={(e) => setForm({ ...form, img_alt: e.target.value })}
                          placeholder="Alt description for image rendering"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="relative">
                        <input
                          type="file"
                          id="featured-image-upload"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "img")}
                          className="hidden"
                          disabled={uploadingField !== null}
                        />
                        <label
                          htmlFor="featured-image-upload"
                          className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-2 border border-zinc-700 ${uploadingField === "img" ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingField === "img" ? "Uploading..." : "Upload Cover Image"}
                        </label>
                      </div>

                      {form.img && (
                        <div className="flex items-center gap-2">
                          <img src={form.img} className="w-12 h-9 object-cover rounded-lg border border-gray-700" alt="Preview" />
                          <span className="text-xs text-gray-500 truncate max-w-[200px]">{form.img}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Search Engine SEO */}
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">SEO Page Title</label>
                      <input
                        type="text"
                        value={form.seo_title}
                        onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                        placeholder="Default is Blog Title"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Focus Keyword</label>
                      <input
                        type="text"
                        value={form.focus_keyword}
                        onChange={(e) => setForm({ ...form, focus_keyword: e.target.value })}
                        placeholder="e.g. content marketing"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 mb-1">SEO Meta Keywords</label>
                      <input
                        type="text"
                        value={form.seo_keywords}
                        onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                        placeholder="webinar, repurposing, sales pipeline"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Robots Directives</label>
                      <input
                        type="text"
                        value={form.robots}
                        onChange={(e) => setForm({ ...form, robots: e.target.value })}
                        placeholder="index, follow"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Canonical URL</label>
                    <input
                      type="url"
                      value={form.canonical_url}
                      onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                      placeholder="e.g. https://guptatechweb.com/blog/repurpose-content"
                      className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">SEO Meta Description</label>
                    <textarea
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      placeholder="Description shown in search engine results listing..."
                      rows="3"
                      className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: Social Metadata */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  {/* OpenGraph Section */}
                  <div className="border border-gray-800 bg-[#111] p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-[#dc3545] uppercase tracking-wide">Open Graph (Facebook / LinkedIn)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">OG Title</label>
                        <input
                          type="text"
                          value={form.og_title}
                          onChange={(e) => setForm({ ...form, og_title: e.target.value })}
                          placeholder="OG Social Title"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">OG Type</label>
                        <input
                          type="text"
                          value={form.og_type}
                          onChange={(e) => setForm({ ...form, og_type: e.target.value })}
                          placeholder="article"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">OG Share Image (URL)</label>
                        <input
                          type="text"
                          value={form.og_image}
                          onChange={(e) => setForm({ ...form, og_image: e.target.value })}
                          placeholder="OG Image URL path"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">OG Target URL</label>
                        <input
                          type="text"
                          value={form.og_url}
                          onChange={(e) => setForm({ ...form, og_url: e.target.value })}
                          placeholder="Canonical page URL"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <div className="relative">
                        <input
                          type="file"
                          id="og-image-upload"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "og_image")}
                          className="hidden"
                          disabled={uploadingField !== null}
                        />
                        <label
                          htmlFor="og-image-upload"
                          className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-2 border border-zinc-700 ${uploadingField === "og_image" ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingField === "og_image" ? "Uploading..." : "Upload OG Image"}
                        </label>
                      </div>

                      {form.og_image && (
                        <div className="flex items-center gap-2">
                          <img src={form.og_image} className="w-12 h-9 object-cover rounded-lg border border-gray-700" alt="Preview" />
                          <span className="text-xs text-gray-500 truncate max-w-[200px]">{form.og_image}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">OG Description</label>
                      <textarea
                        value={form.og_description}
                        onChange={(e) => setForm({ ...form, og_description: e.target.value })}
                        placeholder="Social share summary description..."
                        rows="2"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
                      />
                    </div>
                  </div>

                  {/* Twitter Cards Section */}
                  <div className="border border-gray-800 bg-[#111] p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wide">Twitter Cards</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Twitter Title</label>
                        <input
                          type="text"
                          value={form.twitter_title}
                          onChange={(e) => setForm({ ...form, twitter_title: e.target.value })}
                          placeholder="Twitter Post Title"
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Twitter Card Style</label>
                        <select
                          value={form.twitter_card}
                          onChange={(e) => setForm({ ...form, twitter_card: e.target.value })}
                          className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                        >
                          <option value="summary_large_image">Summary Large Image</option>
                          <option value="summary">Summary Card</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">Twitter Share Image (URL)</label>
                      <input
                        type="text"
                        value={form.twitter_image}
                        onChange={(e) => setForm({ ...form, twitter_image: e.target.value })}
                        placeholder="Twitter Post Image URL path"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <div className="relative">
                        <input
                          type="file"
                          id="twitter-image-upload"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "twitter_image")}
                          className="hidden"
                          disabled={uploadingField !== null}
                        />
                        <label
                          htmlFor="twitter-image-upload"
                          className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-2 border border-zinc-700 ${uploadingField === "twitter_image" ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingField === "twitter_image" ? "Uploading..." : "Upload Twitter Image"}
                        </label>
                      </div>

                      {form.twitter_image && (
                        <div className="flex items-center gap-2">
                          <img src={form.twitter_image} className="w-12 h-9 object-cover rounded-lg border border-gray-700" alt="Preview" />
                          <span className="text-xs text-gray-500 truncate max-w-[200px]">{form.twitter_image}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">Twitter Description</label>
                      <textarea
                        value={form.twitter_description}
                        onChange={(e) => setForm({ ...form, twitter_description: e.target.value })}
                        placeholder="Twitter Card description..."
                        rows="2"
                        className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div className="text-[10px] text-gray-500">
                  * Marks fields required for publishing
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-700 text-gray-400 rounded-xl hover:text-white hover:border-white transition text-xs md:text-sm cursor-pointer bg-transparent"
                  >
                    Cancel
                  </button>
                  
                  {activeTab !== "content" && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("content")}
                      className="px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-xl hover:bg-zinc-700 transition text-xs md:text-sm cursor-pointer"
                    >
                      Back to Content
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-xs md:text-sm font-bold cursor-pointer border-none"
                  >
                    {editingBlog ? "Update Post" : "Create Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
