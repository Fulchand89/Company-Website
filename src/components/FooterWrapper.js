"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

/**
 * Thin client boundary that hides the Footer on /admin routes.
 * Kept separate from NavbarWrapper so each can be tree-shaken independently.
 */
export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Footer />;
}
