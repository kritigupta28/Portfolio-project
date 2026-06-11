"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] bg-[var(--bg-primary)] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-32"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center mt-12 md:mt-0">

        {/* Hello Badge */}
        {/* <div className={`mb-8 px-6 py-2.5 rounded-full border border-white/10 bg-[var(--bg-card)]/80 backdrop-blur-md shadow-lg flex items-center gap-3 transition-all duration-700 ease-out z-20 relative ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-white font-semibold tracking-wide text-sm">Hello!</span>
          <span className="text-lg">👋</span>
        </div> */}

        {/* Heading */}
        <h1 className={`relative z-10 text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-extrabold text-[var(--text-primary)] text-center leading-[1.05] tracking-tight transition-all duration-700 delay-100 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          I'm <span className="text-[var(--accent-brand)]">Kriti</span>,<br /><span className="[word-spacing:1.3em]">Product Designer</span>
        </h1>

        {/* Center Image and Stats Container */}
        <div className="relative w-full flex justify-center -mt-10 sm:-mt-16 md:-mt-28 lg:-mt-32">


          {/* Left Stat - Quote (no card, matches reference) */}
          <div className={`absolute left-0 md:left-4 bottom-24 lg:bottom-[345px] max-w-[230px] z-30 hidden lg:block transition-all duration-700 delay-300 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="text-[var(--accent-brand)] text-6xl font-serif leading-none mb-1">&ldquo;</div>
            <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6 leading-relaxed font-medium">
              Kriti's exceptional product design ensured our website's success. Highly recommended!
            </p>
            <p className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">450+</p>
            <p className="text-[var(--text-muted)] text-xs md:text-sm font-semibold uppercase tracking-wider mt-1">Client Served</p>
          </div>

          {/* Right Stat - Experts (no card, matches reference) */}
          <div className={`absolute right-0 md:right-4 bottom-32 lg:bottom-[375px] z-30 hidden lg:block text-right transition-all duration-700 delay-400 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex justify-end gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[var(--accent-brand)] text-xl ">★</span>
              ))}
            </div>
            <p className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">7 Years</p>
            <p className="text-[var(--text-muted)] text-xs md:text-sm font-semibold uppercase tracking-wider mt-2">Experts</p>
            <div className="w-28 h-px bg-white/30 mt-4 ml-auto" />
          </div>

          {/* Profile Image — keeps full footprint, lower body fades out (cuts mid-body) */}
          <div className={`relative w-[320px] sm:w-[420px] md:w-[580px] h-[400px] sm:h-[500px] md:h-[700px] z-20 [mask-image:linear-gradient(to_bottom,#000_85%,transparent_100%)] transition-all duration-1000 delay-200 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Image
              src="/my image.png"
              alt="Kriti Gupta"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Download Resume Button */}
          <div className={`absolute bottom-16 md:bottom-24 z-40 flex justify-center transition-all duration-700 delay-500 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <a
              href="/resume.pdf"
              download="Kriti_Gupta_Resume.pdf"
              className="bg-[var(--accent-brand)] text-[var(--bg-primary)] px-10 md:px-14 py-4 md:py-5 rounded-full font-bold border border-[var(--border-accent)] hover:-translate-y-1 hover:opacity-90 transition-all flex items-center gap-3 text-base md:text-lg tracking-wide shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
