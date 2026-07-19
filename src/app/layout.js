import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com"),
  title: {
    default: "Gupta Tech Web | Digital Solutions & IT Services",
    template: "%s | Gupta Tech Web",
  },
  description: "Empowering businesses with innovative and next-gen IT Solutions. Gupta Tech Web delivers web development, mobile apps, UI/UX design, and custom software services.",
  keywords: ["Gupta Tech Web", "Software Development Indore", "Web Development Company", "Mobile App Development", "UI/UX Design", "Digital Marketing"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gupta Tech Web | Digital Solutions & IT Services",
    description: "Empowering businesses with innovative and next-gen IT Solutions. Gupta Tech Web delivers web development, mobile apps, UI/UX design, and custom software services.",
    url: "https://guptatechweb.com",
    siteName: "Gupta Tech Web",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Gupta Tech Web Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gupta Tech Web | Digital Solutions & IT Services",
    description: "Empowering businesses with innovative and next-gen IT Solutions. Gupta Tech Web delivers web development, mobile apps, UI/UX design, and custom software services.",
    images: ["/assets/images/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://guptatechweb.com/#organization",
    "name": "Gupta Tech Web",
    "url": "https://guptatechweb.com",
    "logo": "https://guptatechweb.com/favicon.ico",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 7400554294",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://facebook.com/guptatechweb",
      "https://twitter.com/guptatechweb",
      "https://linkedin.com/company/guptatechweb"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://guptatechweb.com/#website",
    "name": "Gupta Tech Web",
    "url": "https://guptatechweb.com",
    "description": "Empowering businesses with innovative and next-gen IT Solutions.",
    "publisher": {
      "@id": "https://guptatechweb.com/#organization"
    }
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

