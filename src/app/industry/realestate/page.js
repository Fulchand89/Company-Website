export const metadata = {
  title: "Real Estate Property Management Software",
  description: "Modern solutions for property lists, agent databases, CRM managers, and interactive search portals for real estate agencies.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/realestate",
  },
  openGraph: {
    title: "Real Estate Property Management Software | Gupta Tech Web",
    description: "Modern solutions for property lists, agent databases, CRM managers, and interactive search portals for real estate agencies.",
    url: "https://guptatechweb.com/industry/realestate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Property Management Software | Gupta Tech Web",
    description: "Modern solutions for property lists, agent databases, CRM managers, and interactive search portals for real estate agencies.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Property Listing Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Real Estate CRM System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Virtual Property Tours",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Booking & Scheduling",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Smart Property Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Price Estimation",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Mortgage & Loan Calculator",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Real Estate Analytics Dashboard",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Agent & Broker Portal",
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
    q: "Can you build a property listing site with booking and virtual tours?",
    a: "Absolutely! We build custom real estate platforms with property listings, virtual tours, booking systems, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function RealEstatePage() {
  return (
    <IndustryDetailPage
      title="Real Estate"
      breadcrumb="Real Estate"
      description="We design and develop powerful, scalable real estate platforms that simplify property buying, selling, and management. From property listing portals to AI-powered price estimations — we deliver end-to-end real estate technology solutions tailored to your business needs."
      solutionTitle="Real Estate"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable real estate solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven real estate platforms designed to accelerate your business growth and maximize property sales."
      faqs={faqs}
    />
  );
}
