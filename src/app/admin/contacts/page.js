"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Calendar, Eye } from "lucide-react";
import Pagination from "@/components/Pagination";
import { TableRowSkeleton } from "@/components/Skeleton";

export default function ContactsInboxPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);

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
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
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
      (c.service && c.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.details && c.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
                  <th className="pb-3">Services</th>
                  <th className="pb-3">Details</th>
                  <th className="pb-3">Message</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {loading ? (
                  <TableRowSkeleton rows={5} columns={7} />
                ) : filteredContacts.length > 0 ? (
                  filteredContacts.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-800/10 align-top">
                      <td className="py-4 font-semibold text-white whitespace-nowrap">{c.name}</td>
                      <td className="py-4 text-gray-300">
                        <div>{c.email}</div>
                        {c.phone && <div className="text-xs text-gray-500 mt-0.5">{c.phone}</div>}
                      </td>
                      <td className="py-4 text-gray-300 max-w-[120px] truncate" title={c.service}>
                        {c.service || "N/A"}
                      </td>
                      <td className="py-4 text-gray-300 max-w-[180px] truncate" title={c.details}>
                        {c.details || "N/A"}
                      </td>
                      <td className="py-4 text-gray-300 max-w-[200px] truncate" title={c.message}>
                        {c.message}
                      </td>
                      <td className="py-4 text-gray-400 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-600" />
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : "N/A"}
                        </span>
                      </td>
                      <td className="py-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="text-gray-500 hover:text-white font-medium cursor-pointer inline-flex items-center"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-gray-500 hover:text-red-400 font-medium cursor-pointer inline-flex items-center"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
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

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl relative">
            <h2 className="text-xl font-bold border-b border-gray-800 pb-3 flex justify-between items-center">
              <span>Contact Details</span>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white text-sm px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                ✕ Close
              </button>
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block">Sender Name</span>
                <span className="font-semibold text-white">{selectedContact.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 block">Email Address</span>
                  <a href={`mailto:${selectedContact.email}`} className="text-red-400 hover:underline">{selectedContact.email}</a>
                </div>
                <div>
                  <span className="text-gray-500 block">Phone Number</span>
                  <span>{selectedContact.phone || "N/A"}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block">Services (Inquiry For)</span>
                <span className="inline-block bg-red-600/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md text-xs font-semibold mt-1">
                  {selectedContact.service || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-gray-500 block">Developer Details</span>
                <div className="bg-zinc-900 border border-gray-800 rounded-xl p-3 text-gray-300 whitespace-pre-wrap mt-1">
                  {selectedContact.details || "No developer details associated."}
                </div>
              </div>

              <div>
                <span className="text-gray-500 block">Inquiry Message</span>
                <div className="bg-zinc-900 border border-gray-800 rounded-xl p-3 text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto mt-1">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <span className="text-gray-500 block">Date Received</span>
                <span className="text-gray-300">
                  {selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
