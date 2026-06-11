"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { name: "Figma & Design Tools", level: 95 },
  { name: "User Research & Testing", level: 90 },
  { name: "Wireframing & Prototyping", level: 92 },
  { name: "Design Systems", level: 88 },
  { name: "Interaction & Motion Design", level: 85 },
  { name: "HTML / CSS / Frontend Basics", level: 80 },
];

// Real brand icons (simple-icons paths) — monochrome, theme-aware via currentColor
const tools = [
  { name: "Figma", path: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" },
  { name: "Sketch", path: "M12 1.25l6.75 6.637V2L12 1.25zm0 0l-6.05 7h12.1l-6.05-7zm0 0L5.25 2v5.887L12 1.25zM5.25 2L0 9l4.416-.68L5.25 2zM0 9l11.959 13.703.008-.014L4.443 9H0zm18.75-7l.834 6.32L24 9l-5.25-7zM24 9h-4.506l-7.523 13.69.029.06L24 9zM12 22.75l-.031-.057-.008.012.039.045zM5.436 9l6.533 13.686L18.564 9H5.436Z" },
  { name: "Framer", path: "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" },
  { name: "Webflow", path: "m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z" },
  { name: "Miro", path: "M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z" },
  { name: "Notion", path: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" },
  { name: "Jira", path: "M12.004 0c-2.35 2.395-2.365 6.185.133 8.585l3.412 3.413-3.197 3.198a6.501 6.501 0 0 1 1.412 7.04l9.566-9.566a.95.95 0 0 0 0-1.344L12.004 0zm-1.748 1.74L.67 11.327a.95.95 0 0 0 0 1.344C4.45 16.44 8.22 20.244 12 24c2.295-2.298 2.395-6.096-.08-8.533l-3.47-3.469 3.2-3.2c-1.918-1.955-2.363-4.725-1.394-7.057z" },
];

// Honeycomb cluster: rows of 2 — 3 — 2 (perfect interlock)
const hexRows = [tools.slice(0, 2), tools.slice(2, 5), tools.slice(5, 7)];

function SkillBar({ name, level }: { name: string; level: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-[var(--accent)] font-semibold">{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-bar-fill" style={{ width: visible ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}

function Honeycomb() {
  // pointy-top hex: w = 104, h = w * 1.1547 ; rows overlap by h/4
  const W = 104;
  const H = Math.round(W * 1.1547); // 120
  const overlap = Math.round(H / 4); // 30

  return (
    <div className="honeycomb mt-2 flex justify-center">
      <div className="honeycomb-inner">
        {hexRows.map((row, ri) => (
          <div
            key={ri}
            className="hex-row"
            style={{ marginTop: ri === 0 ? 0 : -overlap, gap: 6 }}
          >
            {row.map((t, ti) => (
              <div
                key={t.name}
                className="hex-tile group"
                style={{
                  width: W,
                  height: H,
                  animation: `hex-bob 6s ease-in-out ${(ri + ti) * 0.5}s infinite`,
                }}
                title={t.name}
              >
                <div className="hex-edge hex" />
                <div className="hex-face hex">
                  <div className="flex flex-col items-center gap-1.5">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={t.path} />
                    </svg>
                    <span className="text-[10px] font-semibold tracking-wide text-[var(--text-muted)]">
                      {t.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Invented signature framework — "The PRISM Method"
const phases = [
  {
    no: "01",
    key: "Probe",
    tag: "Immersion",
    desc: "I embed with real users — shadowing, diary studies, raw interviews — to surface the friction no brief ever mentions.",
  },
  {
    no: "02",
    key: "Reframe",
    tag: "Problem Framing",
    desc: "Insights get distilled into sharp How-Might-We statements and a single north-star metric the whole team rallies behind.",
  },
  {
    no: "03",
    key: "Ideate",
    tag: "Divergence",
    desc: "Fifty rough sketches, zero ego. I explore wide, then ruthlessly converge on the three concepts worth prototyping.",
  },
  {
    no: "04",
    key: "Shape",
    tag: "Craft",
    desc: "High-fidelity, token-driven prototypes built in a living design system — pixel-precise and engineering-ready from day one.",
  },
  {
    no: "05",
    key: "Measure",
    tag: "Validation",
    desc: "Usability tests, A/B splits and analytics close the loop. Every release ships with a hypothesis and a way to prove it.",
  },
];

function ProcessFramework() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-28">
      <div className="flex flex-col items-center text-center mb-14">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-3">
          How I Work
        </p>
        <h3 className="text-3xl md:text-4xl font-bold">
          The <span className="gradient-text">PRISM</span> Method
        </h3>
        <p className="text-[var(--text-secondary)] max-w-xl mt-4">
          My signature five-phase framework — refracting a messy problem into a
          spectrum of clear, testable decisions.
        </p>
      </div>

      <div className="relative">
        {/* connecting track (desktop) */}
        <div className="process-line hidden md:block">
          <div className={`process-line-fill ${run ? "run" : ""}`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
          {phases.map((p, i) => (
            <div
              key={p.key}
              className="process-step relative flex flex-col items-center md:items-start text-center md:text-left"
              style={{
                opacity: run ? 1 : 0,
                transform: run ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .7s ease ${0.2 + i * 0.15}s, transform .7s cubic-bezier(.16,1,.3,1) ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="process-node relative z-10 w-14 h-14 rounded-full border border-[var(--border-accent)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)] font-black text-lg mb-5">
                {p.no}
              </div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
                {p.tag}
              </span>
              <h4 className="text-lg font-bold mb-2">{p.key}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[220px]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)", opacity: 0.3 }} />
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20">
        <ScrollReveal className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & <span className="gradient-text">Tools</span></h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">A blend of creative and analytical skills honed over years of designing products people love.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-px bg-[var(--accent)]" />Core Skills</h3>
            {skills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-px bg-[var(--accent)]" />Toolkit</h3>
            <Honeycomb />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <ProcessFramework />
        </ScrollReveal>
      </div>
    </section>
  );
}
