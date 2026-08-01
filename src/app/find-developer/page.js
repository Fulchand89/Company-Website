"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
// ─── Static Data ──────────────────────────────────────────────────────────────

const technologies = [
  "All",
  "React.js",
  "Node.js",
  "Python",
  "Flutter",
  "Laravel",
  "React Native",
  "Vue.js",
  "PHP",
  "WordPress",
  "Shopify",
  "MERN Stack",
  ".NET",
  "Java",
  "iOS",
  "Android",
];

const experienceLevels = ["All Levels", "Junior (0-2 yrs)", "Mid (2-5 yrs)", "Senior (5+ yrs)"];

const howItWorks = [
  {
    num: "01",
    title: "Share Your Requirements",
    desc: "Tell us about your project, the tech stack you need, and the type of developer you're looking for. We'll match your needs with precision.",
    icon: "📋",
  },
  {
    num: "02",
    title: "Get Matched with Experts",
    desc: "Our team curates a shortlist of top-tier, pre-vetted developers tailored to your specific technical and business requirements.",
    icon: "🎯",
  },
  {
    num: "03",
    title: "Start Building Together",
    desc: "Onboard your developer seamlessly and start building immediately. We ensure smooth integration with your existing team and workflow.",
    icon: "🚀",
  },
];

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function FindDeveloperPage() {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [developersData, setDevelopersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const res = await fetch("/api/developers");
        if (res.ok) {
          const json = await res.json();
          setDevelopersData(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch developers", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDevelopers();
  }, []);

  const filteredDevelopers = useMemo(() => {
    return developersData.filter((dev) => {
      const matchesSearch =
        search.trim() === "" ||
        dev.name.toLowerCase().includes(search.toLowerCase()) ||
        dev.role.toLowerCase().includes(search.toLowerCase()) ||
        dev.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesTech =
        selectedTech === "All" || dev.skills.includes(selectedTech);

      const matchesLevel =
        selectedLevel === "All Levels" || dev.experience === selectedLevel;

      return matchesSearch && matchesTech && matchesLevel;
    });
  }, [search, selectedTech, selectedLevel]);

  return (
    <>
      {/* ══════════════ 1. HERO BANNER ══════════════ */}
      <section
        className="relative min-h-[500px] flex items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/hero/bg-gif.gif')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Build Your Dream Team With Our{" "}
            <span className="text-white">Skilled IT Tech</span> Talent
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Gupta Tech Web connects you with our in-house expert developers to
            build, innovate, and scale your business quickly.
          </p>
          <Link
            href="#developers"
            className="inline-flex items-center gap-2 border-2 border-[#B30D29] text-white bg-[#B30D29] hover:bg-[#9a0b23] transition duration-300 px-7 py-3 rounded-[8px] no-underline font-semibold text-lg shadow-[0_0_20px_rgba(179,13,41,0.4)]"
          >
            Find Skilled Developer
          </Link>
        </div>
      </section>

      {/* ══════════════ 2. SEARCH & FILTER ══════════════ */}
      <section id="developers" className="bg-black py-14 px-6 lg:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Find the Right <span className="text-[#B30D29]">Developer</span>
          </h2>
          <p className="text-gray-400 text-base mb-8 max-w-3xl">
            Browse our roster of skilled, pre-vetted developers. Use the filters
            below to find the perfect match for your project needs.
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or skill..."
              className="w-full border border-white/10 bg-[#111] text-white rounded-xl px-5 py-3.5 pl-12 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B30D29]/40 focus:border-[#B30D29] text-base transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
              🔍
            </span>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                    selectedTech === tech
                      ? "bg-[#B30D29] text-white border-[#B30D29] shadow-lg shadow-[#B30D29]/20"
                      : "bg-transparent text-gray-300 border-white/15 hover:border-[#B30D29] hover:text-[#B30D29]"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

            {/* Experience Dropdown */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-white/10 bg-[#111] text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#B30D29]/40 focus:border-[#B30D29] cursor-pointer min-w-[180px] transition"
            >
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-8">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredDevelopers.length}
            </span>{" "}
            developer{filteredDevelopers.length !== 1 ? "s" : ""}
          </p>

          {/* ══════════════ 3. DEVELOPER CARDS GRID ══════════════ */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden animate-pulse"
                >
                  <div className="h-[220px] bg-[#222]" />
                  <div className="p-5">
                    <div className="h-5 bg-[#333] rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#B30D29]/50 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-[#222] rounded w-1/3 mb-4" />
                    <div className="flex gap-2 mb-5">
                      <div className="h-6 bg-[#333] rounded w-16" />
                      <div className="h-6 bg-[#333] rounded w-20" />
                    </div>
                    <div className="h-10 bg-[#333] rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDevelopers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-500 mb-2">
                No developers found
              </p>
              <p className="text-gray-600">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedTech("All");
                  setSelectedLevel("All Levels");
                }}
                className="mt-4 text-[#B30D29] font-semibold hover:underline cursor-pointer border-0 bg-transparent"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDevelopers.map((dev) => (
                <div
                  key={dev.id}
                  className="group relative bg-[#111] rounded-2xl border border-white/5 hover:border-[#B30D29]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:shadow-[0_12px_40px_rgba(179,13,41,0.1)]"
                >
                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        dev.available
                          ? "bg-green-900/40 text-green-400 border border-green-800/50"
                          : "bg-red-900/40 text-red-400 border border-red-800/50"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dev.available
                            ? "bg-green-400 animate-pulse"
                            : "bg-red-500"
                        }`}
                      />
                      {dev.available ? "Available" : "Engaged"}
                    </span>
                  </div>

                  {/* Developer Image */}
                  <div className="relative h-[220px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                    <Image
                      src={dev.img}
                      alt={dev.name}
                      width={300}
                      height={220}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {dev.name}
                    </h3>
                    <p className="text-sm text-[#B30D29] font-semibold mb-1">
                      {dev.role}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {dev.experience}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {dev.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-white/5 text-gray-300 text-xs rounded-md font-medium border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Hire Button */}
                    <Link
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center py-2.5 rounded-lg font-semibold text-sm no-underline transition-all duration-300 ${
                        dev.available
                          ? "bg-[#B30D29] text-white hover:bg-[#9a0b23] shadow-md hover:shadow-lg hover:shadow-[#B30D29]/25"
                          : "bg-white/5 text-gray-600 cursor-not-allowed pointer-events-none border border-white/5"
                      }`}
                    >
                      {dev.available ? "Hire Now →" : "Currently Unavailable"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ 4. HOW IT WORKS ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-[#0a0a0a] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-[#B30D29]">Works</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-base leading-relaxed">
              Getting started is simple. Our streamlined process ensures you get
              the right developer matched to your project in no time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={i}
                className="group relative bg-[#111] border border-white/5 rounded-2xl p-8 text-center hover:border-[#B30D29]/30 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#B30D29] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(179,13,41,0.4)]">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-5 mt-2">{step.icon}</div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 5. TECH STACK WE COVER ══════════════ */}
      <section className="py-16 px-6 lg:px-8 bg-black text-white border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technologies We <span className="text-[#B30D29]">Cover</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base leading-relaxed mb-12">
            Our developers are proficient in a wide range of modern technologies
            and frameworks, ensuring we can meet any technical requirement.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {techLogos.map((num, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/5 rounded-2xl p-4 aspect-square flex items-center justify-center hover:border-white/20 hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={`/assets/images/icon/tech${num}.png`}
                  alt={`Technology ${num}`}
                  width={44}
                  height={44}
                  className="object-contain max-h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. CTA BANNER ══════════════ */}
      <section
        className="relative w-full flex items-center bg-cover bg-center bg-no-repeat py-[90px] overflow-hidden"
        style={{
          backgroundImage: "url('/assets/images/hero/bottom.png')",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className="flex flex-wrap items-center">
            <div className="w-full text-white">
              <h2 className="font-bold text-2xl lg:text-4xl leading-tight mb-4">
                Ready to Build Your
                <br />
                <span className="text-[#B30D29]">Dream Team</span>?
              </h2>
              <p className="text-gray-300 text-base mb-6 max-w-lg">
                Get in touch with us today and let our expert developers bring
                your vision to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 rounded-[8px] px-6 py-3 text-lg font-semibold no-underline"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
