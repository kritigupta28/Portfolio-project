"use client";

import ScrollReveal from "./ScrollReveal";

const EMAIL = "kritisambhariya@gmail.com";
const PHONE = "7976562422";

const links = [
  { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/in/kriti-gupta-230930209/" },
  { label: "Website", icon: "↗", href: "https://kritigupta.in" },
  { label: "Email", icon: "@", href: `mailto:${EMAIL}` },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)", opacity: 0.3 }} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-20 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s <span className="gradient-text">Create</span> Together</h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-lg">Have a project in mind or just want to chat about design? I&apos;d love to hear from you.</p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form
            className="space-y-6"
            id="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const subject = String(f.get("subject") || "Portfolio inquiry");
              const body = `${f.get("message") || ""}\n\n— ${f.get("name") || ""} (${f.get("email") || ""})`;
              window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Your Name</label>
                <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Email Address</label>
                <input type="email" id="email" name="email" required className="form-input" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Subject</label>
              <input type="text" id="subject" name="subject" className="form-input" placeholder="Project inquiry" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Message</label>
              <textarea id="message" name="message" required rows={5} className="form-input resize-none" placeholder="Tell me about your project..." />
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
          <p className="text-[var(--text-secondary)] text-base mb-1">
            <a href={`mailto:${EMAIL}`} className="hover:text-[var(--accent)] transition-colors break-all">{EMAIL}</a>
          </p>
          <p className="text-[var(--text-muted)] text-sm mb-10">{PHONE} · Jaipur, India</p>
          <div className="flex justify-center gap-6">
            {links.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" id={`social-${s.label.toLowerCase()}`} className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-glow)] transition-all duration-300" aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
