"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Process Steps (How We Work)
───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Discovery & Architecture",
    bullets: ["Requirement Analysis", "Tech Stack Selection", "System Architecture"],
  },
  {
    num: "02",
    title: "UI/UX & Prototyping",
    bullets: ["Wireframing", "Mobile UI Design", "Interactive Prototypes"],
  },
  {
    num: "03",
    title: "Frontend & Backend Dev",
    bullets: ["Native & Cross-Platform", "API Integration", "Database Setup"],
  },
  {
    num: "04",
    title: "Testing & App Store Launch",
    bullets: ["QA & Security Testing", "Play Store Deployment", "App Store Deployment"],
  },
];

/* ─────────────────────────────────────────────
   Key Features / Benefits
───────────────────────────────────────────── */
const features = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
];

/* ─────────────────────────────────────────────
   Services Grid (8 Pill Cards)
───────────────────────────────────────────── */
const servicesList = [
  "iOS Application Development",
  "Android Application Development",
  "Flutter Cross-Platform Apps",
  "React Native Mobile Apps",
  "Progressive Web Apps (PWA)",
  "Mobile App UI/UX Design",
  "API & Backend Integration",
  "App Maintenance & Upgrades",
];

/* ─────────────────────────────────────────────
   Why Choose Us Left Items
───────────────────────────────────────────── */
const whyItems = [
  {
    title: "High Performance Apps",
    desc: "We build native and cross-platform mobile apps optimized for lightning speed, fluid animations, and smooth touch interactions.",
  },
  {
    title: "Robust Security",
    desc: "Every mobile app incorporates strict data encryption, secure authentication, and enterprise-grade security protocols.",
  },
  {
    title: "Seamless Integration",
    desc: "Effortlessly connect your mobile application with payment gateways, CRM systems, cloud databases, and third-party APIs.",
  },
];

/* ─────────────────────────────────────────────
   Tech Stack Grid Icons (18 icons)
───────────────────────────────────────────── */
const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

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
   Page Component
───────────────────────────────────────────── */
export default function MobileAppDevelopmentPage() {
  return (
    <>
      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section
        className="relative min-h-[550px] bg-cover bg-center bg-no-repeat text-white pt-28 pb-16"
        style={{ backgroundImage: "url('/assets/images/about/aboutbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Hero Text */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Mobile App <span className="text-[#b30d29]">Development</span> Services in India
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Right Hero Image */}
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/app4.png"
                alt="Mobile App Development in India"
                width={520}
                height={520}
                className="w-full max-w-lg h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 2. WHAT IS A MOBILE APP ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12 text-black">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: App Development Image & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/e-commerce2.png"
                alt="What is a Mobile App"
                width={550}
                height={350}
                className="w-full h-auto rounded-2xl object-cover shadow-sm"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6 leading-tight">
                What is a <span className="text-[#b30d29]">Mobile Application</span> , Why You Should Create It &amp; Key Features/Benefits
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Bottom Row: Key Features Bullet Points & Circle Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#111827] mb-6">
                Key Features/Benefits
              </h3>
              <ul className="space-y-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#b30d29] font-bold text-base">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/e-commerce3.png"
                alt="Important Features for Mobile App"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 3. HOW WE WORK ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              How We <span className="text-[#b30d29]">Work</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
              We combine strategy, technology, and innovation to deliver scalable mobile application solutions. By leveraging modern frameworks and native best practices, we ensure high speed, iron-clad security, and a seamless app experience.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[#111113] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[#b30d29] text-2xl font-bold block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                    {step.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 4. SERVICES USED BY DEVELOPERS ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
              Services used by our{" "}
              <span className="text-[#b30d29]">Mobile App</span> Developers
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-3xl">
              Our mobile app developers deliver scalable, robust, and feature-rich Android and iOS applications tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicesList.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center flex items-center justify-center min-h-[80px]"
              >
                <span className="font-semibold text-xs sm:text-sm text-[#111827] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 5. POWERFUL & SCALABLE ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Powerful &amp; Scalable
                <br />
                Mobile App
                <br />
                Development Solutions
              </h2>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/assets/images/service/e-commerce4.png"
                alt="Powerful & Scalable Mobile App Solutions"
                width={550}
                height={350}
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 6. WHY CHOOSE GUPTA TECH WEB ══════════════ */}
      <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12 text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
            Why choose <span className="text-[#b30d29]">Gupta Tech Web</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-10 max-w-4xl">
            Gupta Tech Web specializes in building secure, scalable, and performance-driven mobile applications designed to accelerate your business growth and maximize customer engagement.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 cols - 3 items */}
            <div className="lg:col-span-2 space-y-8">
              {whyItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#b30d29] font-bold text-lg">⚙</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827] text-base sm:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right dark card */}
            <div className="bg-[#18181b] text-white rounded-2xl p-8 border border-gray-800">
              <div className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center mb-6">
                <span className="text-[#b30d29] font-bold text-lg">⚙</span>
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-4">
                Mobile Excellence
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Investing in custom mobile app development allows you to create a unique experience tailored to your mobile users using modern frameworks and native APIs.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
                Our apps offer top-tier performance, offline capabilities, and high conversion design.
              </p>
              <Link
                href="/contact"
                className="inline-block border border-gray-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:border-[#b30d29] hover:text-[#b30d29] transition"
              >
                Contact →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 7. TECH STACK WE USE ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mobile Tech <span className="text-[#b30d29]">Stack</span> We Use
          </h2>

          {/* 18 Tile Grid (3 rows x 6 cols) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {techLogos.map((num, i) => (
              <div
                key={i}
                className="bg-[#18181c] border border-white/5 rounded-2xl p-5 aspect-square flex items-center justify-center hover:border-white/20 transition"
              >
                <Image
                  src={`/assets/images/service/tech${num}.png`}
                  alt={`Technology icon ${num}`}
                  width={44}
                  height={44}
                  className="object-contain max-h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 8. FAQ ══════════════ */}
      <section className="w-full py-16 px-6 lg:px-8 bg-white text-gray-900 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">FAQ's</h2>
              <h3 className="text-2xl font-bold text-[#b30d29] mb-3">
                Have questions ?
              </h3>
              <p className="font-semibold text-gray-700 mb-3 text-sm">
                We got answers.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                Gupta Tech Web specializes in building secure, scalable, and performance-driven eCommerce websites designed to accelerate your business growth and maximize online success.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-xs font-semibold border border-gray-300 text-gray-800 hover:border-[#b30d29] hover:text-[#b30d29] hover:bg-gray-50 transition px-5 py-2.5 rounded-lg"
              >
                Contact us →
              </Link>
            </div>

            {/* Right Column Accordion */}
            <div className="lg:col-span-2">
              <h5 className="text-[#b30d29] font-semibold mb-4 text-sm">
                Outsourcing and Resource Supply
              </h5>
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 9. STRATEGIC SERVICES BANNER ══════════════ */}
      <section
        className="relative min-h-[300px] flex items-center bg-cover bg-center text-white mx-4 lg:mx-8 rounded-3xl overflow-hidden my-12"
        style={{ backgroundImage: "url('/assets/images/service/bottom-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-8 lg:px-16 py-12">
          <h2 className="text-3xl sm:text-4xl font-bold max-w-xl mb-6 leading-tight">
            Strategic Mobile App Services Designed to Transform Your Business
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-semibold border border-white/80 text-white hover:bg-white hover:text-black transition px-6 py-2.5 rounded-lg"
          >
            Get Our Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
