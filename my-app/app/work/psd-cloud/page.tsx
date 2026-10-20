import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import CustomCursor from "../../components/CustomCursor";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { CaseHeader, Icon, Sparkle, Spiral, Squiggle, Star, kit as s } from "../_kit/parts";
import p from "./psd.module.css";

export const metadata: Metadata = {
  title: "PSD Cloud — Case Study Coming Soon · Kriti Gupta",
  description: "The PSD Cloud ERP & HRM case study is being written up. Explore Kriti Gupta's other case studies in the meantime.",
};

const WRAP = "max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20";

const modules = [
  "RFI Tracking",
  "Document Control",
  "Employee Management",
  "Admin Portal",
  "Permission & Access Management",
  "Job Data",
  "Client Management",
  "Client Portal",
];

const others = [
  { href: "/work/fizvizz", title: "Fizvizz", kind: "Mobile App Design" },
  { href: "/work/teamday", title: "TeamDay", kind: "Research · End-to-End Design" },
  { href: "/work/nest-school-erp", title: "Nest School ERP", kind: "Product Design" },
  { href: "/work/lacs", title: "LACS", kind: "UI Design" },
];

export default function PsdCloudComingSoon() {
  return (
    <>
      <CustomCursor />
      <CaseHeader />

      <main className={`${s.page} ${s.themePsd} overflow-x-clip`}>
        <section className="relative lg:min-h-[78svh] pt-32 md:pt-40 pb-16 md:pb-20 flex items-center">
          <div className={`${s.glow} ${s.glowA}`} aria-hidden />
          <div className={`${WRAP} relative w-full grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-12 items-center`}>
            <div className="relative">
              <Star className={`${s.float} absolute -top-10 right-6 w-9 sm:right-24`} />
              <ScrollReveal>
                <span className={p.status}>
                  <span className={p.pulse} aria-hidden />
                  Case study in progress
                </span>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <p className="mt-8 text-xs font-semibold tracking-[0.3em] uppercase text-[var(--text-muted)]">
                  ERP &amp; HRM Software · Product Design
                </p>
                <h1 className="mt-3 uppercase tracking-tight leading-[0.95]">
                  <span className="block text-[2.6rem] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem] font-black">PSD Cloud</span>
                  <span className="block text-[1.6rem] sm:text-[2.4rem] lg:text-[2.1rem] xl:text-[2.35rem] font-light mt-1">
                    uploading <span className={s.accent}>soon</span>
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="mt-6 max-w-lg text-[var(--text-secondary)] leading-relaxed">
                  I&apos;m writing up the enterprise workflows I designed for Precision &amp; Steeling Design — from RFI tracking
                  and document control to access management and the client portal. The full case study lands here soon.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/#work" className={s.btnPrimary}>← Back to all work</Link>
                  <Link href="/#contact" className={s.btnGhost}>Ask me about it</Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Uploading panel */}
            <ScrollReveal delay={150}>
              <div className="relative">
                <Sparkle className={`${s.float} absolute -top-6 left-[6%] w-7 z-10`} />
                <Spiral className={`${s.floatSlow} absolute -bottom-6 right-[4%] w-10 z-10`} />

                <div className={p.panel} role="status" aria-label="Case study uploading soon">
                  <div className={p.bar} aria-hidden>
                    <span className={p.dots}><i /><i /><i /></span>
                    <span className={p.url}>kriti.portfolio/work/psd-cloud</span>
                  </div>

                  <div className={p.body}>
                    {/* Skeleton of the coming page */}
                    <div className={p.skeleton} aria-hidden>
                      <div className={p.skSide}>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className={p.sk} style={{ "--i": i, width: i === 1 ? "80%" : "64%" } as CSSProperties} />
                        ))}
                      </div>
                      <div className={p.skMain}>
                        <span className={p.sk} style={{ "--i": 1, width: "46%", height: "0.9rem" } as CSSProperties} />
                        <div className={p.skTiles}>
                          {[0, 1, 2].map((i) => (
                            <span key={i} className={`${p.sk} ${p.skTile}`} style={{ "--i": i + 2 } as CSSProperties} />
                          ))}
                        </div>
                        <span className={`${p.sk} ${p.skBlock}`} style={{ "--i": 5 } as CSSProperties} />
                      </div>
                    </div>

                    {/* Upload badge */}
                    <div className={p.upload}>
                      <span className={p.cloud} aria-hidden>
                        <svg viewBox="0 0 48 48" className="w-9 h-9">
                          <path d="M14 34h-1a9 9 0 01-1.2-17.9A12 12 0 0135 13.5 9.5 9.5 0 0136 34h-2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path className={p.arrow} d="M24 38V22M18 28l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold leading-tight">Uploading case study…</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">Screens, flows and write-up</p>
                        <span className={p.track} aria-hidden>
                          <span className={p.fill} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${s.badge} -left-2 sm:left-[-1.5rem] top-[38%]`}>
                  <span className={s.badgeIcon}><Icon name="cards" className="w-3.5 h-3.5" /></span>
                  8 modules
                </div>
                <div className={`${s.badge} right-[-0.5rem] sm:right-[-1rem] top-[8%]`}>
                  <span className={s.badgeIconCyan}><Icon name="clock" className="w-3.5 h-3.5" /></span>
                  Coming soon
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What's coming */}
        <section className="relative pb-16 md:pb-24">
          <div className={WRAP}>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--text-muted)]">What&apos;s being written up</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {modules.map((m, i) => (
                  <li key={m} className={p.module} style={{ "--i": i } as CSSProperties}>
                    <span className={p.moduleDot} aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Meanwhile */}
        <section className="relative py-16 md:py-24 border-t border-[var(--border-subtle)]">
          <div className={WRAP}>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                In the meantime, <span className={s.accent}>read these</span>
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {others.map((o, i) => (
                <ScrollReveal key={o.href} delay={i * 80} className="h-full">
                  <Link href={o.href} className={p.other}>
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">{o.kind}</span>
                    <span className="mt-2 block text-xl font-extrabold tracking-tight">{o.title}</span>
                    <span className={p.otherArrow} aria-hidden>→</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
