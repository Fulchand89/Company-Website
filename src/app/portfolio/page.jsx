"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

// ─── Portfolio Card ───────────────────────────────────────────────────────────

function PortfolioCard({ num, title, img, text, href, onClick }) {
  const imageSrc = img || "/assets/images/protfolio/protfolio1.png";

  const inner = (
    <div className="bg-[#212529] text-white rounded-2xl mb-8 overflow-hidden p-4 min-h-[380px] hover:border-red-600/50 transition duration-300">
      <div className="flex flex-wrap items-center">
        {/* Image */}
        <div className="w-full md:w-1/3 p-3 text-center">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={280}
            className="w-full h-auto max-h-[280px] rounded object-contain mx-auto"
          />
        </div>
        {/* Content */}
        <div className="w-full md:w-2/3 p-3">
          <h2 className="py-2 mt-2 text-2xl font-bold leading-snug">
            {num} <br /> {title}
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="no-underline block">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([
    { id: "all", label: "All" },
    { id: "website", label: "Website" },
    { id: "applications", label: "Applications" },
    { id: "digitalmarketing", label: "Digital Marketing" },
  ]);
  const [loading, setLoading] = useState(true);
  const [navigatingProject, setNavigatingProject] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    async function loadPortfolioData() {
      setLoading(true);
      try {
        // No explicit cache override — let the browser use the s-maxage=60
        // Cache-Control header the API now returns. This avoids a full round-trip
        // on every tab visit / back-navigation within the same 60-second window.
        const res = await fetch("/api/portfolio?limit=100");
        if (!res.ok) throw new Error("Failed to fetch portfolio projects");
        const data = await res.json();

        if (data.data) {
          setProjects(data.data);
        }

        // Dynamically build category tabs from DB response
        if (data.categories && data.categories.length > 0) {
          const dynamicTabs = [
            { id: "all", label: "All" },
            ...data.categories.map((c) => ({
              id: c.slug || c.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
              label: c.name
            }))
          ];
          setCategories(dynamicTabs);
        }
      } catch (error) {
        console.error("Error loading dynamic portfolio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  // Filter projects by active dynamic tab
  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => {
          const projectCat = p.category?.toLowerCase() || "";
          const active = activeTab.toLowerCase();
          if (active === "web" || active === "website") {
            return projectCat.includes("web") || projectCat === "website";
          }
          if (active === "mobile" || active === "applications") {
            return projectCat.includes("app") || projectCat.includes("mobile") || projectCat === "applications";
          }
          if (active === "marketing" || active === "digitalmarketing" || active === "digital-marketing") {
            return projectCat.includes("market") || projectCat.includes("digital");
          }
          return projectCat.replace(/[^a-z0-9]/g, "").includes(active) || active.includes(projectCat.replace(/[^a-z0-9]/g, ""));
        });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const element = document.getElementById("portfolio-projects-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
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
      <section className="p-5 max-w-7xl mx-auto">
        {/* Dynamic Tab Pills */}
        <ul className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch md:items-center gap-3 md:gap-5 mb-8 list-none p-0 m-0">
          {categories.map((tab) => (
            <li key={tab.id} className="w-full md:w-auto">
              <button
                onClick={() => handleTabChange(tab.id)}
                className={[
                  "w-full md:w-auto px-8 py-3 rounded-full font-semibold transition-colors duration-200 text-white border border-[#B30D29]",
                  activeTab === tab.id
                    ? "bg-[#B30D29] text-white shadow-lg shadow-red-900/30"
                    : "bg-transparent hover:bg-[#B30D29] hover:text-white",
                ].join(" ")}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Project Cards */}
        <div id="portfolio-projects-section">
          {loading ? (
            // Skeleton cards that match the real PortfolioCard layout —
            // prevents layout shift (CLS) when real data loads in.
            <div aria-busy="true" aria-label="Loading projects">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#212529] rounded-2xl mb-8 overflow-hidden p-4 min-h-[380px] animate-pulse"
                >
                  <div className="flex flex-wrap items-center">
                    {/* image placeholder */}
                    <div className="w-full md:w-1/3 p-3">
                      <div className="w-full h-[200px] rounded bg-[#2e3338]" />
                    </div>
                    {/* text placeholders */}
                    <div className="w-full md:w-2/3 p-3 space-y-4">
                      <div className="h-6 w-1/3 rounded bg-[#2e3338]" />
                      <div className="h-8 w-2/3 rounded bg-[#2e3338]" />
                      <div className="h-4 w-full rounded bg-[#2e3338]" />
                      <div className="h-4 w-5/6 rounded bg-[#2e3338]" />
                      <div className="h-4 w-4/6 rounded bg-[#2e3338]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-lg">
              No projects in this category yet.
            </p>
          ) : (
            <>
              {paginatedProjects.map((item, i) => {
                const itemIndex = startIndex + i + 1;
                return (
                  <PortfolioCard
                    key={item.id || i}
                    num={item.num || String(itemIndex).padStart(2, "0")}
                    title={item.title}
                    img={item.img}
                    text={item.text}
                    href={item.href || `/portfolio/${item.slug || item.id}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || (e.button && e.button !== 0)) {
                        return;
                      }
                      setNavigatingProject(true);
                    }}
                  />
                );
              })}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-6">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg font-medium border border-gray-700 transition duration-200 text-white bg-[#212529] hover:bg-[#B30D29] hover:border-[#B30D29] disabled:opacity-40 disabled:hover:bg-[#212529] disabled:hover:border-gray-700 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold border transition duration-200 ${
                          currentPage === pageNum
                            ? "bg-[#B30D29] text-white border-[#B30D29] shadow-md shadow-red-900/40"
                            : "bg-[#212529] text-gray-300 border-gray-700 hover:bg-[#B30D29] hover:text-white hover:border-[#B30D29]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg font-medium border border-gray-700 transition duration-200 text-white bg-[#212529] hover:bg-[#B30D29] hover:border-[#B30D29] disabled:opacity-40 disabled:hover:bg-[#212529] disabled:hover:border-gray-700 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
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

      {/* Full-screen loader overlay when navigating to a project */}
      {navigatingProject && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
              <div className="absolute inset-0 rounded-full border-4 border-[#B30D29] border-t-transparent animate-spin" />
            </div>
            <p className="text-gray-300 text-lg font-semibold animate-pulse mt-2">
              Loading Project Details...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
