"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { TestimonialSkeleton } from "@/components/Skeleton";

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ img, name, project, text, rating = 5 }) {
  const starsString = "★".repeat(rating || 5);

  return (
    <div className="w-full">
      {/* extra top margin on the wrapper to make space for the floating avatar */}
      <div className="relative flex h-[296px] flex-col rounded-[16px] bg-white px-6 pb-5 pt-[66px] shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        {/* Floating avatar */}
        <div className="absolute left-[27px] top-[-38px]">
          <Image
            src={img || "/assets/images/hero/client-img1.png"}
            alt={name || "Client"}
            width={64}
            height={64}
            className="rounded-full object-cover"
            style={{ width: "64px", height: "64px" }}
          />
        </div>

        {/* Stars */}
        <div className="absolute right-5 top-6 text-[22px] leading-none tracking-[1px] text-[#ffb800]">
          {starsString}
        </div>

        {/* Body text — my-5 gives top gap so text clears the avatar */}
        <p className="text-[14px] leading-[21px] text-[#757575]">{text}</p>

        {/* Name + project */}
        <div className="mt-auto">
          <h5 className="mb-1 text-[18px] font-bold leading-5 text-[#bd1232]">{name}</h5>
          <p className="mb-0 text-[13px] leading-4">
            <span className="text-[#757575]">Project : </span>
            <span className="font-semibold text-[#f05263]">{project}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const INITIAL_TESTIMONIALS = [
  { id: 1, img: "/assets/images/hero/client-img1.png", name: "David Henderson", project: "E-Commerce Replatforming", text: "Gupta Tech Web transformed our online store. The new architecture is blazingly fast, and we saw a 40% increase in conversions within the first month. Highly recommended team!", rating: 5 },
  { id: 2, img: "/assets/images/hero/client-img2.png", name: "Michael Chang", project: "Logistics Dashboard", text: "Our supply chain operations were completely modernized. Gupta Tech Web engineered a custom dashboard that gives us real-time insights, saving us countless hours of manual work.", rating: 5 },
  { id: 3, img: "/assets/images/hero/client-img3.png", name: "Sarah Collins", project: "Healthcare CRM App", text: "They delivered our mobile application ahead of schedule. The team was incredibly responsive, and their attention to UI/UX details made the app extremely intuitive for our medical staff.", rating: 5 },
  { id: 4, img: "/assets/images/hero/client-img1.png", name: "Emma Robertson", project: "SEO & Digital Strategy", text: "Their digital marketing expertise is unmatched. Our organic traffic doubled in just 6 months, and the quality of leads has improved significantly. A fantastic partner for growth.", rating: 5 },
  { id: 5, img: "/assets/images/hero/client-img2.png", name: "James O'Connor", project: "Fintech Web App", text: "Security and compliance were our top priorities, and Gupta Tech Web delivered perfectly. Their backend engineering is world-class, ensuring our transactions are safe and lightning fast.", rating: 5 },
  { id: 6, img: "/assets/images/hero/client-img3.png", name: "Linda Martinez", project: "Brand Identity & UX", text: "The UI/UX team completely overhauled our legacy application. The fresh, modern interface has dramatically increased our user retention and simplified the onboarding process.", rating: 5 },
];

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      try {
        const res = await fetch(`/api/testimonials?page=${page}&limit=9`);
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setTestimonials(data.data);
            setTotalPages(data.pagination?.totalPages || 1);
          }
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, [page]);

  const displayList = testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS;

  return (
    <>{/* ── HERO ── */}
      <section className="hero-section">
        <div
          className="hero-content w-full text-white py-15"
          style={{
            background:
              "url('/assets/images/testnomail/testnomial-bg.png') center/cover no-repeat",
          }} >
          <div className="text-center text-white" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
            <h1 className="font-bold text-4xl md:text-5xl">Testnomials</h1>
            <p className="text-2xl mt-2">Partnerships Built on Performance and Reliability</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL CARDS ── */}
      <section className="bg-white rounded-[2rem] p-6 lg:p-10">
        <div className="grid grid-cols-1 gap-x-5 gap-y-16 pt-6 md:grid-cols-2 lg:grid-cols-3 min-h-[300px]">
          {loading ? (
            <TestimonialSkeleton count={6} />
          ) : (
            displayList.map((item, i) => (
              <TestimonialCard key={item.id || i} {...item} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="relative text-white p-5 m-4 rounded-[1rem] overflow-hidden"
        style={{
          background:
            "url('/assets/images/testnomail/testnomial-bottom.png') center/cover no-repeat",
        }}
      >
        <div className="flex flex-wrap items-center">
          {/* Left Text */}
          <div className="w-full md:w-2/3">
            <h3 className="font-bold text-2xl">Want to know about us</h3>
            <p className="mt-1">
              Get to know the team shaping innovative technology solutions.
            </p>
          </div>

          {/* Right Button */}
          <div className="w-full md:w-1/3 md:text-right text-left mt-3 md:mt-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors duration-200 px-5 py-2 rounded-[0.5rem] no-underline"
            >
              <span>Contact Us</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
