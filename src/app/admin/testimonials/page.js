"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Star,
  Quote,
  AlertCircle
} from "lucide-react";
import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Search and filter parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete Modal state
  const [deletingId, setDeletingId] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    name: "",
    project: "",
    text: "",
    img: "",
    rating: 5,
    status: "published",
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: "6",
        search: searchTerm,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/testimonials?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load testimonials.");
      const data = await res.json();

      setTestimonials(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load testimonials. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page, selectedStatus]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchTestimonials();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const openAddModal = () => {
    setEditingTestimonial(null);
    setForm({
      name: "",
      project: "",
      text: "",
      img: "/assets/images/hero/client-img1.png",
      rating: 5,
      status: "published",
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingTestimonial(item);
    setForm({
      name: item.name || "",
      project: item.project || "",
      text: item.text || "",
      img: item.img || "/assets/images/hero/client-img1.png",
      rating: item.rating || 5,
      status: item.status || "published",
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/testimonials/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      const data = await res.json();
      setForm((prev) => ({ ...prev, img: data.url }));
    } catch (err) {
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.project || !form.text || !form.img) {
      alert("Name, project, testimonial text, and client image are required.");
      return;
    }

    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save testimonial");
      }

      setShowModal(false);
      setSuccessMessage(
        editingTestimonial
          ? "Testimonial updated successfully!"
          : "Testimonial created successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchTestimonials();
    } catch (err) {
      alert(err.message || "An error occurred while saving.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeletingLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete testimonial");
      }

      setDeletingId(null);
      setSuccessMessage("Testimonial deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchTestimonials();
    } catch (err) {
      alert(err.message || "Failed to delete testimonial.");
    } finally {
      setDeletingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Quote className="w-7 h-7 text-red-500" />
            Testimonials Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create, edit, publish, and manage client feedback and success stories
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-xl transition shadow-lg shadow-red-900/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, project, or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/80 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-900/80 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20">
            <Quote className="w-12 h-12 text-gray-600 mx-auto mb-3 opacity-40" />
            <p className="text-gray-400 font-medium">No testimonials found</p>
            <p className="text-gray-500 text-xs mt-1">Try adjusting search filters or add a new testimonial.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-zinc-900/60 text-gray-400 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Review Snippet</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative bg-zinc-800 border border-gray-700 flex-shrink-0">
                          {item.img ? (
                            <Image
                              src={item.img}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
                              {item.name?.charAt(0) || "C"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-red-400">
                      {item.project}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-400" title={item.text}>
                      {item.text}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#ffb800] text-xs gap-0.5">
                        {"★".repeat(item.rating || 5)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "published"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                            : "bg-amber-950/60 text-amber-400 border border-amber-800/60"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 hover:bg-red-950/40 rounded-lg text-gray-400 hover:text-red-400 transition cursor-pointer"
                          title="Delete"
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

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-800 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Quote className="w-5 h-5 text-red-500" />
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Roy Donaldson"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Book Luxor"
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Rating & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Rating (Stars) *
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value, 10) })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                    <option value={2}>2 Stars (★★☆☆☆)</option>
                    <option value={1}>1 Star (★☆☆☆☆)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Status *
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Client Photo / Avatar */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Client Image / Photo URL *
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-gray-700 flex-shrink-0">
                    {form.img ? (
                      <Image
                        src={form.img}
                        alt="Client preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="/assets/images/hero/client-img1.png or upload image"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                  <label className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl cursor-pointer transition flex-shrink-0 border border-gray-700">
                    <Upload className="w-4 h-4" />
                    {uploadingImage ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Testimonial Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed client testimonial review..."
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition shadow-lg shadow-red-900/20"
                >
                  {editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete Testimonial</h3>
            </div>
            <p className="text-sm text-gray-400">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                disabled={deletingLoading}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingLoading}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition shadow-lg shadow-red-900/20"
              >
                {deletingLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
