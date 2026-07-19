"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) =>
    setOpenDropdown(openDropdown === name ? null : name);

  const closeAll = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  };

  /* ── Industries data ── */
  const industries = [
    { name: "Healthcare",           img: "img1.png",  href: "/industry/healthcare" },
    { name: "Food & Restaurant",    img: "img2.png",  href: "/industry/restaurant" },
    { name: "Travel",               img: "img3.png",  href: "/industry/travel" },
    { name: "Real Estate",          img: "img4.png",  href: "/industry/realestate" },
    { name: "Supply Chain",         img: "img5.png",  href: "/industry/supply-chain" },
    { name: "Social Media Platform",img: "img6.png",  href: "/industry/social-media-platform" },
    { name: "Fintech Applications", img: "img7.png",  href: "/industry/fintech-application" },
    { name: "E-Commerce Solutions", img: "img8.png",  href: "/industry/e-commerce" },
    { name: "Retails",              img: "img9.png",  href: "/industry/retail" },
    { name: "Tutors",               img: "img10.png", href: "/industry/tutor" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-4 backdrop-blur-[8px] bg-black/60 transition duration-300 ease-in-out ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="navbar-brand">
          <Image
            src="/assets/images/logo-gtw.png"
            alt="logo"
            width={100}
            height={30}
            priority
            className="mt-2"
          />
        </Link>

        {/* ── Hamburger ── */}
        <button
          className="lg:hidden text-white border-0 text-2xl"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* ── Menu ── */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row lg:items-center max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:bg-black max-lg:p-5 max-lg:max-h-[80vh] max-lg:overflow-y-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-15 gap-2 list-none m-0 p-0">

            {/* Home */}
            <li>
              <Link
                href="/"
                className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0"
                onClick={closeAll}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0"
                onClick={closeAll}
              >
                About Us
              </Link>
            </li>

            {/* ── SERVICES ── */}
            <li className="relative">
              <button
                className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 dropdown-toggle block py-2 lg:py-0 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                onClick={() => toggleDropdown("services")}
                onMouseEnter={() => { if (window.innerWidth >= 1024) setOpenDropdown("services"); }}
              >
                Services ↓
              </button>

              {/* Services mega-dropdown */}
              {openDropdown === "services" && (
                <div
                  className="lg:fixed text-xl lg:left-0 lg:right-0 lg:top-[85px] rounded-[12px] lg:rounded-none pt-10 pb-6 px-6 bg-[#111] shadow-2xl z-50"
                  onMouseLeave={() => { if (window.innerWidth >= 1024) setOpenDropdown(null); }}
                >
                    {/* Responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {/* Mobile Development */}
                    <div className="p-4 bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl">
                      <h6 className="text-[#b30d29] font-bold mb-3 text-base">Mobile Development</h6>
                      <ul className="space-y-2">
                        {[
                          ["Flutter App Development",  "/service/app"],
                          ["Android App Development",  "/service/app"],
                          ["iOS App Development",      "/service/app"],
                          ["React Native",             "/service/app"],
                          ["Machine Learning",         "/service/app"],
                          ["Java Development",         "/service/app"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="text-white text-base hover:text-[#b30d29] transition" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Website Development */}
                    <div className="p-4 bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl">
                      <h6 className="text-[#b30d29] font-bold mb-3 text-base">Website Development</h6>
                      <ul className="space-y-2">
                        {[
                          ["Laravel Development",      "/service"],
                          ["WordPress Development",    "/service"],
                          ["Shopify Development",      "/service"],
                          ["Python Web Development",   "/service"],
                          ["React.js Development",     "/service"],
                          ["PHP Development",          "/service"],
                          ["DOT NET Development",      "/service"],
                          ["MERN Stack Development",   "/service"],
                          ["Vue.js Development",       "/service"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="text-white text-base hover:text-[#b30d29] transition" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* UI/UX Design */}
                    <div className="p-4 bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl">
                      <h6 className="text-[#b30d29] font-bold mb-3 text-base">UI/UX Design</h6>
                      <ul className="space-y-2">
                        {[
                          ["Website Design",      "/service"],
                          ["Application Design",  "/service"],
                          ["Responsive Design",   "/service"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="text-white text-base hover:text-[#b30d29] transition" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Digital Marketing */}
                    <div className="p-4 bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl">
                      <h6 className="text-[#b30d29] font-bold mb-3 text-base">Digital Marketing</h6>
                      <ul className="space-y-2">
                        {[
                          ["SEO",                    "/service"],
                          ["Social Media Marketing", "/service"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="text-white text-base hover:text-[#b30d29] transition" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* ── INDUSTRIES ── */}
            <li className="relative">
              <button
                className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 dropdown-toggle block py-2 lg:py-0 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                onClick={() => toggleDropdown("industries")}
                onMouseEnter={() => { if (window.innerWidth >= 1024) setOpenDropdown("industries"); }}
              >
                Industries ↓
              </button>

              {/* Industries mega-dropdown */}
              {openDropdown === "industries" && (
                <div
                  className="lg:fixed lg:left-0 lg:right-0 lg:top-[85px] rounded-[12px] lg:rounded-none pt-10 pb-6 px-6 bg-[#111] shadow-2xl z-50"
                  onMouseLeave={() => { if (window.innerWidth >= 1024) setOpenDropdown(null); }}
                >
                  {/* Responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
                    {industries.map((item) => (
                      <Link key={item.name} href={item.href} className="no-underline" onClick={closeAll}>
                        <div className="bg-gradient-to-b from-[#232324] to-[#1b1b1b] text-white p-4 rounded-xl hover:bg-[#2a2a2a] transition">
                          <div className="flex items-center gap-3 mb-2">
                            <Image
                              src={`/assets/images/topbar/${item.img}`}
                              alt={item.name}
                              width={40}
                              height={40}
                            />
                            <span className="text-white text-lg font-semibold">{item.name}</span>
                          </div>
                          <p className="text-gray-400 text-sm leading-5">
                            Innovative solutions for growing businesses in tech and services.
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Portfolio */}
            <li>
              <Link href="/portfolio" className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Portfolio
              </Link>
            </li>

            {/* Testimonial */}
            <li>
              <Link href="/testimonial" className="text-white text-xl  font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Testimonial
              </Link>
            </li>

            {/* Blogs */}
            <li>
              <Link href="/blog" className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Blogs
              </Link>
            </li>

            {/* Careers */}
            <li>
              <Link href="/careers" className="text-white text-xl font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Careers
              </Link>
            </li>

            {/* Mobile Contact */}
            <li className="lg:hidden mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#0d6efd] text-[#0d6efd] bg-transparent hover:bg-[#0d6efd]/10 transition duration-200 w-full py-2 px-4 rounded"
                onClick={closeAll}
              >
                Contact Us
              </Link>
            </li>

          </ul>
        </div>

        {/* ── Desktop Contact ── */}
        <div className="hidden lg:flex ml-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[#ef4444] text-[#ef4444] bg-transparent hover:bg-red-900/20 transition duration-200 rounded-[12px] px-4 py-2 no-underline whitespace-nowrap"
          >
            Contact Us →
          </Link>
        </div>

      </div>
    </nav>
  );
}
