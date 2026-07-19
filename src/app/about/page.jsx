"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── Workflow Section ────────────────────────────────────────────────────────

const workflowItems = [
  {
    title: "Operations & Workflow Automation",
    text: "Increase operational efficiency, reduce costs, and drive productivity through custom-built digital solutions. Our expert teams specialize in building and integrating intelligent software platforms to streamline processes across key departments.",
    img: "/assets/images/about/about-img.png",
  },
  {
    title: "Supply Chain Optimization",
    text: "Optimize supply chain with real-time analytics and AI-powered forecasting.",
    img: "/assets/images/about/about-img.png",
  },
  {
    title: "Invoices, Billing & Financial System",
    text: "Automate invoicing, billing, and finance systems with secure integrations.",
    img: "/assets/images/about/about-img.png",
  },
  {
    title: "Financial Reporting & Payments",
    text: "Streamline payment workflows and financial reporting for better control.",
    img: "/assets/images/about/about-img.png",
  },
];

// ─── Vision Cards ─────────────────────────────────────────────────────────────

const visionCards = [
  {
    img: "/assets/images/about/vision1.png",
    alt: "Innovation",
    title: "Strategic Vision",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    img: "/assets/images/about/vision2.png",
    alt: "Growth",
    title: "Innovation & Growth",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    img: "/assets/images/about/vision3.png",
    alt: "Quality",
    title: "Inclusive Solutions",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    img: "/assets/images/about/vision4.png",
    alt: "Impact",
    title: "Scaling Worldwide",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
];

// ─── How We Work Cards ────────────────────────────────────────────────────────

const workCards = [
  {
    img: "/assets/images/about/about-card1.png",
    title: "Research",
    text: "In the research phase, we meticulously analyze your business landscape, industry trends, and target audience behaviors.",
  },
  {
    img: "/assets/images/about/about-card2.png",
    title: "Design",
    text: "Our creative team merges aesthetics with functionality, designing immersive experiences that captivate your audience.",
  },
  {
    img: "/assets/images/about/about-card3.png",
    title: "Development",
    text: "In the development phase, our expert developers bring your vision to life using cutting-edge technologies.",
  },
  {
    img: "/assets/images/about/about-card4.png",
    title: "Launch",
    text: "With careful planning and attention to detail, we launch your project to the world, delivering measurable success.",
  },
];

// ─── Team Members ─────────────────────────────────────────────────────────────

const teamMembers = Array(8).fill({ name: "Jennifer", role: "CEO" });

// ─── Event images (duplicated for infinite scroll effect) ─────────────────────

const eventImages = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

// ─── Team Swiper Component ────────────────────────────────────────────────────

function TeamSwiper() {
  const swiperRef = useRef(null);

  useEffect(() => {
    let swiperInstance = null;

    async function initSwiper() {
      const { Swiper } = await import("swiper");
      const { Autoplay } = await import("swiper/modules");

      swiperInstance = new Swiper(swiperRef.current, {
        modules: [Autoplay],
        slidesPerView: 4,
        spaceBetween: 25,
        loop: true,
        autoplay: {
          delay: 500,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },
      });
    }

    initSwiper();

    return () => {
      if (swiperInstance) swiperInstance.destroy(true, true);
    };
  }, []);

  return (
    <div className="swiper overflow-hidden" ref={swiperRef}>
      <div className="swiper-wrapper">
        {teamMembers.map((member, i) => (
          <div className="swiper-slide" key={i}>
            <div className="text-center">
              <Image
                src="/assets/images/hero/team-demo.png"
                className="w-full h-auto rounded-lg mb-3"
                width={300}
                height={280}
                alt={member.name}
              />
              <div className="rounded-[1.5rem] p-2 bg-[#212529]">
                <h6 className="mb-0 text-white font-semibold">{member.name}</h6>
                <small className="text-white">{member.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section py-8" >
        <div
          className="p-5 flex items-center w-full text-white min-h-[260px py-35]"
          style={{
            background: "url('/assets/images/about/aboutbg.png') center/cover no-repeat",
          }}
        >
          <div className="text-center text-white w-full " style={{ paddingTop: "140px", paddingBottom: "80px" }}>
            <h1 className="font-bold text-4xl md:text-5xl">About Us</h1>
            <p className="text-2xl mt-2">Your Trusted Partner in Technology and Innovation</p>
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="bg-[#f4f4f6] rounded-[2rem] p-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left: Image Stack */}
          <div className="h-[260px] w-full md:w-1/2 relative hidden md:block mb-5">
            <Image
              src="/assets/images/about/about1.png"
              className="absolute rounded-[16px] object-cover left-0 top-[20px] z-10 scale-90"
              width={250}
              height={250}
              alt="Image 1"
            />
            <Image
              src="/assets/images/about/about2.png"
              className="absolute rounded-[16px] object-cover left-1/2 top-[2px] -translate-x-1/2 z-20"
              width={270}
              height={270}
              style={{ height: "300px" }}
              alt="Image 2"
            />
            <Image
              src="/assets/images/about/about3.png"
              className="absolute rounded-[16px] object-cover right-0 top-[20px] z-10 scale-90"
              width={250}
              height={250}
              alt="Image 3"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 md:ps-5 text-center md:text-left">
            <h2 className="font-bold text-[#0f172a] mb-3 text-3xl leading-snug">
              Smart <span className="text-[#B30D29]">Digital Solutions for <br /> Real Business</span> Growth
            </h2>
            <p className="text-[#6D758F] font-semibold mb-3">
              We are a boutique digital transformation consultancy and development company.
            </p>
            <p className="text-[#6D758F] text-sm mb-3">
              Since 2007 we have been a visionary and a reliable software engineering partner for
              world-class brands. We are a boutique digital transformation consultancy and software
              development company that provides cutting edge engineering solutions.
            </p>
            <Link href="#" className="text-[#B30D29] no-underline">
              See more Informations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR VISION ── */}
      <section className="p-5 text-white">
        <h2 className="font-semibold mb-3 text-3xl">Our Vision</h2>
        <p className="mb-5">
          Our team of dedicated experts brings vision and innovation together to turn your <br /> concepts into reality. We
          combine aesthetic excellence with meticulous execution to <br /> create impactful results.
        </p>

        <div className="flex flex-wrap gap-4">
          {visionCards.map((card, i) => (
            <div key={i} className="w-full lg:w-[calc(25%-12px)] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]">
              <div className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] text-white transition-all duration-300 rounded-[0.75rem] text-center p-4 h-full">
                <div className="mb-3">
                  <Image src={card.img} alt={card.alt} height={40} width={40} />
                </div>
                <h5 className="font-semibold">{card.title}</h5>
                <p className="text-sm">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section className="p-5 bg-white rounded-[2rem] text-[#0f172a]">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">

          {/* Left Menu */}
          <div className="w-full lg:w-auto">
            <ul className="list-none p-0 m-0">
              {workflowItems.map((item, i) => (
                <li
                  key={i}
                  className={[
                    "py-4 px-5 mb-2 cursor-pointer font-semibold transition-all duration-300 text-lg",
                    "border-l-[3px] hover:text-[#B30D29] hover:border-l-[#B30D29]",
                    activeWorkflow === i
                      ? "text-[#B30D29] border-l-[#B30D29]"
                      : "text-[#0f172a] border-l-transparent",
                  ].join(" ")}
                  onClick={() => setActiveWorkflow(i)}
                  onMouseEnter={() => setActiveWorkflow(i)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content */}
          <div className="flex-[1.5] text-center w-full lg:w-auto">
            <Image
              src={workflowItems[activeWorkflow].img}
              alt="workflow"
              width={520}
              height={400}
              className="w-full max-w-[520px] rounded-[18px] transition-all duration-300 mx-auto"
            />
            <p className="mt-4 text-base text-black leading-relaxed">
              {workflowItems[activeWorkflow].text}
            </p>
          </div>
        </div>
      </section>

      {/* ── EVENTS (auto-slider) ── */}
      <section className="p-5 text-white">
        <h2 className="font-semibold mb-3 text-3xl">Events</h2>
        <p className="mb-5">
          Beyond tech events, we host interactive office sessions, workshops, <br /> and team activities that encourage
          creativity, knowledge sharing, and stronger collaboration.
        </p>

        <div className="overflow-hidden w-full">
          <div className="flex gap-5 animate-[slide_12s_linear_infinite]">
            {eventImages.map((n, i) => (
              <Image
                key={i}
                src={`/assets/images/about/Event${n}.png`}
                alt={`slide${n}`}
                width={200}
                height={150}
                className="shrink-0 rounded-[12px] object-cover"
                style={{ width: "200px", height: "150px" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="rounded-[2rem] bg-white text-[#0f172a] p-5">
        <div className="flex flex-wrap items-center gap-5">

          {/* Left Content */}
          <div className="w-full lg:w-5/12">
            <p className="text-[#B30D29] font-semibold mb-2">How We Work</p>
            <h2 className="font-bold mb-3 text-3xl leading-snug">
              Gupta Tech Web: <span className="text-[#B30D29]">Crafting Success</span><br />
              Through Collaboration.
            </h2>
            <p className="text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-7/12">
            <div className="flex flex-wrap gap-4">
              {workCards.map((card, i) => (
                <div key={i} className="w-full md:w-[calc(50%-8px)]">
                  <div className="shadow-sm rounded-[0.75rem] p-4 h-full border border-gray-100">
                    <div className="relative inline-block mb-3">
                      <Image src={card.img} alt={card.title} width={50} height={50} />
                    </div>
                    <h5 className="font-bold">{card.title}</h5>
                    <p className="text-gray-500 text-sm mb-0">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR TEAMS ── */}
      <section className="p-5 text-white">
        <h2 className="font-semibold mb-3 text-3xl">Our Teams</h2>
        <p className="mb-4">
          Showcasing innovation, creativity, and results through impactful digital solutions.
        </p>
        <TeamSwiper />
      </section>

      {/* ── JOIN OUR TEAM CTA ── */}
      <section className="relative overflow-hidden text-white p-5">
        {/* Blurred background */}
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            background: "url('/assets/images/about/bottom-card.png') center/cover no-repeat",
            filter: "blur(6px) brightness(0.5)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-5">

            {/* Text Column */}
            <div className="w-full lg:w-1/2 text-start">
              <h2 className="text-3xl font-bold">Want to join Our Team?</h2>
              <p className="mt-2">
                Work on impactful projects that challenge your skills and inspire continuous learning.
                Collaborate with passionate professionals who believe in quality, innovation, and growth.
              </p>
              <Link
                href="/contact"
                className="inline-block border border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors duration-200 mb-3 rounded-[0.75rem] px-4 py-2 no-underline"
              >
                Contact Us →
              </Link>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-[calc(50%-20px)] text-center">
              <div className="rounded-lg shadow-lg overflow-hidden inline-block">
                <Image
                  src="/assets/images/about/bottom-card-small.png"
                  className="w-full h-auto rounded-lg"
                  width={500}
                  height={350}
                  alt="Team at Work"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
