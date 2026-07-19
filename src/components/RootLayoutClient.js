"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "flex-1" : "flex-grow"}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
