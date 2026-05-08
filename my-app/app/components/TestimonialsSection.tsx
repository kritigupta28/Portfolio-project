"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CEO, FinTrack Pro",
    quote: "Kriti transformed our entire product experience. Her eye for detail and deep understanding of user behavior is truly exceptional. Our user retention improved by 40%.",
    avatar: "AM",
  },
  {
    name: "Sarah Chen",
    role: "Product Lead, LuxeMart",
    quote: "Working with Kriti was a game-changer. She doesn't just design interfaces — she crafts experiences that tell stories. Our conversion rates speak for themselves.",
    avatar: "SC",
  },
  {
    name: "David Park",
    role: "Founder, ZenSpace",
    quote: "Kriti has this rare ability to balance aesthetics with usability perfectly. She understood our vision from day one and elevated it beyond what we imagined.",
    avatar: "DP",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What <span className="gradient-text">Clients</span> Say</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">Kind words from amazing people I&apos;ve had the pleasure of working with.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 150}>
              <div className="testimonial-card h-full flex flex-col">
                {/* Quote icon */}
                <span className="text-4xl gradient-text font-serif mb-4">&ldquo;</span>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center text-sm font-bold text-white">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
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
