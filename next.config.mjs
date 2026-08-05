/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.11"],
  // ── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ── Image optimization ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // Cache optimized images for 1 hour at CDN edge
    dangerouslyAllowSVG: false,
  },

  // ── Tree-shake large packages at build time ───────────────────────────────
  // Tells the compiler to rewrite wildcard imports into named imports so only
  // the icons/components actually used end up in the bundle.
  experimental: {
    optimizePackageImports: ["lucide-react", "swiper"],
  },

  // ── Cache headers for production CDN layer ─────────────────────────────
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        // Versioned static assets Next.js emits (JS chunks, CSS, fonts)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Public images, icons, favicons, fonts
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Favicon
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


