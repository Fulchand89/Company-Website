"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Globe,
  Check,
  X,
  FileText,
  Settings,
  Star,
  ExternalLink,
  Layers,
  Eye
} from "lucide-react";
import Pagination from "@/components/Pagination";

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("content"); // content, media, seo
  const [editingProject, setEditingProject] = useState(null);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Website",
    customCategory: "",
    short_description: "",
    full_description: "",
    image: "",
    image_alt: "",
    client_name: "",
    project_url: "",
    status: "published",
    featured: false,
    display_order: 0,
    // SEO
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    robots: "index, follow",
    canonical_url: ""
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/portfolio?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load portfolio items.");
      const data = await res.json();

      setProjects(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
      setError("Could not load portfolio items. Please verify admin access.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, selectedCategory, selectedStatus]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchProjects();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, title };
      if (!isSlugManual) {
        updated.slug = title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }
      return updated;
    });
  };

  const handleSlugChange = (e) => {
    setIsSlugManual(true);
    setForm((prev) => ({
      ...prev,
      slug: e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
    }));
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setIsSlugManual(false);
    setActiveTab("content");
    setForm({
      title: "",
      slug: "",
      category: "Website",
      customCategory: "",
      short_description: "",
      full_description: "",
      image: "",
      image_alt: "",
      client_name: "",
      project_url: "",
      status: "published",
      featured: false,
      display_order: 0,
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      robots: "index, follow",
      canonical_url: ""
    });
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsSlugManual(true);
    setActiveTab("content");
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      category: project.category || "Website",
      customCategory: "",
      short_description: project.short_description || "",
      full_description: project.full_description || "",
      image: project.image || "",
      image_alt: project.image_alt || project.title || "",
      client_name: project.client_name || "",
      project_url: project.project_url || "",
      status: project.status || "published",
      featured: Boolean(project.featured),
      display_order: project.display_order || 0,
      seo_title: project.seo_title || project.title || "",
      seo_description: project.seo_description || project.short_description || "",
      seo_keywords: project.seo_keywords || project.category || "",
      robots: project.robots || "index, follow",
      canonical_url: project.canonical_url || ""
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/portfolio/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed.");

      setForm((prev) => ({
        ...prev,
        image: data.url,
        image_alt: prev.image_alt || prev.title
      }));
      setSuccessMessage("Portfolio image uploaded successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const categoryToSave = form.category === "Other" && form.customCategory.trim()
      ? form.customCategory.trim()
      : form.category;

    const payload = {
      ...form,
      category: categoryToSave,
      full_description: form.full_description || form.short_description || form.title
    };

    try {
      const url = editingProject
        ? `/api/admin/portfolio/${editingProject.id}`
        : "/api/admin/portfolio";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save portfolio project.");

      setShowModal(false);
      setSuccessMessage(
        editingProject ? "Portfolio project updated!" : "Portfolio project created!"
      );
      setTimeout(() => setSuccessMessage(""), 3500);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${projectToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete portfolio project.");

      setShowDeleteModal(false);
      setProjectToDelete(null);
      setSuccessMessage("Project deleted successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setError("Failed to delete project.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Portfolio Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage projects, upload media, set status, and handle dynamic portfolio categories
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition shadow-lg shadow-red-900/20"
        >
          <Plus className="w-5 h-5" />
          Add Portfolio Project
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-950/60 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/80 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Category & Status Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-900/80 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-900/80 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent mb-3"></div>
            <p className="text-sm">Loading portfolio database...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Layers className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className="text-lg font-semibold text-white">No portfolio projects found</p>
            <p className="text-sm text-gray-500 mt-1">
              Create your first project or adjust your search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase bg-zinc-900/40">
                  <th className="p-4">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Client / URL</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {projects.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition">
                    {/* Project Title & Image */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-gray-800">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-600 m-auto" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white line-clamp-1">{item.title}</span>
                            {Boolean(item.featured) && (
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500 font-mono">{item.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-zinc-800 border border-gray-700 text-gray-300 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Client & URL */}
                    <td className="p-4 text-gray-400 text-xs">
                      <div>{item.client_name || item.client || "Gupta Tech Web"}</div>
                      {item.project_url && (
                        <a
                          href={item.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>Visit link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "published"
                            ? "bg-emerald-950/60 border border-emerald-800 text-emerald-400"
                            : "bg-amber-950/60 border border-amber-800 text-amber-400"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/portfolio/${item.slug || item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition"
                          title="Preview project page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 rounded-lg transition"
                          title="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setProjectToDelete(item);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && projects.length > 0 && (
          <div className="p-4 border-t border-gray-800 flex justify-end">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingProject ? "Edit Portfolio Project" : "Add Portfolio Project"}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in the details below to update the portfolio showcase dynamically.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Header */}
            <div className="flex border-b border-gray-800 bg-zinc-900/40 px-6 gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
                  activeTab === "content"
                    ? "border-red-600 text-red-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                Project Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
                  activeTab === "media"
                    ? "border-red-600 text-red-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Media & Links
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
                  activeTab === "seo"
                    ? "border-red-600 text-red-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                SEO Metadata
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: Content & Details */}
              {activeTab === "content" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={handleTitleChange}
                        placeholder="e.g. Mind Reset Website"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.slug}
                        onChange={handleSlugChange}
                        placeholder="e.g. mind-reset-website"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      >
                        <option value="Website">Website</option>
                        <option value="Applications">Applications</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Other">Custom Category...</option>
                      </select>
                    </div>

                    {/* Custom Category input */}
                    {form.category === "Other" && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Specify Custom Category *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.customCategory}
                          onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                          placeholder="e.g. Cloud Architecture"
                          className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                        />
                      </div>
                    )}

                    {/* Status */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Status *
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>

                    {/* Display Order */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={form.display_order}
                        onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                        placeholder="0"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Short Description / Card Excerpt
                    </label>
                    <textarea
                      rows={3}
                      value={form.short_description}
                      onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                      placeholder="Brief overview displayed on portfolio card..."
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  {/* Full Description / HTML */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Full Description (Supports HTML / Headings)
                    </label>
                    <textarea
                      rows={6}
                      value={form.full_description}
                      onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                      placeholder="<h2>Project Overview</h2><p>Detailed project case study content...</p>"
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600 font-mono"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured-toggle"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-700 bg-zinc-900 text-red-600 focus:ring-red-600"
                    />
                    <label htmlFor="featured-toggle" className="text-sm text-gray-300 cursor-pointer">
                      Mark as Featured Project
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: Media & Links */}
              {activeTab === "media" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Client Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={form.client_name}
                        onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                        placeholder="e.g. Smart Brain Academy"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Project URL */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Project / Demo URL
                      </label>
                      <input
                        type="url"
                        value={form.project_url}
                        onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  {/* Image Upload Box */}
                  <div className="bg-zinc-900/60 border border-gray-800 rounded-2xl p-5 space-y-4">
                    <label className="block text-xs font-medium text-gray-300">
                      Featured Project Image *
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Image Preview */}
                      <div className="w-32 h-24 relative rounded-xl overflow-hidden bg-zinc-800 border border-gray-700 shrink-0 flex items-center justify-center">
                        {form.image ? (
                          <img
                            src={form.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-600" />
                        )}
                      </div>

                      {/* File Upload Button */}
                      <div className="flex-1 space-y-2 w-full">
                        <label className="inline-flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition">
                          <Upload className="w-4 h-4" />
                          {isUploading ? "Uploading..." : "Upload New Image"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="hidden"
                          />
                        </label>

                        <p className="text-xs text-gray-500">
                          Or enter direct image path below (e.g. /assets/images/hero/mind-reset.png):
                        </p>

                        <input
                          type="text"
                          required
                          value={form.image}
                          onChange={(e) => setForm({ ...form, image: e.target.value })}
                          placeholder="/assets/images/..."
                          className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* Image Alt */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        value={form.image_alt}
                        onChange={(e) => setForm({ ...form, image_alt: e.target.value })}
                        placeholder="Accessible description of the image"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SEO Metadata */}
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={form.seo_title}
                      onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                      placeholder="Title tag for search engine results"
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      placeholder="Search snippet summary..."
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        value={form.seo_keywords}
                        onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                        placeholder="e.g. Website, Next.js, UI/UX"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Robots Directives
                      </label>
                      <input
                        type="text"
                        value={form.robots}
                        onChange={(e) => setForm({ ...form, robots: e.target.value })}
                        placeholder="index, follow"
                        className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-zinc-800 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition shadow-lg shadow-red-900/20 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingProject ? "Update Project" : "Create Project"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Delete Portfolio Project?</h3>
            <p className="text-sm text-gray-400">
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">"{projectToDelete.title}"</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
