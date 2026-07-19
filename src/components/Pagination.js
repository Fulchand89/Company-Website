"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-zinc-800/10 dark:border-zinc-850 px-4 py-4 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-xl border border-gray-700 bg-[#161618] px-4 py-2 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-40 transition cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-xl border border-gray-700 bg-[#161618] px-4 py-2 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-40 transition cursor-pointer"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">
            Showing page <span className="font-semibold text-white">{currentPage}</span> of{" "}
            <span className="font-semibold text-white">{totalPages}</span> pages
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-xl gap-1.5" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl p-2 text-gray-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30 cursor-pointer transition border border-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                  p === currentPage
                    ? "bg-red-600 text-white shadow-md shadow-red-900/10"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl p-2 text-gray-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30 cursor-pointer transition border border-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
