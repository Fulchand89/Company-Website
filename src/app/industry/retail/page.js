export const metadata = {
  title: "Retail Software & POS System Engineering",
  description: "Accelerate retail efficiency. Custom point-of-sale integrations, inventory management systems, and cross-channel supply portals.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/retail",
  },
  openGraph: {
    title: "Retail Software & POS System Engineering | Gupta Tech Web",
    description: "Accelerate retail efficiency. Custom point-of-sale integrations, inventory management systems, and cross-channel supply portals.",
    url: "https://guptatechweb.com/industry/retail",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Software & POS System Engineering | Gupta Tech Web",
    description: "Accelerate retail efficiency. Custom point-of-sale integrations, inventory management systems, and cross-channel supply portals.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Retail Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Point of Sale (POS) Software",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Omnichannel Retail Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Inventory & Stock Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Customer Loyalty Program",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Sales Analytics",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Supply Chain Integration",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Mobile Commerce App",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Store Operations Dashboard",
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
    q: "Can you build a retail management system with POS and inventory tracking?",
    a: "Absolutely! We build custom retail platforms with POS systems, inventory management, customer loyalty programs, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function RetailPage() {
  return (
    <IndustryDetailPage
      title="Retails"
      breadcrumb="Retails"
      description="We design and develop powerful retail technology solutions that streamline store operations, boost sales, and enhance the customer shopping experience. From POS systems to omnichannel platforms — we deliver end-to-end retail solutions tailored to your business."
      solutionTitle="Retail"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable retail solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven retail platforms designed to accelerate your business growth and maximize customer satisfaction."
      faqs={faqs}
    />
  );
}
