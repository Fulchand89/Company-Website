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
  Users,
  Star,
  AlertCircle,
  Globe,
  Share2,
  Link as LinkIcon
} from "lucide-react";
import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState([]);
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
  const [editingMember, setEditingMember] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete Modal state
  const [deletingId, setDeletingId] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    name: "",
    designation: "",
    img: "",
    bio: "",
    linkedin: "",
    twitter: "",
    github: "",
    display_order: 0,
    featured: false,
    status: "active",
  });

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: "6",
        search: searchTerm,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/teams?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load team members.");
      const data = await res.json();

      setTeamMembers(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load team members. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [page, selectedStatus]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchTeamMembers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const openAddModal = () => {
    setEditingMember(null);
    setForm({
      name: "",
      designation: "",
      img: "/assets/images/hero/team-demo.png",
      bio: "",
      linkedin: "",
      twitter: "",
      github: "",
      display_order: (teamMembers.length + 1),
      featured: false,
      status: "active",
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingMember(item);

    let parsedSocials = {};
    try {
      if (item.social_links) {
        parsedSocials = typeof item.social_links === "string" ? JSON.parse(item.social_links) : item.social_links;
      }
    } catch (_) {}

    setForm({
      name: item.name || "",
      designation: item.designation || "",
      img: item.img || "/assets/images/hero/team-demo.png",
      bio: item.bio || "",
      linkedin: parsedSocials.linkedin || "",
      twitter: parsedSocials.twitter || "",
      github: parsedSocials.github || "",
      display_order: item.display_order || 0,
      featured: Boolean(item.featured),
      status: item.status || "active",
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
      const res = await fetch("/api/admin/teams/upload", {
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
      alert(err.message || "Failed to upload profile image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.designation || !form.img) {
      alert("Name, designation, and profile image are required.");
      return;
    }

    const payload = {
      name: form.name,
      designation: form.designation,
      img: form.img,
      bio: form.bio,
      social_links: {
        linkedin: form.linkedin,
        twitter: form.twitter,
        github: form.github,
      },
      display_order: parseInt(form.display_order, 10) || 0,
      featured: form.featured ? 1 : 0,
      status: form.status,
    };

    try {
      const url = editingMember
        ? `/api/admin/teams/${editingMember.id}`
        : "/api/admin/teams";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save team member");
      }

      setShowModal(false);
      setSuccessMessage(
        editingMember
          ? "Team member updated successfully!"
          : "Team member added successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchTeamMembers();
    } catch (err) {
      alert(err.message || "An error occurred while saving.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeletingLoading(true);
    try {
      const res = await fetch(`/api/admin/teams/${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete team member");
      }

      setDeletingId(null);
      setSuccessMessage("Team member deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
      fetchTeamMembers();
    } catch (err) {
      alert(err.message || "Failed to delete team member.");
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
            <Users className="w-7 h-7 text-red-500" />
            Our Teams Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage team members, designations, profile photos, social links, and display order
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-xl transition shadow-lg shadow-red-900/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
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
            placeholder="Search by name, designation, or bio..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">Loading team members...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3 opacity-40" />
            <p className="text-gray-400 font-medium">No team members found</p>
            <p className="text-gray-500 text-xs mt-1">Try adjusting search filters or add a new team member.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-zinc-900/60 text-gray-400 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {teamMembers.map((item) => (
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
                              {item.name?.charAt(0) || "T"}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{item.bio || "No bio provided"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-red-400">
                      {item.designation}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400">
                      #{item.display_order || 0}
                    </td>
                    <td className="px-6 py-4">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/60">
                          <Star className="w-3 h-3 fill-amber-400" /> Featured
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "active"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                            : "bg-red-950/60 text-red-400 border border-red-800/60"
                        }`}
                      >
                        {item.status === "active" ? "Active" : "Inactive"}
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
                <Users className="w-5 h-5 text-red-500" />
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jennifer Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CEO & Founder"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Profile Image URL *
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-gray-700 flex-shrink-0">
                    {form.img ? (
                      <Image
                        src={form.img}
                        alt="Profile preview"
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
                    placeholder="/assets/images/hero/team-demo.png or upload image"
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

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Short Bio / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter a brief bio or description of the team member..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                  Social Links
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="relative">
                    <Share2 className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="Twitter URL"
                      value={form.twitter}
                      onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={form.github}
                      onChange={(e) => setForm({ ...form, github: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Display Order, Featured & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-zinc-900 border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="pt-5 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                  />
                  <label htmlFor="featuredCheckbox" className="text-sm text-gray-300 font-medium cursor-pointer">
                    Featured Member
                  </label>
                </div>
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
                  {editingMember ? "Update Member" : "Add Member"}
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
              <h3 className="text-lg font-bold text-white">Delete Team Member</h3>
            </div>
            <p className="text-sm text-gray-400">
              Are you sure you want to delete this team member? This action cannot be undone.
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
