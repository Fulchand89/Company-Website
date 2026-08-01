import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, Hexagon, Layers, Globe, Clock, User, ArrowUpRight } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper to fetch portfolio item from MySQL database by Slug or ID
async function getPortfolioItem(slugOrId) {
  try {
    const item = await portfolioService.getProjectBySlugOrId(slugOrId);
    if (item) {
      return item;
    }
  } catch (err) {
    console.warn("Database error in getPortfolioItem:", err);
  }

  // Not found fallback
  return {
    id: 999,
    slug: "not-found",
    title: "Project Not Found",
    shortDescription: "The requested portfolio project could not be located.",
    fullDescription: "The portfolio item you are looking for does not exist or has been removed.",
    category: "Portfolio",
    clientName: "N/A",
    clientLocation: "N/A",
    industry: "N/A",
    developmentTime: "N/A",
    targetAudience: "N/A",
    image: "/assets/images/protfolio/protfolio1.png",
    heroImage: "/assets/images/hero/mind-reset.png",
    deliverables: [],
    technologies: [],
    gallery: [],
    projectUrl: null,
    seoTitle: "Project Not Found | Gupta Tech Web",
    seoDescription: "The requested portfolio item could not be located.",
    seoKeywords: "Portfolio, Software Development",
    robots: "noindex, nofollow",
    relatedItems: []
  };
}

// Icon mapper for tech badges
const techIconMap = {
  html5: "/assets/images/icon/tech1.png",
  css3: "/assets/images/icon/tech2.png",
  figma: "/assets/images/icon/tech3.png",
  laravel: "/assets/images/icon/tech4.png",
  swift: "/assets/images/icon/tech5.png",
  flutter: "/assets/images/icon/tech6.png",
  seo: "/assets/images/icon/tech7.png",
  wordpress: "/assets/images/icon/tech8.png",
  python: "/assets/images/icon/tech1.png",
  nextjs: "/assets/images/icon/tech2.png"
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const item = await getPortfolioItem(slug);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
  const canonicalUrl = item.canonicalUrl || `${baseUrl}/portfolio/${item.slug || item.id}`;
  const imageUrl = item.image.startsWith("http") ? item.image : `${baseUrl}${item.image}`;

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.seoKeywords,
    alternates: { canonical: canonicalUrl },
    robots: item.robots,
    openGraph: {
      title: item.seoTitle,
      description: item.seoDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "Gupta Tech Web",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.seoTitle,
      description: item.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const item = await getPortfolioItem(slug);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
  const portfolioUrl = `${baseUrl}/portfolio/${item.slug || item.id}`;
  const imageUrl = item.image?.startsWith("http") ? item.image : `${baseUrl}${item.image}`;

  // Structured Data Schema
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "mainEntityOfPage": { "@type": "WebPage", "@id": portfolioUrl },
    "headline": item.title,
    "description": item.seoDescription || item.shortDescription,
    "image": [imageUrl],
    "author": { "@type": "Organization", "name": "Gupta Tech Web" },
    "provider": { "@type": "Organization", "name": "Gupta Tech Web" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${baseUrl}/portfolio` },
      { "@type": "ListItem", "position": 3, "name": item.title, "item": portfolioUrl }
    ]
  };

  // Extract highlight title parts
  const titleWords = item.title ? item.title.split(" ") : ["Case", "Study"];
  const titleMain = titleWords.join(" ");

  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen selection:bg-red-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs md:text-sm text-gray-400 gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-600" />
          <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-red-500 font-medium truncate max-w-[200px] md:max-w-none" aria-current="page">
            {item.title}
          </span>
        </nav>
      </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-8 pb-16 md:py-20 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Hexagon size={14} className="text-amber-400 fill-amber-400/20" />
                <span>CASE STUDY</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-400 tracking-tight leading-[1.1]">
                {item.title}
              </h1>

              {/* Short Description */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
                {item.shortDescription || item.fullDescription}
              </p>

              {/* Optional Live Demo Link Button */}
              {item.projectUrl && (
                <div className="pt-2">
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#B30D29] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition shadow-lg shadow-red-900/30"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Laptop Showcase */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px] group">
                {/* Laptop Mockup Wrapper */}
                <div className="relative bg-zinc-950 p-2 md:p-4 rounded-3xl border border-zinc-800/80 shadow-2xl shadow-red-950/20">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black border border-zinc-900">
                    <Image
                      src={item.heroImage || item.image}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  {/* Laptop Base Stand Graphic */}
                  <div className="h-3 w-1/3 mx-auto bg-zinc-800 rounded-b-xl border-t border-zinc-700 mt-1" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. PROJECT OVERVIEW STATS GRID ── */}
      <section className="py-12 border-t border-zinc-900/80 bg-[#0E0E11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Project <span className="text-[#B30D29]">Overview</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1: Client Location */}
            <div className="bg-[#16161A] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-red-900/40 transition">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Client Location
              </span>
              <p className="text-xl font-bold text-white mt-4 line-clamp-2">
                {item.clientLocation}
              </p>
            </div>

            {/* Stat 2: Industry */}
            <div className="bg-[#16161A] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-red-900/40 transition">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Industry
              </span>
              <p className="text-xl font-bold text-white mt-4 line-clamp-2">
                {item.industry}
              </p>
            </div>

            {/* Stat 3: Development Time */}
            <div className="bg-[#16161A] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-red-900/40 transition">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Development Time
              </span>
              <p className="text-xl font-bold text-white mt-4 line-clamp-2">
                {item.developmentTime}
              </p>
            </div>

            {/* Stat 4: Target Audience */}
            <div className="bg-[#16161A] border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-red-900/40 transition">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Target Audience
              </span>
              <p className="text-sm font-medium text-gray-300 mt-4 line-clamp-3 leading-relaxed">
                {item.targetAudience}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE DELIVERED SECTION ── */}
      {item.deliverables && item.deliverables.length > 0 && (
        <section className="py-16 md:py-24 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <span className="text-sm font-semibold text-[#B30D29] uppercase tracking-wider block mb-1">
                Our Work
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight">
                What we <span className="text-[#B30D29]">Delivered</span>
              </h2>
            </div>

            <div className="space-y-16">
              {item.deliverables.map((deliv, idx) => (
                <div key={deliv.id || idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Step Info */}
                  <div className="lg:col-span-5 flex gap-4 items-start">
                    {/* Number Indicator & Vertical Dashed Line */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-xl font-bold text-[#B30D29]">
                        {deliv.number || String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#B30D29] my-2" />
                      {idx < item.deliverables.length - 1 && (
                        <div className="w-[2px] flex-1 border-l-2 border-dashed border-[#B30D29]/40 my-2 min-h-[80px]" />
                      )}
                    </div>

                    {/* Step Title & Text */}
                    <div className="space-y-3 pt-0.5">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {deliv.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {deliv.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Screen Preview Card */}
                  <div className="lg:col-span-7">
                    <div className="bg-[#121214] p-4 md:p-6 rounded-3xl border border-gray-800 shadow-xl">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black">
                        <Image
                          src={deliv.image || item.image}
                          alt={deliv.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. TECHNOLOGY USED ── */}
      <section className="py-16 md:py-24 bg-[#0A0A0C] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Technology <span className="text-[#B30D29]">Used</span>
            </h2>
            <p className="text-gray-400 text-base mt-3 leading-relaxed">
              The platform is built on a scalable and secure technology stack that ensures seamless performance and reliable data protection. Advanced architecture and optimized frameworks enable smooth interactions, fast load times, and a frictionless user experience.
            </p>
          </div>

          {/* Tech Badges Grid */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {item.technologies.map((tech, i) => (
                <div
                  key={i}
                  className="bg-[#141417] border border-zinc-800/80 hover:border-red-600/50 p-4 rounded-2xl flex items-center gap-3 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 text-[#B30D29] font-bold text-sm">
                    {tech.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. GALLERY SECTION ── */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="py-16 bg-[#0E0E11] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Project <span className="text-[#B30D29]">Gallery</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.gallery.map((gImg, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-lg group">
                  <Image
                    src={gImg}
                    alt={`${item.title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. RELATED PROJECTS ── */}
      {item.relatedItems && item.relatedItems.length > 0 && (
        <section className="py-16 md:py-24 bg-[#0A0A0C] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Related <span className="text-[#B30D29]">Case Studies</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {item.relatedItems.map((rel) => (
                <article key={rel.id} className="bg-[#141417] border border-zinc-800/80 hover:border-red-600/50 rounded-2xl overflow-hidden group transition flex flex-col h-full">
                  {rel.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-[#B30D29] uppercase tracking-wider block mb-2">
                      {rel.category}
                    </span>
                    <h3 className="font-bold text-white text-xl leading-snug mb-4 group-hover:text-red-400 transition">
                      {rel.title}
                    </h3>
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/portfolio/${rel.slug || rel.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-400 no-underline"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
