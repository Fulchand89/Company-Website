export const metadata = {
  title: "Restaurant & Food Delivery App Development",
  description: "Drive online ordering and dining experiences. We engineer smart restaurant menus, POS integrations, and custom home delivery platforms.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/restaurant",
  },
  openGraph: {
    title: "Restaurant & Food Delivery App Development | Gupta Tech Web",
    description: "Drive online ordering and dining experiences. We engineer smart restaurant menus, POS integrations, and custom home delivery platforms.",
    url: "https://guptatechweb.com/industry/restaurant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant & Food Delivery App Development | Gupta Tech Web",
    description: "Drive online ordering and dining experiences. We engineer smart restaurant menus, POS integrations, and custom home delivery platforms.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Restaurants",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Restaurants Technology",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Digital Restaurant Solution",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Ordering System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Smart POS",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI in Restaurants",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Tech in Restaurants",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Cloud Kitchen Technology",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Restaurant Management",
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
    q: "I run a restaurant. Can you build a site for reservations and online orders?",
    a: "Absolutely! We build custom restaurant websites with reservation systems, online ordering, and seamless payment gateway integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function RestaurantPage() {
  return (
    <IndustryDetailPage
      title="Food & Restaurant"
      breadcrumb="Food & Restaurant"
      description="We design and develop powerful digital solutions for restaurants, food delivery platforms, and cloud kitchens. From online ordering systems to smart POS and AI-powered menu recommendations — we deliver end-to-end restaurant technology tailored to your business."
      solutionTitle="Restaurant"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable restaurant solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven restaurant platforms designed to accelerate your business growth and maximize customer satisfaction."
      faqs={faqs}
    />
  );
}
