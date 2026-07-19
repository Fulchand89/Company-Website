"use client";

import { useEffect, useState } from "react";
import { User, ShieldAlert, KeyRound } from "lucide-react";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    // Fetch profile info using logged in session id from cookies
    try {
      const match = document.cookie.match(new RegExp('(^| )gtw_session=([^;]*)'));
      if (match) {
        const decoded = decodeURIComponent(match[2]);
        const session = JSON.parse(decoded);
        if (session && session.id) {
          fetch(`/api/users/${session.id}`)
            .then((res) => {
              if (res.ok) return res.json();
              throw new Error("Failed to load profile details");
            })
            .then((data) => {
              setProfile({ name: data.name, email: data.email });
            })
            .catch((err) => console.error(err));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email) {
      setStatus({ type: "error", message: "Name and email are required fields." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Profile details updated successfully!" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to update profile." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordForm.password || !passwordForm.confirmPassword) {
      setStatus({ type: "error", message: "Password fields are required." });
      return;
    }
    if (passwordForm.password !== passwordForm.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          password: passwordForm.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Password changed successfully!" });
        setPasswordForm({ password: "", confirmPassword: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to change password." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Admin Profile Settings</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your account information and password settings</p>
          </div>

          {status.message && (
            <div className={`p-4 rounded-xl text-sm font-semibold max-w-2xl border ${
              status.type === "success" 
                ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" 
                : "bg-red-950/40 border-red-800 text-red-400"
            }`}>
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
            
            {/* Profile form */}
            <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold">Profile Details</h3>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Administrator"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="admin@example.com"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl transition text-sm disabled:opacity-50 cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Password form */}
            <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <KeyRound className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold">Change Password</h3>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl transition text-sm disabled:opacity-50 cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>

          </div>
    </div>
  );
}
