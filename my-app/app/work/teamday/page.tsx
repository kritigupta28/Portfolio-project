import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import CustomCursor from "../../components/CustomCursor";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import {
  Arrow,
  BrowserFrame,
  CaseHeader,
  ChatBubble,
  Circle,
  Connector,
  Heart,
  Icon,
  SectionTitle,
  Sparkle,
  Spiral,
  Squiggle,
  Star,
  WindowStack,
  kit as s,
  type Shot,
} from "../_kit/parts";
import { shots } from "./parts";

export const metadata: Metadata = {
  title: "TeamDay — Product Design Case Study · Kriti Gupta",
  description:
    "Research and end-to-end design for TeamDay, an HRM and project-management platform for daily plans, backlogs, stories, time tracking and Microsoft Teams updates.",
  openGraph: {
    title: "TeamDay — Product Design Case Study",
    description: "Designing a team's day: plans, backlog, time tracking and check-ins.",
    images: ["/case-studies/teamday/app/backlog.png"],
    type: "article",
  },
};

const WRAP = "max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20";
const URL = "team.day";

/* ─────────────────────────── content ─────────────────────────── */

const stats = [
  { value: "3", label: "Planning levels: board → story → task", icon: "modules" },
  { value: "4", label: "Time stats on the home screen", icon: "clock" },
  { value: "2", label: "Daily check-ins: SOD & EOD", icon: "check" },
  { value: "1", label: "Microsoft Teams integration", icon: "bell" },
];

const problems = [
  "Plans, tasks and time live in different tools, so nobody sees the whole day",
  "Stand-ups and status messages are typed out again by hand every morning and evening",
  "Estimates are never compared with the time actually spent",
  "Unfinished work quietly disappears instead of carrying forward",
  "Blocked tasks surface late, after a day is already lost",
  "Leads can't see what each member worked on across a sprint without asking",
];

const goals = [
  { title: "One home for the day", body: "Open the app and see today's tasks, estimates, actual time and breaks at a glance.", icon: "clock" },
  { title: "Plan from the backlog", body: "Boards, stories and tasks give every project a clear structure to pull work from.", icon: "modules" },
  { title: "Time that tells the truth", body: "Every task carries an estimate (E) and actual time (A), with logs behind it.", icon: "chart" },
  { title: "Updates without typing", body: "Start- and end-of-day check-ins are built from real work, with alerts in Microsoft Teams.", icon: "bell" },
];

const flow = [
  { title: "Sign in", sub: "Pick organisation" },
  { title: "Plan the day", sub: "Today's tasks" },
  { title: "Post SOD", sub: "Start-of-day status" },
  { title: "Work & track", sub: "Estimate vs actual" },
  { title: "Take breaks", sub: "Break timer" },
  { title: "End of Day", sub: "Post EOD" },
  { title: "Team updated", sub: "Microsoft Teams" },
];

type Feature = { title: string; accent: string; body: string; points: string[]; main: Shot; sub?: Shot };

const features: Feature[] = [
  {
    title: "Today's plan,",
    accent: "at a glance",
    body: "Home answers one question: what am I doing today? Tasks are grouped by project, the day's numbers sit up top, and unfinished work arrives already tagged as carried forward.",
    points: ["Total tasks, estimated, actual and break time", "Projects rail with task count and hours each", "Carried-forward (CF) and estimate (E) chips on every task"],
    main: shots.todayPlan,
    sub: shots.todayEmpty,
  },
  {
    title: "A backlog that",
    accent: "stays organised",
    body: "Each project's backlog is split into boards, so experiments, bug fixes and planned work never blur together. Stories show status, priority, points, assignees and live task counts.",
    points: ["Boards rail with one-click switching", "Story cards with status, priority flag and assignees", "Filter by status and value, or search stories"],
    main: shots.backlog,
    sub: shots.backlogFilter,
  },
  {
    title: "Stories break into",
    accent: "tasks",
    body: "Opening a story slides in a panel instead of leaving the backlog. Its tasks, description and updates sit in tabs, and each task shows its estimate next to the time it really took.",
    points: ["Slide-in panel keeps the backlog in context", "Tasks, Description and Updates tabs", "Estimate (E) vs actual (A) on every task"],
    main: shots.storyDetail,
    sub: shots.backlogBoard,
  },
  {
    title: "Every minute",
    accent: "accounted for",
    body: "Task detail stacks beside its story, with links to the work, remarks and a log of actual time entries — so estimates improve sprint after sprint.",
    points: ["Links and description for the deliverable", "Remarks for context and hand-offs", "Actual time logs with timestamps"],
    main: shots.taskDetail,
  },
  {
    title: "Plans for",
    accent: "team leads",
    body: "Project Plan shows what each member worked on across a date range, with estimates, actuals, status and linked work — the sprint review without the meeting.",
    points: ["Members rail with task counts", "Date-range filter and WorkDay toggle", "Linked GitHub work on each task"],
    main: shots.projectPlan,
    sub: shots.holidays,
  },
  {
    title: "Status in",
    accent: "Microsoft Teams",
    body: "Once authorised from the profile, TeamDay sends alerts and updates to Microsoft Teams, so the team stays informed where they already talk.",
    points: ["One-time authorisation from the profile", "Alerts delivered where the team already talks", "Activity log for a record of the day"],
    main: shots.teams,
    sub: shots.activityLog,
  },
];

const palette = [
  { name: "Teamday green", hex: "#50B283", ink: "#fff" },
  { name: "Action", hex: "#00A96E", ink: "#fff" },
  { name: "Estimate blue", hex: "#377CFB", ink: "#fff" },
  { name: "End of Day", hex: "#F87171", ink: "#fff" },
  { name: "Pending", hex: "#FFBE00", ink: "#333C4D" },
  { name: "Ink", hex: "#333C4D", ink: "#fff" },
];

const takeaways = [
  { title: "Make the day the unit", body: "Starting from 'today' rather than from projects made planning a daily habit." },
  { title: "Show estimate next to actual", body: "Putting E and A side by side turned time tracking into a feedback loop." },
  { title: "Open details in place", body: "Slide-in story and task panels keep people in the backlog instead of bouncing between pages." },
  { title: "Meet people where they talk", body: "Alerts in Microsoft Teams cut down the status messages people had to chase." },
];

/* ─────────────────────────── small pieces ─────────────────────────── */

function TeamdayMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="7" width="32" height="29" rx="7" fill="#50B283" />
      <rect x="4" y="7" width="32" height="9" rx="4.5" fill="#3f9e70" />
      <path d="M12 4v7M28 4v7" stroke="#1d3b30" strokeWidth="3" strokeLinecap="round" />
      <path d="M13 25.5l4.5 4.5L28 20" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProblemArt() {
  const bubble = (x: number, y: number, r: number, key: number) => (
    <g key={key} transform={`rotate(${r} ${x + 48} ${y + 26})`}>
      <path d={`M${x} ${y + 8}a8 8 0 018-8h80a8 8 0 018 8v30a8 8 0 01-8 8H${x + 24}l-12 10v-10H${x + 8}a8 8 0 01-8-8z`} className={s.paper} />
      <path d={`M${x + 12} ${y + 16}h56M${x + 12} ${y + 28}h40`} className={s.paperLine} />
    </g>
  );
  return (
    <svg viewBox="0 0 440 330" className="w-full h-auto" role="img" aria-label="Scattered status messages and timesheets coming together into one daily plan">
      <ellipse cx="220" cy="306" rx="190" ry="14" className={s.shadowEllipse} />
      {bubble(14, 150, -8, 1)}
      {bubble(54, 210, 6, 2)}
      {bubble(22, 82, 10, 3)}
      <g transform="rotate(-12 150 250)">
        <circle cx="150" cy="250" r="30" className={s.paper} />
        <path d="M150 232v18l12 8" fill="none" stroke="var(--cs-alt)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <text x="168" y="104" className={s.qmark}>?</text>
      <path d="M196 200 C 226 150, 248 146, 272 158" className={s.artArrow} />
      <path d="M262 148 l12 10 -14 6" className={s.artArrowHead} />
      <g transform="rotate(4 350 185)">
        <rect x="262" y="90" width="168" height="132" rx="12" className={s.phone} />
        <rect x="270" y="104" width="152" height="110" rx="6" className={s.phoneScreen} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={278 + i * 36} y="112" width="30" height="18" rx="4" fill="#EEF4F9" stroke="#333C4D" strokeOpacity="0.15" />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="278" y={140 + i * 23} width="136" height="18" rx="4" fill="#fff" stroke="#50B283" strokeOpacity="0.6" />
            <rect x="284" y={146 + i * 23} width="54" height="6" rx="3" fill="#333C4D" opacity="0.4" />
            <rect x="378" y={145 + i * 23} width="16" height="8" rx="4" fill="#377CFB" />
            <rect x="397" y={145 + i * 23} width="12" height="8" rx="4" fill="#50B283" />
          </g>
        ))}
        <rect x="318" y="230" width="56" height="16" rx="4" className={s.phone} />
      </g>
    </svg>
  );
}

function Compare({ before, after, label }: { before: Shot; after: Shot; label: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5 items-start">
      {[
        { shot: before, tag: "Concept" },
        { shot: after, tag: "Shipped" },
      ].map(({ shot, tag }) => (
        <figure key={tag} className="m-0">
          <BrowserFrame shot={shot} url={tag === "Shipped" ? URL : undefined} sizes="(max-width: 640px) 92vw, 460px" />
          <figcaption className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase ${
                tag === "Shipped" ? "bg-[var(--cs)] text-white" : "border border-[var(--border-accent)]"
              }`}
            >
              {tag}
            </span>
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function TeamdayCaseStudy() {
  return (
    <>
      <CustomCursor />
      <CaseHeader />

      <main className={`${s.page} ${s.themeTeamday} overflow-x-clip`}>
        {/* ── Hero ── */}
        <section id="hero" className="relative pt-32 md:pt-40 pb-16 md:pb-24">
          <div className={`${s.glow} ${s.glowA}`} aria-hidden />
          <div className={`${WRAP} relative grid lg:grid-cols-[0.95fr_1.1fr] gap-14 lg:gap-10 items-center`}>
            <div className="relative">
              <Star className={`${s.float} absolute -top-10 right-6 w-9 sm:right-20`} />
              <ScrollReveal>
                <p className={`${s.accent} text-2xl sm:text-3xl font-extrabold leading-none`}>UX/UI</p>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] mt-1">Case study</p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="flex items-center gap-2.5 mt-10 mb-4">
                  <TeamdayMark className="w-8 h-8" />
                  <span className="text-2xl font-extrabold tracking-tight">Teamday</span>
                </div>
                <h1 className="uppercase tracking-tight leading-[0.95]">
                  <span className="block text-[2.4rem] sm:text-6xl lg:text-[3.3rem] xl:text-[3.6rem] font-black">Plan the day</span>
                  <span className="block text-[1.6rem] sm:text-[2.4rem] lg:text-[2.1rem] xl:text-[2.35rem] font-light mt-1">&amp; ship the backlog</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="mt-6 max-w-lg text-[var(--text-secondary)] leading-relaxed">
                  TeamDay is an HRM and project-management platform built around a team&apos;s working day: plan today&apos;s
                  tasks, pull work from a structured backlog, track estimate against actual time, and share start- and
                  end-of-day updates straight to Microsoft Teams.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                  {[
                    ["Role", "Research · End-to-end design"],
                    ["Platform", "Web app"],
                    ["Scope", "Plan, backlog, time"],
                    ["Tools", "Figma"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[var(--border-subtle)] pt-3">
                      <dt className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">{k}</dt>
                      <dd className="text-sm font-medium mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#backlog" className={s.btnPrimary}>
                    See the backlog
                  </a>
                  <a href="#concept" className={s.btnGhost}>
                    Concept → shipped ↓
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={150}>
              <div className="relative">
                <ChatBubble className={`${s.float} absolute -top-10 left-[8%] w-11 z-10`} />
                <Spiral className={`${s.floatSlow} absolute -top-8 right-[4%] w-10 z-10`} />
                <Heart className={`${s.float} absolute -bottom-4 right-[12%] w-8 z-10`} />
                <WindowStack main={shots.backlog} sub={shots.taskDetail} url={`${URL}/plan/project/backlog`} />
                <div className={`${s.badge} left-[2%] bottom-[4%]`}>
                  <span className={s.badgeIcon}><Icon name="check" className="w-3.5 h-3.5" /></span>
                  EOD posted
                </div>
                <div className={`${s.badge} right-[2%] top-[22%]`}>
                  <span className={s.badgeIconCyan}><Icon name="clock" className="w-3.5 h-3.5" /></span>
                  E 1h · A 1h
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="relative py-16 md:py-24">
          <ScrollReveal className="absolute inset-0 pointer-events-none hidden lg:block">
            <Connector viewBox="0 0 100 100" d="M30 2 C 20 30, 60 40, 40 98" className="absolute left-[8%] -top-24 w-40 h-[calc(100%+6rem)]" />
          </ScrollReveal>
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-14 items-center`}>
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative">
                <Circle className={`${s.floatSlow} absolute -top-6 -left-2 w-12 z-10`} />
                <BrowserFrame shot={shots.login} url={URL} sizes="(max-width: 1024px) 92vw, 520px" />
              </div>
            </ScrollReveal>
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionTitle lead="Project" accent="Overview" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  TeamDay helps teams run their workday in one place — daily task plans, project backlogs, stories and
                  sprints, time tracking, attendance and check-ins — instead of juggling a task tool, a timesheet and a chat
                  thread.
                </p>
                <div className={s.role}>
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">My role</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    I researched and designed the end-to-end flows for daily tasks, the project backlog, stories, sprints and
                    time tracking, along with Microsoft Teams alerts — from early concepts to the shipped product.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((st) => (
                    <li key={st.label} className="flex items-center gap-3 sm:flex-col sm:items-start">
                      <span className={s.statIcon}><Icon name={st.icon} /></span>
                      <span>
                        <span className="block text-xl font-extrabold leading-tight">{st.value}</span>
                        <span className="block text-xs text-[var(--text-muted)] leading-snug">{st.label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="relative py-16 md:py-24">
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-12 items-center`}>
            <div>
              <ScrollReveal>
                <SectionTitle lead="Problem" accent="Statement" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-md">
                  Researching how the team actually worked showed the day was spread across tools and messages:
                </p>
                <ul className="mt-6 space-y-3.5">
                  {problems.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-snug">
                      <span className={s.dot} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={150}>
              <div className="relative max-w-[480px] mx-auto">
                <Sparkle className={`${s.float} absolute -top-6 right-10 w-7`} />
                <ProblemArt />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Goals ── */}
        <section className="relative py-16 md:py-24">
          <div className={`${s.glow} ${s.glowB}`} aria-hidden />
          <div className={`${WRAP} relative`}>
            <ScrollReveal>
              <SectionTitle eyebrow="The solution" lead="Design" accent="Goals" center />
            </ScrollReveal>
            <div role="list" className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {goals.map((g, i) => (
                <ScrollReveal key={g.title} delay={i * 100} className="h-full">
                  <div role="listitem" className={s.goal}>
                    <span className={s.goalNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.statIcon}><Icon name={g.icon} /></span>
                    <h3 className="mt-5 font-bold text-lg leading-snug">{g.title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{g.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── A workday ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="From sign-in to sign-off" lead="A Day in" accent="TeamDay" />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ol className={s.flow}>
                {flow.map((f, i) => (
                  <li key={f.title} className={s.flowStep} style={{ "--i": i } as CSSProperties}>
                    <span className={i === 0 || i === flow.length - 1 ? s.flowNodeSolid : s.flowNode}>{i + 1}</span>
                    <span className="block font-semibold text-sm mt-3">{f.title}</span>
                    <span className="block text-xs text-[var(--text-muted)] mt-0.5">{f.sub}</span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="backlog" className="relative py-10 md:py-16 scroll-mt-20">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Inside the product" lead="Key" accent="Features" center />
            </ScrollReveal>
          </div>
          <div className="mt-10 md:mt-16 space-y-20 md:space-y-28">
            {features.map((f, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={f.title} className={`${WRAP} relative grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center`}>
                  <ScrollReveal className={flip ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div className={s.featureBlob} aria-hidden />
                      {i === 0 && <Sparkle className={`${s.float} absolute -top-6 right-[8%] w-7 z-10`} />}
                      {i === 1 && <Arrow className={`${s.float} absolute -top-10 -left-2 w-16 hidden md:block z-10`} />}
                      {i === 3 && <Star className={`${s.floatSlow} absolute -top-6 left-[6%] w-8 z-10`} />}
                      {i === 5 && <ChatBubble className={`${s.float} absolute -top-8 right-[10%] w-11 z-10`} />}
                      <WindowStack main={f.main} sub={f.sub} url={URL} flip={flip} />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={100}>
                    <span className={s.featureNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                      {f.title} <span className={s.accent}>{f.accent}</span>
                    </h3>
                    <p className="mt-5 text-[var(--text-secondary)] leading-relaxed max-w-lg">{f.body}</p>
                    <ul className="mt-6 space-y-2.5">
                      {f.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm">
                          <span className={s.tick}><Icon name="check" className="w-3 h-3" /></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Concept → shipped ── */}
        <section id="concept" className="relative py-16 md:py-24 scroll-mt-20">
          <div className={`${s.glow} ${s.glowB}`} aria-hidden />
          <div className={`${WRAP} relative`}>
            <ScrollReveal>
              <SectionTitle eyebrow="How the design evolved" lead="Concept to" accent="Product" />
              <p className="mt-6 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
                Early concepts — designed while the product was still called <em>Workday</em> and <em>Planoday</em> — explored
                a status-tile dashboard and a written end-of-day report. They evolved into the shipped product: a project-first
                plan with time stats, and check-ins built from the work itself.
              </p>
            </ScrollReveal>
            <div className="mt-12 space-y-12">
              <ScrollReveal>
                <Compare before={shots.conceptDashboard} after={shots.todayPlan} label="Home: status tiles → project-first plan with time stats" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <Compare before={shots.conceptSignup} after={shots.login} label="Entry: Planoday sign-up → TeamDay sign-in, same illustration" />
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
                  <BrowserFrame shot={shots.conceptEod} sizes="(max-width: 1024px) 92vw, 600px" />
                  <div>
                    <span className={s.featureNum}>EOD</span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                      The end-of-day <span className={s.accent}>report</span>
                    </h3>
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                      The concept assembled the day&apos;s achieved goals and difficulties into one message, ready to post. In
                      the product this became the End of Day action, always one click away in the top bar.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Design system ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Visual language" lead="Design" accent="System" />
            </ScrollReveal>
            <div className="mt-12">
              <ScrollReveal>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">Colour</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {palette.map((c) => (
                    <li key={c.hex} className={s.swatch} style={{ background: c.hex, color: c.ink }}>
                      <span className="text-sm font-semibold">{c.name}</span>
                      <span className="text-xs font-mono opacity-80">{c.hex}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${s.typeCard} mt-6`}>
                  <span className={s.typeAa}>Aa</span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">Type</p>
                    <p className="font-bold text-lg mt-1">Geometric sans → system sans</p>
                    <p className="text-sm text-[var(--text-secondary)]">Rounded geometric type in the concepts; a fast system stack in the shipped app.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Takeaways ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <div className={s.outcome}>
              <ScrollReveal>
                <SectionTitle lead="Design" accent="Takeaways" />
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-md">
                  The best workday tool is the one people forget they&apos;re using — it should collect the status updates for
                  you.
                </p>
              </ScrollReveal>
              <div role="list" className="space-y-6">
                {takeaways.map((t, i) => (
                  <ScrollReveal key={t.title} delay={i * 100}>
                    <div role="listitem" className="flex gap-5">
                      <span className={s.takeNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-bold text-lg">{t.title}</span>
                        <span className="block text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{t.body}</span>
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Next ── */}
        <section className="relative py-20 md:py-28 text-center">
          <div className={WRAP}>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--text-muted)]">Thanks for reading</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
                Let&apos;s build something <span className={s.accent}>together</span>
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/#contact" className={s.btnPrimary}>Get in touch</Link>
                <Link href="/#work" className={s.btnGhost}>← Back to all work</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
