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
    { name: "Healthcare", img: "img1.png", href: "/industry/healthcare" },
    { name: "Food & Restaurant", img: "img2.png", href: "/industry/restaurant" },
    { name: "Travel", img: "img3.png", href: "/industry/travel" },
    { name: "Real Estate", img: "img4.png", href: "/industry/realestate" },
    { name: "Supply Chain", img: "img5.png", href: "/industry/supply-chain" },
    { name: "Social Media Platform", img: "img6.png", href: "/industry/social-media-platform" },
    { name: "Fintech Applications", img: "img7.png", href: "/industry/fintech-application" },
    { name: "E-Commerce Solutions", img: "img8.png", href: "/industry/e-commerce" },
    { name: "Retails", img: "img9.png", href: "/industry/retail" },
    { name: "Tutors", img: "img10.png", href: "/industry/tutor" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-0 backdrop-blur-[8px] bg-black/60 transition duration-300 ease-in-out ${scrolled ? "shadow-lg" : ""
        }`}
    >
      <div className="container mx-auto pl-0 pr-0 py-5  flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="navbar-brand shrink-0">
          <Image
            src="/assets/images/logo-gtw.png"
            alt="logo"
            width={200}
            height={80}
            priority
            style={{ width: "auto", height: "55px" }}
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
          className={`${menuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row lg:items-center max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:bg-black max-lg:p-5 max-lg:max-h-[80vh] max-lg:overflow-y-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-8 gap-2 list-none m-0 p-0">

            {/* Home */}
            <li>
              <Link
                href="/"
                className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0"
                onClick={closeAll}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0"
                onClick={closeAll}
              >
                About Us
              </Link>
            </li>

            {/* ── SERVICES ── */}
            <li className="relative">
              <button
                className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 dropdown-toggle block py-2 lg:py-0 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                onClick={() => toggleDropdown("services")}
                onMouseEnter={() => { if (window.innerWidth >= 1024) setOpenDropdown("services"); }}
              >
                Services ↓
              </button>

              {/* Services mega-dropdown */}
              {openDropdown === "services" && (
                <div
                  className="lg:fixed lg:left-0 lg:right-0 lg:top-[72px] rounded-2xl lg:rounded-b-3xl pt-5 pb-10 px-6 bg-[#111]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50"
                  onMouseLeave={() => { if (window.innerWidth >= 1024) setOpenDropdown(null); }}
                >
                  {/* Responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
                    {/* Mobile Development */}
                    <div className="rounded-lg bg-[#202020] p-4 text-white transition duration-300 hover:border-[#e52e42]/40 lg:h-[291px]">
                      <h6 className="mb-4 text-base font-bold text-[#d30d31]">Mobile Development</h6>
                      <ul className="space-y-4">
                        {[
                          ["Flutter App Development", "/service/app"],
                          ["Android App Development", "/service/app"],
                          ["iOS App Development", "/service/app"],
                          ["React Native", "/service/app"],
                          ["Machine Learning", "/service/app"],
                          ["Java Development", "/service/app"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="block text-base font-medium text-white transition duration-200 hover:text-[#e52e42]" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Website Development */}
                    <div className="rounded-lg bg-[#202020] p-4 text-white transition duration-300 hover:border-[#e52e42]/40 lg:h-[411px]">
                      <h6 className="mb-4 text-base font-bold text-[#d30d31]">Website Development</h6>
                      <ul className="space-y-4">
                        {[
                          ["Laravel Development", "/service/web"],
                          ["WordPress Development", "/service/web"],
                          ["Shopify Development", "/service/web"],
                          ["Python Web Development", "/service/web"],
                          ["React.js Development", "/service/web"],
                          ["PHP Development", "/service/web"],
                          ["DOT NET Development", "/service/web"],
                          ["MERN Stack Development", "/service/web"],
                          ["Vue.js Development", "/service/web"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="block text-base font-medium text-white transition duration-200 hover:text-[#e52e42]" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* UI/UX Design */}
                    <div className="rounded-lg bg-[#202020] p-4 text-white transition duration-300 hover:border-[#e52e42]/40 lg:h-[171px]">
                      <h6 className="mb-4 text-base font-bold text-[#d30d31]">UI/UX Design</h6>
                      <ul className="space-y-4">
                        {[
                          ["Website Design", "/service/ui-ux"],
                          ["Application Design", "/service/ui-ux"],
                          ["Responsive Design", "/service/ui-ux"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="block text-base font-medium text-white transition duration-200 hover:text-[#e52e42]" onClick={closeAll}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Digital Marketing */}
                    <div className="rounded-lg bg-[#202020] p-4 text-white transition duration-300 hover:border-[#e52e42]/40 lg:h-[147px]">
                      <h6 className="mb-4 text-base font-bold text-[#d30d31]">Digital Marketing</h6>
                      <ul className="space-y-4">
                        {[
                          ["SEO", "/service/digital-marketing"],
                          ["Social Media Marketing", "/service/digital-marketing"],
                        ].map(([label, href]) => (
                          <li key={label}>
                            <Link href={href} className="block text-base font-medium text-white transition duration-200 hover:text-[#e52e42]" onClick={closeAll}>
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
                className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 dropdown-toggle block py-2 lg:py-0 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                onClick={() => toggleDropdown("industries")}
                onMouseEnter={() => { if (window.innerWidth >= 1024) setOpenDropdown("industries"); }}
              >
                Industries ↓
              </button>

              {/* Industries mega-dropdown */}
              {openDropdown === "industries" && (
                <div
                  className="lg:fixed lg:left-0 lg:right-0 lg:top-[72px] rounded-2xl lg:rounded-b-3xl pt-4 pb-10 px-6 bg-[#111]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50"
                  onMouseLeave={() => { if (window.innerWidth >= 1024) setOpenDropdown(null); }}
                >
                  {/* Responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
                    {industries.map((item) => (
                      <Link key={item.name} href={item.href} className="no-underline" onClick={closeAll}>
                        <div className="h-[99px] rounded-md border border-white/5 bg-[#202020] p-4 text-white transition duration-300 hover:border-[#e52e42]/40 hover:-translate-y-1">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <Image
                                src={`/assets/images/topbar/${item.img}`}
                                alt={item.name}
                                width={28}
                                height={28}
                                className="object-contain shrink-0"
                              />
                              <span className="text-base font-bold leading-5 text-white">{item.name}</span>
                            </div>
                            <p className="text-sm leading-5 text-white">
                              Innovative solutions for growing businesses in tech and services.
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Portfolio */}
            <li>
              <Link href="/portfolio" className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Portfolio
              </Link>
            </li>

            {/* Testimonial */}
            <li>
              <Link href="/testimonial" className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Testimonial
              </Link>
            </li>

            {/* Blogs */}
            <li>
              <Link href="/blog" className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Blogs
              </Link>
            </li>

            {/* Careers */}
            <li>
              <Link href="/careers" className="text-white text-base font-medium hover:text-[#b30d29] transition duration-200 block py-2 lg:py-0" onClick={closeAll}>
                Careers
              </Link>
            </li>

            {/* Mobile Contact */}
            <li className="lg:hidden mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#b30d29] bg-transparent px-4 py-2 text-[#b30d29] transition duration-200 hover:bg-[#b30d29] hover:text-white w-full rounded"
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
            className="inline-flex items-center justify-center border border-[#b30d29] bg-transparent px-4 py-2 text-[#b30d29] transition duration-200 hover:bg-[#b30d29] hover:text-white rounded-[12px] no-underline whitespace-nowrap"
          >
            Contact Us →
          </Link>
        </div>

      </div>
    </nav>
  );
}
