export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Gupta Tech Web. Reach out to our technical, support, and sales teams for consultation, queries, and project inquiries.",
  alternates: {
    canonical: "https://guptatechweb.com/contact",
  },
  openGraph: {
    title: "Contact Us | Gupta Tech Web",
    description: "Get in touch with Gupta Tech Web. Reach out to our technical, support, and sales teams for consultation, queries, and project inquiries.",
    url: "https://guptatechweb.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Gupta Tech Web",
    description: "Get in touch with Gupta Tech Web. Reach out to our technical, support, and sales teams for consultation, queries, and project inquiries.",
  },
};

export default function ContactLayout({ children }) {
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
        "name": "Contact",
        "item": "https://guptatechweb.com/contact"
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
