"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

// ─── Portfolio Card ───────────────────────────────────────────────────────────

function PortfolioCard({ num, title, img, text, href }) {
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
            unoptimized
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
      <Link href={href} className="no-underline block">
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

  useEffect(() => {
    async function loadPortfolioData() {
      setLoading(true);
      try {
        const res = await fetch("/api/portfolio?limit=100", {
          cache: "no-store",
          headers: {
            "Pragma": "no-cache"
          }
        });
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
      <section className="p-5 max-w-7xl mx-auto">
        {/* Dynamic Tab Pills */}
        <ul className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch md:items-center gap-3 md:gap-5 mb-8 list-none p-0 m-0">
          {categories.map((tab) => (
            <li key={tab.id} className="w-full md:w-auto">
              <button
                onClick={() => setActiveTab(tab.id)}
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
        <div>
          {loading ? (
            <div className="text-center text-gray-400 py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#B30D29] border-t-transparent mb-4"></div>
              <p className="text-lg">Loading dynamic projects...</p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-lg">
              No projects in this category yet.
            </p>
          ) : (
            filtered.map((item, i) => (
              <PortfolioCard
                key={item.id || i}
                num={item.num || String(i + 1).padStart(2, "0")}
                title={item.title}
                img={item.img}
                text={item.text}
                href={item.href || `/portfolio/${item.slug || item.id}`}
              />
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
