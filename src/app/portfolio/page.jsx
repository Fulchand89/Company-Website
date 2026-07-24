"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const allProjects = [
  {
    num: "01",
    title: "Mind Reset Website",
    img: "/assets/images/hero/mind-reset.png",
    category: "web",
    text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.",
    href: "/portfolio/portfolio-detail",
  },
  {
    num: "02",
    title: "Booking Luxor Website",
    img: "/assets/images/protfolio/protfolio2.png",
    category: "web",
    text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.",
    href: null,
  },
  {
    num: "03",
    title: "Smart Brain Academy",
    img: "/assets/images/protfolio/protfolio3.png",
    category: "web",
    text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.",
    href: null,
  },
  {
    num: "04",
    title: "Pauwii Mobile Application",
    img: "/assets/images/protfolio/protfolio4.png",
    category: "mobile",
    text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.",
    href: null,
  },
  {
    num: "05",
    title: "Go Wheeler Mobile Application",
    img: "/assets/images/protfolio/protfolio5.png",
    category: "mobile",
    text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes.",
    href: null,
  },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "web", label: "Website" },
  { id: "mobile", label: "Applications" },
  { id: "marketing", label: "Digital Marketing" },
];

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

// ─── Portfolio Card ───────────────────────────────────────────────────────────

function PortfolioCard({ num, title, img, text, href }) {
  const inner = (
    <div className="bg-[#212529] text-white rounded-2xl mb-8 overflow-hidden p-4 min-h-[380px]">
      <div className="flex flex-wrap items-center">
        {/* Image */}
        <div className="w-full md:w-1/3 p-3 text-center">
          <Image
            src={img}
            alt={title}
            width={400}
            height={280}
            className="w-full h-auto rounded object-contain"
          />
        </div>
        {/* Content */}
        <div className="w-full md:w-2/3 p-3">
          <h2 className="py-2 mt-2 text-2xl font-bold leading-snug">
            {num} <br /> {title}
          </h2>
          <p className="text-base text-gray-300">{text}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline block">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeTab);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div
          className="flex items-center w-full text-white"
          style={{
            background:
              "url('/assets/images/protfolio/protfolio-bg.png') center/cover no-repeat",
            minHeight: "500px",
            padding: "80px 0",
          }}
        >
          <div className="w-full px-6 lg:px-20">
            <div className="flex flex-wrap items-center">

              {/* Text Column */}
              <div className="w-full lg:w-1/2 mb-4 mt-5 lg:mb-0 text-center lg:text-left">
                <h1 className="font-bold text-4xl md:text-5xl">Our Projects</h1>
                <p className="text-xl mt-3">
                  Delivering Innovation Through <br /> Every Project We Build
                </p>
              </div>

              {/* Image Column */}
              <div className="w-full lg:w-1/2 mt-5 text-center lg:text-right">
                <div className="rounded-[0.75rem] shadow-lg overflow-hidden inline-block">
                  <Image
                    src="/assets/images/protfolio/protfolio1.png"
                    alt="Portfolio showcase"
                    width={500}
                    height={350}
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── TABS + PROJECTS ── */}
      <section className="p-5">

        {/* Tab Pills */}
        <ul className="flex flex-wrap justify-center gap-5 mb-8 list-none p-0 m-0">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "px-8 py-2 rounded-full font-semibold transition-colors duration-200 text-white",
                  activeTab === tab.id
                    ? "bg-[#B30D29] text-white"
                    : "bg-transparent hover:text-[#B30D29]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Project Cards */}
        <div>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No projects in this category yet.</p>
          ) : (
            filtered.map((item, i) => (
              <PortfolioCard key={i} {...item} />
            ))
          )}
        </div>

      </section>

      {/* ── TECH LOGO AUTO-SCROLL ── */}
      <div className="py-8 overflow-hidden">
        <div className="flex gap-8 animate-[slide_12s_linear_infinite]">
          {techLogos.map((n, i) => (
            <div key={i} className="shrink-0">
              <Image
                src={`/assets/images/icon/tech${n}.png`}
                alt={`tech${n}`}
                width={80}
                height={50}
                className="object-contain"
                style={{ height: "50px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
