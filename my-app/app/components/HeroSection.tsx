"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 animate-float"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15 animate-float-reverse"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-end) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Orbiting dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-glow-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Text Side */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <div className="animate-slide-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-6">
                Senior UI/UX Designer
              </p>
            </div>

            <div className="animate-slide-up delay-200">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Hi, I&apos;m{" "}
                <span className="gradient-text">Kriti</span>
                <br />
                <span className="text-[var(--text-secondary)]">
                  Gupta
                </span>
              </h1>
            </div>

            <div className="animate-slide-up delay-400">
              <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
                I craft intuitive digital experiences where aesthetics meet
                function. Turning complex problems into elegant, user-centered
                solutions.
              </p>
            </div>

            <div className="animate-slide-up delay-600 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#work" className="btn-primary" id="hero-cta-work">
                <span>View My Work</span>
                <span className="relative z-[1]">→</span>
              </a>
              <a href="#contact" className="btn-outline" id="hero-cta-contact">
                Get In Touch
              </a>
            </div>

            {/* Quick stats */}
            <div className="animate-slide-up delay-800 mt-14 flex gap-10 justify-center md:justify-start">
              {[
                { number: "7+", label: "Years Exp." },
                { number: "50+", label: "Projects" },
                { number: "30+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-2xl font-bold gradient-text">
                    {stat.number}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative animate-fade-in">
              {/* Glow ring behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-20 blur-3xl animate-glow-pulse" />

              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-[var(--border-accent)] animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-[var(--border-subtle)]" />

              {/* Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-[var(--border-accent)] accent-glow">
                <Image
                  src="/profile.png"
                  alt="Kriti Gupta — Senior UI/UX Designer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-8 glass rounded-xl px-4 py-3 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎨</span>
                  <span className="text-xs font-semibold">UI Design</span>
                </div>
              </div>
              <div className="absolute -left-4 bottom-16 glass rounded-xl px-4 py-3 animate-float-reverse">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="text-xs font-semibold">UX Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-[var(--text-muted)] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[var(--accent)] animate-float" />
        </div>
      </div>
    </section>
  );
}
