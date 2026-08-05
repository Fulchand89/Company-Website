"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0b0b0b] text-white">{children}</div>;
  }

  return (
    <div className={`min-h-screen bg-[#0b0b0b] text-white flex${mounted ? " overflow-x-hidden" : ""}`}>
      <Sidebar />
      <div className={`flex-1 pl-64 flex flex-col min-h-screen${mounted ? " min-w-0" : ""}`}>
        <Navbar />
        <main className="flex-grow p-8 pt-28">
          {children}
        </main>
      </div>
    </div>
  );
}

