"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: "fintrack",
    title: "FinTrack Pro",
    subtitle: "Fitness Tracking App",
    category: "Mobile App · UI/UX Design",
    description:
      "A comprehensive fitness tracking experience with real-time analytics, personalized workout plans, and an intuitive dashboard that keeps users motivated.",
    image: "/project-fintrack.png",
    tags: ["Figma", "Prototyping", "User Research"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "luxemart",
    title: "LuxeMart",
    subtitle: "Luxury E-commerce Platform",
    category: "Web App · Product Design",
    description:
      "A premium shopping experience with elegant product displays, seamless checkout, and a design system that elevates the brand's luxury positioning.",
    image: "/project-luxemart.png",
    tags: ["Design System", "Responsive", "A/B Testing"],
    color: "from-amber-500/20 to-rose-500/20",
  },
  {
    id: "zenspace",
    title: "ZenSpace",
    subtitle: "Wellness & Meditation App",
    category: "Mobile App · UX Strategy",
    description:
      "A calming wellness companion featuring guided meditations, breathing exercises, and sleep tracking — designed to promote mental wellbeing.",
    image: "/project-zenspace.png",
    tags: ["UX Research", "Motion Design", "Accessibility"],
    color: "from-teal-500/20 to-emerald-500/20",
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    subtitle: "Travel Booking Platform",
    category: "Web App · End-to-End Design",
    description:
      "An immersive travel booking platform with rich destination storytelling, dynamic itinerary builders, and a frictionless booking flow.",
    image: "/project-wanderlust.png",
    tags: ["Wireframing", "Visual Design", "Usability Testing"],
    color: "from-orange-500/20 to-sky-500/20",
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

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            A curated collection of projects where I turned design challenges
            into elegant, user-loved solutions.
          </p>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 150}>
              <div className="project-card group cursor-pointer" id={`project-${project.id}`}>
                {/* Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10`}
                  />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover project-image"
                  />
                  {/* Hover overlay */}
                  <div className="project-overlay z-20 flex items-end p-6">
                    <span className="text-sm font-semibold tracking-wider uppercase text-[var(--accent)]">
                      View Case Study →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-1">
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
