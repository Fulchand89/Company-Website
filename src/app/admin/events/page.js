"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Calendar,
  AlertCircle
} from "lucide-react";
import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function EventsManagementPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    img: "",
    status: "active",
    display_order: 0,
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events?page=${page}&limit=8`);
      if (!res.ok) throw new Error("Failed to load events.");
      const data = await res.json();
      setEvents(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load events. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setForm({
      title: "",
      img: "",
      status: "active",
      display_order: events.length + 1,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (eventItem) => {
    setEditingEvent(eventItem);
    setForm({
      title: eventItem.title,
      img: eventItem.img,
      status: eventItem.status || "active",
      display_order: eventItem.display_order || 0,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/events/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image.");

      setForm((prev) => ({ ...prev, img: data.url }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.img) {
      setError("Event title and image are required.");
      return;
    }

    try {
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";
      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save event.");

      setSuccessMessage(
        editingEvent ? "Event updated successfully!" : "Event created successfully!"
      );
      setShowModal(false);
      fetchEvents();

      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while saving the event.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeletingLoading(true);

    try {
      const res = await fetch(`/api/admin/events/${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete event.");

      setSuccessMessage("Event deleted successfully!");
      setDeletingId(null);
      fetchEvents();

      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete event.");
    } finally {
      setDeletingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161618] border border-gray-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-red-500" />
            Events Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage company events showcase featured in the About Us section.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-xl transition shadow-lg shadow-red-900/20 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 px-5 py-4 rounded-xl">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-950/40 border border-red-800 text-red-300 px-5 py-4 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Events Table Container */}
      <div className="bg-[#161618] border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-medium">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No events found. Click &quot;Add New Event&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-zinc-900/50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Event Title</th>
                  <th className="py-4 px-6">Display Order</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                {events.map((eventItem) => (
                  <tr key={eventItem.id} className="hover:bg-zinc-800/30 transition">
                    <td className="py-4 px-6">
                      <div className="w-20 h-14 relative rounded-lg overflow-hidden bg-zinc-900 border border-gray-800">
                        <Image
                          src={eventItem.img || "/assets/images/about/Event1.png"}
                          alt={eventItem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {eventItem.title}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {eventItem.display_order}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                          eventItem.status === "active"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {eventItem.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(eventItem)}
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg transition cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(eventItem.id)}
                        className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg transition cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-800">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#161618] border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative text-white space-y-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Tech Conference"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#1e1e21] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Event Image *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="/assets/images/about/Event1.png"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="flex-1 bg-[#1e1e21] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition text-sm"
                  />
                  <label className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 px-4 py-2.5 rounded-xl cursor-pointer transition text-sm font-medium flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Uploading..." : "Browse"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                {form.img && (
                  <div className="mt-3 relative w-32 h-20 rounded-lg overflow-hidden border border-gray-800 bg-zinc-900">
                    <Image src={form.img} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                    className="w-full bg-[#1e1e21] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-[#1e1e21] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-xl font-medium transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition text-sm cursor-pointer shadow-lg shadow-red-900/20"
                >
                  {editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#161618] border border-gray-800 w-full max-w-md rounded-2xl p-6 text-white space-y-4">
            <h3 className="text-xl font-bold text-white">Delete Event</h3>
            <p className="text-sm text-gray-400">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                disabled={deletingLoading}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-xl font-medium text-sm transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-sm transition cursor-pointer"
              >
                {deletingLoading ? "Deleting..." : "Delete Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
