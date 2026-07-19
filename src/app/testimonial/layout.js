export const metadata = {
  title: "Client Testimonials & Reviews",
  description: "Read client reviews, case feedback, and success stories highlighting the impact of Gupta Tech Web's custom IT and digital solutions.",
  alternates: {
    canonical: "https://guptatechweb.com/testimonial",
  },
  openGraph: {
    title: "Client Testimonials & Reviews | Gupta Tech Web",
    description: "Read client reviews, case feedback, and success stories highlighting the impact of Gupta Tech Web's custom IT and digital solutions.",
    url: "https://guptatechweb.com/testimonial",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Reviews | Gupta Tech Web",
    description: "Read client reviews, case feedback, and success stories highlighting the impact of Gupta Tech Web's custom IT and digital solutions.",
  },
};

export default function TestimonialLayout({ children }) {
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
        "name": "Testimonials",
        "item": "https://guptatechweb.com/testimonial"
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
