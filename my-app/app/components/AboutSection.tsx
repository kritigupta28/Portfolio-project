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

      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
                With over 7 years of experience in UI/UX design, I&apos;ve had the
                privilege of working with startups, enterprises, and agencies
                alike — transforming ideas into meaningful digital products.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                My approach is rooted in understanding users deeply, then
                crafting every pixel to serve both beauty and utility. I believe
                great design doesn&apos;t just look good — it feels right.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-3">
                {[
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Visual Design",
                  "Design Systems",
                  "Interaction Design",
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
                    year: "2023 — Present",
                    role: "Senior UI/UX Designer",
                    company: "DesignStudio Pro",
                    desc: "Leading the design of enterprise SaaS products, managing a team of 4 designers, and establishing the company's design system.",
                  },
                  {
                    year: "2021 — 2023",
                    role: "UI/UX Designer",
                    company: "CreativeForge Agency",
                    desc: "Designed mobile and web experiences for 20+ clients across fintech, health-tech, and e-commerce verticals.",
                  },
                  {
                    year: "2019 — 2021",
                    role: "Product Designer",
                    company: "Startupify",
                    desc: "Collaborated with cross-functional teams to ship 3 products from 0→1, including user research and usability testing.",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative mb-12 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute -left-[calc(1rem+4.5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />

                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3">
                      {item.company}
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {item.desc}
                    </p>
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
