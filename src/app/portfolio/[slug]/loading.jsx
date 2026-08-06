import React from "react";

export default function ProjectLoading() {
  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        {/* Animated Custom Ring Spinner */}
        <div className="relative w-16 h-16">
          {/* Inner static border */}
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800/80" />
          {/* Spinning dynamic accent */}
          <div className="absolute inset-0 rounded-full border-4 border-[#B30D29] border-t-transparent animate-spin" />
        </div>
        
        {/* Loading text with pulse effect */}
        <p className="text-gray-300 text-lg font-semibold animate-pulse mt-2">
          Loading Project Details...
        </p>
      </div>
    </div>
  );
}
