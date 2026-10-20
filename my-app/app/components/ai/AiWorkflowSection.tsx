"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import s from "./AiWorkflowSection.module.css";

type Step = {
  title: string;
  tool: string;
  body: string;
  stageLabel: string;
  console: string;
};

const STEPS: Step[] = [
  {
    title: "Design",
    tool: "Figma",
    body: "Research, flows and high-fidelity screens in Figma. Every state, spacing value and token is decided here, before any code exists.",
    stageLabel: "Wireframe",
    console: "figma · frame “Case card” · 3 breakpoints",
  },
  {
    title: "Brief",
    tool: "Prompt & spec",
    body: "I turn the frame into a precise brief: layout, states, tokens, breakpoints and constraints. A clear spec is what makes the output usable.",
    stageLabel: "Spec",
    console: "spec.md · layout · states · tokens · constraints",
  },
  {
    title: "Build",
    tool: "Claude Code",
    body: "Claude Code writes production components in the real codebase, wired to the design tokens. Cursor, Google Stitch, Claude Design and Antigravity IDE join where they fit.",
    stageLabel: "Components",
    console: "✓ wrote components/CaseCard.tsx",
  },
  {
    title: "Verify",
    tool: "Real browser",
    body: "Every change is checked in a real browser at phone, tablet and desktop widths, in light and dark themes, with screenshots compared against the design.",
    stageLabel: "375 · 768 · 1440",
    console: "✓ screenshots · 375 · 768 · 1440 · light · dark",
  },
  {
    title: "Refine",
    tool: "Details & a11y",
    body: "I iterate on what the screenshots reveal: spacing, type rhythm, focus states, contrast and reduced motion, until it matches the design.",
    stageLabel: "Polish",
    console: "✓ focus-visible · 8pt spacing · reduced motion",
  },
  {
    title: "Ship",
    tool: "Git & deploy",
    body: "Commit, push, deploy. This portfolio and every case study in it shipped through these same six steps.",
    stageLabel: "Production",
    console: "5bd6e50  feat: add TeamDay case study",
  },
];

const PROMPTS = [
  "Build this Figma frame as a responsive component. Tokens only, no hard-coded colors.",
  "Match the 8pt spacing from the spec and stack to one column under 768px.",
  "Add hover, focus-visible and disabled states.",
  "Screenshot 375, 768 and 1440 in light and dark. List anything that overflows.",
  "Make the card keyboard-accessible and check contrast in both themes.",
  "Respect prefers-reduced-motion: no transitions, instant swaps.",
  "Tighten the heading rhythm to match the Figma type scale.",
  "Keep the hairline dividers at 1px on every screen density.",
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

/* ─── The evolving example UI: one case-study card ─── */
function CaseCard({ mini = false }: { mini?: boolean }) {
  return (
    <div className={`${s.card} ${mini ? s.cardMini : ""}`}>
      <div className={`${s.thumb} ${s.el}`}>
        <svg className={s.thumbX} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className={s.kanban}>
          {[3, 2, 3].map((n, c) => (
            <div key={c} className={s.kcol}>
              <i className={s.khead} />
              {Array.from({ length: n }).map((_, k) => (
                <i key={k} className={s.kcard} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={s.body}>
        <span className={`${s.eyebrow} ${s.el}`}>Research · End-to-End</span>
        <span className={`${s.title} ${s.el}`}>TeamDay</span>
        <span className={`${s.desc} ${s.el}`}>
          HRM &amp; project management: backlog, sprints and time tracking.
        </span>
        {!mini && (
          <span className={s.tags}>
            {["Research", "Sprints", "Time"].map((t) => (
              <span key={t} className={`${s.tag} ${s.el}`}>{t}</span>
            ))}
          </span>
        )}
        <span className={`${s.cta} ${s.el}`}>View case study →</span>
      </div>
    </div>
  );
}

function Stage({ step, inline = false }: { step: number; inline?: boolean }) {
  const meta = STEPS[step];
  const cls = [
    s.stage,
    inline ? s.stageInline : "",
    step <= 1 ? s.isWire : s.isBuilt,
    step === 1 ? s.isBrief : "",
    step === 2 ? s.isBuild : "",
    step === 3 ? s.isVerify : "",
    step === 4 ? s.isRefine : "",
    step === 5 ? s.isShip : "",
  ].join(" ");

  return (
    <div className={cls} aria-hidden="true">
      <div className={s.frame}>
        {/* top bar */}
        <div className={s.bar}>
          <span className={s.dots}><i /><i /><i /></span>
          <span className={s.barLabel}>
            <b>{pad(step)}</b> {meta.title} — {meta.stageLabel}
          </span>
          <span className={s.barTool}>{meta.tool}</span>
        </div>

        {/* canvas */}
        <div className={s.canvas}>
          <div className={s.cardWrap}>
            <CaseCard />

            {/* Build: one-time shimmer as blocks become components */}
            {step === 2 && <span key="shimmer" className={s.shimmer} />}

            {/* Brief: spec annotations */}
            <div className={`${s.layer} ${s.briefLayer}`}>
              <span className={`${s.note} ${s.noteL}`} style={{ top: "13.9em" }}>H3 · Inter Bold</span>
              <span className={`${s.note} ${s.noteL}`} style={{ top: "17.6em" }}>--text-secondary</span>
              <span className={`${s.note} ${s.noteR}`} style={{ top: "0.6em" }}>radius 16</span>
              <span className={`${s.note} ${s.noteR}`} style={{ top: "21.4em" }}>hover · focus</span>
              <span className={s.measureX} style={{ top: "20.6em" }}><em>24</em></span>
              <span className={s.measureY} style={{ top: "10.5em", height: "2em" }}><em>24</em></span>
            </div>

            {/* Refine: spacing guides + focus details */}
            <div className={`${s.layer} ${s.refineLayer}`}>
              <span className={s.guideL} />
              <span className={s.guideR} />
              <span className={s.guideRow} />
              <span className={`${s.chip} ${s.chipR}`} style={{ top: "5em" }}>✓ focus-visible</span>
              <span className={`${s.chip} ${s.chipR}`} style={{ top: "8.4em" }}>✓ contrast AA</span>
              <span className={`${s.chip} ${s.chipL}`} style={{ top: "5em" }}>8pt rhythm</span>
              <span className={`${s.chip} ${s.chipL}`} style={{ top: "8.4em" }}>44px target</span>
            </div>

            {/* Ship: badge */}
            <span className={s.badge}>
              <span className={s.badgeDot} /> Deployed ✓
            </span>
          </div>

          {/* Brief: prompt bubble */}
          <div className={s.prompt}>
            <span className={s.promptWho}>Prompt</span>
            Build &lt;CaseCard /&gt; from this frame. Tokens only, 16px radius,
            hover + focus states, stacks under 768px.
            <span className={s.caret} />
          </div>

          {/* Verify: three widths, light/dark */}
          <div className={s.verify}>
            <div className={`${s.device} ${s.dPhone}`}>
              <div className={s.deviceScreen} data-theme="dark"><CaseCard mini /></div>
              <span className={s.devLabel}>375</span>
            </div>
            <div className={`${s.device} ${s.dTab}`}>
              <div className={s.deviceScreen} data-theme="light"><CaseCard mini /></div>
              <span className={s.devLabel}>768</span>
            </div>
            <div className={`${s.device} ${s.dDesk}`}>
              <div className={s.flip}>
                <div className={s.flipPane} data-theme="dark">
                  <div className={s.deviceScreen}><CaseCard mini /></div>
                </div>
                <div className={`${s.flipPane} ${s.flipTop}`} data-theme="light">
                  <div className={s.deviceScreen}><CaseCard mini /></div>
                </div>
                <span className={s.wipe} />
              </div>
              <span className={s.devLabel}>1440 · light / dark</span>
            </div>
          </div>
        </div>

        {/* console line */}
        <div className={s.console}>
          <span className={s.consolePs}>{step === 5 ? "git" : step === 0 ? "◇" : "›"}</span>
          <span className={s.consoleText}>{meta.console}</span>
          {step === 5 ? (
            <span className={s.consoleOk}>main → production</span>
          ) : (
            <span className={s.caret} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AiWorkflowSection() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    // A thin reading line across the middle of the viewport: whichever step
    // crosses it is active. Pure observation, scrolling is never intercepted.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-49% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const loop = [...PROMPTS, ...PROMPTS];

  return (
    <section id="ai-workflow" className={`relative py-24 md:py-32 ${s.root}`}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)", opacity: 0.3 }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-x-16 gap-y-6 items-end">
          <div>
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
                AI Workflow
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Supercharged with <span className="gradient-text">AI</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              I design first, then brief Claude Code to build it. Six repeatable
              steps take a screen from a Figma frame to a live, responsive build.
              Scroll to watch one card get made.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Prompt marquee ── */}
      <div className={`${s.marquee} mt-12 md:mt-14`}>
        <ul className={s.marqueeTrack} aria-label="Example prompts from my workflow">
          {loop.map((p, i) => (
            <li key={i} className={s.marqueeItem} aria-hidden={i >= PROMPTS.length ? true : undefined}>
              <span className={s.marqueeChev}>›</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Steps + sticky stage ── */}
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 mt-10 md:mt-14">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-x-14">
          <ol className={s.steps} style={{ ["--progress" as string]: (active + 0.3) / STEPS.length }}>
            {STEPS.map((st, i) => (
              <li
                key={st.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                data-index={i}
                className={`${s.step} ${i === active ? s.stepActive : ""}`}
              >
                <span className={s.stepDot} />
                <div>
                  <p className={s.stepMeta}>
                    <span>{pad(i)}</span>
                    <span className={s.stepTool}>{st.tool}</span>
                  </p>
                  <h3 className="text-2xl md:text-[1.75rem] font-bold leading-tight mt-2">{st.title}</h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed mt-2 max-w-md">
                    {st.body}
                  </p>
                </div>
                <div className={s.inlineStage}>
                  <Stage step={i} inline />
                </div>
              </li>
            ))}
          </ol>

          <div className={s.stickyCol}>
            <div className={s.sticky}>
              <Stage step={active} />
              <div className={s.ticks}>
                {STEPS.map((st, i) => (
                  <span key={st.title} className={i <= active ? s.tickOn : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
