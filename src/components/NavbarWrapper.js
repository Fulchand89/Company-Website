"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

/**
 * Thin client boundary — the only reason this file is a Client Component is
 * to call usePathname(). It renders nothing when the current route is under
 * /admin, otherwise it renders the Navbar.
 *
 * Keeping this wrapper small means Footer and the rest of the layout tree
 * stay as Server Components and are never shipped to the client JS bundle.
 */
export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Navbar />;
}
