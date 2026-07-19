export const metadata = {
  title: "Social Media Platform Development",
  description: "Design high-engagement community portals, media-sharing sites, and interactive social apps with instant chat and newsfeeds.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/social-media-platform",
  },
  openGraph: {
    title: "Social Media Platform Development | Gupta Tech Web",
    description: "Design high-engagement community portals, media-sharing sites, and interactive social apps with instant chat and newsfeeds.",
    url: "https://guptatechweb.com/industry/social-media-platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Platform Development | Gupta Tech Web",
    description: "Design high-engagement community portals, media-sharing sites, and interactive social apps with instant chat and newsfeeds.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Social Networking Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Community & Forum Builder",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Content Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Live Streaming Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Social Media Analytics",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Content Moderation",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Influencer Marketing Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Social Commerce Integration",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Messaging & Notification System",
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
    q: "Can you build a custom social media platform with real-time features?",
    a: "Absolutely! We build custom social media platforms with real-time messaging, live streaming, content feeds, and seamless third-party API integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function SocialMediaPlatformPage() {
  return (
    <IndustryDetailPage
      title="Social Media Platform"
      breadcrumb="Social Media Platform"
      description="We design and develop powerful, scalable social media platforms that connect communities, drive engagement, and grow your digital presence. From social networking apps to live streaming platforms — we deliver end-to-end social media solutions tailored to your vision."
      solutionTitle="Social Media Platform"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable social media solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven social media platforms designed to accelerate your growth and maximize user engagement."
      faqs={faqs}
    />
  );
}
