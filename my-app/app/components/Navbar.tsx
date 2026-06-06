"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-full px-6 max-w-5xl ${
          scrolled ? "top-4" : "top-8"
        }`}
      >
        <div className="bg-[#111111]/90 border border-white/10 rounded-full px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* Left Links */}
          <div className="hidden md:flex items-center justify-end gap-8 flex-1">
            <a href="#home" className="text-white text-sm font-medium hover:text-[var(--accent-brand)] transition-colors">Home</a>
            <a href="#about" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">About</a>
            <a href="#skills" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">Skills</a>
          </div>

          {/* Logo (Center) */}
          <div className="flex items-center gap-2 mx-8 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-brand)] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_var(--accent-brand)]">
              K
            </div>
            <span className="text-white font-bold text-base tracking-wide">Kriti</span>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex items-center justify-start gap-8 flex-1">
            <a href="#work" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">Project</a>
            <a href="#testimonials" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">Contact Us</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-[90] md:hidden overflow-hidden transition-all duration-500 rounded-2xl ${
          mobileOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-5 items-center shadow-2xl">
          <a href="#home" className="text-white text-base font-medium" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#about" className="text-gray-300 text-base font-medium" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#skills" className="text-gray-300 text-base font-medium" onClick={() => setMobileOpen(false)}>Skills</a>
          <a href="#work" className="text-gray-300 text-base font-medium" onClick={() => setMobileOpen(false)}>Project</a>
          <a href="#testimonials" className="text-gray-300 text-base font-medium" onClick={() => setMobileOpen(false)}>Testimonials</a>
          <a href="#contact" className="text-gray-300 text-base font-medium" onClick={() => setMobileOpen(false)}>Contact Us</a>
        </div>
      </div>
    </>
  );
}
