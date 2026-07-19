"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Process Steps
───────────────────────────────────────────── */
const steps = [
  {
    img: "/assets/images/service/ui-ux5.png",
    title: "Discovery & Planning",
    desc: "We combine strategy, technology, and innovation.",
  },
  {
    img: "/assets/images/service/ui-ux6.png",
    title: "UI/UX Design",
    desc: "We combine strategy, technology, and innovation.",
  },
  {
    img: "/assets/images/service/ui-ux7.png",
    title: "Development",
    desc: "We combine strategy, technology, and innovation.",
  },
  {
    img: "/assets/images/service/ui-ux.png",
    title: "Testing & Launch",
    desc: "We combine strategy, technology, and innovation.",
  },
];

/* ─────────────────────────────────────────────
   Key Features
───────────────────────────────────────────── */
const features = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
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
   FAQ Item
───────────────────────────────────────────── */
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-2xl overflow-hidden bg-[#111]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-white hover:bg-[#1a1a1a] transition"
      >
        <span>{faq.q}</span>
        <span className="text-[#b30d29] text-xl ml-4 flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-400 leading-7 text-sm">{faq.a}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function MobileAppDevelopmentPage() {
  return (
    <>
      {/* ══════════════ SECTION 1 — HERO + PROCESS ══════════════ */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white pt-24 pb-0"
        style={{ backgroundImage: "url('/assets/images/about/aboutbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#b30d29] transition">Home</Link>
            <span>/</span>
            <Link href="/service" className="hover:text-[#b30d29] transition">Services</Link>
            <span>/</span>
            <span className="text-white">Mobile App Development</span>
          </nav>

          {/* Hero 2-col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Mobile App{" "}
                <span className="text-[#b30d29]">Development</span>
              </h1>
              <p className="text-gray-300 leading-8 mb-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p className="text-gray-400 leading-8">
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/assets/images/mobile-app/mobile1.png"
                alt="Mobile App Development"
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Process Steps */}
          <div className="pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">
                How{" "}
                <span className="text-[#b30d29]">Mobile App Development</span>{" "}
                Works
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-7">
                We combine strategy, technology, and innovation to deliver
                scalable eCommerce solutions.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
              }}
            >
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Icon box */}
                  <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mb-4 border border-white/20">
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  {/* Dashed arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(100%-12px)] w-6 text-[#b30d29] text-xl font-bold z-10">
                      →
                    </div>
                  )}

                  <h4 className="font-bold text-white text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-6">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ SECTION 2 — WHY INVEST ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Why Invest row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <Image
                src="/assets/images/mobile-app/mobile2.png"
                alt="Why Invest"
                width={500}
                height={200}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#111827] mb-6">
                Why Invest in{" "}
                <span className="text-[#b30d29]">Mobile App Development</span>
                ?, Features, Benefits &amp; Business Impact
              </h3>
              <p className="text-gray-600 leading-8 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <p className="text-gray-600 leading-8">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets.
              </p>
            </div>
          </div>

          {/* Key Features row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#111827] mb-6">
                Key Features/Benefits
              </h3>
              <ul className="space-y-4">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 leading-7"
                  >
                    <span className="text-[#b30d29] mt-1 flex-shrink-0">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/images/mobile-app/mobile3.png"
                alt="Key Features"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ SECTION 3 — SECURE & SCALABLE ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/assets/images/mobile-app/mobile4.png"
                alt="Secure & Scalable"
                width={500}
                height={500}
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Secure, Scalable &amp; Future-Ready Mobile App Solutions
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 4 — WHY ESSENTIAL ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#111827] mb-6">
                Why{" "}
                <span className="text-[#b30d29]">Mobile App Development</span>{" "}
                is Essential for Business Growth
              </h3>
              <p className="text-gray-600 leading-8">
                Gupta Tech Web specializes in building secure, scalable, and
                performance-driven eCommerce websites designed to accelerate your
                business growth and maximize online success.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/images/mobile-app/mobile3.png"
                alt="Essential for Growth"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 5 — FAQ ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px" }}
            className="items-start max-lg:!grid-cols-1"
          >
            {/* Left */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">FAQ's</h2>
              <h3 className="text-2xl font-bold text-[#b30d29] mb-3">
                Have Questions?
              </h3>
              <p className="font-semibold text-gray-300 mb-3">
                We've got answers.
              </p>
              <p className="text-gray-400 leading-7 mb-6">
                Gupta Tech Web specializes in building secure, scalable, and
                performance-driven eCommerce websites designed to accelerate your
                business growth and maximize online success.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center border border-white hover:border-[#b30d29] hover:text-[#b30d29] transition px-6 py-3 rounded-xl font-semibold"
              >
                Contact Us →
              </Link>
            </div>

            {/* Right — Accordion */}
            <div>
              <h5 className="text-[#b30d29] font-semibold mb-4 text-base">
                Outsourcing &amp; Resource Supply
              </h5>
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 6 — CTA ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#111827] leading-tight mb-6">
                Innovative{" "}
                <span className="text-[#b30d29]">Mobile App Development</span>.
                <br />
                Built to Power Your Growth
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center border border-[#111827] text-[#111827] hover:bg-[#b30d29] hover:text-white hover:border-[#b30d29] transition px-6 py-3 rounded-lg font-semibold"
              >
                Get Our Quote <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/app4.png"
                alt="Mobile App"
                width={200}
                height={200}
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
