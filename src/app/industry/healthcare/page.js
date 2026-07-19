export const metadata = {
  title: "Healthcare IT & Telemedicine Solutions",
  description: "Empower patient care and compliance. Gupta Tech Web develops HL7/HIPAA compliant hospital portals, electronic medical records, and telemedicine apps.",
  alternates: {
    canonical: "https://guptatechweb.com/industry/healthcare",
  },
  openGraph: {
    title: "Healthcare IT & Telemedicine Solutions | Gupta Tech Web",
    description: "Empower patient care and compliance. Gupta Tech Web develops HL7/HIPAA compliant hospital portals, electronic medical records, and telemedicine apps.",
    url: "https://guptatechweb.com/industry/healthcare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare IT & Telemedicine Solutions | Gupta Tech Web",
    description: "Empower patient care and compliance. Gupta Tech Web develops HL7/HIPAA compliant hospital portals, electronic medical records, and telemedicine apps.",
  },
};

import IndustryDetailPage from "@/components/IndustryDetailPage";

const solutions = [
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Hospital Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant1.png",
    title: "Telemedicine Platform",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant2.png",
    title: "Digital Health Records (EHR)",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant3.png",
    title: "Online Appointment Booking",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant4.png",
    title: "Pharmacy Management System",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant5.png",
    title: "AI-Powered Diagnostics",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant6.png",
    title: "Patient Monitoring & IoT",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant7.png",
    title: "Healthcare Analytics Dashboard",
    desc: "Innovative solutions for growing businesses in tech and services.",
  },
  {
    img: "/assets/images/industry/restaurant8.png",
    title: "Medical Billing & Claims",
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
    a: "We implement strong security protocols, regular updates, malware protection, and continuous technical support to ensure your platform remains safe and HIPAA-compliant.",
  },
  {
    q: "How do you clarify privacy policies and terms?",
    a: "We clearly define privacy policies, terms & conditions, and user rights to ensure full transparency and compliance with healthcare data protection standards.",
  },
  {
    q: "Can you build a telemedicine or patient portal for our clinic?",
    a: "Absolutely! We build custom healthcare platforms with appointment systems, video consultations, patient records management, and secure payment integrations.",
  },
  {
    q: "Can I request a specific deployment location?",
    a: "Yes, we can customize hosting, deployment, and services based on your preferred location or regional compliance requirements.",
  },
];

export default function HealthcarePage() {
  return (
    <IndustryDetailPage
      title="Healthcare"
      breadcrumb="Healthcare"
      description="We design and develop secure, scalable, and HIPAA-compliant healthcare solutions that transform patient care, streamline hospital operations, and digitize medical services. From telemedicine platforms to AI diagnostics — we deliver end-to-end healthcare technology tailored to your needs."
      solutionTitle="Healthcare"
      solutionDesc="We combine strategy, technology, and innovation to deliver scalable healthcare solutions. By leveraging industry-leading platforms and modern development practices."
      solutions={solutions}
      faqDesc="Gupta Tech Web specializes in building secure, scalable, and performance-driven healthcare platforms designed to accelerate your business growth and maximize patient satisfaction."
      faqs={faqs}
    />
  );
}
