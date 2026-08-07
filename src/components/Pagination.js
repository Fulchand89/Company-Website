"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination component
 * Props:
 *   currentPage  – active page number
 *   totalPages   – total number of pages
 *   onPageChange – callback(newPage)
 *   variant      – "dark" (default, admin panel) | "light" (public pages)
 */
export default function Pagination({ currentPage, totalPages, onPageChange, variant = "dark" }) {
  if (totalPages <= 1) return null;

  const isLight = variant === "light";

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // ── style tokens ────────────────────────────────────────────────────────────
  const wrapperBorder = isLight ? "border-gray-200"  : "border-zinc-800/10 dark:border-zinc-850";
  const labelText     = isLight ? "text-gray-500"    : "text-gray-400";
  const labelBold     = isLight ? "text-gray-900"    : "text-white";
  const arrowBase     = isLight
    ? "text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
    : "text-gray-400 hover:bg-zinc-800 hover:text-white border border-transparent";
  const pageInactive  = isLight
    ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    : "text-gray-400 hover:bg-zinc-800 hover:text-white";
  const mobileBtn     = isLight
    ? "border border-gray-300 bg-white text-gray-600 hover:text-gray-900"
    : "border border-gray-700 bg-[#161618] text-gray-400 hover:text-white";

  return (
    <div className={`flex items-center justify-between border-t ${wrapperBorder} px-4 py-4 sm:px-6`}>
      {/* Mobile: Previous / Next only */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-40 transition cursor-pointer ${mobileBtn}`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-40 transition cursor-pointer ${mobileBtn}`}
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-4">
        {/* "Showing page X of Y" label */}
        <div>
          <p className={`text-sm ${labelText}`}>
            Showing page{" "}
            <span className={`font-semibold ${labelBold}`}>{currentPage}</span>{" "}
            of{" "}
            <span className={`font-semibold ${labelBold}`}>{totalPages}</span>{" "}
            pages
          </p>
        </div>

        {/* Page number buttons */}
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-xl gap-1.5" aria-label="Pagination">
            {/* Prev arrow */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-xl p-2 disabled:opacity-30 cursor-pointer transition ${arrowBase}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page numbers */}
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                  p === currentPage
                    ? "bg-red-600 text-white shadow-md shadow-red-900/10"
                    : pageInactive
                }`}
              >
                {p}
              </button>
            ))}

            {/* Next arrow */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-xl p-2 disabled:opacity-30 cursor-pointer transition ${arrowBase}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
