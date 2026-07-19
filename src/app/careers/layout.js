export const metadata = {
  title: "Careers & Job Opportunities",
  description: "Join the team at Gupta Tech Web. Explore our open positions, internship programs, and discover our workplace culture and career pathways.",
  alternates: {
    canonical: "https://guptatechweb.com/careers",
  },
  openGraph: {
    title: "Careers & Job Opportunities | Gupta Tech Web",
    description: "Join the team at Gupta Tech Web. Explore our open positions, internship programs, and discover our workplace culture and career pathways.",
    url: "https://guptatechweb.com/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Job Opportunities | Gupta Tech Web",
    description: "Join the team at Gupta Tech Web. Explore our open positions, internship programs, and discover our workplace culture and career pathways.",
  },
};

export default function CareersLayout({ children }) {
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
        "name": "Careers",
        "item": "https://guptatechweb.com/careers"
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
