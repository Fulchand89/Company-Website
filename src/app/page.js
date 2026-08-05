"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import TestimonialSkeleton from "@/components/TestimonialSkeleton";
import BlogSkeleton from "@/components/BlogSkeleton";
import TeamSkeleton from "@/components/TeamSkeleton";

const TestimonialSwiper = dynamic(() => import("@/components/TestimonialSwiper"), { ssr: false });
const TeamSwiper = dynamic(() => import("@/components/TeamSwiper"), { ssr: false });



// ─── Data ─────────────────────────────────────────────────────────────────────

const aboutItems = [
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "Custom Software Development",
    text: "We engineer bespoke software designed to solve your unique operational challenges. From automating internal workflows to building large-scale ERP systems, our solutions are built for high performance, reliability, and long-term scalability.",
    titleClass: "text-[#B30D29]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon2.png",
    title: "Full-Stack Web Engineering",
    text: "Moving beyond simple websites, we build progressive web applications (PWAs) and enterprise-grade portals. Using a modern stack (MERN/MEAN), we ensure your platform is lightning-fast, SEO-optimized, and capable of handling millions of requests.",
    titleClass: "text-[#0f172a]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "Mobile App Development",
    text: "Deliver seamless mobile experiences across iOS and Android platforms. Our mobile applications are built with user-centric design, robust security, and cross-platform compatibility to ensure maximum reach.",
    titleClass: "text-[#0f172a]",
  },
  {
    icon: "/assets/images/hero/hero-about-icon1.png",
    title: "UI/UX & Digital Marketing",
    text: "We combine stunning interfaces with data-driven marketing strategies. From wireframing intuitive designs to executing SEO and social media campaigns, we help you acquire and retain customers.",
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
    { img: "/assets/images/hero/h1.png", label: "Healthcare" },
    { img: "/assets/images/hero/h2.png", label: "Heart" },
  ],
  [{ img: "/assets/images/hero/h9.png", label: "NatureCare" }],
  [
    { img: "/assets/images/hero/h10.png", label: "Monitoring" },
    { img: "/assets/images/hero/h7.png", label: "Hospital" },
  ],
  [{ img: "/assets/images/hero/h5.png", label: "Medicine" }],
  [
    { img: "/assets/images/hero/h6.png", label: "Medical" },
    { img: "/assets/images/hero/h3.png", label: "Emergency" },
  ],
  [{ img: "/assets/images/hero/h8.png", label: "Brain" }],
];

const portfolioItems = [
  { num: "01", title: "Mind Reset Website", img: "/assets/images/hero/mind-reset.png", text: "A comprehensive platform dedicated to mental wellness and personal growth, featuring interactive courses, a resource library, and secure user profiles." },
  { num: "02", title: "Booking Luxor Website", img: "/assets/images/protfolio/protfolio2.png", text: "A streamlined travel and accommodation booking portal. Integrates real-time availability, secure payment gateways, and a dynamic search engine for a seamless user experience." },
  { num: "03", title: "Smart Brain Academy", img: "/assets/images/protfolio/protfolio3.png", text: "Smart Brain Academy empowers students and educators through a reliable online tutoring ecosystem. Smooth interactions, efficient bookings, and improved learning outcomes." },
];

const techLogos = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

const testimonials = [
  { id: 1, img: "/assets/images/hero/client-img1.png", name: "David Henderson", project: "E-Commerce Replatforming", text: "Gupta Tech Web transformed our online store. The new architecture is blazingly fast, and we saw a 40% increase in conversions within the first month. Highly recommended team!", rating: 5 },
  { id: 2, img: "/assets/images/hero/client-img2.png", name: "Michael Chang", project: "Logistics Dashboard", text: "Our supply chain operations were completely modernized. Gupta Tech Web engineered a custom dashboard that gives us real-time insights, saving us countless hours of manual work.", rating: 5 },
  { id: 3, img: "/assets/images/hero/client-img3.png", name: "Sarah Collins", project: "Healthcare CRM App", text: "They delivered our mobile application ahead of schedule. The team was incredibly responsive, and their attention to UI/UX details made the app extremely intuitive for our medical staff.", rating: 5 },
  { id: 4, img: "/assets/images/hero/client-img1.png", name: "Emma Robertson", project: "SEO & Digital Strategy", text: "Their digital marketing expertise is unmatched. Our organic traffic doubled in just 6 months, and the quality of leads has improved significantly. A fantastic partner for growth.", rating: 5 },
  { id: 5, img: "/assets/images/hero/client-img2.png", name: "James O'Connor", project: "Fintech Web App", text: "Security and compliance were our top priorities, and Gupta Tech Web delivered perfectly. Their backend engineering is world-class, ensuring our transactions are safe and lightning fast.", rating: 5 },
];

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

const blogPosts = [
  { img: "/assets/images/hero/blog-img1.png", title: "8 Creative Ways to Repurpose Your Webinar Content", slug: "8-creative-ways-to-repurpose-your-webinar-content" },
  { img: "/assets/images/hero/blog-img2.png", title: "Why Webinars Are the #1 Lead Generation Marketing Strategy, You May Not Be Thinking About", slug: "why-webinars-are-the-1-lead-generation-marketing-strategy" },
  { img: "/assets/images/hero/blog-img3.png", title: "How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps", slug: "how-to-drive-qualified-pipeline-and-enable-sales-after-your-webinar-wraps" },
];


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

  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const [dynamicTeam, setDynamicTeam] = useState([]);

  const [blogsLoading, setBlogsLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(true);

  const [blogsError, setBlogsError] = useState(null);
  const [testimonialsError, setTestimonialsError] = useState(null);
  const [teamError, setTeamError] = useState(null);

  useEffect(() => {
    // Fetch blogs
    fetch("/api/blog?limit=3", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setDynamicBlogs(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setBlogsError("Failed to load blogs.");
      })
      .finally(() => {
        setBlogsLoading(false);
      });

    // Fetch testimonials
    fetch("/api/testimonials?limit=10", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setDynamicTestimonials(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setTestimonialsError("Failed to load testimonials.");
      })
      .finally(() => {
        setTestimonialsLoading(false);
      });

    // Fetch team members
    fetch("/api/teams", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team members");
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setDynamicTeam(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
        setTeamError("Failed to load team members.");
      })
      .finally(() => {
        setTeamLoading(false);
      });
  }, []);

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
          className="hero-content p-5 pt-[100px] lg:pt-[120px] xl:pt-[140px] 2xl:pt-[160px] flex items-center w-full text-white min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[680px] 2xl:min-h-[750px]"
          style={{
            background: "url('/assets/images/hero/bg-gif.gif') center/cover no-repeat",
          }}
        >
          <div className="hero-text py-5 xl:py-8 2xl:py-12 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl mx-auto w-full">
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              We Build <span className="text-[#B30D29]">Digital </span>
              <br className="hidden md:block" /> Experiences
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl mt-4 xl:mt-6 2xl:mt-8 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-gray-200">
              Empowering businesses with innovative and <br /> next-gen IT Solutions.
            </p>
            <div className="mt-4 xl:mt-6 2xl:mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#B30D29] text-white bg-[#B30D29] hover:bg-[#9a0b23] transition duration-200 px-5 py-2 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] no-underline font-medium xl:text-lg 2xl:text-xl"
              >
                Let Get Started <span className="text-white">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="bg-white p-6 lg:p-10">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-4">About Us</h2>
          <p className="text-base lg:text-base font-medium text-[#0f172a] leading-relaxed mb-6 max-w-4xl">
            Increase operational efficiency, reduce costs, and drive productivity through<br />
            custom-built digital solutions. Our expert teams specialize in building scalable and innovative platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 lg:col-span-4 py-4">
              <Image
                src="/assets/images/hero/hero-about.png"
                alt="About Us"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-sm"
              />
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <div className="relative pl-2">
                {/* Left red bar */}
                <div
                  className="absolute top-0 bottom-0 bg-[#B30D29]"
                  style={{ width: "4px", left: "15px" }}
                />
                {/* Scrollable feature list */}
                <div
                  className="scrollbar-hide overflow-y-auto"
                  style={{ maxHeight: "480px", paddingRight: "10px" }}
                >
                  {aboutItems.map((item, i) => (
                    <div key={i} className="flex mb-6 items-start">
                      <div className="shrink-0 mr-4">
                        <div
                          className="bg-white shadow-sm rounded-full flex shrink-0 items-center justify-center relative border border-gray-100 -ml-3 md:-ml-6 z-10"
                          style={{ width: "60px", height: "60px" }}
                        >
                          <Image src={item.icon} width={32} height={32} alt="" />
                        </div>
                      </div>
                      <div className="flex-grow pl-1">
                        <h3 className={`${item.titleClass} text-xl lg:text-2xl font-bold mb-2`}>{item.title}</h3>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-normal">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR EXPERTISE ── */}
      {/* ─────────────── OUR EXPERTISE ─────────────── */}
      <section className="py-12 px-6 lg:px-10 text-white">
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
              Our Expertise
            </h2>

            <p className="text-base lg:text-lg text-gray-300 max-w-4xl leading-7">
              We design and develop tailored digital solutions that streamline
              operations, optimize costs, and empower businesses to achieve peak
              performance.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

            {/* ================= LEFT STATS ================= */}
            <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">

              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group
                       bg-[#1F2025]
                       border border-white/10
                       rounded-2xl
                       h-[145px]
                       px-5
                       py-4
                       flex flex-col
                       justify-center
                       transition-all duration-300
                       hover:border-[#b30d29]"
                >
                  <h3 className="text-4xl font-bold text-white group-hover:text-[#b30d29] transition-colors duration-300">
                    {stat.num}
                  </h3>

                  <p className="text-sm text-gray-300 mt-2 whitespace-pre-line leading-6">
                    {stat.text}
                  </p>
                </div>
              ))}

            </div>

            {/* ================= RIGHT SERVICE CARDS ================= */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">

              {expertiseCards.map((title, index) => (
                <div
                  key={index}
                  className="group
                       border border-white/10
                       rounded-2xl
                       h-[220px]
                       p-6
                       flex flex-col
                       justify-between
                       transition-all duration-300
                       hover:border-white
                       hover:-translate-y-1
                       shadow-lg"
                  style={{
                    background:
                      "url('/assets/images/hero/card-bg.png') center/cover no-repeat",
                  }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {title}
                    </h3>

                    <p className="text-base text-gray-200 leading-7">
                      Developing smart, secure, and future-ready websites.
                    </p>
                  </div>

                  <button
                    className="w-10 h-10 rounded-full border border-white
                         flex items-center justify-center
                         hover:bg-white/20 transition"
                  >
                    →
                  </button>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="p-6 lg:p-10 bg-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto w-full text-[#0f172a]">
          <h2 className="text-black text-2xl lg:text-3xl font-bold mb-4">
            Industries We Serve
          </h2>

          <p className="text-base lg:text-lg text-[#0f172a] leading-relaxed mb-8 max-w-4xl">
            Enhance operational efficiency, minimize costs, and accelerate growth
            with intelligent, custom-built digital solutions powered by our expert
            development teams.
          </p>

          {/* ================= Mobile / Tablet ================= */}
          <div className="flex flex-col gap-6 lg:hidden mt-10 mb-6">
            {industryGroups.map((group, gi) => (
              <div
                key={gi}
                className={`grid gap-6 justify-center justify-items-center ${group.length === 1 ? "grid-cols-1" : "grid-cols-2 max-w-[320px] mx-auto"
                  }`}
              >
                {group.map((item, ii) => (
                  <div
                    key={ii}
                    className="group w-[130px] h-[130px] bg-white rounded-full p-4 flex flex-col items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#B30D29] hover:scale-105 cursor-pointer"
                  >
                    <Image
                      src={item.img}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="group-hover:brightness-0 group-hover:invert"
                      suppressHydrationWarning
                    />

                    <small className="text-center text-xs mt-2 text-[#0f172a] font-medium group-hover:text-white">
                      {item.label}
                    </small>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ================= Desktop Zigzag ================= */}
          <div className="hidden lg:flex justify-between items-start mt-20">

            {industryGroups.map((group, gi) => (
              <div
                key={gi}
                className={`flex flex-col items-center ${group.length === 1 ? "pt-[75px]" : ""
                  }`}
              >
                {group.map((item, ii) => (
                  <div
                    key={ii}
                    className="group w-[130px] h-[130px] bg-white rounded-full p-4 flex flex-col items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#B30D29] hover:scale-105 cursor-pointer mb-6"
                  >
                    <Image
                      src={item.img}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="group-hover:brightness-0 group-hover:invert"
                      suppressHydrationWarning
                    />

                    <small className="text-center text-xs mt-2 text-[#0f172a] font-medium group-hover:text-white">
                      {item.label}
                    </small>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>
      </section>
      {/* ── PORTFOLIO ── */}
      <section className="relative bg-[#0b0b0b] text-white py-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto w-full px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-4xl">
            Showcasing innovation, creativity, and results through impactful digital solutions crafted for real-world success.
          </p>
          <div className="flex flex-wrap -mx-3 relative">

            {/* Portfolio items — scrollable */}
            <div className="w-full lg:w-10/12 px-3">
              <div
                className="scrollbar-hide overflow-y-auto snap-y snap-mandatory lg:pr-4"
                style={{ maxHeight: "480px" }}
              >
                {portfolioItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#212529] rounded-[1rem] p-6 text-white mb-6 snap-start border border-white/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-full h-auto rounded-xl object-contain"
                        />
                      </div>
                      <div className="md:col-span-7">
                        <h3 className="mt-2 md:mt-0 text-2xl lg:text-3xl font-bold py-2">
                          {item.num} <br /> {item.title}
                        </h3>
                        <p className="text-base lg:text-lg text-gray-300 leading-relaxed">{item.text}</p>
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
      <div className="py-8 overflow-hidden">
        <div className="flex gap-12 animate-[slide_12s_linear_infinite]">
          {techLogos.map((n, i) => (
            <div key={i} className="shrink-0">
              <Image
                src={`/assets/images/icon/tech${n}.png`}
                alt={`Tech ${n}`}
                width={120}
                height={80}
                className="object-contain"
                style={{ height: "80px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
      <section className="p-6 lg:p-10 bg-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-4">Testimonials</h2>
          <p className="text-base lg:text-lg text-[#0f172a] leading-relaxed mb-8 max-w-4xl">
            We take pride in building lasting partnerships through quality work, timely delivery, and transparent
            communication. Our client testimonials reflect the trust and satisfaction we strive to achieve in every project.
          </p>
          {testimonialsLoading ? (
            <TestimonialSkeleton count={6} />
          ) : testimonialsError ? (
            <div className="text-red-500 font-semibold p-4 text-center">{testimonialsError}</div>
          ) : (
            <TestimonialSwiper testimonials={dynamicTestimonials} />
          )}
        </div>
      </section>

      {/* ── OUR TEAMS ── */}
      <section className="p-6 lg:p-10 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Teams</h2>
          <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-8 max-w-4xl">
            Showcasing innovation, creativity, and results through impactful digital solutions.
          </p>
          {teamLoading ? (
            <TeamSkeleton count={4} />
          ) : teamError ? (
            <div className="text-red-500 font-semibold p-4 text-center">{teamError}</div>
          ) : (
            <TeamSwiper teamMembers={dynamicTeam} />
          )}
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="p-6 lg:p-10 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-4">Blog</h2>
          <p className="text-base lg:text-base text-[#0f172a] leading-relaxed mb-8 max-w-4xl">
            We take pride in building lasting partnerships through quality work, timely delivery,
            and transparent communication. Our client testimonials reflect the trust and satisfaction
            we strive to achieve in every project.
          </p>
          {blogsLoading ? (
            <BlogSkeleton count={3} />
          ) : blogsError ? (
            <div className="text-red-500 font-semibold p-4 text-center">{blogsError}</div>
          ) : (
            <>
              <div className="flex flex-wrap -mx-3 gap-4">
                {dynamicBlogs.map((item, i) => (
                  <div key={i} className="w-full lg:w-[calc(33.333%-11px)] md:w-[calc(50%-8px)] px-3">
                    <div className="h-full flex flex-col gap-3">
                      <Image
                        src={item.img || "/assets/images/hero/blog-img1.png"}
                        alt="blog"
                        width={400}
                        height={250}
                        className="w-full h-[250px] object-cover rounded mb-1"
                      />
                      <span className="inline-flex items-center px-3 py-1 border border-slate-300 rounded-[24px] text-[#0f172a] w-fit text-sm font-medium">
                        {item.category || "Blog"}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold text-[#0f172a]">{item.title}</h3>
                      <Link href={`/blog/${item.slug}`} className="text-red-600 no-underline text-base font-semibold hover:underline">
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center border border-[#0d6efd] text-[#0d6efd] hover:bg-blue-50 transition duration-200 px-6 py-3 rounded-[8px] no-underline font-semibold text-lg"
                >
                  <span className="text-[#0f172a]">Read More</span>&nbsp;→
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}

      <section className="relative w-full flex items-center bg-[url('/assets/images/hero/bottom.png')] bg-cover bg-center bg-no-repeat py-[90px] overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className="flex flex-wrap">
            <div className="w-full text-white">
              <h2 className="font-bold text-2xl lg:text-3xl leading-tight">
                From Idea to Impact <br />
                We Build What <br />
                Matters
              </h2>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 rounded-[8px] px-6 py-3 text-lg font-semibold no-underline mt-6"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ── CONTACT ── */}
      <section className="contact-section p-6 lg:p-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Contact Us</h2>
              <p className="text-base lg:text-base text-gray-200 mb-6">Connect with our team for expert guidance.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] text-base"
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
                    className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] text-base"
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
                    className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] text-base"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-slate-600 bg-[#111] text-white rounded-[8px] px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] text-base"
                    style={{ height: "120px" }}
                    placeholder="Write your message"
                    required
                  />
                </div>

                {status.message && (
                  <div className={`mb-4 text-base ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white/10 transition duration-200 text-base font-semibold px-6 py-3 rounded-[8px] no-underline cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
            <div>
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
        </div>
      </section>
    </>
  );
}