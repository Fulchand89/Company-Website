"use client";

import React from "react";

export default function TestimonialSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 pt-14">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative w-full max-w-[393px] h-full flex flex-col rounded-[16px] bg-white px-[25px] pb-[22px] pt-[72px] shadow-[0_8px_24px_rgba(15,23,42,0.04)] animate-pulse border border-slate-100/50"
        >
          {/* Floating avatar placeholder */}
          <div className="absolute" style={{ top: "-45px", left: "30px" }}>
            <div className="rounded-full bg-slate-200 w-[75px] h-[75px] border-4 border-white shadow-sm" />
          </div>
          
          {/* Stars placeholder */}
          <div className="absolute right-[20px] top-[20px] flex gap-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <span key={s} className="w-5 h-5 bg-slate-200 rounded-full" />
            ))}
          </div>

          {/* Body text placeholder */}
          <div className="space-y-2 mb-[30px]">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-11/12" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>

          <div className="mt-auto space-y-2">
            {/* Name placeholder */}
            <div className="h-6 bg-slate-200 rounded w-32" />
            {/* Project details placeholder */}
            <div className="h-4 bg-slate-200 rounded w-48" />
          </div>
        </div>
      ))}
    </div>
  );
}
