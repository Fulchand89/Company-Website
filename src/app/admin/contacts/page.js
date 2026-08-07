"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Calendar, Eye, MoreVertical, CheckCheck, MessageSquareReply, Trash2, XCircle } from "lucide-react";
import Pagination from "@/components/Pagination";
import { TableRowSkeleton } from "@/components/Skeleton";

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_FILTERS = ["All", "New", "In Review", "Rejected", "Completed"];

const STATUS_STYLES = {
  New:          "bg-blue-500/10   text-blue-400   border border-blue-500/20",
  "In Review":  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved:     "bg-green-500/10  text-green-400  border border-green-500/20",
  Rejected:     "bg-red-500/10    text-red-400    border border-red-500/20",
  Completed:    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Reviewed:     "bg-teal-500/10   text-teal-400   border border-teal-500/20",
  Replied:      "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
};

// ─── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES["New"];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${style}`}>
      {status || "New"}
    </span>
  );
}

// ─── Three-dot Action Menu ─────────────────────────────────────────────────────
function ActionMenu({ contact, onMarkReviewed, onMarkReplied, onReject, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const actions = [
    {
      label: "Mark as Reviewed",
      icon: <CheckCheck className="w-3.5 h-3.5" />,
      onClick: () => { setOpen(false); onMarkReviewed(contact); },
      danger: false,
    },
    {
      label: "Mark as Replied",
      icon: <MessageSquareReply className="w-3.5 h-3.5" />,
      onClick: () => { setOpen(false); onMarkReplied(contact); },
      danger: false,
    },
    {
      label: "Reject",
      icon: <XCircle className="w-3.5 h-3.5" />,
      onClick: () => { setOpen(false); onReject(contact); },
      danger: false,
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      onClick: () => { setOpen(false); onDelete(contact.id); },
      danger: true,
    },
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center"
        title="More actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 w-48 bg-[#1c1c1e] border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden">
          {actions.map(({ label, icon, onClick, danger }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition hover:bg-white/5 ${
                danger
                  ? "text-red-400 hover:text-red-300"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span className={danger ? "text-red-400" : "text-gray-500"}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── View Details Modal (read-only — Eye icon only) ────────────────────────────
function ContactModal({ contact, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5 sticky top-0 bg-[#161618] z-10">
          <div>
            <h2 className="text-lg font-bold leading-tight">Contact Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">Submitted inquiry from the website</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white w-8 h-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center flex-shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 text-sm">

          {/* Status badge */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Status</span>
            <StatusBadge status={contact.status || "New"} />
          </div>

          {/* Name */}
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Name</span>
            <span className="font-semibold text-white text-base">{contact.name}</span>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Email</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-red-400 hover:underline break-all"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Phone</span>
              <span className="text-gray-200">
                {contact.phone
                  ? <a href={`tel:${contact.phone}`} className="hover:text-white transition">{contact.phone}</a>
                  : <span className="text-gray-600">—</span>
                }
              </span>
            </div>
          </div>

          {/* Company + Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Company</span>
              <span className="text-gray-200">{contact.details || <span className="text-gray-600">—</span>}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Subject</span>
              <span className="text-gray-200">{contact.service || <span className="text-gray-600">—</span>}</span>
            </div>
          </div>

          {/* Date */}
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">Date Received</span>
            <span className="text-gray-300 inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-600" />
              {contact.created_at ? new Date(contact.created_at).toLocaleString() : "—"}
            </span>
          </div>

          {/* Full Message */}
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide block mb-2">Message</span>
            <div className="bg-[#0f0f11] border border-gray-800 rounded-2xl p-4 text-gray-300 leading-7 whitespace-pre-wrap text-sm">
              {contact.message || <span className="text-gray-600">No message provided.</span>}
            </div>
          </div>

        </div>

        {/* Footer action */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ContactsInboxPage() {
  const [contacts, setContacts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState("");
  const [searchTerm, setSearchTerm]           = useState("");
  const [page, setPage]                       = useState(1);
  const [totalPages, setTotalPages]           = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter]       = useState("All");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (statusFilter !== "All") params.set("status", statusFilter);
      const res = await fetch(`/api/contact?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load contact messages.");
      const data = await res.json();
      setContacts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Could not load contact submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    setPage(1);
  };

  // ── PATCH helper ───────────────────────────────────────────────────────────
  const patchContact = async (id, payload) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // ── Mark as Reviewed ───────────────────────────────────────────────────────
  const handleMarkReviewed = async (contact) => {
    const ok = await patchContact(contact.id, { status: "In Review" });
    if (ok) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, status: "In Review" } : c))
      );
      if (statusFilter !== "All" && statusFilter !== "In Review") fetchContacts();
    }
  };

  // ── Mark as Replied ────────────────────────────────────────────────────────
  const handleMarkReplied = async (contact) => {
    const ok = await patchContact(contact.id, { status: "Completed" });
    if (ok) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, status: "Completed" } : c))
      );
      if (statusFilter !== "All" && statusFilter !== "Completed") fetchContacts();
    }
  };

 // ── Reject ────────────────────────────────────────────────────────
  const handleReject = async (contact) => {
    const ok = await patchContact(contact.id, { status: "Rejected" });
    if (ok) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, status: "Rejected" } : c))
      );
      if (statusFilter !== "All" && statusFilter !== "Rejected") fetchContacts();
    }
  };

 
  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete submission.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Client-side search ─────────────────────────────────────────────────────
  const filteredContacts = contacts.filter((c) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Contact Inbox</h1>
        <p className="text-gray-400 text-sm mt-1">
          Review contact query submissions from the website
        </p>
      </div>

      {/* Search + Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                statusFilter === f
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6">
        {error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wide">
                  <th className="pb-3 pr-4 font-medium">Sender</th>
                  <th className="pb-3 pr-4 font-medium">Contact Info</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {loading ? (
                  <TableRowSkeleton rows={10} columns={5} />
                ) : filteredContacts.length > 0 ? (
                  filteredContacts.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-white/[0.02] align-middle transition-colors"
                    >
                      {/* Sender */}
                      <td className="py-4 pr-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {!c.is_read && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                              title="Unread"
                            />
                          )}
                          <span className={`${!c.is_read ? "font-semibold text-white" : "font-normal text-gray-300"}`}>
                            {c.name}
                          </span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 pr-4 text-gray-400">
                        <div className="text-gray-300">{c.email}</div>
                        {c.phone && (
                          <div className="text-xs text-gray-500 mt-0.5">{c.phone}</div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 pr-4 text-gray-500 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                          {c.created_at
                            ? new Date(c.created_at).toLocaleDateString()
                            : "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 pr-4">
                        <StatusBadge status={c.status || "New"} />
                      </td>

                      {/* Actions — Eye = view only | Three-dot = actions only */}
                      <td className="py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-0.5 justify-end">
                          {/* Eye: view full details + message */}
                          <button
                            onClick={() => setSelectedContact(c)}
                            className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center"
                            title="View full details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Three-dot: actions only */}
                          <ActionMenu
                            contact={c}
                            onMarkReviewed={handleMarkReviewed}
                            onReject={handleReject}
                            onMarkReplied={handleMarkReplied}
                            onDelete={handleDelete}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-600 text-sm">
                      No messages found.
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

      {/* View Details Modal — triggered by Eye icon only */}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}
