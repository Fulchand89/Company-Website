"use client";

import React from "react";

export default function TeamSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="text-center animate-pulse">
          {/* Image placeholder */}
          <div className="w-full h-[280px] bg-zinc-800 rounded mb-3" />
          
          {/* Details wrapper placeholder */}
          <div className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] rounded-[1.5rem] p-3 flex flex-col items-center gap-2">
            <div className="h-4 bg-zinc-700 rounded w-24" />
            <div className="h-3 bg-zinc-800 rounded w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
