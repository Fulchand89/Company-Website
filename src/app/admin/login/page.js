"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [hasAdminUser, setHasAdminUser] = useState(true); // Default true until checked
  const [checkingUserCount, setCheckingUserCount] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check if an admin account already exists
    fetch("/api/users/count")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasUser === "boolean") {
          setHasAdminUser(data.hasUser);
          if (data.hasUser) {
            setIsSignUp(false);
          }
        }
      })
      .catch((err) => console.error("Error checking admin user count:", err))
      .finally(() => setCheckingUserCount(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Password reset link sent to your email!");
      } else {
        setError(data.error || "Failed to request password reset.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while requesting password reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isForgotPassword) {
      return handleForgotPasswordSubmit(e);
    }

    if (isSignUp) {
      // Sign Up Flow
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "admin" // Automatically register as admin
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setSuccess("Account registered successfully! Please sign in.");
          setHasAdminUser(true);
          setIsSignUp(false);
          setFormData((prev) => ({ ...prev, password: "" }));
        } else {
          setError(data.error || "Failed to register account.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred during registration.");
      } finally {
        setLoading(false);
      }
    } else {
      // Sign In Flow
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await res.json();
        if (res.ok) {
          router.push("/admin");
        } else {
          setError(data.error || "Invalid email or password.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred during login.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#161618] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Image
            src="/assets/images/logo-gtw.png"
            alt="GTW Logo"
            width={120}
            height={40}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isForgotPassword ? "Forgot Password" : "Admin Portal"}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {isForgotPassword
              ? "Enter your email to receive password reset instructions"
              : isSignUp
              ? "Register primary administrator account"
              : "Sign in to manage jobs, users, and applications"}
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

          {isSignUp && !isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@crazydigitalworlds.com"
              className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition"
              required
            />
          </div>

          {!isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-700 bg-[#1e1e21] text-white rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-red-600 transition"
                required
              />
              <div className="mt-2 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setIsSignUp(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-xs text-red-500 hover:text-red-400 font-medium cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || checkingUserCount}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-red-900/20 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? isForgotPassword
                ? "Sending Reset Link..."
                : isSignUp
                ? "Registering..."
                : "Signing in..."
              : isForgotPassword
              ? "Send Reset Link"
              : isSignUp
              ? "Register Admin Account"
              : "Sign In"}
          </button>
        </form>

        {isForgotPassword ? (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setError("");
                setSuccess("");
              }}
              className="text-sm text-red-500 hover:text-red-400 font-semibold cursor-pointer bg-transparent border-0 focus:outline-none"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          !checkingUserCount &&
          !hasAdminUser && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setSuccess("");
                }}
                className="text-sm text-red-500 hover:text-red-400 font-semibold cursor-pointer bg-transparent border-0 focus:outline-none"
              >
                {isSignUp ? "Already have an account? Sign In" : "First Time Setup? Create Admin Account"}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
