export const metadata = {
  title: "Supply Chain & Logistics Software",
  description: "Gain absolute supply visibility. Gupta Tech Web builds track-and-trace logistics, automated warehouse controllers, and fleet managers.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/supply-chain",
  },
  openGraph: {
    title: "Supply Chain & Logistics Software | Gupta Tech Web",
    description: "Gain absolute supply visibility. Gupta Tech Web builds track-and-trace logistics, automated warehouse controllers, and fleet managers.",
    url: "https://guptatechweb.com/industry/supply-chain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supply Chain & Logistics Software | Gupta Tech Web",
    description: "Gain absolute supply visibility. Gupta Tech Web builds track-and-trace logistics, automated warehouse controllers, and fleet managers.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Supply Chain Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Warehouse Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Logistics & Fleet Tracking",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Inventory Optimization",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Procurement Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Demand Forecasting",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Vendor & Supplier Portal",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Order Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Supply Chain Analytics Dashboard",
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
    a: "We implement strong security protocols, regular updates, malware protection, and continuous technical support to ensure your platform remains safe and high-performing.",
  },
  {
    q: "How do you clarify privacy policies and terms?",
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with data protection standards.",
  },
  {
    q: "Can you build a custom supply chain platform with real-time tracking?",
    a: "Absolutely! We build custom supply chain platforms with real-time shipment tracking, inventory management, vendor portals, and seamless ERP integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function SupplyChainPage() {
  return (
    <IndustryDetailPage
      title="Supply Chain"
      breadcrumb="Supply Chain"
      description="We design and develop robust, scalable supply chain management solutions that optimize logistics, reduce costs, and improve operational efficiency. From warehouse management to AI-powered demand forecasting — we deliver end-to-end supply chain technology tailored to your business."
      solutionTitle="Supply Chain"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable supply chain solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven supply chain platforms designed to accelerate your business growth and maximize operational efficiency."
      faqs={faqs}
    />
  );
}
