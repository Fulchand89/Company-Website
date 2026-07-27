"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Calendar, MessageSquare } from "lucide-react";
import Pagination from "@/components/Pagination";
import { TableRowSkeleton } from "@/components/Skeleton";

export default function ContactsInboxPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`/api/contact?page=${page}&limit=5`);
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
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete submission.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter
  const filteredContacts = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Contact Inbox</h1>
            <p className="text-gray-400 text-sm mt-1">Review contact query submissions from the website</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by sender, email, query details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-800 bg-[#161618] text-white text-sm focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Table */}
          <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6">
            {error ? (
              <div className="text-center py-12 text-red-500 text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 text-sm">
                      <th className="pb-3">Sender</th>
                      <th className="pb-3">Contact info</th>
                      <th className="pb-3">Message</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-sm">
                    {loading ? (
                      <TableRowSkeleton rows={5} columns={5} />
                    ) : filteredContacts.length > 0 ? (
                      filteredContacts.map((c) => (
                        <tr key={c.id} className="hover:bg-zinc-800/10 align-top">
                          <td className="py-4 font-semibold text-white">{c.name}</td>
                          <td className="py-4 text-gray-300">
                            <div>{c.email}</div>
                            {c.phone && <div className="text-xs text-gray-500 mt-0.5">{c.phone}</div>}
                          </td>
                          <td className="py-4 text-gray-300 max-w-md whitespace-pre-wrap leading-relaxed pr-6">
                            {c.message}
                          </td>
                          <td className="py-4 text-gray-400">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-600" />
                              {c.created_at ? new Date(c.created_at).toLocaleDateString() : "N/A"}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="text-gray-500 hover:text-red-400 font-medium cursor-pointer inline-flex items-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          No messages received yet.
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
    </div>
  );
}
