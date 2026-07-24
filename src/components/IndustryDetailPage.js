"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   FAQ Accordion Item
───────────────────────────────────────────── */
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/80 hover:border-gray-300 transition-all shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-100/70 transition"
      >
        <span>{faq.q}</span>
        <span className="text-gray-500 text-xl ml-4 flex-shrink-0">
          {open ? "∧" : "∨"}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-2 text-gray-600 leading-7 text-sm border-t border-gray-100 bg-white">
          {faq.a}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Default FAQs (shared across all industry pages)
───────────────────────────────────────────── */
export const defaultFaqs = [
  {
    q: "What is your cancellation policy for site management?",
    a: "Our goal is to keep our clients happy and satisfied. If you wish to cancel your monthly plan, simply inform our team and we will assist you with the process.",
  },
  {
    q: "How does Gupta Tech Web handle security and support?",
    a: "We implement strong security protocols, regular updates, malware protection, and continuous technical support to ensure your website remains safe and high-performing.",
  },
  {
    q: "How do you clarify privacy policies and terms?",
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with data protection standards.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
  {
    q: "How long does it take to build a custom solution?",
    a: "Project timelines vary based on scope and complexity. We provide a detailed timeline after understanding your requirements during the initial consultation.",
  },
];

/* ─────────────────────────────────────────────
   Props:
   - title        : string   — page title e.g. "Healthcare"
   - breadcrumb   : string   — last breadcrumb label
   - breadcrumbHref: string  — parent breadcrumb href (default /industry)
   - description  : string   — hero paragraph
   - heroImage    : string   — hero right-side image path
   - solutionTitle: string   — colored span text in "Our solution for X"
   - solutionDesc : string   — subtitle under solutions heading
   - solutions    : Array<{img, title, desc}>  — 9 solution cards
   - faqDesc      : string   — left column FAQ description
   - faqs         : Array<{q, a}> — accordion items (optional, uses defaultFaqs)
───────────────────────────────────────────── */
export default function IndustryDetailPage({
  title,
  breadcrumb,
  breadcrumbHref = "/industry",
  description,
  heroImage = "/assets/images/industry/restaurant.png",
  solutionTitle,
  solutionDesc = "We combine strategy, technology, and innovation to deliver scalable solutions. By leveraging industry-leading platforms and modern development practices.",
  solutions = [],
  faqDesc,
  faqs,
}) {
  const faqList = faqs ?? defaultFaqs;

  return (
    <>
      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative min-h-[520px]  flex items-center bg-cover bg-center bg-no-repeat text-white pt-32"
        style={{ backgroundImage: "url('/assets/images/about/aboutbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#b30d29] transition">Home</Link>
            <span>/</span>
            <Link href={breadcrumbHref} className="hover:text-[#b30d29] transition">Industries</Link>
            <span>/</span>
            <span className="text-white">{breadcrumb ?? title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {title}
              </h1>
              <p className="text-gray-300 leading-8 mb-8">{description}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-[#b30d29] hover:bg-red-700 transition px-6 py-3 rounded-lg font-semibold"
                >
                  Get Consultant <span className="ml-2">→</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center border border-white hover:border-[#b30d29] hover:text-[#b30d29] transition px-6 py-3 rounded-lg font-semibold"
                >
                  View Case Study
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={title}
                  width={560}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ OUR SOLUTIONS ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#111827]">
              Our solution for{" "}
              <span className="text-[#b30d29]">{solutionTitle ?? title}</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-7">
              {solutionDesc}
            </p>
          </div>

          {/* 3-column grid — inline style avoids Tailwind purge issues */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {solutions.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="object-contain flex-shrink-0"
                  />
                  <h5 className="font-semibold text-[#b30d29] text-base leading-snug">
                    {item.title}
                  </h5>
                </div>
                <p className="text-gray-600 text-sm leading-6">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="w-full py-16 px-6 lg:px-8 bg-white text-gray-900 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">FAQ's</h2>
              <h3 className="text-2xl font-bold text-[#b30d29] mb-3">
                Have questions ?
              </h3>
              <p className="font-semibold text-gray-700 mb-3">
                We got answers.
              </p>
              <p className="text-gray-600 leading-7 mb-6 text-sm">
                {faqDesc ?? `Gupta Tech Web specializes in building secure, scalable, and performance-driven ${title} solutions designed to accelerate your business growth.`}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center border border-gray-300 text-gray-800 hover:border-[#b30d29] hover:text-[#b30d29] hover:bg-gray-50 transition px-6 py-3 rounded-xl font-semibold text-sm"
              >
                Contact Us →
              </Link>
            </div>

            {/* Right — Accordion */}
            <div className="lg:col-span-2">
              <h5 className="text-[#b30d29] font-semibold mb-4 text-base">
                Outsourcing and Resource Supply
              </h5>
              {faqList.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
