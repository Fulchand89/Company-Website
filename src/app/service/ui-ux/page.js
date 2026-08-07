"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   How Ui Ux Design Work - 4 steps with flow arrows
───────────────────────────────────────────── */
const steps = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#b30d29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Research & Discovery",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#b30d29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Information Architecture",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#b30d29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "UI Design & Prototyping",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#b30d29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Usability Testing",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions.",
  },
];

/* ─────────────────────────────────────────────
   Key Features / Benefits
───────────────────────────────────────────── */
const features = [
  "Comprehensive User Research & Persona Creation",
  "Wireframing & Interactive Prototyping",
  "User-Centered Interface Design",
  "Usability & A/B Testing",
  "Cross-Platform Accessibility Compliance",
  "Micro-Interaction & Animation Design",
  "Brand Identity Integration",
  "Information Architecture & User Flow Mapping",
  "Design System Development",
  "Continuous Iteration based on User Feedback",
];

/* ─────────────────────────────────────────────
   FAQs
───────────────────────────────────────────── */
const faqs = [
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
    q: "I run a restaurant. Can you build a site for reservations and online orders?",
    a: "Absolutely! We build custom restaurant websites with reservation systems, online ordering, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

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
        <span className="text-sm sm:text-base">{faq.q}</span>
        <span className="ml-4 flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 text-gray-700 transition-transform duration-300 ${open ? "-rotate-180" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-2 text-gray-600 leading-7 text-xs sm:text-sm border-t border-gray-100 bg-white">
          {faq.a}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page Component (UI/UX Design Page - Exact Match 2nd Screenshot)
───────────────────────────────────────────── */
export default function UiUxDesignPage() {
  return (
    <div className="bg-black text-white font-sans">
      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Hero Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight">
              Website Design
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Our UI/UX design services focus on creating intuitive, user-centric interfaces that engage your audience and drive conversions. We blend aesthetics with functionality to deliver exceptional digital experiences.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              From initial wireframing to high-fidelity prototyping, our design process ensures that every interaction feels natural and effortless. Let us transform your vision into a beautiful, functional product that users love.
            </p>
          </div>

          {/* Right Hero Image (Laptop mockup) */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/service/e-commerce4.png"
              alt="Website Design Mockup"
              width={580}
              height={380}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* ══════════════ 2. HOW UI UX DESIGN WORK & KEY FEATURES ══════════════ */}
      <section className="bg-white text-black rounded-[36px] mx-4 lg:mx-8 py-16 px-6 lg:px-16 my-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Title & Subtitle */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
              How <span className="text-[#b30d29]">Ui Ux Design</span> Work
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              We employ a structured, data-driven design process to ensure every decision enhances the overall user experience and aligns with your business goals.
            </p>
          </div>

          {/* Process Flow Steps with Red/Pink Dashed Connector Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-start relative text-left">
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row: Key Features Bullet Points & Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-[#111827] mb-6">
                Key Features/Benefits
              </h3>
              <ul className="space-y-3 text-gray-600 text-xs sm:text-sm leading-relaxed">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#111827] font-bold text-sm">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/e-commerce3.png"
                alt="Website Redesign Benefits Diagram"
                width={520}
                height={420}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 3. WHY WEBSITE DESIGN IS ESSENTIAL FOR BUSINESS GROWTH ══════════════ */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Why <span className="text-[#b30d29]">Website Design</span>
              <br />
              is Essential for Business Growth
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Gupta Tech Web specializes in building secure, scalable, and performance-driven eCommerce websites designed to accelerate your business growth and maximize online success.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#18181c] p-6 rounded-2xl border border-white/10 w-full max-w-lg shadow-2xl">
              <Image
                src="/assets/images/service/e-commerce4.png"
                alt="Website Design preview"
                width={550}
                height={350}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 4. SECURE, SCALABLE & FUTURE-READY ══════════════ */}
      <section className="bg-white text-black rounded-[36px] mx-4 lg:mx-8 py-16 px-6 lg:px-16 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/e-commerce4.png"
                alt="Secure, Scalable & Future-Ready Website Design Solutions"
                width={550}
                height={350}
                className="w-full h-auto rounded-2xl object-cover shadow-sm"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-6 leading-tight">
                Secure, Scalable <span className="text-[#b30d29]">&amp; Future-Ready</span> Website Design Solutions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Gupta Tech Web specializes in building secure, scalable, and performance-driven eCommerce websites designed to accelerate your business growth and maximize online success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 5. FAQ ══════════════ */}
      <section className="w-full py-20 px-6 lg:px-12 bg-white text-gray-900 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">FAQ's</h2>
            <h3 className="text-2xl font-bold text-[#b30d29] mb-3">
              Have questions ?
            </h3>
            <p className="font-semibold text-gray-700 mb-4 text-sm">
              We got answers.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-8">
              Gupta Tech Web specializes in building secure, scalable, and performance-driven eCommerce websites designed to accelerate your business growth and maximize online success.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-semibold border border-gray-300 text-gray-800 hover:border-[#b30d29] hover:text-[#b30d29] hover:bg-gray-50 transition px-6 py-2.5 rounded-lg"
            >
              Contact Us →
            </Link>
          </div>

          {/* Right Column Accordion */}
          <div className="lg:col-span-2">
            <h5 className="text-[#b30d29] font-semibold mb-6 text-sm">
              Outsourcing and Resource Supply
            </h5>
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. INNOVATIVE MOBILE APP / UI UX BANNER ══════════════ */}
      <section className="bg-white text-black rounded-[36px] mx-4 lg:mx-8 my-10 py-14 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] leading-tight mb-8">
              Innovative Mobile App Development Built to Power Your Growth
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm border border-gray-400 text-gray-800 hover:border-[#b30d29] hover:text-[#b30d29] transition px-6 py-3 rounded-xl font-medium"
            >
              Get Our Quote →
            </Link>
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <Image
              src="/assets/images/service/e-commerce4.png"
              alt="Innovative Solutions"
              width={420}
              height={280}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
