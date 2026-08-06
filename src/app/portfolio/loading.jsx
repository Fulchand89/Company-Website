import React from "react";

export default function PortfolioLoading() {
  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen">
      {/* ── HERO SKELETON ── */}
      <section className="hero-section">
        <div
          className="flex items-center w-full text-white"
          style={{
            background:
              "url('/assets/images/protfolio/protfolio-bg.png') center/cover no-repeat",
            minHeight: "500px",
            padding: "80px 0",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
            <div className="flex flex-wrap items-center">
              {/* Text Column */}
              <div className="w-full lg:w-1/2 mb-4 mt-5 lg:mb-0 text-center lg:text-left animate-pulse">
                <div className="h-12 w-2/3 bg-zinc-800 rounded mx-auto lg:mx-0 mb-4" />
                <div className="h-6 w-1/2 bg-zinc-800 rounded mx-auto lg:mx-0" />
              </div>

              {/* Image Column */}
              <div className="w-full lg:w-1/2 mt-5 text-center lg:text-right animate-pulse">
                <div className="w-full max-w-[500px] h-[350px] bg-zinc-800 rounded inline-block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS + PROJECTS SKELETON ── */}
      <section className="p-5 max-w-7xl mx-auto">
        {/* Pills Skeleton */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch md:items-center gap-3 md:gap-5 mb-8 p-0 m-0 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full md:w-auto">
              <div className="w-full md:w-[150px] h-12 rounded-full bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#212529] rounded-2xl mb-8 overflow-hidden p-4 min-h-[380px] animate-pulse"
            >
              <div className="flex flex-wrap items-center">
                {/* image placeholder */}
                <div className="w-full md:w-1/3 p-3">
                  <div className="w-full h-[200px] rounded bg-zinc-800" />
                </div>
                {/* text placeholders */}
                <div className="w-full md:w-2/3 p-3 space-y-4">
                  <div className="h-6 w-16 bg-zinc-800 rounded" />
                  <div className="h-8 w-2/3 bg-zinc-800 rounded" />
                  <div className="h-4 w-full bg-zinc-800 rounded" />
                  <div className="h-4 w-5/6 bg-zinc-800 rounded" />
                  <div className="h-4 w-4/6 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
