"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="text-white p-5 bg-black">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8">
        <div className="flex flex-wrap -mx-3 gap-y-4">
          {/* Logo and description */}
          <div className="w-full px-3 md:w-1/4">
            <div className="mb-3">
              <Image src="/assets/images/logo-gtw.png" alt="GTW Logo" width={120} height={30} />
            </div>
            <p className="text-sm text-slate-300">
              Gupta Tech Web is a premier IT solutions provider, delivering cutting-edge software development, UI/UX design, and digital marketing to empower your business.
            </p>
            <div className="flex items-center mt-2">
              <a
                href="https://www.facebook.com/people/Guptatechweb/61570538930157/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Image
                  src="/assets/images/icon/facebook.png"
                  alt="Facebook"
                  width={60}
                  height={60}
                />
              </a>

              <a
                href="https://www.instagram.com/gupta.tech.web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Image
                  src="/assets/images/icon/instagram.png"
                  alt="Instagram"
                  width={60}
                  height={60}
                />
              </a>

              <a
                href="https://x.com/GuptaWeb66733"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Image
                  src="/assets/images/icon/twitter.png"
                  alt="X (Twitter)"
                  width={60}
                  height={60}
                />
              </a>

              <a
                href="https://www.linkedin.com/company/gupta-tech-web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Image
                  src="/assets/images/icon/linkdin.png"
                  alt="LinkedIn"
                  width={60}
                  height={60}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-1/2 sm:w-1/3 px-3 md:w-1/6">
            <h6 className="uppercase text-sm font-semibold mb-3">Quick Links</h6>
            <ul className="list-none m-0 p-0 space-y-1">
              <li><Link href="/about" className="text-white no-underline text-sm block mb-1">About Us</Link></li>
              <li><Link href="/careers" className="text-white no-underline text-sm block mb-1">Careers</Link></li>
              <li><Link href="/contact" className="text-white no-underline text-sm block mb-1">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="w-1/2 sm:w-1/3 px-3 md:w-1/6">
            <h6 className="uppercase text-sm font-semibold mb-3">Services</h6>
            <ul className="list-none m-0 p-0 space-y-1">
              <li><Link href="/service/app" className="text-white no-underline text-sm block mb-1">App Development</Link></li>
              <li><Link href="/service/web" className="text-white no-underline text-sm block mb-1">Website Development</Link></li>
              <li><Link href="/service/digital-marketing" className="text-white no-underline text-sm block mb-1">Digital Marketing</Link></li>
              <li><Link href="/service/ui-ux" className="text-white no-underline text-sm block mb-1">UI-UX</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-1/2 sm:w-1/3 px-3 md:w-1/6">
            <h6 className="uppercase text-sm font-semibold mb-3">Resources</h6>
            <ul className="list-none m-0 p-0 space-y-1">
              <li><Link href="/blog" className="text-white no-underline text-sm block mb-1">Blog</Link></li>
              <li><Link href="/portfolio" className="text-white no-underline text-sm block mb-1">Portfolio</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full px-3 md:w-1/4">
            <h6 className="uppercase text-sm font-semibold mb-3">Contact Us</h6>
            <ul className="list-none m-0 p-0 space-y-2 text-sm">
              <li className="mb-2 flex items-start">
                <Image src="/assets/images/icon/location.png" alt="" width={20} height={20} className="mr-2 mt-1" />
                <span>Plot No. 367 PU4 Scheme No. 54, Behind C21 Mall Indore - 452010 (M.P.)</span>
              </li>
              <li className="mb-2 flex items-center">
                <Image src="/assets/images/icon/mail.png" alt="" width={20} height={20} className="mr-2" /> info@crazydigitalworlds.com
              </li>
              <li className="mb-2 flex items-center">
                <Image src="/assets/images/icon/call.png" alt="" width={20} height={20} className="mr-2" /> +91 9039 502 924
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-sm text-slate-400">
          <p>© {currentYear} Gupta Tech Web. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

