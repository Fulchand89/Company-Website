export const metadata = {
  title: "About Us",
  description: "Learn more about Gupta Tech Web, our mission, values, and how we deliver next-gen digital solutions and custom software to clients worldwide.",
  alternates: {
    canonical: "https://guptatechweb.com/about",
  },
  openGraph: {
    title: "About Us | Gupta Tech Web",
    description: "Learn more about Gupta Tech Web, our mission, values, and how we deliver next-gen digital solutions and custom software to clients worldwide.",
    url: "https://guptatechweb.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Gupta Tech Web",
    description: "Learn more about Gupta Tech Web, our mission, values, and how we deliver next-gen digital solutions and custom software to clients worldwide.",
  },
};

export default function AboutLayout({ children }) {
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
        "name": "About",
        "item": "https://guptatechweb.com/about"
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
