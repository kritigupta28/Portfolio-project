"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import w from "./WorkSection.module.css";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  caseStudy?: {
    href: string;
    theme: "fizvizz" | "lacs" | "nest";
    /** phones: fanned phone screens; desktop: overlapping browser windows */
    layout: "phones" | "desktop";
    screens: { src: string; w: number; h: number }[];
  };
};

const coverTheme = { fizvizz: w.coverFizvizz, lacs: w.coverLacs, nest: w.coverNest };

const projects: Project[] = [
  {
    id: "fizvizz",
    title: "Fizvizz",
    subtitle: "Digital Business Card & Networking App · Android & iOS",
    category: "Mobile App Design",
    description:
      "Designed native mobile experiences for digital business cards: card creation, separate cards for different circles, and sharing by QR code, link, SMS and email without exposing personal contact details — plus groups, events, introductions, privacy controls and AI-powered card scanning.",
    tags: ["Digital Cards", "QR Sharing", "Events & Groups"],
    caseStudy: {
      href: "/work/fizvizz",
      theme: "fizvizz",
      layout: "phones",
      screens: [
        { src: "/case-studies/fizvizz/qr-share-card.png", w: 474, h: 913 },
        { src: "/case-studies/fizvizz/home-pending.png", w: 474, h: 914 },
        { src: "/case-studies/fizvizz/events-attend.png", w: 474, h: 914 },
      ],
    },
  },
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
    caseStudy: {
      href: "/work/nest-school-erp",
      theme: "nest",
      layout: "desktop",
      screens: [
        { src: "/case-studies/nest/app/dashboard.png", w: 2880, h: 1800 },
        { src: "/case-studies/nest/app/log-attendance.png", w: 2880, h: 1800 },
      ],
    },
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

// Fanned positions for the case-study screens peeking out of the cover.
const peek = [
  "right-[30%] sm:right-[33%] -rotate-[8deg] w-[24%] sm:w-[17%] md:w-[13%]",
  "right-[15%] sm:right-[18%] w-[27%] sm:w-[19%] md:w-[14.5%] z-10",
  "right-0 sm:right-[3%] rotate-[8deg] w-[24%] sm:w-[17%] md:w-[13%]",
];

// Overlapping browser windows for desktop products (back, then front).
const windows = [
  "right-[4%] top-[12%] w-[60%] sm:w-[44%] md:w-[40%] -rotate-[3deg]",
  "right-[30%] top-[40%] w-[32%] md:w-[28%] rotate-[2deg] z-10 hidden sm:block",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cs = project.caseStudy;

  const body = (
    <>
      {/* Cover */}
      <div
        className={`relative overflow-hidden border-b border-[var(--border-subtle)] ${
          cs ? `${w.cover} ${coverTheme[cs.theme]} h-56 sm:h-64` : "bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-secondary)] h-40 sm:h-48"
        }`}
      >
        <span
          aria-hidden
          className={`project-image absolute -bottom-6 text-[9rem] sm:text-[11rem] font-black leading-none text-[var(--text-primary)] opacity-[0.06] select-none ${
            cs ? `${w.num} left-[38%] hidden sm:block` : "-right-2"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {cs && (
          <>
            <svg viewBox="0 0 40 40" aria-hidden className={`${w.doodle} w-7 left-[7%] top-[13%]`}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M20 4l4.6 10.2 11 1.2-8.3 7.4 2.4 10.9L20 28.1l-9.7 5.6 2.4-10.9-8.3-7.4 11-1.2z" />
            </svg>
            <svg viewBox="0 0 62 26" aria-hidden className={`${w.doodle} ${w.doodleSlow} w-14 left-[24%] top-[20%] hidden sm:block`}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 14c6-10 10-10 14 0s8 10 14 0 10-10 14 0 8 10 14 0" />
            </svg>
            <svg viewBox="0 0 32 32" aria-hidden className={`${w.doodle} w-5 sm:w-6 left-[44%] sm:left-[36%] top-[10%] sm:top-auto sm:bottom-[16%]`}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M16 2c1 8 4 11 12 14-8 3-11 6-12 14-1-8-4-11-12-14 8-3 11-6 12-14z" />
            </svg>
            <svg viewBox="0 0 48 46" aria-hidden className={`${w.doodle} ${w.doodleSlow} w-9 right-[46%] top-[12%] hidden md:block`}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8h34a4 4 0 014 4v18a4 4 0 01-4 4H22l-9 8v-8H6a4 4 0 01-4-4V12a4 4 0 014-4zM12 18h22M12 25h14" />
            </svg>
          </>
        )}

        {cs?.layout === "phones" &&
          cs.screens.map((sc, k) => (
            <Image
              key={sc.src}
              src={sc.src}
              alt=""
              width={sc.w}
              height={sc.h}
              sizes="(max-width: 640px) 30vw, 180px"
              className={`absolute top-[18%] sm:top-[14%] h-auto drop-shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 ${peek[k]}`}
              style={{ transitionDelay: `${k * 60}ms` }}
            />
          ))}

        {cs?.layout === "desktop" &&
          cs.screens.slice(0, 2).map((sc, k) => (
            <div
              key={sc.src}
              className={`${w.win} ${windows[k]} group-hover:-translate-y-2`}
              style={{ transitionDelay: `${k * 60}ms` }}
            >
              <div className={w.winBar} aria-hidden>
                <i />
                <i />
                <i />
              </div>
              <Image src={sc.src} alt="" width={sc.w} height={sc.h} sizes="(max-width: 640px) 60vw, 420px" className="block w-full h-auto" />
            </div>
          ))}

        <div className="relative h-full p-6 md:p-8 flex flex-col justify-end items-start gap-3">
          {cs && (
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-[var(--text-primary)] text-[var(--bg-primary)]">
              Case study
            </span>
          )}
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">{project.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 md:p-8 ${cs ? "md:grid md:grid-cols-[1.4fr_1fr] md:gap-10 md:items-end" : ""}`}>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
            {project.category}
          </p>
          <h3 className="sr-only">{project.title}</h3>
          <p className="text-sm text-[var(--text-muted)] mb-3">{project.subtitle}</p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{project.description}</p>
        </div>
        <div>
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
          {cs && (
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              View case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          )}
        </div>
      </div>
    </>
  );

  return cs ? (
    <Link href={cs.href} id={`project-${project.id}`} className="project-card group block h-full">
      {body}
    </Link>
  ) : (
    <div id={`project-${project.id}`} className="project-card group h-full">
      {body}
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="relative py-32">
      {/* Decorative gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)",
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
            Product work across networking, ERP, HRM, education, and disaster-communication platforms.
          </p>
        </ScrollReveal>

        {/* Projects Grid — case-study cards span both columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.id}
              delay={(project.caseStudy ? 0 : i % 2) * 150}
              className={project.caseStudy ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
