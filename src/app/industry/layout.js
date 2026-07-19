export const metadata = {
  title: "Industries We Serve",
  description: "Gupta Tech Web delivers specialized software, web engineering, and custom solutions for Retail, Healthcare, E-Commerce, Fintech, and more.",
  alternates: {
    canonical: "https://guptatechweb.com/industry",
  },
  openGraph: {
    title: "Industries We Serve | Gupta Tech Web",
    description: "Gupta Tech Web delivers specialized software, web engineering, and custom solutions for Retail, Healthcare, E-Commerce, Fintech, and more.",
    url: "https://guptatechweb.com/industry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Gupta Tech Web",
    description: "Gupta Tech Web delivers specialized software, web engineering, and custom solutions for Retail, Healthcare, E-Commerce, Fintech, and more.",
  },
};

export default function IndustryLayout({ children }) {
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
        "name": "Industries",
        "item": "https://guptatechweb.com/industry"
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
