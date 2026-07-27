import React from "react";

/**
 * Reusable skeleton cards matching the Blog Page card layouts.
 */
export function BlogCardSkeleton() {
  return (
    <div className="h-full flex flex-col gap-4 bg-white rounded-xl overflow-hidden shadow-sm animate-pulse border border-slate-100">
      {/* Cover Image Placeholder */}
      <div className="w-full aspect-[16/10] bg-slate-200" />
      
      {/* Content Area */}
      <div className="px-5 pb-5 flex flex-col flex-grow gap-3">
        {/* Category & Tags Placeholder */}
        <div className="flex flex-wrap gap-2.5 items-center mt-1">
          <div className="h-5 w-16 bg-slate-200 rounded-full" />
          <div className="h-5 w-12 bg-slate-200 rounded-full" />
          <div className="h-5 w-14 bg-slate-200 rounded-full" />
        </div>
        
        {/* Title Placeholder */}
        <div className="space-y-2 mt-1">
          <div className="h-5 bg-slate-200 rounded w-full" />
          <div className="h-5 bg-slate-200 rounded w-4/5" />
        </div>
        
        {/* Excerpt Placeholder */}
        <div className="space-y-1.5 mt-2">
          <div className="h-3.5 bg-slate-200/80 rounded w-full" />
          <div className="h-3.5 bg-slate-200/80 rounded w-11/12" />
          <div className="h-3.5 bg-slate-200/80 rounded w-5/6" />
        </div>
        
        {/* Read More Button Placeholder */}
        <div className="mt-auto pt-4 border-t border-slate-50">
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable testimonial card matching the Testimonials page design.
 */
export function TestimonialCardSkeleton() {
  return (
    <div className="relative flex h-[296px] flex-col rounded-[16px] bg-white px-6 pb-5 pt-[66px] shadow-[0_8px_24px_rgba(15,23,42,0.08)] animate-pulse border border-slate-100">
      {/* Floating circular avatar */}
      <div className="absolute left-[27px] top-[-38px]">
        <div className="rounded-full bg-slate-200 w-[64px] h-[64px] border-4 border-white shadow-sm" />
      </div>
      
      {/* Rating stars placeholder */}
      <div className="absolute right-5 top-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4.5 h-4.5 bg-slate-200 rounded-full" />
        ))}
      </div>
      
      {/* Testimonial body text */}
      <div className="space-y-2 mt-4">
        <div className="h-3.5 bg-slate-200 rounded w-full" />
        <div className="h-3.5 bg-slate-200 rounded w-11/12" />
        <div className="h-3.5 bg-slate-200 rounded w-5/6" />
        <div className="h-3.5 bg-slate-200 rounded w-2/3" />
      </div>
      
      {/* Name and Project details */}
      <div className="mt-auto space-y-2.5">
        <div className="h-5 bg-slate-200 rounded w-28" />
        <div className="h-4 bg-slate-200/80 rounded w-36" />
      </div>
    </div>
  );
}

/**
 * Reusable job list item matching the Careers page listings.
 */
export function JobCardSkeleton() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-3 flex-grow max-w-xl">
        {/* Icon & Category Pills */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-200 rounded-lg" />
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
        </div>
        
        {/* Job Title */}
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
        
        {/* Details (Location, Experience) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
          <div className="h-4 bg-slate-200 rounded w-28" />
          <div className="h-4 bg-slate-200 rounded w-32" />
        </div>
      </div>
      
      {/* Apply Button */}
      <div className="shrink-0 pt-2 md:pt-0 w-full md:w-auto">
        <div className="h-12 bg-slate-200 rounded-xl w-full md:w-32" />
      </div>
    </div>
  );
}

/**
 * Reusable stat cards matching the Admin Dashboard statistics.
 */
export function AdminStatCardSkeleton() {
  return (
    <div className="bg-[#161618] border border-gray-800 p-6 rounded-2xl flex items-center justify-between text-white shadow-sm animate-pulse">
      <div className="space-y-3 flex-grow">
        <div className="h-4 bg-zinc-850 rounded w-2/3" />
        <div className="h-8 bg-zinc-850 rounded w-1/3" />
        <div className="h-3 bg-zinc-850 rounded w-1/2" />
      </div>
      <div className="p-4 bg-zinc-800/40 rounded-2xl w-14 h-14 shrink-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-zinc-850 rounded" />
      </div>
    </div>
  );
}

/**
 * Reusable listings rows for recent items on Admin Dashboard.
 */
export function AdminListSkeleton({ count = 3 }) {
  return (
    <div className="divide-y divide-gray-800 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="py-3.5 flex items-center justify-between">
          <div className="space-y-2 flex-grow pr-4">
            <div className="h-4 bg-zinc-850 rounded w-1/3" />
            <div className="h-3 bg-zinc-850 rounded w-1/2" />
          </div>
          <div className="h-3 bg-zinc-850 rounded w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/**
 * Reusable table skeleton loader matching the Admin tabular layouts.
 */
export function AdminTableSkeleton({ headers = [], rows = 5 }) {
  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400 text-sm">
            {headers.map((header, index) => (
              <th key={index} className={`pb-3 font-semibold ${index === headers.length - 1 ? "text-right" : ""}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50 text-sm">
          {[...Array(rows)].map((_, r) => (
            <tr key={r}>
              {headers.map((_, c) => (
                <td key={c} className="py-4 px-2">
                  <div
                    className={`h-4 bg-zinc-850 rounded ${
                      c === 0 
                        ? "w-24 font-bold" 
                        : c === headers.length - 1 
                        ? "w-10 h-6 bg-zinc-850/60 ml-auto rounded-lg" 
                        : "w-32"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
