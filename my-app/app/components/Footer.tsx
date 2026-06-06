"use client";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Marquee */}
        <div className="marquee-container mb-10">
          <div className="marquee-content">
            {Array(4).fill(null).map((_, i) => (
              <span key={i}>UI/UX Design ✦ Product Strategy ✦ Figma ✦ Design Systems ✦ User Research ✦</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-xl font-bold gradient-text">KG<span className="text-[var(--text-muted)]">.</span></a>
          <p className="text-sm text-[var(--text-muted)]">© {new Date().getFullYear()} Kriti Gupta. Crafted with care & lots of coffee.</p>
          <a href="#hero" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" id="back-to-top">↑ Back to top</a>
        </div>
      </div>
    </footer>
  );
}
