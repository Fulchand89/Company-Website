"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TeamSkeleton from "@/components/TeamSkeleton";
import EventSkeleton from "@/components/EventSkeleton";

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
    text: "We partner with our clients to map out long-term technological roadmaps, ensuring that every digital investment drives measurable business value.",
  },
  {
    img: "/assets/images/about/vision2.png",
    alt: "Growth",
    title: "Innovation & Growth",
    text: "By adopting cutting-edge technologies like AI and scalable cloud architecture, we help modern enterprises stay ahead of the curve and accelerate growth.",
  },
  {
    img: "/assets/images/about/vision3.png",
    alt: "Quality",
    title: "Inclusive Solutions",
    text: "Our design philosophy centers on accessibility and inclusivity, crafting digital experiences that empower users of all backgrounds and abilities.",
  },
  {
    img: "/assets/images/about/vision4.png",
    alt: "Impact",
    title: "Scaling Worldwide",
    text: "We build high-performance, robust systems capable of supporting global user bases, ensuring reliable service delivery across international markets.",
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

const teamMembers = [
  { id: 1, name: "Jennifer", designation: "CEO & Founder", img: "/assets/images/hero/team-demo.png" },
  { id: 2, name: "Alexander Reed", designation: "Chief Technology Officer", img: "/assets/images/hero/team-demo.png" },
  { id: 3, name: "Sophia Chen", designation: "VP of Product & Design", img: "/assets/images/hero/team-demo.png" },
  { id: 4, name: "Marcus Vance", designation: "Head of AI & Engineering", img: "/assets/images/hero/team-demo.png" },
  { id: 5, name: "Emily Watson", designation: "Lead UI/UX Designer", img: "/assets/images/hero/team-demo.png" },
  { id: 6, name: "David Miller", designation: "Senior Full Stack Dev", img: "/assets/images/hero/team-demo.png" },
  { id: 7, name: "Rachel Adams", designation: "Marketing Director", img: "/assets/images/hero/team-demo.png" },
  { id: 8, name: "Daniel Kim", designation: "DevOps Lead", img: "/assets/images/hero/team-demo.png" },
];

const DEFAULT_EVENTS = [
  { id: 1, title: "Annual Tech Conference", img: "/assets/images/about/Event1.png" },
  { id: 2, title: "Office Hackathon", img: "/assets/images/about/Event2.png" },
  { id: 3, title: "Team Building Outing", img: "/assets/images/about/Event3.png" },
  { id: 4, title: "Interactive Workshops", img: "/assets/images/about/Event4.png" },
  { id: 5, title: "Celebrations & Culture", img: "/assets/images/about/Event5.png" },
];

function EventSlider() {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            setEvents(json);
          } else {
            setEvents(DEFAULT_EVENTS);
          }
        } else {
          setEvents(DEFAULT_EVENTS);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents(DEFAULT_EVENTS);
      } finally {
        setEventsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (eventsLoading) {
    return <EventSkeleton count={5} />;
  }

  const displayList = events.length > 0 ? events : DEFAULT_EVENTS;
  const sliderItems = [...displayList, ...displayList, ...displayList];

  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-5 animate-[slide_18s_linear_infinite]">
        {sliderItems.map((item, i) => (
          <div key={i} className="shrink-0 relative group rounded-[12px] overflow-hidden">
            <Image
              src={item.img || "/assets/images/about/Event1.png"}
              alt={item.title || `Event ${i}`}
              width={220}
              height={165}
              className="shrink-0 rounded-[12px] object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ width: "220px", height: "165px" }}
            />
            {item.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-semibold">{item.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Team Swiper Component ────────────────────────────────────────────────────
// Accepts `members` as a prop — data is fetched once by AboutPage and passed
// down, eliminating the duplicate /api/teams call that used to happen here.

function TeamSwiper({ members = teamMembers }) {
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function initSwiper() {
      // Load Swiper JS + CSS on demand — not part of the initial page bundle
      const [{ Swiper }, { Autoplay }] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
        import("swiper/css"),
      ]);
      if (!active || !swiperRef.current) return;

      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }

      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        modules: [Autoplay],
        slidesPerView: 4,
        spaceBetween: 25,
        loop: members.length > 1,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
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
      active = false;
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [members]);

  return (
    <div className="swiper overflow-hidden" ref={swiperRef}>
      <div className="swiper-wrapper">
        {members.map((member, i) => (
          <div className="swiper-slide" key={member.id || i}>
            <div className="text-center">
              <Image
                src={member.img || "/assets/images/hero/team-demo.png"}
                className="w-full h-[280px] object-cover rounded-lg mb-3"
                width={300}
                height={280}
                priority
                alt={member.name || "Team Member"}
              />
              <div className="rounded-[1.5rem] p-2 bg-[#212529]">
                <h6 className="mb-0 text-white font-semibold">{member.name}</h6>
                <small className="text-white">{member.designation || member.role}</small>
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
  // Fetch teams once at the page level and pass down to TeamSwiper.
  // This prevents TeamSwiper from making a duplicate /api/teams call
  // that was already made on the homepage in the same session.
  const [pageTeamMembers, setPageTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch team members");
        return r.json();
      })
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setPageTeamMembers(json.data);
        } else {
          setPageTeamMembers(teamMembers);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
        setPageTeamMembers(teamMembers);
      })
      .finally(() => {
        setTeamLoading(false);
      });
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section py-8 xl:py-12 2xl:py-16">
        <div
          className="p-5 flex items-center w-full text-white min-h-[260px] xl:min-h-[300px] 2xl:min-h-[360px]"
          style={{
            background: "url('/assets/images/about/aboutbg.png') center/cover no-repeat",
          }}
        >
          <div className="text-center text-white w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28 2xl:pt-48 2xl:pb-36">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">About Us</h1>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mt-2 xl:mt-4 2xl:mt-6 text-gray-200 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">Your Trusted Partner in Technology and Innovation</p>
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="bg-[#f4f4f6] rounded-[2rem] p-5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left: Image Stack */}
            {/* Mobile: horizontal row */}
            <div className="flex md:hidden gap-3 justify-center items-end w-full mb-5">
              <Image
                src="/assets/images/about/about1.png"
                className="rounded-[16px] object-cover"
                width={110}
                height={130}
                alt="Image 1"
              />
              <Image
                src="/assets/images/about/about2.png"
                className="rounded-[16px] object-cover -mt-2"
                width={130}
                height={160}
                alt="Image 2"
              />
              <Image
                src="/assets/images/about/about3.png"
                className="rounded-[16px] object-cover"
                width={110}
                height={130}
                alt="Image 3"
              />
            </div>

            {/* Desktop: absolute positioned stack */}
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
        </div>
      </section>

      {/* ── OUR VISION ── */}
      <section className="p-5 text-white text-center md:text-left">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="font-semibold mb-3 text-3xl">Our Vision</h2>
          <p className="mb-5">
            Our team of dedicated experts brings vision and innovation together to turn your <br /> concepts into reality. We
            combine aesthetic excellence with meticulous execution to <br /> create impactful results.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {visionCards.map((card, i) => (
              <div key={i} className="w-full lg:w-[calc(25%-12px)] md:w-[calc(50%-8px)] sm:w-[calc(50%-8px)]">
                <div className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] text-white transition-all duration-300 rounded-[0.75rem] text-center p-4 h-full flex flex-col items-center">
                  <div className="mb-3">
                    <Image src={card.img} alt={card.alt} height={40} width={40} />
                  </div>
                  <h5 className="font-semibold">{card.title}</h5>
                  <p className="text-sm">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section className="p-5 bg-white rounded-[2rem] text-[#0f172a]">
        <div className="max-w-7xl mx-auto w-full">
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
        </div>
      </section>

      {/* ── EVENTS (auto-slider) ── */}
      <section className="p-5 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="font-semibold mb-3 text-3xl">Events</h2>
          <p className="mb-5">
            Beyond tech events, we host interactive office sessions, workshops, <br /> and team activities that encourage
            creativity, knowledge sharing, and stronger collaboration.
          </p>

          <EventSlider />
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="rounded-[2rem] bg-white p-8 text-[#0f172a] lg:p-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid min-h-[424px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">

            {/* Left Content */}
            <div className="max-w-[510px]">
              <p className="mb-3 text-base font-semibold text-[#b30d29]">How We Work</p>
              <h2 className="mb-5 text-3xl font-bold leading-[1.2] lg:text-[32px]">
                Gupta Tech Web: <span className="text-[#B30D29]">Crafting Success</span><br />
                Through Collaboration.
              </h2>
              <p className="text-base leading-6 text-[#525b6b]">
                We believe in a structured, transparent, and collaborative approach. From initial ideation to final deployment, our agile methodology ensures that every project is delivered on time, within budget, and exceeds expectations.
              </p>
            </div>

            {/* Right Cards */}
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {workCards.map((card, i) => (
                  <div key={i}>
                    <div className="min-h-[196px] rounded-lg border border-[#f1f1f1] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                      <div className="relative mb-5 inline-block">
                        <Image src={card.img} alt={card.title} width={36} height={36} />
                      </div>
                      <h5 className="mb-2 text-xl font-bold leading-6">{card.title}</h5>
                      <p className="mb-0 text-[14px] leading-[21px] text-[#525b6b]">{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR TEAMS ── */}
      <section className="p-5 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="font-semibold mb-3 text-3xl">Our Teams</h2>
          <p className="mb-4">
            Showcasing innovation, creativity, and results through impactful digital solutions.
          </p>
          {teamLoading ? (
            <TeamSkeleton count={4} />
          ) : (
            <TeamSwiper members={pageTeamMembers} />
          )}
        </div>
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

        <div className="relative z-10 max-w-7xl mx-auto w-full">
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
                className="inline-block mt-5 mb-3 rounded-[0.75rem] border border-white px-4 py-2 text-white no-underline transition-colors duration-200 hover:bg-white hover:text-[#0f172a]"
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
