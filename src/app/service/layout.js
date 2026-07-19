export const metadata = {
  title: "Services & Capabilities",
  description: "Discover the range of services offered by Gupta Tech Web, including custom software engineering, full-stack web development, and digital marketing.",
  alternates: {
    canonical: "https://guptatechweb.com/service",
  },
  openGraph: {
    title: "Services & Capabilities | Gupta Tech Web",
    description: "Discover the range of services offered by Gupta Tech Web, including custom software engineering, full-stack web development, and digital marketing.",
    url: "https://guptatechweb.com/service",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Capabilities | Gupta Tech Web",
    description: "Discover the range of services offered by Gupta Tech Web, including custom software engineering, full-stack web development, and digital marketing.",
  },
};

export default function ServiceLayout({ children }) {
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
