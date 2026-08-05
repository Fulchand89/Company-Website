"use client";

import React from "react";

export default function BlogSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-wrap -mx-3 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full lg:w-[calc(33.333%-11px)] md:w-[calc(50%-8px)] px-3">
          <div className="h-full flex flex-col gap-3 animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-[250px] bg-slate-200 rounded mb-1" />
            
            {/* Category tag placeholder */}
            <div className="w-20 h-7 bg-slate-200 rounded-[24px]" />
            
            {/* Title placeholder */}
            <div className="space-y-2">
              <div className="h-6 bg-slate-200 rounded w-full" />
              <div className="h-6 bg-slate-200 rounded w-4/5" />
            </div>
            
            {/* Read More link placeholder */}
            <div className="w-24 h-5 bg-slate-200 rounded mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
