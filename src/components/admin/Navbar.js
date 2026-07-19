"use client";

import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [adminEmail, setAdminEmail] = useState("Admin User");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Read user email from cookie or session on mount
    try {
      const match = document.cookie.match(new RegExp('(^| )gtw_session=([^;]*)'));
      if (match) {
        const decoded = decodeURIComponent(match[2]);
        const session = JSON.parse(decoded);
        if (session && session.email) {
          setAdminEmail(session.email);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listeners to close dropdown on click outside or escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      const container = document.getElementById("profile-dropdown-container");
      if (container && !container.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Handle administrator logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        window.location.href = "/admin/login";
      } else {
        alert("Logout failed.");
      }
    } catch (err) {
      console.error("Logout Error:", err);
      alert("An error occurred during logout.");
    }
  };

  return (
    <header className="h-20 bg-[#161618] border-b border-gray-800 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-30 text-white">
      <div>
        <h2 className="text-lg font-bold tracking-tight">System Administration</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info Container with Dropdown Trigger */}
        <div id="profile-dropdown-container" className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Administrator Menu"
          >
            <div className="text-right">
              <h4 className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors">Administrator</h4>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{adminEmail}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1e1e21] border border-gray-700 group-hover:border-red-600 flex items-center justify-center text-white transition-all">
              <User className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Smooth Dropdown Menu */}
          <div
            className={`absolute right-0 mt-3 w-48 bg-[#161618] border border-gray-800 rounded-2xl shadow-xl z-50 py-1.5 transition-all duration-200 ease-out origin-top-right transform ${
              isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <Link
              href="/admin/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800/40 hover:text-white transition-colors"
            >
              <User className="w-4 h-4 text-gray-400" />
              <span>Profile</span>
            </Link>
            
            <div className="border-t border-gray-800 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-zinc-800/40 hover:text-red-400 transition-colors text-left font-medium focus:outline-none cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
