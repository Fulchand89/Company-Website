export const metadata = {
  title: "E-Commerce Digital Solutions",
  description: "Scale your retail business online. Gupta Tech Web builds highly secure, fast, and feature-rich multi-vendor marketplaces and e-commerce software integrations.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/e-commerce",
  },
  openGraph: {
    title: "E-Commerce Digital Solutions | Gupta Tech Web",
    description: "Scale your retail business online. Gupta Tech Web builds highly secure, fast, and feature-rich multi-vendor marketplaces and e-commerce software integrations.",
    url: "https://guptatechweb.com/industry/e-commerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Digital Solutions | Gupta Tech Web",
    description: "Scale your retail business online. Gupta Tech Web builds highly secure, fast, and feature-rich multi-vendor marketplaces and e-commerce software integrations.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Custom Online Store",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Multi-Vendor Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Digital Commerce Solution",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Ordering System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Smart Payment Gateway",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Recommendations",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Inventory Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Logistics & Delivery Tech",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Store Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
];

const faqs = [
  {
    q: "What is your cancellation policy for site management?",
    a: "Our goal is to keep our clients happy and satisfied. If you wish to cancel your monthly plan, simply inform our team and we will assist you with the process.",
  },
  {
    q: "How does Gupta Tech Web handle security and support?",
    a: "We implement strong security protocols, regular updates, malware protection, and continuous technical support to ensure your website remains safe and high-performing.",
  },
  {
    q: "How do you clarify privacy policies and terms?",
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with data protection standards.",
  },
  {
    q: "Can you build a site for reservations and online orders?",
    a: "Absolutely! We build custom eCommerce websites with reservation systems, online ordering, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function EcommercePage() {
  return (
    <IndustryDetailPage
      title="E-Commerce Solutions"
      breadcrumb="E-Commerce Solutions"
      description="We design and develop powerful, scalable eCommerce platforms that drive sales, improve customer experience, and grow your business online. From startups to enterprises — we deliver end-to-end digital commerce solutions tailored to your needs."
      solutionTitle="E-Commerce"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable eCommerce solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven eCommerce websites designed to accelerate your business growth and maximize online success."
      faqs={faqs}
    />
  );
}
