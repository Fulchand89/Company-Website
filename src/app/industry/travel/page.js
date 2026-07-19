export const metadata = {
  title: "Travel & Online Booking Engines",
  description: "Streamline reservation workflows. We design custom travel itineraries, flight APIs, and hotel booking applications.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/travel",
  },
  openGraph: {
    title: "Travel & Online Booking Engines | Gupta Tech Web",
    description: "Streamline reservation workflows. We design custom travel itineraries, flight APIs, and hotel booking applications.",
    url: "https://guptatechweb.com/industry/travel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel & Online Booking Engines | Gupta Tech Web",
    description: "Streamline reservation workflows. We design custom travel itineraries, flight APIs, and hotel booking applications.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Travel Booking Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Hotel Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Flight & Tour Booking App",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Travel Agency (OTA)",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Travel CRM & ERP System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Travel Recommendations",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Tour Package Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Multi-Currency Payment Gateway",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Travel Analytics Dashboard",
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
    q: "Can you build a travel booking platform with hotel and flight search?",
    a: "Absolutely! We build custom travel platforms with real-time flight and hotel search, tour packages, booking management, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function TravelPage() {
  return (
    <IndustryDetailPage
      title="Travel"
      breadcrumb="Travel"
      description="We design and develop powerful, scalable travel technology solutions that simplify bookings, enhance traveler experiences, and grow your travel business online. From OTA platforms to AI-powered travel recommendations — we deliver end-to-end travel solutions tailored to your needs."
      solutionTitle="Travel"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable travel solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven travel platforms designed to accelerate your business growth and maximize traveler satisfaction."
      faqs={faqs}
    />
  );
}
