"use client";

import { useEffect, useState } from "react";
import { Search, Download, Trash2, Calendar, FileText, Eye, X, RefreshCw } from "lucide-react";
import Pagination from "@/components/Pagination";

export default function ApplicationsPage() {
  // Existing States
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // New States for Filtering & Sorting
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState("latest");
  
  // Dynamic lists from DB
  const [availablePositions, setAvailablePositions] = useState([]);
  
  // Selected Application for Details Modal
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch unique positions applied for
  const fetchPositions = async () => {
    try {
      const res = await fetch("/api/applications?getPositions=true");
      if (res.ok) {
        const data = await res.json();
        setAvailablePositions(data.positions || []);
      }
    } catch (err) {
      console.error("Failed to load unique positions:", err);
    }
  };

  // Fetch applications from server with parameters
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        search: search.trim(),
        position,
        status,
        dateFrom,
        dateTo,
        sort
      });

      const res = await fetch(`/api/applications?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load applications.");
      const data = await res.json();
      setApplications(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load candidate applications.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications when parameters change
  useEffect(() => {
    fetchApplications();
  }, [page, search, position, status, dateFrom, dateTo, sort]);

  // Fetch position categories on mount
  useEffect(() => {
    fetchPositions();
  }, []);

  // Update application status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        // Update locally for instant responsiveness
        setApplications(prev =>
          prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        alert("Failed to update applicant status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while updating status.");
    }
  };

  // Delete an application record
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application record?")) return;

    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
        // Reset positions to keep filter updated
        fetchPositions();
      } else {
        alert("Failed to delete application record.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Search Submission Handler
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearch(searchInput);
    setPage(1); // Reset page index on search trigger
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setPosition("");
    setStatus("");
    setDateFrom("");
    setDateTo("");
    setSort("latest");
    setPage(1);
  };

  // Helper for Status Badge Styling
  const getStatusBadgeStyle = (currentStatus) => {
    const statusLower = (currentStatus || "").toLowerCase();
    switch (statusLower) {
      case "new":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "reviewing":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "shortlisted":
        return "bg-teal-500/10 text-teal-400 border border-teal-500/20";
      case "interview scheduled":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "hired":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Job Applications</h1>
        <p className="text-gray-400 text-sm mt-1">Review candidate profiles, preview/download resumes, and manage status</p>
      </div>

      {/* Server-side Filters Block */}
      <div className="bg-[#161618] border border-gray-800 rounded-3xl p-5 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* Keyword Search */}
          <div className="relative w-full col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by candidate name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Position Selector */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Position Applied</label>
            <select
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition cursor-pointer"
            >
              <option value="">All Positions</option>
              {availablePositions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition text-gray-300"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition text-gray-300"
            />
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">Sort By</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-800 bg-[#1b1b1f] text-white text-sm focus:outline-none focus:border-red-600 transition cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>

          {/* Filter Action Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-2 px-3 text-sm transition cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="border border-gray-800 hover:border-red-600 text-gray-400 hover:text-white rounded-xl py-2 px-3 text-sm transition cursor-pointer flex items-center justify-center gap-1.5 font-medium"
              title="Reset Filters"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </form>
      </div>

      {/* Applications Grid Card */}
      <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6">
        {loading ? (
          <div className="text-center py-12">
            <span className="text-gray-400 text-sm">Loading applications...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                  <th className="pb-3 font-semibold">Candidate</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold">Position</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Applied On</th>
                  <th className="pb-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-zinc-800/10 transition-colors">
                      {/* Candidate Name Column */}
                      <td className="py-4">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="font-bold text-white text-left hover:text-red-500 transition cursor-pointer focus:outline-none"
                        >
                          {app.name}
                        </button>
                      </td>

                      {/* Contact Details Column */}
                      <td className="py-4 text-gray-300">
                        <div>{app.email}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{app.phone}</div>
                      </td>

                      {/* Position Column */}
                      <td className="py-4 font-medium text-gray-300">{app.position}</td>

                      {/* Live Status Selector Column */}
                      <td className="py-4">
                        <select
                          value={app.status || "New"}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold focus:outline-none transition cursor-pointer border ${getStatusBadgeStyle(app.status)}`}
                        >
                          <option value="New" className="bg-[#161618] text-white">New</option>
                          <option value="Reviewing" className="bg-[#161618] text-white">Reviewing</option>
                          <option value="Shortlisted" className="bg-[#161618] text-white">Shortlisted</option>
                          <option value="Interview Scheduled" className="bg-[#161618] text-white">Interview Scheduled</option>
                          <option value="Rejected" className="bg-[#161618] text-white">Rejected</option>
                          <option value="Hired" className="bg-[#161618] text-white">Hired</option>
                        </select>
                      </td>

                      {/* Applied On Date Column */}
                      <td className="py-4 text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-600" />
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : "N/A"}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 text-right space-x-3">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-[#6c757d] hover:text-white transition font-medium cursor-pointer inline-flex items-center"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400 font-semibold inline-flex items-center gap-1 cursor-pointer"
                          title="Download Resume"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-gray-500 hover:text-red-400 font-medium cursor-pointer inline-flex items-center"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No candidate applications match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Dynamic Pagination */}
        <div className="pt-4 border-t border-gray-800/40">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* Candidate Details Modal with Resume PDF/Word Previewer */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative flex flex-col gap-6 text-white shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedApplication.name}</h2>
                <p className="text-gray-400 text-xs mt-1">Application Record Overview</p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: General Application Info */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Applicant Details</h3>
                
                <div className="space-y-3 bg-[#1b1b1f] border border-gray-800/60 rounded-2xl p-4">
                  <div>
                    <span className="text-xs text-gray-500 block">Email Address</span>
                    <a
                      href={`mailto:${selectedApplication.email}`}
                      className="text-sm font-semibold text-red-500 hover:text-red-400 transition"
                    >
                      {selectedApplication.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Phone Number</span>
                    <span className="text-sm font-medium text-white">{selectedApplication.phone || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Position Applied For</span>
                    <span className="text-sm font-medium text-white">{selectedApplication.position}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Application Timestamp</span>
                    <span className="text-sm font-medium text-white">
                      {selectedApplication.created_at
                        ? new Date(selectedApplication.created_at).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Live Status Control & Download */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Status & Actions</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={selectedApplication.status || "New"}
                      onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value)}
                      className="bg-[#1b1b1f] border border-gray-800 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                    
                    <a
                      href={selectedApplication.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-4 py-2 text-sm transition inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Download className="w-4 h-4" /> Download Resume
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: PDF Resume / Word Doc Previewer */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Resume Preview</h3>
                {selectedApplication.resume_url.toLowerCase().endsWith(".pdf") ? (
                  <div className="border border-gray-800 rounded-2xl overflow-hidden bg-[#1b1b1f] h-[350px]">
                    <iframe
                      src={`${selectedApplication.resume_url}#toolbar=0`}
                      className="w-full h-full border-none"
                      title="Resume PDF Preview"
                    />
                  </div>
                ) : (
                  <div className="border border-gray-800 rounded-2xl bg-[#1b1b1f] p-6 text-center flex flex-col items-center justify-center gap-4 h-[350px]">
                    <FileText className="w-12 h-12 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-white">Preview unavailable for Word (.docx) files</p>
                      <p className="text-xs text-gray-500 mt-1">Please download the file to inspect the candidate's resume.</p>
                    </div>
                    <a
                      href={selectedApplication.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-800 hover:border-red-600 text-gray-300 hover:text-white text-xs font-semibold rounded-xl px-4 py-2 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download File
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
