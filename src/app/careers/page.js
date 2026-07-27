"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { JobSkeleton } from "@/components/Skeleton";
import {
  Briefcase,
  Users,
  GraduationCap,
  HeartHandshake,
  TrendingUp,
  Lightbulb,
  Heart,
  Clock,
  Laptop,
  Award,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight,
  Send,
  Search,
  Code,
  Layers,
  Megaphone
} from "lucide-react";

const getJobIcon = (department) => {
  const dept = (department || "").toLowerCase();
  if (dept.includes("engineer") || dept.includes("tech") || dept.includes("dev")) {
    return <Code className="w-5 h-5 text-gray-600" />;
  }
  if (dept.includes("design") || dept.includes("ui") || dept.includes("ux")) {
    return <Layers className="w-5 h-5 text-gray-600" />;
  }
  if (dept.includes("market") || dept.includes("sales")) {
    return <Megaphone className="w-5 h-5 text-gray-600" />;
  }
  return <Briefcase className="w-5 h-5 text-gray-600" />;
};

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Senior Full Stack Engineer (MERN / Next.js)",
    department: "Engineering",
    location: "Indore, India / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Build robust, high-performance web applications and enterprise platforms using React, Node.js, and Next.js."
  },
  {
    id: 2,
    title: "Mobile App Developer (Flutter / React Native)",
    department: "Engineering",
    location: "Indore, India",
    type: "Full-Time",
    experience: "2+ Years",
    description: "Engineer beautiful, responsive native and cross-platform mobile apps for iOS and Android."
  },
  {
    id: 3,
    title: "UI/UX Product Designer",
    department: "Design",
    location: "Indore, India / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    description: "Design intuitive user interfaces, interactive wireframes, and design systems for enterprise clients."
  }
];

export default function CareerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const whyWorkWithUs = [
    {
      icon: <TrendingUp className="w-8 h-8 text-gray-600" />,
      title: "Growth",
      description: "Scale your career with clear promotion tracks, professional mentoring, and fast-paced environments.",
      bg: "bg-gray-50/50 hover:bg-gray-100/50"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-gray-600" />,
      title: "Learning",
      description: "Continuous learning opportunities with sponsored courses, internal tech talks, and conference stipends.",
      bg: "bg-gray-50/50 hover:bg-gray-100/50"
    },
    {
      icon: <Users className="w-8 h-8 text-gray-600" />,
      title: "Teamwork",
      description: "Collaborate with cross-functional global teams in an ego-free environment built on mutual trust.",
      bg: "bg-gray-50/50 hover:bg-gray-100/50"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-gray-600" />,
      title: "Innovation",
      description: "Work with cutting-edge tech stacks and solve challenging problems that make a global impact.",
      bg: "bg-gray-50/50 hover:bg-gray-100/50"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-gray-600" />,
      title: "Health & Wellness",
      description: "Comprehensive medical insurance coverages, wellness stipends, and mental health counseling support."
    },
    {
      icon: <Clock className="w-6 h-6 text-gray-600" />,
      title: "Flexible Hours",
      description: "Core working hours with flexible starting times. We value productivity over micro-managed hours."
    },
    {
      icon: <Laptop className="w-6 h-6 text-gray-600" />,
      title: "Workstation Budget",
      description: "Get the latest Macbook or Windows laptop plus a generous budget to build your ideal home office setup."
    },
    {
      icon: <Award className="w-6 h-6 text-gray-600" />,
      title: "Performance Rewards",
      description: "Quarterly bonuses, direct performance-linked incentives, and annual team profit sharing opportunities."
    },
    {
      icon: <Calendar className="w-6 h-6 text-gray-600" />,
      title: "Generous Leave Policy",
      description: "Paid annual leaves, sick leaves, parental support leaves, and dedicated study breaks whenever needed."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gray-600" />,
      title: "Annual Retreats",
      description: "Annual fully-funded company getaways, frequent team dinners, hackathons, and fun Friday game nights."
    }
  ];

  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Apply Modal states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null
  });
  const [appStatus, setAppStatus] = useState({ type: "", message: "" });
  const [appLoading, setAppLoading] = useState(false);
  const [allActiveJobs, setAllActiveJobs] = useState([]);

  const openApplyModal = (jobTitle = "") => {
    setAppForm({
      name: "",
      email: "",
      phone: "",
      position: jobTitle || "General Application",
      resume: null
    });
    setAppStatus({ type: "", message: "" });
    setShowApplyModal(true);
  };

  const handleAppChange = (e) => {
    const { name, value } = e.target;
    setAppForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAppForm(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.phone || !appForm.position || !appForm.resume) {
      setAppStatus({ type: "error", message: "All fields and a resume file are required." });
      return;
    }
    setAppLoading(true);
    setAppStatus({ type: "", message: "" });

    const data = new FormData();
    data.append("name", appForm.name);
    data.append("email", appForm.email);
    data.append("phone", appForm.phone);
    data.append("position", appForm.position);
    data.append("resume", appForm.resume);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: data
      });
      const resData = await res.json();
      if (res.ok) {
        setAppStatus({ type: "success", message: "Application submitted successfully!" });
        setAppForm({
          name: "",
          email: "",
          phone: "",
          position: "",
          resume: null
        });
        const fileInput = document.getElementById("modal-resume-upload");
        if (fileInput) fileInput.value = "";
      } else {
        setAppStatus({ type: "error", message: resData.error || "Failed to submit application." });
      }
    } catch (err) {
      console.error(err);
      setAppStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs?page=${page}&limit=3`);
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setJobs(data.data);
            setTotalPages(data.pagination?.totalPages || 1);
          }
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [page]);

  // Fetch all active jobs dynamically to populate position select dropdown
  useEffect(() => {
    async function fetchAllActiveJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setAllActiveJobs(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch all jobs for application dropdown:", err);
      }
    }
    fetchAllActiveJobs();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Apply Online",
      description: "Browse openings and submit your updated resume. Include links to your GitHub, Behance, or personal portfolio."
    },
    {
      num: "02",
      title: "Technical Review",
      description: "A screening call with our talent acquisition team followed by a practical home task or pair-programming session."
    },
    {
      num: "03",
      title: "Deep-Dive Panel Interview",
      description: "A collaborative session with our engineering or design leads to talk system design, architecture, and problem solving."
    },
    {
      num: "04",
      title: "Offer & Onboard",
      description: "We extend a competitive offer and guide you through a comprehensive onboarding program to get you up and running."
    }
  ];

  // Filters
  const displayJobsList = jobs.length > 0 ? jobs : INITIAL_JOBS;
  const filteredJobs = displayJobsList.filter((job) => {
    const matchesSearch = (job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-[#fafbfd] text-[#1e293b]">
      {/* Hero Section */}
      <PageHeader
        breadcrumb="Careers"
        title="Join Our Team"
        description="We are looking for creative problem solvers, ambitious builders, and detail-oriented thinkers to help shape the future of technology."
        ctaText="View Open Positions"
        ctaHref="#openings"
      />

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-[#0f172a]">
              Why Work With Us?
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              We foster a collaborative culture that encourages experimentations, embraces challenges, and celebrates achievements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyWorkWithUs.map((card, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${card.bg}`}
              >
                <div className="p-3 bg-white inline-block rounded-xl shadow-sm mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Benefits */}
      <section className="py-20 bg-gradient-to-b from-[#fafbfd] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Perks & Benefits</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-[#0f172a]">
              Life at Gupta Tech Web
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              We offer comprehensive perks designed to keep you happy, healthy, motivated, and growing professionally.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-5"
              >
                <div className="p-3 bg-gray-100 text-gray-600 rounded-xl shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gray-400 font-semibold uppercase tracking-wider text-sm">How it works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
              Our Simple Hiring Process
            </h2>
            <p className="text-gray-300 mt-4 text-lg">
              We respect your time. Here is what you can expect from our application pipeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Horizontal line for desktop connecting steps */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-gray-700 to-transparent z-0" />
                )}

                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="text-4xl font-extrabold text-gray-400 mb-6 font-mono tracking-tighter">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300/80 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section id="openings" className="py-20 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Opportunities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-[#0f172a]">
              Current Job Openings
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Find the perfect environment to make your mark. Filter by department or search manually.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition bg-[#fafbfd]"
              />
            </div>

            {/* Department Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {["All", "Engineering", "Design", "Marketing"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${selectedDepartment === dept
                    ? "bg-gray-800 text-white shadow-md shadow-gray-800/20"
                    : "bg-[#fafbfd] border border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Openings Grid/List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {loading ? (
              <JobSkeleton count={3} />
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        {getJobIcon(job.department)}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0f172a]">{job.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        Experience: {job.experience}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => openApplyModal(job.title)}
                      className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-sm w-full md:w-auto cursor-pointer"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#fafbfd] border border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-500 font-medium">No open positions found matching your filters.</p>
              </div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-2xl" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to Join Our Team?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Even if you do not see an opening that matches your profile, send us your resume. We are always looking for passionate people to join our fast-growing teams.
          </p>

          <div>
            <button
              onClick={() => openApplyModal("")}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Submit Resume
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── JOB APPLICATION MODAL ── */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative border border-gray-100 text-[#1e293b]">

            {/* Close Button */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer bg-transparent border-0"
            >
              ✕
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-[#0f172a]">
                Apply for Position
              </h3>
              {appForm.position && (
                <p className="text-gray-500 mt-1 text-sm">
                  Role: <span className="text-[#0d6efd] font-semibold">{appForm.position}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleAppSubmit} className="space-y-4">
              {appStatus.message && (
                <div className={`p-4 rounded-xl text-sm font-semibold border ${appStatus.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                  : "bg-red-50 border-red-200 text-red-600"
                  }`}>
                  {appStatus.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={appForm.name}
                  onChange={handleAppChange}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-200 bg-[#fafbfd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={appForm.email}
                  onChange={handleAppChange}
                  placeholder="e.g. john@example.com"
                  className="w-full border border-gray-200 bg-[#fafbfd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={appForm.phone}
                  onChange={handleAppChange}
                  placeholder="e.g. +91 9876543210"
                  className="w-full border border-gray-200 bg-[#fafbfd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Position
                </label>
                <select
                  name="position"
                  value={appForm.position}
                  onChange={handleAppChange}
                  className="w-full border border-gray-200 bg-[#fafbfd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition cursor-pointer"
                  required
                >
                  <option value="General Application">General Application</option>
                  {allActiveJobs.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Resume File (PDF / DOCX, max 5MB)
                </label>
                <input
                  id="modal-resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="w-full border border-gray-200 bg-[#fafbfd] rounded-xl px-4 py-2 text-sm focus:outline-none transition"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="w-1/2 border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 font-semibold py-3 rounded-xl transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={appLoading}
                  className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition text-sm disabled:opacity-50 cursor-pointer shadow-lg shadow-red-900/10"
                >
                  {appLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
