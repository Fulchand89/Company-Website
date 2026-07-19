export const metadata = {
  title: "Our Work & Project Portfolio",
  description: "Explore the digital solutions, mobile apps, enterprise web portals, and custom software systems designed and developed by Gupta Tech Web.",
  alternates: {
    canonical: "https://guptatechweb.com/portfolio",
  },
  openGraph: {
    title: "Our Work & Project Portfolio | Gupta Tech Web",
    description: "Explore the digital solutions, mobile apps, enterprise web portals, and custom software systems designed and developed by Gupta Tech Web.",
    url: "https://guptatechweb.com/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Project Portfolio | Gupta Tech Web",
    description: "Explore the digital solutions, mobile apps, enterprise web portals, and custom software systems designed and developed by Gupta Tech Web.",
  },
};

export default function PortfolioLayout({ children }) {
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
        "name": "Portfolio",
        "item": "https://guptatechweb.com/portfolio"
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
