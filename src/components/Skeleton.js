import React from "react";

/**
 * Core Skeleton component with pulsing animation
 */
export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 dark:bg-zinc-800/80 ${className}`}
      {...props}
    />
  );
}

/**
 * General Card Skeleton
 */
export function CardSkeleton({ count = 3, className = "" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 p-4 space-y-4 ${className}`}
        >
          <Skeleton className="w-full h-48 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Blog Page Card Skeleton
 */
export function BlogSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full lg:w-1/3 px-3 md:w-1/2 mb-8">
          <div className="h-full flex flex-col gap-4 bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 p-4 animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-slate-200 rounded-lg" />
            
            {/* Body */}
            <div className="px-1 flex flex-col flex-grow space-y-3">
              {/* Category and Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <div className="h-5 w-16 bg-slate-200 rounded-full" />
                <div className="h-5 w-12 bg-slate-200 rounded-full" />
              </div>
              
              {/* Title */}
              <div className="h-5 bg-slate-200 rounded w-4/5" />
              
              {/* Excerpt */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 bg-slate-200/80 rounded w-full" />
                <div className="h-3.5 bg-slate-200/80 rounded w-5/6" />
              </div>
              
              {/* Read More link */}
              <div className="pt-3 mt-auto">
                <div className="h-4 bg-slate-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Testimonial Card Skeleton
 */
export function TestimonialSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-full pt-10">
          <div className="relative flex flex-col rounded-[16px] bg-white px-6 pb-5 pt-[66px] shadow-[0_8px_24px_rgba(15,23,42,0.08)] animate-pulse border border-slate-100 h-full">
            {/* Floating circular avatar */}
            <div className="absolute left-[27px] top-[-38px]">
              <div className="rounded-full bg-slate-200 w-[64px] h-[64px] border-4 border-white shadow-sm" />
            </div>
            
            {/* Rating stars placeholder */}
            <div className="absolute right-5 top-6 flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="w-4.5 h-4.5 bg-slate-200 rounded-full" />
              ))}
            </div>
            
            {/* Testimonial body text */}
            <div className="space-y-2 mt-4">
              <div className="h-3.5 bg-slate-200 rounded w-full" />
              <div className="h-3.5 bg-slate-200 rounded w-11/12" />
              <div className="h-3.5 bg-slate-200 rounded w-5/6" />
            </div>
            
            {/* Name and Project details */}
            <div className="mt-auto space-y-2">
              <div className="h-5 bg-slate-200 rounded w-28" />
              <div className="h-4 bg-slate-200/80 rounded w-36" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Careers Page Job Skeleton
 */
export function JobSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-3 flex-grow max-w-xl">
            {/* Icon & Category Pills */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-250 rounded-lg" />
              <div className="h-6 w-20 bg-slate-250 rounded-full" />
              <div className="h-6 w-16 bg-slate-250 rounded-full" />
            </div>
            
            {/* Job Title */}
            <div className="h-6 bg-slate-250 rounded w-3/4" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-250 rounded w-full" />
              <div className="h-4 bg-slate-250 rounded w-5/6" />
            </div>
            
            {/* Details (Location, Experience) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              <div className="h-4 bg-slate-250 rounded w-28" />
              <div className="h-4 bg-slate-250 rounded w-32" />
            </div>
          </div>
          
          {/* Apply Button */}
          <div className="shrink-0 pt-2 md:pt-0 w-full md:w-auto">
            <div className="h-12 bg-slate-250 rounded-xl w-full md:w-32" />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Admin Dashboard Stat Card Skeleton
 */
export function AdminStatCardSkeleton() {
  return (
    <div className="bg-[#161618] border border-gray-800 p-6 rounded-2xl flex items-center justify-between text-white shadow-sm animate-pulse">
      <div className="space-y-3 flex-grow">
        <div className="h-4 bg-zinc-800 rounded w-2/3" />
        <div className="h-8 bg-zinc-800 rounded w-1/3" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
      <div className="p-4 bg-zinc-800/40 rounded-2xl w-14 h-14 shrink-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

/**
 * Admin Dashboard Recent Activity List Skeleton
 */
export function AdminListSkeleton({ count = 3 }) {
  return (
    <div className="divide-y divide-gray-800 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-3.5 flex items-center justify-between">
          <div className="space-y-2 flex-grow pr-4">
            <div className="h-4 bg-zinc-800 rounded w-1/3" />
            <div className="h-3 bg-zinc-800 rounded w-1/2" />
          </div>
          <div className="h-3 bg-zinc-800 rounded w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/**
 * Admin Management Table Row Skeleton
 */
export function TableRowSkeleton({ rows = 5, columns = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-gray-850">
          {Array.from({ length: columns }).map((_, c) => (
            <td key={c} className="px-6 py-4">
              <div 
                className={`h-4 bg-zinc-800 rounded animate-pulse ${
                  c === 0 
                    ? "w-24 font-bold" 
                    : c === columns - 1 
                    ? "w-10 h-6 bg-zinc-800/60 ml-auto rounded-lg" 
                    : "w-32"
                }`} 
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
