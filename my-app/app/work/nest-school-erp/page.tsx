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
  CropImg,
  Heart,
  Icon,
  SectionTitle,
  Sparkle,
  Spiral,
  Squiggle,
  Star,
  kit as s,
} from "../_kit/parts";
import { NestLogo, Phone, ScrollingPage, Stack, type ShotKey, shots } from "./parts";
import n from "./nest.module.css";

export const metadata: Metadata = {
  title: "Nest School ERP — Product Design Case Study · Kriti Gupta",
  description:
    "Product design case study for Nest by Emmple, a school ERP that runs students, attendance, fees, transport, assessments and staff from one place.",
  openGraph: {
    title: "Nest School ERP — Product Design Case Study",
    description: "Designing a teacher-first school management system.",
    images: ["/case-studies/nest/app/dashboard.png"],
    type: "article",
  },
};

const WRAP = "max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20";

/* ─────────────────────────── content ─────────────────────────── */

const stats = [
  { value: "10", label: "Modules in one sidebar", icon: "modules" },
  { value: "5", label: "Roles served", icon: "people" },
  { value: "7", label: "Step guided admission", icon: "school" },
  { value: "50+", label: "Desktop screens", icon: "desktop" },
];

const problems = [
  "Attendance, fees, grades and communication live in separate tools and spreadsheets",
  "Teachers lose instruction time to roll calls, rosters and duplicate entry",
  "Fee collection depends on manual receipts, follow-ups and reconciliation",
  "Leadership waits for reports instead of seeing the day at a glance",
  "Parents chase the front desk for fees, attendance and notices",
  "UDISE / PSP compliance adds data that must stay accurate and audit-ready",
];

const principles = [
  { title: "Teachers first", body: "Fast, predictable and forgiving interfaces that give teachers their time back.", icon: "school" },
  { title: "Unified data", body: "Every learner, fee and roster lives in one reliable record — not scattered across tools.", icon: "modules" },
  { title: "Parent partnership", body: "Clear updates, transparent receipts and two-way feedback build trust.", icon: "people" },
  { title: "Audit ready", body: "Receipts, approvals and changes stay traceable, so schools are always review-ready.", icon: "shield" },
];

const roles = [
  { title: "Principals & Owners", body: "Attendance, collections and exceptions — the day at a glance.", icon: "chart" },
  { title: "Finance & Admin", body: "Templates, approvals and exports; receipts that stand up to audits.", icon: "rupee" },
  { title: "Teachers & Coordinators", body: "Roll calls, rosters and notices — fewer clicks to done.", icon: "school" },
  { title: "Operations & Transport", body: "Shifts, vehicles and staff logs; alerts in minutes.", icon: "bus" },
  { title: "Parents & Guardians", body: "Fees, receipts, attendance, events and notices in one app.", icon: "people" },
];

const ia: { title: string; icon: string; items: string[] }[] = [
  { title: "Dashboard", icon: "chart", items: ["Quick actions", "KPI tiles", "Pending actions", "Events & holidays"] },
  { title: "Students", icon: "people", items: ["List, search & filters", "Profile tabs", "7-step admission", "Admission enquiries"] },
  { title: "Grades", icon: "school", items: ["Grades & sections", "Students & attendance", "Log attendance"] },
  { title: "Team", icon: "signup", items: ["Teachers", "Transport staff", "Other staff", "Profiles & biometric"] },
  { title: "Transportation", icon: "bus", items: ["Vehicles", "Staff assignments", "Passengers"] },
  { title: "Assessments", icon: "star", items: ["Report cards", "Generate in 2 steps", "Progress report view"] },
  { title: "Fees", icon: "rupee", items: ["Receipts", "Record payment", "Templates, discounts & taxes", "Pending fees & reports", "Payment proofs"] },
  { title: "Notices & Feedback", icon: "bell", items: ["Targeted notices", "Previous notices", "Feedback inbox"] },
  { title: "Settings", icon: "shield", items: ["School info", "Holidays & sessions", "Shifts & designations", "Roles & permissions", "Biometric devices"] },
];

const admission = [
  { title: "Personal", icon: "signup" },
  { title: "Contact", icon: "bell" },
  { title: "Guardians", icon: "people" },
  { title: "Academic", icon: "school" },
  { title: "Fees", icon: "rupee" },
  { title: "Transport", icon: "bus" },
  { title: "Documents", icon: "cards" },
];

type Feature = { title: string; accent: string; body: string; points: string[]; main: ShotKey; sub?: ShotKey };

const features: Feature[] = [
  {
    title: "The school day,",
    accent: "at a glance",
    body: "The dashboard opens on the school itself, then answers the first questions of the morning: how many students and staff, what's pending, what's coming up. The four most common jobs are one click away.",
    points: ["Quick actions: add student, record payment, add staff, add event", "KPI tiles for students, enquiries, staff and pending actions", "Pending actions and upcoming holidays side by side"],
    main: "dashboard",
    sub: "addStaff",
  },
  {
    title: "One record",
    accent: "per learner",
    body: "Every student has a single profile that keeps personal details, attendance, fees, transport, disciplinary notes and documents in tabs — so staff stop hunting across spreadsheets.",
    points: ["Searchable, filterable student table with bulk actions", "Profile tabs instead of separate pages", "Attendance KPIs with a monthly calendar"],
    main: "studentProfile",
    sub: "studentAttendance",
  },
  {
    title: "Roll call",
    accent: "in seconds",
    body: "Attendance is the heartbeat of a school day. Teachers pick a section, mark everyone present in one tap, then fix the exceptions — instead of ticking twenty rows.",
    points: ["Mark all students present, then edit exceptions", "Large tick / cross targets with a clear status column", "Grade-level attendance trends for coordinators"],
    main: "logAttendance",
    sub: "grades",
  },
  {
    title: "Fees without",
    accent: "spreadsheet chaos",
    body: "Finance teams build session-based fee templates with discounts and taxes, record payments, approve payment proofs and issue receipts that stand up to audits — with pending dues always visible.",
    points: ["Fee templates, discounts and taxes per session", "Receipt search, filters and receipt detail", "Pending fees with reminders"],
    main: "feeReceipts",
    sub: "feeReceipt",
  },
  {
    title: "Assessments &",
    accent: "report cards",
    body: "Report cards are generated in two steps and read like a printed progress report — subject-wise marks, percentage and performance at a glance.",
    points: ["Generate report cards from the system or an upload", "Progress report with subject-wise performance", "Clear BETA labelling while the module matures"],
    main: "reportCard",
  },
  {
    title: "Transport, notices",
    accent: "& the calendar",
    body: "Operations get vehicles, staff and passengers in one place, while notices go to exactly the right audience and holidays sync to a shared calendar.",
    points: ["Vehicles with capacity and assigned staff", "Notices with audience targeting and a rich editor", "Holidays & events calendar for the whole school"],
    main: "transport",
    sub: "notices",
  },
  {
    title: "Access that",
    accent: "fits the role",
    body: "Different people run different parts of a school. Roles and permissions are grouped by module, so a teacher, an accountant and a principal each see exactly what they need.",
    points: ["Module-level permission groups", "System roles plus custom designations", "Shifts and biometric devices for staff"],
    main: "roles",
    sub: "holidays",
  },
];

const palette = [
  { name: "Nest teal", hex: "#0D373D", ink: "#fff" },
  { name: "Leaf", hex: "#86D246", ink: "#0D373D" },
  { name: "Lime", hex: "#E2FDCB", ink: "#0D373D" },
  { name: "Canvas", hex: "#F5F8F9", ink: "#0D373D" },
];

const takeaways = [
  { title: "Default to the common case", body: "“Mark all present”, then fix exceptions — the fastest path is the most frequent one." },
  { title: "Long forms need a map", body: "A seven-step admission with a visible stepper turns a daunting form into a checklist." },
  { title: "One record beats many pages", body: "Profile tabs keep attendance, fees, transport and documents next to the learner." },
  { title: "Finance needs a paper trail", body: "Templates, proofs and receipts make every rupee traceable and audit-ready." },
];

/* ─────────────────────────── small pieces ─────────────────────────── */

function ProblemArt() {
  const sheet = (x: number, y: number, r: number, key: number) => (
    <g key={key} transform={`rotate(${r} ${x + 50} ${y + 36})`}>
      <rect x={x} y={y} width="100" height="72" rx="6" className={s.paper} />
      {[0, 1, 2, 3].map((row) => (
        <path key={row} d={`M${x + 10} ${y + 16 + row * 14}h80`} className={s.paperLine} />
      ))}
      <path d={`M${x + 36} ${y + 8}v58M${x + 64} ${y + 8}v58`} className={s.paperLine} />
    </g>
  );
  return (
    <svg viewBox="0 0 440 330" className="w-full h-auto" role="img" aria-label="Scattered spreadsheets and paper registers coming together into one dashboard">
      <ellipse cx="220" cy="306" rx="190" ry="14" className={s.shadowEllipse} />
      {sheet(16, 150, -12, 1)}
      {sheet(60, 205, 8, 2)}
      {sheet(22, 236, -3, 3)}
      {sheet(84, 112, 15, 4)}
      <g transform="rotate(-18 66 86)">
        <rect x="40" y="62" width="52" height="46" rx="4" fill="var(--cs-alt)" opacity="0.85" />
        <path d="M48 76h34M48 86h24" stroke="#0D373D" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="150" y="98" className={s.qmark}>?</text>
      <path d="M196 214 C 228 160, 250 156, 272 168" className={s.artArrow} />
      <path d="M262 158 l12 10 -14 6" className={s.artArrowHead} />
      <g transform="rotate(4 350 190)">
        <rect x="262" y="96" width="168" height="124" rx="12" className={s.phone} />
        <rect x="270" y="110" width="152" height="102" rx="6" className={s.phoneScreen} />
        <rect x="270" y="110" width="30" height="102" fill="#E2FDCB" />
        <rect x="276" y="118" width="18" height="6" rx="3" fill="#0D373D" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="276" y={132 + i * 12} width="18" height="4" rx="2" fill="#0D373D" opacity="0.35" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={308 + i * 38} y="118" width="32" height="22" rx="4" fill="#F5F8F9" stroke="#0D373D" strokeOpacity="0.15" />
        ))}
        <rect x="308" y="148" width="108" height="56" rx="5" fill="#F5F8F9" stroke="#0D373D" strokeOpacity="0.15" />
        <path d="M316 190l18-14 16 8 20-18 18 10 20-12" fill="none" stroke="#86D246" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="318" y="226" width="56" height="16" rx="4" className={s.phone} />
      </g>
    </svg>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function NestCaseStudy() {
  return (
    <>
      <CustomCursor />
      <CaseHeader />

      <main className={`${s.page} ${s.themeNest} overflow-x-clip`}>
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
                <div className="mt-10 mb-4">
                  <NestLogo className="h-9 w-auto" />
                </div>
                <h1 className="uppercase tracking-tight leading-[0.95]">
                  <span className="block text-[2.4rem] sm:text-6xl lg:text-[3.3rem] xl:text-[3.6rem] font-black">School ERP</span>
                  <span className="block text-[1.6rem] sm:text-[2.4rem] lg:text-[2.1rem] xl:text-[2.35rem] font-light mt-1">for the whole institute</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="mt-6 max-w-lg text-[var(--text-secondary)] leading-relaxed">
                  Nest by Emmple ties together a school&apos;s core administration — students, attendance, fees, transport,
                  assessments and staff — in one teacher-first system. Fast for teachers. Clear for leadership. Effortless for
                  parents.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                  {[
                    ["Role", "Product Design"],
                    ["Platform", "Web · Responsive"],
                    ["Scope", "Admin ERP + landing"],
                    ["Tools", "Figma"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[var(--border-subtle)] pt-3">
                      <dt className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">{k}</dt>
                      <dd className="text-sm font-medium mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#features" className={s.btnPrimary}>
                    Explore the product
                  </a>
                  <a href="#landing" className={s.btnGhost}>
                    Landing redesign ↓
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={150}>
              <div className={n.heroVisual}>
                <ChatBubble className={`${s.float} absolute -top-8 left-[10%] w-11 z-10`} />
                <Spiral className={`${s.floatSlow} absolute -top-6 right-[4%] w-10 z-10`} />
                <Heart className={`${s.float} absolute bottom-[2%] right-[10%] w-8`} />
                <div className={n.heroWin}>
                  <BrowserFrame shot={shots.dashboard} url="nest.emmple.com/admin/dashboard" preload sizes="(max-width: 1024px) 92vw, 640px" />
                </div>
                <Phone k="dashboardMobile" className={n.heroPhone} />
                <div className={`${s.badge} left-[16%] -bottom-1 sm:bottom-[4%]`}>
                  <span className={s.badgeIcon}><Icon name="check" className="w-3.5 h-3.5" /></span>
                  Attendance saved
                </div>
                <div className={`${s.badge} right-[2%] top-[18%]`}>
                  <span className={s.badgeIconCyan}><Icon name="rupee" className="w-3.5 h-3.5" /></span>
                  Receipt issued
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="relative py-16 md:py-24">
          <ScrollReveal className="absolute inset-0 pointer-events-none hidden lg:block">
            <Connector viewBox="0 0 100 100" d="M60 2 C 80 30, 40 50, 70 98" className="absolute right-[6%] -top-24 w-40 h-[calc(100%+6rem)]" />
          </ScrollReveal>
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-14 items-center`}>
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative">
                <Circle className={`${s.floatSlow} absolute -top-6 -left-2 w-12 z-10`} />
                <BrowserFrame shot={shots.dashboardTablet} url="nest.emmple.com" sizes="(max-width: 1024px) 92vw, 520px" />
              </div>
            </ScrollReveal>
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionTitle lead="Project" accent="Overview" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  Nest is a school management platform used by administrators, teachers and finance teams to run the institute
                  day to day. It brings attendance, fees, grades, transport, assessments and communication into one system,
                  with a parent app on the way.
                </p>
                <div className={s.role}>
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">My role</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Product design across the Student, Teacher, Staff, Transportation, Attendance, Fees, Reports and
                    Exam/Assessment modules — designing school administration and academic workflows, including
                    requirements aligned with UDISE / PSP — plus the redesigned marketing site.
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
                  Most school software adds complexity. Schools end up running on registers, spreadsheets and phone calls:
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

        {/* ── Principles ── */}
        <section className="relative py-16 md:py-24">
          <div className={`${s.glow} ${s.glowB}`} aria-hidden />
          <div className={`${WRAP} relative`}>
            <ScrollReveal>
              <SectionTitle eyebrow="What guided the design" lead="Design" accent="Principles" center />
            </ScrollReveal>
            <div role="list" className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {principles.map((g, i) => (
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

        {/* ── Roles ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Who it's for" lead="For every" accent="Role" />
            </ScrollReveal>
            <div role="list" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {roles.map((r, i) => (
                <ScrollReveal key={r.title} delay={i * 80} className="h-full">
                  <div role="listitem" className={n.role}>
                    <span className={s.statIcon}><Icon name={r.icon} /></span>
                    <h3 className="mt-4 font-bold leading-snug">{r.title}</h3>
                    <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{r.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Information architecture ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Ten modules, one sidebar" lead="Information" accent="Architecture" />
              <p className="mt-6 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
                Every module sits one click away in a persistent sidebar, and each follows the same pattern — a list, a detail
                view with tabs, and drawers or dialogs for quick edits — so staff learn it once.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className={`${n.ia} mt-10`}>
                {ia.map((m) => (
                  <div key={m.title} className={n.iaCol}>
                    <div className={n.iaHead}>
                      <span className={n.iaIcon}><Icon name={m.icon} className="w-4 h-4" /></span>
                      {m.title}
                    </div>
                    {m.items.map((it) => (
                      <div key={it} className={n.iaItem}>{it}</div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Admission flow ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="A long form, made calm" lead="Admission in" accent="Seven Steps" center />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ol className={`${n.steps} mt-12`}>
                {admission.map((st, i) => (
                  <li key={st.title} className={n.step} style={{ "--i": i } as CSSProperties}>
                    <span className={n.stepDot}><Icon name={st.icon} /></span>
                    <span className="block mt-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">Step {i + 1}</span>
                    <span className="block font-semibold text-sm mt-0.5">{st.title}</span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="relative mt-14 max-w-4xl mx-auto">
                <Arrow className={`${s.float} absolute -top-10 -left-4 w-16 hidden md:block z-10`} />
                <BrowserFrame shot={shots.addStudent} url="nest.emmple.com/admin/students/add" sizes="(max-width: 1024px) 92vw, 896px" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="relative py-10 md:py-16 scroll-mt-20">
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
                      {i === 2 && <Star className={`${s.floatSlow} absolute -top-6 left-[6%] w-8 z-10`} />}
                      {i === 4 && <ChatBubble className={`${s.float} absolute -top-8 right-[10%] w-11 z-10`} />}
                      <Stack main={f.main} sub={f.sub} flip={flip} />
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

        {/* ── Responsive ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Desktop first, everywhere" lead="Responsive" accent="By Design" center />
              <p className="mt-6 max-w-xl mx-auto text-center text-[var(--text-secondary)] leading-relaxed">
                Built for the office desktop, but the same patterns hold on a tablet in the staff room and a phone at the gate —
                the sidebar becomes a bottom tab bar on small screens.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="mt-12 flex items-end justify-center gap-6 sm:gap-10">
                <div className="w-[64%] sm:w-[58%] max-w-[560px]">
                  <BrowserFrame shot={shots.dashboardTablet} sizes="(max-width: 640px) 64vw, 560px" />
                  <p className="mt-3 text-center text-xs text-[var(--text-muted)]">Tablet · 1024px</p>
                </div>
                <div className="w-[26%] sm:w-[20%] max-w-[210px]">
                  <Phone k="dashboardMobile" />
                  <p className="mt-3 text-center text-xs text-[var(--text-muted)]">Phone · 390px</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Landing redesign ── */}
        <section id="landing" className="relative py-16 md:py-24 scroll-mt-20">
          <div className={`${s.glow} ${s.glowB}`} aria-hidden />
          <div className={`${WRAP} relative`}>
            <ScrollReveal>
              <SectionTitle eyebrow="Telling the story outside the app" lead="Landing Page" accent="Redesign" />
              <p className="mt-6 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
                The marketing site was redesigned around one promise — <em>“Give teachers time back. Run your institute from
                One Nest.”</em> — using real product UI, a section for every role, and a parent-app story backed by WhatsApp
                workflows.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
              <ScrollReveal>
                <BrowserFrame shot={shots.lpHero} url="nest.emmple.com" sizes="(max-width: 1024px) 92vw, 640px" />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <BrowserFrame shot={shots.lpRoles} sizes="(max-width: 1024px) 46vw, 320px" />
                  <BrowserFrame shot={shots.lpBelieve} sizes="(max-width: 1024px) 46vw, 320px" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <ScrollingPage k="lpFull" />
                <p className="mt-3 text-center text-xs text-[var(--text-muted)]">Hover (or scroll on touch) to see the full page</p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={150}>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <BrowserFrame shot={shots.lpParent} sizes="(max-width: 768px) 92vw, 520px" />
                <div className="grid gap-6 content-start">
                  <BrowserFrame shot={shots.lpFees} sizes="(max-width: 768px) 92vw, 520px" />
                  <BrowserFrame shot={shots.lpPricing} sizes="(max-width: 768px) 92vw, 520px" className="max-h-[26rem] md:max-h-[30rem]" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Design system ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Visual language" lead="Design" accent="System" />
            </ScrollReveal>
            <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-12">
              <ScrollReveal>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">Colour</h3>
                <ul className="grid grid-cols-2 gap-3">
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
                    <p className="font-bold text-lg mt-1">System UI sans</p>
                    <p className="text-sm text-[var(--text-secondary)]">Fast-loading native type: bold teal headings, calm grey metadata, tabular numbers in tables.</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">Components</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="row-span-2">
                    <CropImg shot={shots.dashboard} x={20} y={120} w={480} h={960} label="Sidebar with active state" />
                  </div>
                  <CropImg shot={shots.dashboard} x={1720} y={460} w={1124} h={500} label="Quick actions" />
                  <CropImg shot={shots.logAttendance} x={1900} y={690} w={930} h={120} label="Tick / cross attendance" />
                  <div className="col-span-2">
                    <CropImg shot={shots.dashboard} x={556} y={1010} w={2280} h={210} label="KPI tiles" />
                  </div>
                  <div className="col-span-2">
                    <CropImg shot={shots.addStudent} x={520} y={370} w={1360} h={160} label="Admission stepper" />
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
                  Designing an ERP is less about adding features and more about removing friction from the jobs people repeat
                  every single day.
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
