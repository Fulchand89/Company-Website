"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  HeartPulse,
  UtensilsCrossed,
  Plane,
  Building2,
  Truck,
  Share2,
  Landmark,
  ShoppingCart,
  Store,
  GraduationCap,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Industries Data
──────────────────────────────────────────────────────────── */

const industries = [
  {
    title: "Healthcare",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: HeartPulse,
    img: "/assets/images/topbar/img1.png",
    href: "/industry/healthcare",
  },
  {
    title: "Food & Restaurant",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: UtensilsCrossed,
    img: "/assets/images/topbar/img2.png",
    href: "/industry/restaurant",
  },
  {
    title: "Travel",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Plane,
    img: "/assets/images/topbar/img3.png",
    href: "/industry/travel",
  },
  {
    title: "Real Estate",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Building2,
    img: "/assets/images/topbar/img4.png",
    href: "/industry/realestate",
  },
  {
    title: "Supply Chain",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Truck,
    img: "/assets/images/topbar/img5.png",
    href: "/industry/supply-chain",
  },
  {
    title: "Social Media Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Share2,
    img: "/assets/images/topbar/img6.png",
    href: "/industry/social-media-platform",
  },
  {
    title: "Fintech Applications",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Landmark,
    img: "/assets/images/topbar/img7.png",
    href: "/industry/fintech-application",
  },
  {
    title: "E-Commerce Solutions",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: ShoppingCart,
    img: "/assets/images/topbar/img8.png",
    href: "/industry/e-commerce",
  },
  {
    title: "Retails",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: Store,
    img: "/assets/images/topbar/img9.png",
    href: "/industry/retail",
  },
  {
    title: "Tutors",
    desc: "Innovative solutions for growing businesses in tech and services.",
    icon: GraduationCap,
    img: "/assets/images/topbar/img10.png",
    href: "/industry/tutor",
  },
];

/* ────────────────────────────────────────────────────────────
   Why Choose Us
──────────────────────────────────────────────────────────── */

const whyCards = [
  {
    icon: "/assets/images/about/vision1.png",
    title: "Strategic Vision",
    text: "We align every solution with your business objectives to deliver measurable impact.",
  },
  {
    icon: "/assets/images/about/vision2.png",
    title: "Innovation & Growth",
    text: "Cutting-edge technologies and creative thinking power every project we build.",
  },
  {
    icon: "/assets/images/about/vision3.png",
    title: "Inclusive Solutions",
    text: "Accessible, scalable products designed to serve diverse users and markets.",
  },
  {
    icon: "/assets/images/about/vision4.png",
    title: "Scaling Worldwide",
    text: "From startups to enterprises, our solutions grow with your business globally.",
  },
];

/* ────────────────────────────────────────────────────────────
   Stats
──────────────────────────────────────────────────────────── */

const stats = [
  { num: "10+", label: "Industries\nServed" },
  { num: "800+", label: "Successful\nProjects" },
  { num: "15+", label: "Years of\nExperience" },
];

/* ────────────────────────────────────────────────────────────
   Tech Logos
──────────────────────────────────────────────────────────── */

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

export default function IndustryPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="mt-24">

        <PageHeader
          breadcrumb="Industries"
          title="Industries We Serve"
          description="We deliver domain-specific digital solutions across a wide range of industries — helping businesses innovate, scale, and lead in their markets."
          ctaText="Get Free Consultation →"
          ctaHref="/contact"
        />

        {/* ================= STATS + INDUSTRY CARDS ================= */}
        <section className="my-16 px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Left Stats */}
            <div className="space-y-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl p-6"
                >
                  <h2 className="text-4xl font-bold">{stat.num}</h2>
                  <p className="mt-2 text-gray-400 whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Industry Cards */}
            <div className="lg:col-span-3 pt-6 lg:pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="bg-gradient-to-b from-[#212227] to-[#16171a] rounded-3xl p-6 lg:p-7 flex flex-col gap-4 border border-white/10 hover:-translate-y-1 transition-all duration-300 hover:border-[#e52e42]/40 hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg lg:text-xl leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed">{item.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ================= WHAT WE DO ================= */}
        <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-10 py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Image */}
            <div>
              <Image
                src="/assets/images/hero/hero-about.png"
                alt="Industries We Serve"
                width={600}
                height={500}
                priority
                className="w-full h-auto rounded-3xl object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <p className="uppercase tracking-[3px] text-[#b30d29] font-semibold text-sm mb-3">
                What We Do
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-6">
                Domain-Specific
                <span className="text-[#b30d29]"> Digital Solutions </span>
                for Every Industry
              </h2>

              <p className="text-gray-600 text-lg leading-8 mb-5">
                We understand that every industry has unique challenges and
                requirements. Our team crafts tailored digital products that
                address sector-specific pain points and drive real results.
              </p>

              <p className="text-gray-600 text-lg leading-8 mb-8">
                From healthcare platforms and fintech applications to e-commerce
                solutions and food-tech systems, we bring deep domain expertise
                and cutting-edge technology together.
              </p>

              <div className="grid grid-cols-2 gap-5 mb-8">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-3xl font-bold text-[#b30d29]">10+</h3>
                  <p className="text-gray-600 mt-2">Industries Served</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-3xl font-bold text-[#b30d29]">800+</h3>
                  <p className="text-gray-600 mt-2">Successful Projects</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center bg-[#b30d29] hover:bg-red-700 transition text-white px-7 py-3 rounded-lg font-semibold"
              >
                Learn More →
              </Link>
            </div>

          </div>
        </section>

        {/* ================= ALL INDUSTRIES CARDS ================= */}
        <section className="py-20 px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-14">
              <p className="uppercase tracking-[3px] text-[#b30d29] font-semibold text-sm mb-3">
                Our Expertise
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold">
                Industries We Cover
              </h2>
              <p className="text-gray-300 text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
                Our cross-industry experience enables us to build intelligent,
                scalable, and future-ready digital solutions for businesses of
                all sizes.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="bg-gradient-to-b from-[#212227] to-[#16171a]
                  rounded-3xl p-7 flex flex-col h-full border border-white/10
                  hover:-translate-y-2 transition-all duration-300
                  hover:border-[#e52e42]/40 hover:shadow-2xl group"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#b30d29] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-base leading-relaxed flex-1">
                      {item.desc}
                    </p>

                    {/* Link */}
                    <div className="mt-6 inline-flex items-center text-[#e52e42] font-semibold text-base group-hover:gap-2 transition-all duration-300">
                      Explore Industry
                      <span className="ml-1">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="bg-white rounded-[32px] mx-4 lg:mx-8 my-12 py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-14">
              <p className="uppercase tracking-[3px] text-[#b30d29] font-semibold text-sm mb-3">
                Why Choose Us
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#111827]">
                Why Choose GTW?
              </h2>
              <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
                We combine strategy, creativity and technology to build
                industry-leading digital products that help businesses grow
                faster and achieve measurable success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-[#232324] to-[#1b1b1b]
                rounded-3xl p-8 text-center
                hover:-translate-y-2
                transition-all duration-300
                hover:shadow-xl"
                >
                  <div className="flex justify-center mb-6">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 leading-7">{card.text}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= TECHNOLOGY LOGOS ================= */}
        <section className="py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-10 animate-[slide_20s_linear_infinite]">
              {techLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={`/assets/images/icon/tech${logo}.png`}
                    alt={`Technology ${logo}`}
                    width={90}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
