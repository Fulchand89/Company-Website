export const metadata = {
  title: "Mobile App Development Services",
  description: "Gupta Tech Web designs and engineers high-performance iOS, Android, and cross-platform mobile apps customized for your business workflows.",
  alternates: {
    canonical: "https://guptatechweb.com/service/app",
  },
  openGraph: {
    title: "Mobile App Development Services | Gupta Tech Web",
    description: "Gupta Tech Web designs and engineers high-performance iOS, Android, and cross-platform mobile apps customized for your business workflows.",
    url: "https://guptatechweb.com/service/app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development Services | Gupta Tech Web",
    description: "Gupta Tech Web designs and engineers high-performance iOS, Android, and cross-platform mobile apps customized for your business workflows.",
  },
};

export default function ServiceAppLayout({ children }) {
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
        "name": "Mobile App Development",
        "item": "https://guptatechweb.com/service/app"
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
