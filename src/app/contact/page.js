"use client";

import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("job");

  // General contact states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    country: "",
    message: ""
  });

  // Application form states
  const [appData, setAppData] = useState({
    name: "",
    email: "",
    phone: "",
    position: jobTitle || "",
    resume: null
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppChange = (e) => {
    const { name, value } = e.target;
    setAppData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAppData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "First name, email, and message are required." });
      return;
    }
    setLoading(true);
    setStatus({ type: "", message: "" });

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    let finalMessage = formData.message;
    if (formData.service || formData.country) {
      finalMessage += `\n\n--- Additional Info ---\nService: ${formData.service || "N/A"}\nCountry: ${formData.country || "N/A"}`;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          phone: formData.phone,
          message: finalMessage
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Your message has been submitted successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          country: "",
          message: ""
        });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to submit request." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!appData.name || !appData.email || !appData.phone || !appData.position || !appData.resume) {
      setStatus({ type: "error", message: "All fields and a resume file are required." });
      return;
    }
    setLoading(true);
    setStatus({ type: "", message: "" });

    const data = new FormData();
    data.append("name", appData.name);
    data.append("email", appData.email);
    data.append("phone", appData.phone);
    data.append("position", appData.position);
    data.append("resume", appData.resume);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Application submitted successfully!" });
        setAppData({
          name: "",
          email: "",
          phone: "",
          position: jobTitle || "",
          resume: null
        });
        const fileInput = document.getElementById("resume-upload");
        if (fileInput) fileInput.value = "";
      } else {
        setStatus({ type: "error", message: resData.error || "Failed to submit application." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div
          className="hero-content w-full h-[400px] text-white"
          style={{
            background: "url('/assets/images/contact-us.png') center/cover no-repeat",
          }}
        >
          <div className="text-center text-white" style={{ paddingTop: "180px", paddingBottom: "80px" }}>
            <h1 className="font-bold text-4xl md:text-5xl">{jobTitle ? `Apply for ${jobTitle}` : "Contact Us"}</h1>
            <p className="text-2xl mt-3">Transform Your Ideas into Impactful Solutions</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="bg-white rounded-[2rem] p-5">
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-8">
          {/* Top info block */}
          <div className="mb-6">
            <h3 className="font-bold text-[#0f172a] text-2xl leading-snug">
              {jobTitle ? (
                <>
                  Submit your application for <span className="text-[#b30d29]">{jobTitle}</span>
                </>
              ) : (
                <>
                  Let&apos;s Build the <span className="text-[#b30d29]">Future Together!</span>
                </>
              )}
              <br />
              Connect With Us
            </h3>
            <p className="text-[#0f172a] font-semibold text-base mt-2">
              Connect with our team for expert guidance.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icon/mail.png" alt="Email" width={20} height={20} />
                <h6 className="mb-0 font-bold text-[#b30d29]">Sales@guptatechweb.com</h6>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icon/location.png" alt="Address" width={20} height={20} />
                <h6 className="mb-0 font-bold text-[#b30d29]">
                  410 Shagun Tower, Vijay Nagar, Indore (M.P)
                </h6>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icon/call.png" alt="Phone" width={20} height={20} />
                <h6 className="mb-0 font-bold text-[#b30d29]">+91 7400554294</h6>
              </div>
            </div>
          </div>

          {/* Form + Map row */}
          <div className="flex flex-wrap items-center gap-8">

            {/* ── FORM ── */}
            <div className="w-full md:w-[calc(50%-16px)]">
              {jobTitle ? (
                /* Job Application Form */
                <form onSubmit={handleAppSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      value={appData.name}
                      onChange={handleAppChange}
                      placeholder="Full Name"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={appData.email}
                      onChange={handleAppChange}
                      placeholder="Email Address"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      value={appData.phone}
                      onChange={handleAppChange}
                      placeholder="Phone Number"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="position"
                      value={appData.position}
                      onChange={handleAppChange}
                      placeholder="Position"
                      className="w-full border border-[#747272] bg-gray-100 text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none"
                      required
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume (PDF, DOCX only, max 5MB)
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 focus:outline-none"
                      required
                    />
                  </div>

                  {status.message && (
                    <div className={`mb-3 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {status.message}
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="border border-[#b30d29] text-white bg-[#b30d29] hover:bg-[#9a0b23] transition-colors duration-200 px-5 py-2 rounded-[6px] font-medium cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              ) : (
                /* General Contact Form */
                <form onSubmit={handleSubmit}>
                  {/* First + Last name row */}
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-1/2 border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-1/2 border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="Service"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272]"
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write your message"
                      className="w-full border border-[#747272] bg-white text-black rounded-[6px] px-3 py-2 placeholder:text-[#888] focus:outline-none focus:border-[#747272] resize-none"
                      required
                    />
                  </div>

                  {status.message && (
                    <div className={`mb-3 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {status.message}
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="border border-[#b30d29] text-white bg-[#b30d29] hover:bg-[#9a0b23] transition-colors duration-200 px-5 py-2 rounded-[6px] font-medium cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── MAP IMAGE ── */}
            <div className="w-full md:w-[calc(50%-16px)] text-center">
              <Image
                src="/assets/images/hero/map.png"
                alt="Map"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Loading form...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
