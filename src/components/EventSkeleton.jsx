"use client";

import React from "react";

export default function EventSkeleton({ count = 5 }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-5 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-[12px] bg-zinc-800"
            style={{ width: "220px", height: "165px" }}
          />
        ))}
      </div>
    </div>
  );
}
