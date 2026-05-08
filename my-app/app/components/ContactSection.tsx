"use client";

import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)", opacity: 0.3 }} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s <span className="gradient-text">Create</span> Together</h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-lg">Have a project in mind or just want to chat about design? I&apos;d love to hear from you.</p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()} id="contact-form">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Your Name</label>
                <input type="text" id="name" className="form-input" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Email Address</label>
                <input type="email" id="email" className="form-input" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Subject</label>
              <input type="text" id="subject" className="form-input" placeholder="Project inquiry" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Message</label>
              <textarea id="message" rows={5} className="form-input resize-none" placeholder="Tell me about your project..." />
            </div>
            <div className="text-center pt-4">
              <button type="submit" className="btn-primary text-base px-10 py-4" id="contact-submit">
                <span>Send Message</span>
                <span className="relative z-[1]">✉️</span>
              </button>
            </div>
          </form>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={400} className="mt-16 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-6 tracking-wider uppercase">Or find me on</p>
          <div className="flex justify-center gap-6">
            {[
              { label: "LinkedIn", icon: "in", href: "#" },
              { label: "Dribbble", icon: "Dr", href: "#" },
              { label: "Behance", icon: "Be", href: "#" },
              { label: "Twitter", icon: "𝕏", href: "#" },
            ].map((s) => (
              <a key={s.label} href={s.href} id={`social-${s.label.toLowerCase()}`} className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-glow)] transition-all duration-300" aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
