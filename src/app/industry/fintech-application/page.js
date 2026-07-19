export const metadata = {
  title: "Fintech Application Development",
  description: "Deploy secure and resilient financial technologies. We engineer custom banking systems, digital wallets, and unified payment gateways.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/fintech-application",
  },
  openGraph: {
    title: "Fintech Application Development | Gupta Tech Web",
    description: "Deploy secure and resilient financial technologies. We engineer custom banking systems, digital wallets, and unified payment gateways.",
    url: "https://guptatechweb.com/industry/fintech-application",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech Application Development | Gupta Tech Web",
    description: "Deploy secure and resilient financial technologies. We engineer custom banking systems, digital wallets, and unified payment gateways.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Digital Banking Solutions",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Payment Gateway Integration",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Fintech Platform Development",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Lending System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Smart Wallet Technology",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Risk Analysis",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Blockchain & Crypto Solutions",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Investment & Trading Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Financial Management System",
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
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with financial data protection standards.",
  },
  {
    q: "Can you build a custom fintech application for my business?",
    a: "Absolutely! We build custom fintech platforms with secure payment systems, digital wallets, investment dashboards, and seamless API integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function FintechApplicationPage() {
  return (
    <IndustryDetailPage
      title="Fintech Applications"
      breadcrumb="Fintech Applications"
      description="We design and develop powerful, secure, and scalable fintech applications that transform the way businesses manage money, payments, and financial services. From digital banking to investment platforms — we deliver end-to-end fintech solutions tailored to your needs."
      solutionTitle="Fintech Applications"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable fintech solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven fintech applications designed to accelerate your business growth and maximize digital financial success."
      faqs={faqs}
    />
  );
}
