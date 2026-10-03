"use client";

import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)",
          opacity: 0.3,
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: About text */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
                About Me
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                Designing with{" "}
                <span className="gradient-text">purpose</span> &{" "}
                <span className="gradient-text">passion</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                I&apos;m a Product Designer at Wisflux Techlabs in Jaipur,
                designing end-to-end digital products across enterprise, HRM,
                project management, and education software.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                I started as a UI/UX Designer and grew into owning product
                discovery, research, requirements, interaction and visual
                design, and developer handoff — and I prototype in code with
                React and Next.js.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-3">
                {[
                  "Product Design",
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Design Systems",
                  "Accessibility (WCAG)",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Experience timeline */}
          <div>
            <ScrollReveal delay={200}>
              <div className="relative pl-8 border-l border-[var(--border-subtle)]">
                {[
                  {
                    year: "Jan 2023 — Present",
                    role: "Product Designer",
                    company: "Wisflux Techlabs",
                    desc: "Progressed from UI/UX Designer to Product Designer, owning discovery, UX research, requirements, interaction and visual design, prototyping, and delivery for enterprise, HRM, and education products.",
                  },
                  {
                    year: "Jun — Aug 2022",
                    role: "Graphic Designer & UI/UX Designer",
                    company: "Pie-Gamers, Jaipur",
                    desc: "Designed and helped build the concept and mobile UI of a game project, plus social media posts and supporting visual content.",
                  },
                  {
                    year: "Education · 2023",
                    role: "Bachelor of Computer Applications (BCA)",
                    company: "The ICFAI University, Jaipur",
                    desc: "",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative mb-12 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute -left-[calc(1rem+4.5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />

                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                    <p className={`text-sm text-[var(--text-muted)] ${item.desc ? "mb-3" : ""}`}>
                      {item.company}
                    </p>
                    {item.desc && (
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
