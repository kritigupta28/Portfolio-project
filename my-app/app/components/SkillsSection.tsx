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

const tools = [
  { name: "Figma", icon: "🎨" },
  { name: "Sketch", icon: "💎" },
  { name: "Adobe XD", icon: "🔷" },
  { name: "Framer", icon: "⚡" },
  { name: "Principle", icon: "🎬" },
  { name: "Miro", icon: "📋" },
  { name: "Notion", icon: "📝" },
  { name: "Jira", icon: "📌" },
];

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

        <div className="grid md:grid-cols-2 gap-16">
          <ScrollReveal>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-px bg-[var(--accent)]" />Core Skills</h3>
            {skills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-px bg-[var(--accent)]" />Toolkit</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((t) => (
                <div key={t.name} className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 cursor-default">
                  <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{t.icon}</span>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">{t.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mt-12 mb-8 flex items-center gap-3"><span className="w-8 h-px bg-[var(--accent)]" />My Process</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { step: "01", label: "Discover", desc: "Research & empathy" },
                { step: "02", label: "Define", desc: "Strategy & IA" },
                { step: "03", label: "Design", desc: "UI & prototyping" },
                { step: "04", label: "Deliver", desc: "Test & iterate" },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300">
                  <span className="text-2xl font-black gradient-text">{item.step}</span>
                  <h4 className="text-sm font-bold mt-2">{item.label}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
