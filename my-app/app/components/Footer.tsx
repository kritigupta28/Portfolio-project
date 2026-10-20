"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import f from "./Footer.module.css";

// Prerendered pages would freeze the build year, so read it in the browser.
const noopSubscribe = () => () => {};
const useCurrentYear = () => useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => null);

export default function Footer() {
  const year = useCurrentYear();
  const lineRef = useRef<HTMLParagraphElement>(null);
  const [struck, setStruck] = useState(false);

  // Replay the strike-through every time the line scrolls into view.
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStruck(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="py-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Marquee */}
        <div className="marquee-container mb-10">
          <div className="marquee-content">
            {Array(4).fill(null).map((_, i) => (
              <span key={i}>Product Design ✦ UX Research ✦ Design Systems ✦ Prototyping ✦ Figma ✦</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-xl font-bold gradient-text">KG<span className="text-[var(--text-muted)]">.</span></a>
          <p ref={lineRef} className={`text-sm text-[var(--text-muted)] text-center ${struck ? f.struck : ""}`}>
            © {year ?? ""} Kriti Gupta. Crafted with ❤️ &amp; lots of{" "}
            <span className={f.old}>
              <span className="sr-only">(formerly coffee) </span>
              <span aria-hidden>coffee</span>
            </span>{" "}
            <span className={f.new}>rasgulla</span>.
          </p>
          <a href="#hero" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" id="back-to-top">↑ Back to top</a>
        </div>
      </div>
    </footer>
  );
}
