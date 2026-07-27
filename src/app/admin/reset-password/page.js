"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing password reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Password reset successfully! You can now sign in.");
        setTimeout(() => {
          router.push("/admin/login");
        }, 2500);
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-[#161618] border border-gray-800 rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <Image
          src="/assets/images/logo-gtw.png"
          alt="GTW Logo"
          width={120}
          height={40}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white tracking-tight">Set New Password</h2>
        <p className="text-gray-400 mt-2 text-sm">
          Create a new secure password for your administrator account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-950/40 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-sm px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition"
            required
            disabled={!token || !!success}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition"
            required
            disabled={!token || !!success}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token || !!success}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-red-900/20 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/admin/login"
          className="text-sm text-red-500 hover:text-red-400 font-semibold cursor-pointer"
        >
          Back to Admin Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-12">
      <Suspense fallback={
        <div className="text-white text-center">Loading password reset form...</div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
