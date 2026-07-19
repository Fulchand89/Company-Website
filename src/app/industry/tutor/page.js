export const metadata = {
  title: "EdTech & Online Tutor Platforms",
  description: "Empower learning globally. Custom learning management systems (LMS), virtual classrooms, online tutor matchers, and quiz software.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/tutor",
  },
  openGraph: {
    title: "EdTech & Online Tutor Platforms | Gupta Tech Web",
    description: "Empower learning globally. Custom learning management systems (LMS), virtual classrooms, online tutor matchers, and quiz software.",
    url: "https://guptatechweb.com/industry/tutor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdTech & Online Tutor Platforms | Gupta Tech Web",
    description: "Empower learning globally. Custom learning management systems (LMS), virtual classrooms, online tutor matchers, and quiz software.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "E-Learning Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Online Tutoring System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Learning Management System (LMS)",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Live Class & Webinar Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Student Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Personalized Learning",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Course & Content Management",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Exam & Assessment Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Tutor Marketplace & Portal",
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
    q: "Can you build a custom e-learning platform with live classes and assessments?",
    a: "Absolutely! We build custom tutoring platforms with live video classes, course management, student assessments, progress tracking, and seamless payment integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional requirements.",
  },
];

export default function TutorPage() {
  return (
    <IndustryDetailPage
      title="Tutors"
      breadcrumb="Tutors"
      description="We design and develop powerful, scalable e-learning and tutoring platforms that connect students with educators, deliver engaging content, and transform the way people learn. From LMS to AI-powered personalized learning — we deliver end-to-end education technology tailored to your vision."
      solutionTitle="Tutors"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable education solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven tutoring platforms designed to accelerate your business growth and maximize student engagement."
      faqs={faqs}
    />
  );
}
