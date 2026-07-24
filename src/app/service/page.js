"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

/* ────────────────────────────────────────────────────────────
   Service Categories
──────────────────────────────────────────────────────────── */

const serviceCategories = [
  {
    color: "#0d6efd",
    title: "Mobile Development",
    img: "/assets/images/service/app4.png",
    items: [
      { label: "Flutter App Development", href: "/service/app" },
      { label: "Android App Development", href: "/service/app" },
      { label: "iOS App Development", href: "/service/app" },
      { label: "React Native", href: "/service/app" },
      { label: "Machine Learning", href: "/service/app" },
      { label: "Java Development", href: "/service/app" },
    ],
  },
  {
    color: "#0d6efd",
    title: "Website Development",
    img: "/assets/images/service/e-commerce1.png",
    items: [
      { label: "Laravel Development", href: "/service/web" },
      { label: "WordPress Development", href: "/service/web" },
      { label: "Shopify Development", href: "/service/web" },
      { label: "Python Web Development", href: "/service/web" },
      { label: "React.js Development", href: "/service/web" },
      { label: "PHP Development", href: "/service/web" },
      { label: "DOT NET Development", href: "/service/web" },
      { label: "MERN Stack Development", href: "/service/web" },
      { label: "Vue.js Development", href: "/service/web" },
    ],
  },
  {
    color: "#b30d29",
    title: "UI/UX Design",
    img: "/assets/images/service/ui-ux.png",
    items: [
      { label: "Website Design", href: "/service/ui-ux" },
      { label: "Application Design", href: "/service/ui-ux" },
      { label: "Responsive Design", href: "/service/ui-ux" },
    ],
  },
  {
    color: "#b30d29",
    title: "Digital Marketing",
    img: "/assets/images/service/seo2.png",
    items: [
      { label: "SEO", href: "/service/digital-marketing" },
      {
        label: "Social Media Marketing",
        href: "/service/digital-marketing",
      },
    ],
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
  {
    num: "455+",
    label: "Web Development\nProjects",
  },
  {
    num: "200+",
    label: "App Development\nProjects",
  },
  {
    num: "150+",
    label: "Digital Marketing\nCampaigns",
  },
];

/* ────────────────────────────────────────────────────────────
   Technology Logos
──────────────────────────────────────────────────────────── */

const techLogos = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  1, 2, 3, 4,
  5, 6, 7, 8,
];

export default function ServicesPage() {
  return (
    <>
      <div className="mt-20">
      {/* ================= HERO SECTION ================= */}
      <PageHeader
        breadcrumb="Services"
        title="Our Services"
        description="We design and develop innovative digital solutions that help businesses grow faster, improve productivity, and deliver exceptional customer experiences."
        ctaText="Get Free Consultation →"
        ctaHref="/contact"
      />

      {/* ================= STATS + SERVICE CATEGORIES ================= */}
      <section className="py-16 px-6 lg:px-8 text-white">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Stats */}

          <div className="space-y-5">

            {stats.map((stat, index) => (

              <div
                key={index}
                className="bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl p-6"
              >

                <h2 className="text-4xl font-bold">
                  {stat.num}
                </h2>

                <p className="mt-2 text-gray-400 whitespace-pre-line">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

          {/* Right Service Categories */}

          <div className="lg:col-span-3">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {serviceCategories.map((cat, index) => (

                <div
                  key={index}
                  className="bg-gradient-to-b from-[#232324] to-[#1b1b1b] rounded-2xl p-6 h-full flex flex-col"
                >

                  <h3
                    className="font-bold text-lg mb-5"
                    style={{ color: cat.color }}
                  >
                    {cat.title}
                  </h3>

                  <ul className="space-y-3 flex-1">

                    {cat.items.map((item, i) => (

                      <li key={i}>

                        <Link
                          href={item.href}
                          className="text-gray-300 hover:text-[#b30d29] transition text-sm"
                        >
                          {item.label}
                        </Link>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

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
              alt="Our Services"
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
              Smart
              <span className="text-[#b30d29]">
                {" "}Digital Solutions{" "}
              </span>
              for Business Growth
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              We build modern digital products that help businesses
              increase efficiency, improve customer experience,
              and accelerate growth.
            </p>

            <p className="text-gray-600 leading-8 mb-8">
              From mobile applications and enterprise websites
              to UI/UX design and digital marketing,
              our experienced team delivers scalable,
              secure and future-ready solutions.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-8">

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-3xl font-bold text-[#b30d29]">
                  15+
                </h3>
                <p className="text-gray-600 mt-2">
                  Years Experience
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-3xl font-bold text-[#b30d29]">
                  800+
                </h3>
                <p className="text-gray-600 mt-2">
                  Successful Projects
                </p>
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
      </section>      {/* ================= OUR CORE SERVICES ================= */}

      <section className="py-20 px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <p className="uppercase tracking-[3px] text-[#b30d29] font-semibold text-sm mb-3">
              What We Offer
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold">
              Our Core Services
            </h2>

            <p className="text-gray-400 mt-5 max-w-3xl mx-auto">
              We provide complete digital transformation services to help
              startups, SMEs and enterprises build scalable, secure and
              high-performance products.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {serviceCategories.map((cat, index) => (

              <div
                key={index}
                className="bg-gradient-to-b from-[#232324] to-[#1b1b1b]
                rounded-3xl p-6 flex flex-col h-full
                hover:-translate-y-2 transition-all duration-300
                hover:shadow-2xl"
              >

                {/* Icon */}
                <div className="mb-5">

                  <Image
                    src={cat.img}
                    alt={cat.title}
                    width={70}
                    height={70}
                    className="rounded-xl"
                  />

                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>

                {/* List */}
                <ul className="space-y-3 flex-1">

                  {cat.items.map((item, i) => (

                    <li
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#b30d29] mt-[2px]">
                        ✔
                      </span>

                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition"
                      >
                        {item.label}
                      </Link>

                    </li>

                  ))}

                </ul>

                {/* Button */}
                <Link
                  href={cat.items[0].href}
                  className="mt-8 inline-flex items-center justify-center
                  border border-[#b30d29]
                  text-[#b30d29]
                  hover:bg-[#b30d29]
                  hover:text-white
                  rounded-lg
                  py-3
                  transition"
                >
                  Explore Service →
                </Link>

              </div>

            ))}

          </div>

        </div>
      </section>      {/* ================= WHY CHOOSE US ================= */}

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
              digital products that help businesses grow faster and
              achieve measurable success.
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

                <p className="text-gray-400 leading-7">
                  {card.text}
                </p>

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

              <div
                key={index}
                className="flex-shrink-0"
              >

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
