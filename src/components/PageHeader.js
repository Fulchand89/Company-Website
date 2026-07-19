"use client";

import Link from "next/link";

/**
 * Reusable page hero/header banner used across inner pages.
 *
 * Props:
 *  - breadcrumb  : string   — label shown after "Home /" (e.g. "Services")
 *  - title       : string   — main <h1> text
 *  - description : string   — paragraph below the title
 *  - ctaText     : string   — button label (default: "Get Free Consultation →")
 *  - ctaHref     : string   — button href  (default: "/contact")
 *  - bgImage     : string   — background image path (optional override)
 */
export default function PageHeader({
  breadcrumb,
  title,
  description,
  ctaText = "Get Free Consultation →",
  ctaHref = "/contact",
  bgImage = "/assets/images/about/aboutbg.png",
}) {
  return (
    <section
      className="relative flex items-center justify-center min-h-[420px] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">

        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-5">
            <Link href="/" className="hover:text-[#b30d29] transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{breadcrumb}</span>
          </nav>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="max-w-3xl mx-auto mt-6 text-gray-300 leading-8">
            {description}
          </p>
        )}

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center mt-8 bg-[#b30d29] hover:bg-red-700 transition px-7 py-3 rounded-lg font-semibold"
          >
            {ctaText}
          </Link>
        )}

      </div>
    </section>
  );
}
