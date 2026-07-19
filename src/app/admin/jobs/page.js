"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals & form state
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    department: "Engineering",
    location: "",
    type: "Full Time",
    experience: "",
    description: ""
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch(`/api/jobs?page=${page}&limit=5`);
      if (!res.ok) throw new Error("Failed to load jobs.");
      const data = await res.json();
      setJobs(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load job listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const openAddModal = () => {
    setEditingJob(null);
    setForm({
      title: "",
      department: "Engineering",
      location: "",
      type: "Full Time",
      experience: "",
      description: ""
    });
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
    const method = editingJob ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchJobs();
        setShowModal(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save job listing.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving job.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete job.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtering
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Job Openings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and publish company job roles</p>
        </div>
            <button
              onClick={openAddModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Job Listing
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Table */}
          <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6">
            {loading ? (
              <div className="text-center py-12">
                <span className="text-gray-400 text-sm">Loading listings...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500 text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 text-sm">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Department</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Experience</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-sm">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-zinc-800/10">
                          <td className="py-4 font-semibold text-white">{job.title}</td>
                          <td className="py-4 text-gray-300">{job.department}</td>
                          <td className="py-4 text-gray-300">{job.location}</td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium">
                              {job.type}
                            </span>
                          </td>
                          <td className="py-4 text-gray-300">{job.experience}</td>
                          <td className="py-4 text-right space-x-3">
                            <button
                              onClick={() => openEditModal(job)}
                              className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer inline-flex items-center gap-1"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="text-red-500 hover:text-red-400 font-medium cursor-pointer inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500">
                          No job listings found.
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

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#161618] border border-gray-800 rounded-3xl p-6 shadow-2xl relative text-white">
            <h3 className="text-lg font-bold mb-4">{editingJob ? "Edit Job Listing" : "Add Job Listing"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Job Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Job Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Indore / Remote"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 3+ Years"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Job Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Responsibilities, requirements, technologies..."
                  rows="4"
                  className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-700 text-gray-400 rounded-xl hover:text-white hover:border-white transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm cursor-pointer"
                >
                  {editingJob ? "Update Listing" : "Create Listing"}
                </button>
              </div>
            </form>
        </div>
      </div>
    )}
    </div>
  );
}
