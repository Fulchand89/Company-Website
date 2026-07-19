export const metadata = {
  title: "Insights Blog",
  description: "Read the latest news, technological insights, developer tips, design guides, and business operations articles from the Gupta Tech Web team.",
  alternates: {
    canonical: "https://guptatechweb.com/blog",
  },
  openGraph: {
    title: "Insights Blog | Gupta Tech Web",
    description: "Read the latest news, technological insights, developer tips, design guides, and business operations articles from the Gupta Tech Web team.",
    url: "https://guptatechweb.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights Blog | Gupta Tech Web",
    description: "Read the latest news, technological insights, developer tips, design guides, and business operations articles from the Gupta Tech Web team.",
  },
};

export default function BlogLayout({ children }) {
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
        "name": "Blog",
        "item": "https://guptatechweb.com/blog"
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
