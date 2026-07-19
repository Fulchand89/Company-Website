"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const aboutItems = [
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "Custom Software Development",
    text: "We engineer bespoke software designed to solve your unique operational challenges. From automating internal workflows to building large-scale ERP systems, our solutions are built for high performance, reliability, and long-term scalability.",
    titleClass: "text-[#0d6efd]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon2.png",
    title: "Full-Stack Web Engineering",
    text: "Moving beyond simple websites, we build progressive web applications (PWAs) and enterprise-grade portals. Using a modern stack (MERN/MEAN), we ensure your platform is lightning-fast, SEO-optimized, and capable of handling millions of requests.",
    titleClass: "text-[#0f172a]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "Custom Software Development",
    text: "We engineer bespoke software designed to solve your unique operational challenges. From automating internal workflows to building large-scale ERP systems, our solutions are built for high performance, reliability, and long-term scalability.",
    titleClass: "text-[#0f172a]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "Custom Software Development",
    text: "We engineer bespoke software designed to solve your unique operational challenges. From automating internal workflows to building large-scale ERP systems, our solutions are built for high performance, reliability, and long-term scalability.",
    titleClass: "text-[#0f172a]",
  },
];

const stats = [
  { num: "455+", text: "Web Development\nProject" },
  { num: "200+", text: "App Development\nProject" },
  { num: "150+", text: "Digital Marketing" },
];

const expertiseCards = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "AI / ML",
];

// Industries: col1=[2 items], col2=[1], col3=[2], col4=[1], col5=[2], col6=[1]
const industryGroups = [
  [
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
  ],
  [{ img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" }],
  [
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
  ],
  [{ img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" }],
  [
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
    { img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" },
  ],
  [{ img: "/assets/images/hero/healthcare 1.png", label: "Healthcare" }],
];

const portfolioItems = [
  { num: "01", title: "Mind Reset Website", img: "/assets/images/hero/mind-reset.png", text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes." },
  { num: "02", title: "Booking Luxor Website", img: "/assets/images/protfolio/protfolio2.png", text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes." },
  { num: "03", title: "Smart Brain Academy", img: "/assets/images/protfolio/protfolio3.png", text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes. Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, improved outcomes." },
];

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

const testimonials = [
  { img: "/assets/images/hero/client-img1.png", name: "Roy Donaldson", project: "Book Luxor" },
  { img: "/assets/images/hero/client-img3.png", name: "Roy Donaldson", project: "Book Luxor" },
  { img: "/assets/images/hero/client-img2.png", name: "Roy Donaldson", project: "Book Luxor" },
  { img: "/assets/images/hero/client-img1.png", name: "Roy Donaldson", project: "Book Luxor" },
];

const teamMembers = Array(8).fill({ name: "Jennifer", role: "CEO" });

const blogPosts = [
  { img: "/assets/images/hero/blog-img1.png", title: "8 Creative Ways to Repurpose Your Webinar Content" },
  { img: "/assets/images/hero/blog-img2.png", title: "Why Webinars Are the #1 Lead Generation Marketing Strategy, You May Not Be Thinking About" },
  { img: "/assets/images/hero/blog-img3.png", title: "How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps" },
];

// ─── Swiper Components ────────────────────────────────────────────────────────

function TestimonialSwiper() {
  const ref = useRef(null);

  useEffect(() => {
    let instance = null;
    async function init() {
      const { Swiper } = await import("swiper");
      const { Autoplay } = await import("swiper/modules");
      instance = new Swiper(ref.current, {
        modules: [Autoplay],
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        speed: 3000,
        autoplay: { delay: 0, disableOnInteraction: false },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
      });
    }
    init();
    return () => { if (instance) instance.destroy(true, true); };
  }, []);

  return (
    <div className="swiper myTestimonialSwiper py-1 overflow-hidden" ref={ref}>
      <div className="swiper-wrapper">
        {testimonials.map((item, i) => (
          <div className="swiper-slide pt-14" key={i}>
            <div
              className="relative border border-gray-200 rounded-[1rem] p-4 bg-white"
              style={{ maxWidth: "600px" }}
            >
              {/* Floating avatar */}
              <div className="absolute" style={{ top: "-45px", left: "30px" }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={75}
                  height={75}
                  className="rounded-full object-cover"
                  style={{ width: "75px", height: "75px" }}
                />
              </div>
              {/* Stars */}
              <div className="text-right text-yellow-400 text-3xl absolute" style={{ top: "15px", right: "20px" }}>
                ★★★★★
              </div>
              <p className="text-gray-500 my-5 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium
                nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi.
                Voluptate esse eveniet quisquam!
              </p>
              <h5 className="font-bold mb-1 text-[#0f172a]">{item.name}</h5>
              <p className="mb-0 text-sm">
                <span className="text-gray-500">Project : </span>
                <span className="text-red-600 font-semibold">{item.project}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSwiper() {
  const ref = useRef(null);

  useEffect(() => {
    let instance = null;
    async function init() {
      const { Swiper } = await import("swiper");
      const { Autoplay } = await import("swiper/modules");
      instance = new Swiper(ref.current, {
        modules: [Autoplay],
        slidesPerView: 4,
        spaceBetween: 25,
        loop: true,
        autoplay: { delay: 500, disableOnInteraction: false },
        breakpoints: {
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },
      });
    }
    init();
    return () => { if (instance) instance.destroy(true, true); };
  }, []);

  return (
    <div className="swiper teamSwiper overflow-hidden" ref={ref}>
      <div className="swiper-wrapper">
        {teamMembers.map((member, i) => (
          <div className="swiper-slide" key={i}>
            <div className="text-center">
              <Image
                src="/assets/images/hero/team-demo.png"
                className="w-full h-auto rounded mb-3"
                width={300}
                height={280}
                alt={member.name}
              />
              <div className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] rounded-[1.5rem] p-2">
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

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Name, email, and message are required fields." });
      return;
    }
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to submit request." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div
          className="hero-content p-5 flex items-center w-full text-white"
          style={{
            background: "url('/assets/images/hero/bg-gif.gif') center/cover no-repeat",
            minHeight: "550px",
          }}
        >
          <div className="hero-text py-5">
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold">
              We Build <span className="text-[#B30D29]">Digital </span>
              <br /> Experiences
            </h1>
            <p className="text-xl mt-3">
              Empowering businesses with innovative and <br /> next-gen IT Solutions.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#B30D29] text-white bg-[#B30D29] hover:bg-[#9a0b23] transition duration-200 px-5 py-2 rounded-[8px] no-underline font-medium"
              >
                Let Get Started <span className="text-white">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="bg-white p-5 rounded-[2rem] mx-4 my-4">
        <h2 className="mb-3 font-semibold text-[#0f172a]">About Us</h2>
        <p className="mb-4 font-semibold text-[#0f172a]">
          Increase operational efficiency, reduce costs, and drive productivity through
          <br /> custom-built digital solutions. Our expert teams specialize in building.
        </p>
        <div className="flex flex-wrap items-center -mx-3">
          <div className="w-full md:w-1/3 px-3 py-4">
            <Image
              src="/assets/images/hero/hero-about.png"
              alt="About Us"
              width={400}
              height={300}
              className="w-full h-auto rounded"
            />
          </div>
          <div className="w-full md:w-2/3 px-3">
            <div className="relative">
              {/* Left blue bar */}
              <div
                className="absolute top-0 bottom-0 bg-[#0d6efd]"
                style={{ width: "4px", left: "15px" }}
              />
              {/* Scrollable feature list */}
              <div
                className="scrollbar-hide overflow-y-auto"
                style={{ maxHeight: "400px", paddingRight: "0px" }}
              >
                {aboutItems.map((item, i) => (
                  <div key={i} className="flex mb-3">
                    <div className="shrink-0 mr-3">
                      <div
                        className="bg-white shadow-sm rounded-full flex items-center justify-center relative"
                        style={{ width: "60px", height: "60px", marginLeft: "-24px", zIndex: 1 }}
                      >
                        <Image src={item.icon} width={30} height={30} alt="" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className={`${item.titleClass} font-semibold`}>{item.title}</h4>
                      <p className="text-[#0f172a]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR EXPERTISE ── */}
      <section className="p-5 text-white">
        <h2 className="mb-3 font-semibold">Our Expertise</h2>
        <p className="mb-5">
          We design and develop tailored digital solutions that streamline operations, <br />
          optimize costs, and empower businesses to achieve peak performance
        </p>
        <div className="flex flex-wrap -mx-3 gap-4">

          {/* Stats column */}
          <div className="w-full lg:w-1/4 px-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] p-3 mb-3 rounded"
              >
                <h2 className="font-bold">{stat.num}</h2>
                <p className="mb-0 whitespace-pre-line">{stat.text}</p>
              </div>
            ))}
          </div>

          {/* Service cards grid */}
          <div className="w-full lg:w-[calc(75%-16px)] px-3">
            <div className="flex flex-wrap -mx-3 gap-4">
              {expertiseCards.map((title, i) => (
                <div key={i} className="w-full lg:w-[calc(50%-8px)] md:w-[calc(50%-8px)] px-3">
                  <div
                    className="group border-2 border-transparent rounded-[16px] py-4 px-4 flex flex-col justify-between transition-all duration-300 ease-in-out hover:border-white hover:-translate-y-1"
                    style={{ background: "url('/assets/images/hero/card-bg.png') center/cover" }}
                  >
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p>Developing smart, secure, and future-<br />ready websites.</p>
                    </div>
                    <button className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 rounded-full text-sm self-start w-8 h-8">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="p-5 bg-white rounded-[2rem] mx-4 my-4">
        <div className="text-[#0f172a]">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-3xl font-bold mb-3">
            Industries We Serve
          </h2>
          <p className="mb-5">
            Enhance operational efficiency, minimize costs, and accelerate growth with intelligent, custom-built <br />
            digital solutions powered by our expert development teams.
          </p>
        </div>

        {/* Mobile / Tablet Grid View */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:hidden gap-6 justify-items-center mb-6">
          {industryGroups.flat().map((item, ii) => (
            <div
              key={ii}
              className="w-[130px] h-[130px] bg-white rounded-full p-4 flex flex-col items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#B30D29] hover:text-white hover:scale-105 cursor-pointer shrink-0"
            >
              <Image src={item.img} alt={item.label} width={40} height={40} />
              <small className="text-center text-xs mt-2 text-[#0f172a] font-medium group-hover:text-white">{item.label}</small>
            </div>
          ))}
        </div>

        {/* Desktop Zigzag View */}
        <div className="hidden lg:flex flex-wrap justify-between gap-4">
          {industryGroups.map((group, gi) => (
            <div
              key={gi}
              className="w-full lg:w-[calc(16.666%-14px)] flex lg:flex-col flex-row items-center justify-between gap-5"
            >
              {group.map((item, ii) => (
                <div
                  key={ii}
                  className="w-[130px] h-[130px] bg-white rounded-full p-4 flex flex-col items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#B30D29] hover:scale-105 cursor-pointer shrink-0"
                >
                  <Image src={item.img} alt={item.label} width={40} height={40} />
                  <small className="text-center text-xs mt-1 text-[#0f172a]">{item.label}</small>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="relative bg-[#0b0b0b] text-white py-5 px-3 lg:px-5">
        <div className="w-full px-4">
          <h2 className="mb-3 font-semibold">Our Portfolio</h2>
          <p className="mb-5">
            Showcasing innovation, creativity, and results through impactful digital
            <br className="hidden md:block" /> solutions crafted for real-world success.
          </p>
          <div className="flex flex-wrap -mx-3 relative">

            {/* Portfolio items — scrollable */}
            <div className="w-full lg:w-10/12 px-3">
              <div
                className="scrollbar-hide overflow-y-auto snap-y snap-mandatory lg:pr-4"
                style={{ maxHeight: "420px" }}
              >
                {portfolioItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#212529] rounded-[0.75rem] p-3 text-white mb-4 snap-start"
                  >
                    <div className="flex flex-wrap items-center -mx-3 gap-3">
                      <div className="w-full md:w-5/12 px-3">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-auto rounded object-contain"
                        />
                      </div>
                      <div className="w-full md:w-7/12 px-3">
                        <h2 className="mt-2 md:mt-0 text-2xl font-bold py-2">
                          {item.num} <br /> {item.title}
                        </h2>
                        <p className="text-base text-gray-300">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical line with moving dot — desktop only */}
            <div className="w-full lg:w-2/12 px-3 hidden lg:block relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-full bg-[#555]" />
              <div className="absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-white animate-[moveDot_6s_linear_infinite]" />
            </div>

          </div>
        </div>
      </section>

      {/* ── TECH LOGOS AUTO-SCROLL ── */}
      <div className="py-5 overflow-hidden">
        <div className="flex gap-8 animate-[slide_12s_linear_infinite]">
          {techLogos.map((n, i) => (
            <div key={i} className="shrink-0">
              <Image
                src={`/assets/images/icon/tech${n}.png`}
                alt={`Tech ${n}`}
                width={80}
                height={50}
                className="object-contain"
                style={{ height: "50px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="p-5 bg-white rounded-[2rem] mx-4 my-4">
        <h2 className="font-semibold text-[#0f172a] mb-2">Testimonials</h2>
        <p className="text-[#0f172a] mb-5">
          We take pride in building lasting partnerships through quality work, timely delivery, and transparent <br />
          communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.
        </p>
        <TestimonialSwiper />
      </section>

      {/* ── OUR TEAMS ── */}
      <section className="p-5 text-white">
        <h2 className="font-semibold mb-3">Our Teams</h2>
        <p className="mb-4">
          Showcasing innovation, creativity, and results through impactful digital solutions.
        </p>
        <TeamSwiper />
      </section>

      {/* ── BLOG ── */}
      <section className="p-5 bg-white rounded-[2rem] mx-4 my-4">
        <h2 className="font-semibold text-[#0f172a] mb-3">Blog</h2>
        <p className="text-[#0f172a] mb-5" style={{ maxWidth: "650px" }}>
          We take pride in building lasting partnerships through quality work, timely delivery,
          and transparent communication. Our client testimonials reflect the trust and satisfaction
          we strive to achieve in every project.
        </p>
        <div className="flex flex-wrap -mx-3 gap-4">
          {blogPosts.map((item, i) => (
            <div key={i} className="w-full lg:w-[calc(33.333%-11px)] md:w-[calc(50%-8px)] px-3">
              <div className="h-full flex flex-col gap-3">
                <Image
                  src={item.img}
                  alt="blog"
                  width={400}
                  height={250}
                  className="w-full h-auto rounded mb-1"
                />
                <span className="inline-flex items-center px-3 py-1 border border-slate-300 rounded-[24px] text-[#0f172a] w-fit text-sm">
                  Inspiration
                </span>
                <h6 className="font-semibold text-[#0f172a]">{item.title}</h6>
                <Link href="#" className="text-red-600 no-underline text-sm">
                  Read
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center border border-[#0d6efd] text-[#0d6efd] hover:bg-blue-50 transition duration-200 px-5 py-2 rounded-[8px] no-underline"
          >
            <span className="text-[#0f172a]">Read More</span>&nbsp;→
          </Link>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="mt-5 p-5 flex items-center"
        style={{
          background: "url('/assets/images/hero/bottom.png') center/cover no-repeat",
          padding: "80px 20px",
        }}
      >
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-1/2 px-3 text-white">
            <h2 className="font-bold text-3xl">
              From Idea to Impact <br /> We Build What Matters
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 mb-3 rounded-[8px] px-5 py-2 no-underline mt-4"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section p-5">
        <div className="flex flex-wrap -mx-3 items-center gap-4">
          <div className="w-full lg:w-1/2 md:w-1/2 px-3">
            <h2 className="text-white font-semibold mb-1">Contact Us</h2>
            <p className="text-white mb-4">Connect with our team for expert guidance.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
                  style={{ height: "100px" }}
                  placeholder="Write your message"
                  required
                />
              </div>
              
              {status.message && (
                <div className={`mb-4 text-sm ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 text-sm px-5 py-2 rounded-[8px] no-underline cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 md:w-1/2 px-3">
            <div className="text-center lg:text-right">
              <Image
                src="/assets/images/hero/map.png"
                alt="Contact Image"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
