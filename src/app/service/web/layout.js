export const metadata = {
  title: "Website Development Services",
  description: "Gupta Tech Web builds fast, responsive, and SEO-optimized websites using modern technologies like React, Next.js, Laravel, WordPress, and more.",
  alternates: {
    canonical: "https://guptatechweb.com/service/web",
  },
  openGraph: {
    title: "Website Development Services | Gupta Tech Web",
    description: "Gupta Tech Web builds fast, responsive, and SEO-optimized websites using modern technologies like React, Next.js, Laravel, WordPress, and more.",
    url: "https://guptatechweb.com/service/web",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services | Gupta Tech Web",
    description: "Gupta Tech Web builds fast, responsive, and SEO-optimized websites using modern technologies like React, Next.js, Laravel, WordPress, and more.",
  },
};

export default function ServiceWebLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://guptatechweb.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://guptatechweb.com/service"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Website Development",
        "item": "https://guptatechweb.com/service/web"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
