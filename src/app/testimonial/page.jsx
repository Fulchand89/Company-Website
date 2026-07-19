"use client";

import Image from "next/image";
import Link from "next/link";

// ─── Testimonial Data ─────────────────────────────────────────────────────────

const testimonials = [
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
  {
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
  },
];

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ img, name, project, text }) {
  return (
    <div className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] mt-14 mb-5">
      {/* extra top margin on the wrapper to make space for the floating avatar */}
      <div
        className="relative border border-gray-200 rounded-[1rem] p-4 bg-white min-h-[380px]"
        style={{ maxWidth: "600px" }}
      >
        {/* Floating avatar */}
        <div className="absolute" style={{ top: "-45px", left: "30px" }}>
          <Image
            src={img}
            alt={name}
            width={75}
            height={75}
            className="rounded-full object-cover"
            style={{ width: "75px", height: "75px" }}
          />
        </div>

        {/* Stars */}
        <div className="text-right text-yellow-400 text-3xl absolute" style={{ top: "5px", right: "15px" }}>
          ★★★★★
        </div>

        {/* Body text — my-5 gives top gap so text clears the avatar */}
        <p className="text-gray-500 my-5 text-lg leading-8">{text}</p>

        {/* Name + project */}
        <h5 className="font-bold mb-1 text-[#0f172a]">{name}</h5>
        <p className="mb-0 text-sm">
          <span className="text-gray-500">Project : </span>
          <span className="text-red-600 font-semibold">{project}</span>
        </p>
      </div>
    </div >
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div

          className="hero-content w-full text-white py-15"
          style={{
            background:
              "url('/assets/images/testnomail/testnomial-bg.png') center/cover no-repeat",
          }}
        >
          <div className="text-center text-white" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
            <h1 className="font-bold text-4xl md:text-5xl">Testnomials</h1>
            <p className="text-2xl mt-2">Partnerships Built on Performance and Reliability</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL CARDS ── */}
      <section className="bg-white rounded-[2rem] p-5">
        {/* flex-wrap row; extra pt so avatars don't clip at top of section */}
        <div className="flex flex-wrap gap-4 pt-14">
          {testimonials.map((item, i) => (
            <TestimonialCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="relative text-white p-5 m-4 rounded-[1rem] overflow-hidden"
        style={{
          background:
            "url('/assets/images/testnomail/testnomial-bottom.png') center/cover no-repeat",
        }}
      >
        <div className="flex flex-wrap items-center">
          {/* Left Text */}
          <div className="w-full md:w-2/3">
            <h3 className="font-bold text-2xl">Want to know about us</h3>
            <p className="mt-1">
              Get to know the team shaping innovative technology solutions.
            </p>
          </div>

          {/* Right Button */}
          <div className="w-full md:w-1/3 md:text-right text-left mt-3 md:mt-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors duration-200 px-5 py-2 rounded-[0.5rem] no-underline"
            >
              <span>Contact Us</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
