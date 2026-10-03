"use client";

import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: "psd-cloud",
    title: "PSD Cloud",
    subtitle: "Precision & Steeling Design · ERP & HRM Software",
    category: "Product Design",
    description:
      "Designed enterprise workflows across RFI Tracking, Document Control, Employee Management, Admin Portal, Permission & Access Management, Job Data, Client Management, and Client Portal.",
    tags: ["RFI Tracking", "Document Control", "Access Management"],
  },
  {
    id: "teamday",
    title: "TeamDay",
    subtitle: "HRM & Project Management Platform",
    category: "Research · End-to-End Design",
    description:
      "Conducted product research and designed end-to-end experiences for daily task management, project backlog, stories, sprints, time management, and project tracking, including Microsoft Teams alerts.",
    tags: ["Product Research", "Sprint Planning", "Time Management"],
  },
  {
    id: "nest-school-erp",
    title: "Nest School ERP",
    subtitle: "School Management / ERP Platform",
    category: "Product Design",
    description:
      "Worked across Student, Teacher, Staff, Transportation, Attendance, Fees, Reports, and Exam/Assessment modules, with requirements aligned to UDISE / PSP compatibility.",
    tags: ["Attendance", "Fees & Reports", "Exams"],
  },
  {
    id: "lacs",
    title: "LACS",
    subtitle: "Locally Accessible Cloud System · Disaster Communication Platform",
    category: "UI Design",
    description:
      "Designed Feed, Messaging, and SOS/Emergency experiences for a portable local communication system built for situations where internet or mobile connectivity is unavailable or disrupted.",
    tags: ["Feed", "Messaging", "SOS / Emergency"],
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="relative py-32">
      {/* Decorative gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)",
          opacity: 0.3,
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20">
        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            Product work across ERP, HRM, education, and disaster-communication
            platforms.
          </p>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 150}>
              <div className="project-card group h-full" id={`project-${project.id}`}>
                {/* Typographic cover */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
                  <span
                    aria-hidden
                    className="project-image absolute -bottom-6 -right-2 text-[9rem] sm:text-[11rem] font-black leading-none text-[var(--text-primary)] opacity-[0.06] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative h-full p-6 md:p-8 flex items-end">
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {project.title}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
                    {project.category}
                  </p>
                  <h3 className="sr-only">{project.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
