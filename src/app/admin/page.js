"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /admin to /admin/dashboard. Middleware will intercept and redirect to /admin/login if not logged in.
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-white text-sm">
      Redirecting to dashboard...
    </div>
  );
}
