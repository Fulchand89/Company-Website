import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User, Tag, ChevronRight, ExternalLink, Globe, Layers } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper to fetch portfolio item from MySQL database by Slug or ID
async function getPortfolioItem(idOrSlug) {
    try {
        const item = await portfolioService.getProjectBySlugOrId(idOrSlug);
        if (item) {
            return {
                id: item.id,
                slug: item.slug,
                title: item.title,
                excerpt: item.shortDescription || "",
                content: item.fullDescription || "<p>No description provided for this case study.</p>",
                category: item.category,
                client: item.clientName || "Confidential Client",
                projectUrl: item.projectUrl,
                image: item.image,
                imgAlt: item.imageAlt || item.title,
                author: "Gupta Tech Web",
                publishedAt: item.created_at ? new Date(item.created_at).toISOString() : new Date().toISOString(),
                modifiedAt: item.updated_at ? new Date(item.updated_at).toISOString() : new Date().toISOString(),
                seoTitle: item.seoTitle || `${item.title} | Gupta Tech Web Portfolio`,
                seoDescription: item.seoDescription || item.shortDescription || item.title,
                seoKeywords: item.seoKeywords || item.category,
                robots: item.robots || "index, follow",
                canonicalUrl: item.canonicalUrl,
                tags: [],
                relatedItems: (item.relatedItems || []).map((r) => ({
                    id: r.id,
                    slug: r.slug,
                    title: r.title,
                    category: r.category,
                    img: r.image
                }))
            };
        }
    } catch (err) {
        console.warn("Database error in getPortfolioItem:", err);
    }

    // Not found fallback
    return {
        id: 999,
        slug: "not-found",
        title: `Project Not Found`,
        excerpt: "The requested portfolio project could not be located.",
        content: "<p>The portfolio item you are looking for does not exist or has been removed.</p>",
        category: "Portfolio",
        client: "N/A",
        projectUrl: null,
        image: "/assets/images/protfolio/protfolio1.png",
        imgAlt: "Not found illustration",
        author: "Gupta Tech Web",
        publishedAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        seoTitle: "Project Not Found | Gupta Tech Web",
        seoDescription: "The requested portfolio item could not be located.",
        seoKeywords: "Portfolio, Software Development",
        robots: "noindex, nofollow",
        tags: [],
        relatedItems: []
    };
}

function calculateReadingTime(htmlContent) {
    if (!htmlContent) return 1;
    const cleanText = htmlContent.replace(/<[^>]*>/g, "");
    const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

function generateTableOfContents(htmlContent) {
    if (!htmlContent) return [];
    const matches = [...htmlContent.matchAll(/<(h2|h3)[^>]*>(.*?)<\/\1>/gi)];
    return matches.map((match) => {
        const tag = match[1].toLowerCase();
        const text = match[2].replace(/<[^>]*>/g, "");
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        return { tag, text, id };
    });
}

function injectHeadingIds(htmlContent) {
    if (!htmlContent) return "";
    return htmlContent.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
        const plainText = text.replace(/<[^>]*>/g, "");
        const id = plainText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        if (attrs.includes("id=")) return match;
        return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
    });
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const item = await getPortfolioItem(id);

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
            publishedTime: item.publishedAt,
            modifiedTime: item.modifiedAt,
            authors: [item.author],
            images: [{ url: imageUrl, width: 1200, height: 630, alt: item.imgAlt }],
        },
        twitter: {
            card: "summary_large_image",
            title: item.seoTitle,
            description: item.seoDescription,
            images: [imageUrl],
        },
    };
}

export default async function PortfolioDetailPage({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const item = await getPortfolioItem(id);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
    const portfolioUrl = `${baseUrl}/portfolio/${item.slug || item.id}`;
    const imageUrl = item.image.startsWith("http") ? item.image : `${baseUrl}${item.image}`;

    const readingTime = calculateReadingTime(item.content);
    const toc = generateTableOfContents(item.content);
    const contentWithHeadingIds = injectHeadingIds(item.content);

    // Creative Work Schema
    const creativeWorkSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "mainEntityOfPage": { "@type": "WebPage", "@id": portfolioUrl },
        "headline": item.title,
        "description": item.seoDescription || item.excerpt,
        "image": [imageUrl],
        "dateCreated": item.publishedAt,
        "dateModified": item.modifiedAt,
        "author": { "@type": "Organization", "name": item.author },
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

    const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-slate-300">
                {/* Breadcrumb Navigation */}
                <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs md:text-sm text-slate-400 gap-1.5 flex-wrap">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-slate-600" />
                    <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                    <ChevronRight size={14} className="text-slate-600" />
                    <span className="text-white font-medium line-clamp-1 max-w-[200px] md:max-w-none" aria-current="page">
                        {item.title}
                    </span>
                </nav>

                {/* Header Section */}
                <header className="mb-8 md:mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-[#dc3545] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                            {item.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                        {item.title}
                    </h1>

                    {/* Project Details Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-slate-950 border border-slate-800 rounded-xl mb-6 text-sm text-slate-400">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                <User size={14} className="text-[#dc3545]" /> Client
                            </span>
                            <span className="text-white font-medium">{item.client}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                <Calendar size={14} className="text-[#dc3545]" /> Date
                            </span>
                            <span className="text-white font-medium">{formattedDate}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                <Clock size={14} className="text-[#dc3545]" /> Read Time
                            </span>
                            <span className="text-white font-medium">{readingTime} min read</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                <Globe size={14} className="text-[#dc3545]" /> Live Link
                            </span>
                            {item.projectUrl ? (
                                <a
                                    href={item.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#dc3545] hover:underline font-medium inline-flex items-center gap-1"
                                >
                                    Visit Project <ExternalLink size={12} />
                                </a>
                            ) : (
                                <span className="text-slate-500 font-medium">Internal / Private</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Project Showcase Feature Image */}
                {item.image && (
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-10 border border-slate-800 shadow-xl">
                        <Image
                            src={item.image}
                            alt={item.imgAlt}
                            fill
                            priority={true}
                            sizes="(max-width: 768px) 100vw, 1152px"
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}

                {/* Main Content & TOC Grid Layout */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Main Case Study Article */}
                    <article className="w-full lg:w-3/4 order-2 lg:order-1 prose prose-invert max-w-none">
                        {/* Mobile TOC */}
                        {toc.length > 0 && (
                            <div className="lg:hidden p-5 bg-slate-950 border border-slate-800 rounded-xl mb-8">
                                <h5 className="font-semibold text-white text-base mb-3 flex items-center gap-2">
                                    Case Study Sections
                                </h5>
                                <ul className="space-y-2 text-sm text-slate-400 list-none p-0">
                                    {toc.map((item, idx) => (
                                        <li key={idx} className={item.tag === 'h3' ? 'pl-4' : ''}>
                                            <a href={`#${item.id}`} className="hover:text-red-400 transition-colors flex items-center gap-1.5 no-underline">
                                                <span className="text-[#dc3545] text-xs">■</span>
                                                <span>{item.text}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div
                            className="portfolio-rich-content leading-relaxed text-slate-300 space-y-6"
                            dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
                        />
                    </article>

                    {/* Desktop Table of Contents */}
                    {toc.length > 0 && (
                        <aside className="hidden lg:block lg:w-1/4 order-1 lg:order-2 sticky top-24 bg-slate-950 border border-slate-900 rounded-xl p-5 w-full">
                            <h5 className="font-semibold text-white text-base mb-4 pb-2 border-b border-slate-900 flex items-center gap-2">
                                <Layers size={16} className="text-[#dc3545]" /> Overview
                            </h5>
                            <nav aria-label="Table of contents" className="toc-navigation">
                                <ul className="space-y-3 text-sm text-slate-400 list-none p-0 m-0">
                                    {toc.map((item, idx) => (
                                        <li key={idx} className={`p-0 m-0 ${item.tag === 'h3' ? 'pl-4' : ''}`}>
                                            <a
                                                href={`#${item.id}`}
                                                className="hover:text-red-400 transition-colors block py-0.5 no-underline leading-normal truncate"
                                                title={item.text}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>
                    )}
                </div>

                {/* Related Projects Section */}
                {item.relatedItems && item.relatedItems.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-slate-900">
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-6">
                            Related Case Studies
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {item.relatedItems.map((related) => (
                                <article key={related.id} className="bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full group transition-all">
                                    {related.img && (
                                        <div className="relative w-full h-[160px]">
                                            <Image
                                                src={related.img}
                                                alt={related.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 350px"
                                                loading="lazy"
                                                className="object-cover group-hover:scale-102 transition-transform duration-300"
                                                unoptimized
                                            />
                                        </div>
                                    )}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <span className="text-[10px] font-bold text-[#dc3545] uppercase tracking-wider block mb-1.5">
                                            {related.category}
                                        </span>
                                        <h6 className="font-semibold text-white text-sm md:text-base leading-snug line-clamp-2 mb-3 group-hover:text-red-400 transition-colors">
                                            {related.title}
                                        </h6>
                                        <div className="mt-auto pt-2">
                                            <Link
                                                href={`/portfolio/${related.slug || related.id}`}
                                                className="text-[#dc3545] text-xs font-semibold no-underline hover:underline inline-flex items-center gap-1"
                                            >
                                                View Project <ChevronRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}