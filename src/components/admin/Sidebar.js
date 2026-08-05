"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  UserCheck,
  Mail,
  User,
  LogOut,
  FileText,
  Quote,
  Users,
  Calendar,
  Code
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Portfolio", href: "/admin/portfolio", icon: <FolderKanban className="w-5 h-5" /> },
    { name: "Blogs", href: "/admin/blogs", icon: <FileText className="w-5 h-5" /> },
    { name: "Testimonials", href: "/admin/testimonials", icon: <Quote className="w-5 h-5" /> },
    { name: "Our Teams", href: "/admin/teams", icon: <Users className="w-5 h-5" /> },
    { name: "Events", href: "/admin/events", icon: <Calendar className="w-5 h-5" /> },
    { name: "Jobs", href: "/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Applications", href: "/admin/applications", icon: <UserCheck className="w-5 h-5" /> },
    { name: "Developers", href: "/admin/developers", icon: <Code className="w-5 h-5" /> },
    { name: "Contacts", href: "/admin/contacts", icon: <Mail className="w-5 h-5" /> },
    { name: "Profile", href: "/admin/profile", icon: <User className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-64 bg-[#161618] border-r border-gray-800 flex flex-col h-screen fixed top-0 left-0 z-40 text-white">
      {/* Brand Logo */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-center">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image
            src="/assets/images/logo-gtw.png"
            alt="GTW Logo"
            width={100}
            height={30}
          />
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className={`flex-1 p-4 space-y-1 overflow-y-auto${mounted ? " scrollbar-hide" : ""}`}>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/10 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-500 hover:bg-red-950/20 hover:text-red-400 transition cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
