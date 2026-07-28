"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   How SEO Work Steps (7 items grid: 4 top + 3 bottom)
───────────────────────────────────────────── */
const workSteps = [
  {
    icon: "👤",
    title: "Client Consultation",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "🔍",
    title: "SEO Audit",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "📊",
    title: "Competitor Analysis",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "🎯",
    title: "Keyword Research",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "⚙️",
    title: "On-Page SEO",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "🔗",
    title: "Link Building",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
  {
    icon: "📈",
    title: "SEO Analytics",
    desc: "We combine strategy, technology, and innovation to deliver scalable eCommerce solutions customized to your unique business requirements.",
  },
];

/* ─────────────────────────────────────────────
   Key Features / Benefits
───────────────────────────────────────────── */
const features = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
];

/* ─────────────────────────────────────────────
   Blogs Section Cards
───────────────────────────────────────────── */
const blogs = [
  {
    img: "/assets/images/blog/blog1.png",
    category: "Inspiration",
    title: "8 Creative Ways to Repurpose Your Webinar Content",
  },
  {
    img: "/assets/images/blog/blog2.png",
    category: "Inspiration",
    title: "Why Webinars Are the #1 Lead Generation Marketing Strategy You May Not Be Thinking About",
  },
  {
    img: "/assets/images/blog/blog3.png",
    category: "Inspiration",
    title: "How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps",
  },
];

/* ─────────────────────────────────────────────
   FAQs
───────────────────────────────────────────── */
const faqs = [
  {
    q: "what's your cancellation policy for site management?",
    a: "Our goal is to keep our clients happy and satisfied. If you wish to cancel your monthly plan, simply inform our team and we will assist you with the process.",
  },
  {
    q: "how does gupta tech web handle security, and what ongoing support is provided?",
    a: "We implement strong security protocols, regular updates, malware protection, and continuous technical support to ensure your website remains safe and high-performing.",
  },
  {
    q: "privacy policies, terms and conditions, etc., how does gupta tech web service clarify to user information about these type of privacy issue?",
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with data protection standards.",
  },
  {
    q: "i run a restaurant and I'm looking for a website that can handle reservations and online orders, can gupta tech web services help with this?",
    a: "Absolutely! We build custom restaurant websites with reservation systems, online ordering, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific location for a",
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
        <span className="text-gray-500 text-xl ml-4 flex-shrink-0">
          {open ? "˄" : "˅"}
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
   Page Component (Digital Marketing / SEO Page - Exact Match 3rd Screenshot)
───────────────────────────────────────────── */
export default function DigitalMarketingPage() {
  return (
    <div className="bg-black text-white font-sans">
      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section
        className="relative min-h-[480px] bg-cover bg-center bg-no-repeat text-white pt-32 pb-20 flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/images/about/aboutbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            No.#1 SEO Company in Indore
            <br />
            Rank your website on Google
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </section>

      {/* ══════════════ 2. OUR APPROACH & KEY FEATURES ══════════════ */}
      <section className="bg-white text-black rounded-[36px] mx-4 lg:mx-8 py-16 px-6 lg:px-16 my-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Dashboards Image & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/seo2.png"
                alt="Our Approach to Search Engine Optimization Strategies"
                width={550}
                height={350}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] mb-6 leading-tight">
                Our Approach to <span className="text-[#b30d29]">Search Engine Optimization</span> Strategies
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.
              </p>
            </div>
          </div>

          {/* Bottom Row: Key Features Bullet Points & SEO Benefits Circle Diagram */}
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
                alt="Benefits of SEO Diagram"
                width={520}
                height={420}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 3. HOW SEO WORK ══════════════ */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            How <span className="text-[#b30d29]">SEO</span> Work
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
            We combine strategy, technology, and innovation to deliver scalable eCommerce solutions. By leveraging industry-leading platforms and modern development practices, we create secure, high-speed, and performance-focused online stores customized to your unique business requirements.
          </p>
        </div>

        {/* Top Row: 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {workSteps.slice(0, 4).map((step, i) => (
            <div
              key={i}
              className="bg-[#111113] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-[#b30d29] text-2xl mb-3">{step.icon}</div>
                <h3 className="text-white text-base font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: 3 Steps centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {workSteps.slice(4, 7).map((step, i) => (
            <div
              key={i}
              className="bg-[#111113] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-[#b30d29] text-2xl mb-3">{step.icon}</div>
                <h3 className="text-white text-base font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ 4. PROVEN SEO STRATEGIES & AI ASSISTANT ══════════════ */}
      <section className="bg-white text-black rounded-[36px] mx-4 lg:mx-8 py-16 px-6 lg:px-16 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">
                  Proven SEO Strategies
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias necessitatibus, nemo al repellendus optio debitis, iure eius exercipturi illum sint est, doloribus quia neque quos!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">
                  Higher ROI
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ab laes, aspeirorers, molestias a at voluptatum tenetur corporis quidem voluptatibus impedit animi eaque est, dolorum tempore!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">
                  Comprehensive SEO Services
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur quos placeat libero quae amet cum eligendi, maxime delectus, commodi ad! Eos corrupti iure dolores!
                </p>
              </div>
            </div>

            {/* Right Image: AI Marketing assistant mockup */}
            <div className="flex justify-center">
              <Image
                src="/assets/images/service/seo2.png"
                alt="Essential features of our AI Marketing assistant"
                width={550}
                height={380}
                className="w-full h-auto rounded-2xl object-cover border border-gray-100 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 5. BLOG SECTION ══════════════ */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold mb-3">Blog</h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            We take pride in building lasting partnerships through quality work, timely delivery, and transparent communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.
          </p>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {blogs.map((b, i) => (
            <div key={i} className="bg-[#111113] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-2">
              <div className="relative h-52 w-full rounded-xl overflow-hidden bg-gray-800 mb-3">
                <Image
                  src={b.img}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-gray-400 text-xs font-medium block mb-2">
                    {b.category}
                  </span>
                  <h3 className="text-white text-sm font-bold leading-snug mb-4 line-clamp-2">
                    {b.title}
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs text-[#b30d29] hover:underline font-semibold"
                >
                  Read
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-medium border border-white/30 text-white hover:border-[#b30d29] hover:text-[#b30d29] transition px-6 py-2.5 rounded-lg"
          >
            Read More →
          </Link>
        </div>
      </section>

      {/* ══════════════ 6. FAQ ══════════════ */}
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
              Contact us →
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
    </div>
  );
}
