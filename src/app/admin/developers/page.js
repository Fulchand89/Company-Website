"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import Image from "next/image";

export default function DevelopersAdmin() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "Junior (0-2 yrs)",
    skills: "",
    available: true,
    img: "/assets/images/hero/team-demo.png"
  });

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/developers");
      const data = await res.json();
      setDevelopers(data.data || []);
    } catch (error) {
      console.error("Error fetching developers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const handleOpenModal = (dev = null) => {
    if (dev) {
      setEditingDev(dev);
      setFormData({
        name: dev.name,
        role: dev.role,
        experience: dev.experience,
        skills: Array.isArray(dev.skills) ? dev.skills.join(", ") : dev.skills,
        available: dev.available,
        img: dev.img || "/assets/images/hero/team-demo.png"
      });
    } else {
      setEditingDev(null);
      setFormData({
        name: "",
        role: "",
        experience: "Junior (0-2 yrs)",
        skills: "",
        available: true,
        img: "/assets/images/hero/team-demo.png"
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDev(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim()).filter(Boolean);
      const payload = { ...formData, skills: skillsArray };

      const url = editingDev ? `/api/developers/${editingDev.id}` : "/api/developers";
      const method = editingDev ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        handleCloseModal();
        fetchDevelopers();
      } else {
        console.error("Failed to save developer");
      }
    } catch (error) {
      console.error("Error saving developer:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this developer?")) {
      try {
        const res = await fetch(`/api/developers/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchDevelopers();
        }
      } catch (error) {
        console.error("Error deleting developer:", error);
      }
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Developers</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#B30D29] hover:bg-[#9a0b23] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Add Developer
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#B30D29]" size={40} />
          </div>
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-4 font-semibold text-gray-300">Name</th>
                    <th className="p-4 font-semibold text-gray-300">Role</th>
                    <th className="p-4 font-semibold text-gray-300">Experience</th>
                    <th className="p-4 font-semibold text-gray-300">Status</th>
                    <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {developers.length > 0 ? (
                    developers.map((dev) => (
                      <tr key={dev.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <Image src={dev.img || "/assets/images/hero/team-demo.png"} alt={dev.name} width={40} height={40} className="rounded-full object-cover w-10 h-10 border border-white/10" />
                          <span className="font-medium text-white">{dev.name}</span>
                        </td>
                        <td className="p-4 text-gray-400">{dev.role}</td>
                        <td className="p-4 text-gray-400">{dev.experience}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${dev.available ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                            {dev.available ? "Available" : "Engaged"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleOpenModal(dev)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors mr-2">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(dev.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No developers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold text-white">{editingDev ? "Edit Developer" : "Add New Developer"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B30D29]" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Role</label>
                  <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B30D29]" placeholder="e.g. Full Stack Developer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Experience Level</label>
                  <select required value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B30D29]">
                    <option value="Junior (0-2 yrs)">Junior (0-2 yrs)</option>
                    <option value="Mid (2-5 yrs)">Mid (2-5 yrs)</option>
                    <option value="Senior (5+ yrs)">Senior (5+ yrs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Image URL</label>
                  <input type="text" value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B30D29]" placeholder="/assets/images/hero/team-demo.png" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Skills (comma separated)</label>
                  <input required type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B30D29]" placeholder="e.g. React.js, Node.js, MERN Stack" />
                </div>
                <div className="md:col-span-2 flex items-center gap-3 mt-2">
                  <input type="checkbox" id="available" checked={formData.available} onChange={(e) => setFormData({...formData, available: e.target.checked})} className="w-5 h-5 accent-[#B30D29] bg-[#1a1a1a] border-white/10 rounded cursor-pointer" />
                  <label htmlFor="available" className="text-sm font-medium text-gray-300 cursor-pointer">Available for Hire</label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg font-medium text-gray-300 hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex items-center gap-2 bg-[#B30D29] hover:bg-[#9a0b23] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-[#B30D29]/20">
                  <Check size={18} />
                  {editingDev ? "Save Changes" : "Add Developer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
