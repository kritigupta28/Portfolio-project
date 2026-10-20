import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import type { CSSProperties } from "react";
import CustomCursor from "../../components/CustomCursor";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import {
  Arrow,
  ChatBubble,
  Circle,
  Connector,
  Crop,
  Fan,
  FizvizzMark,
  Heart,
  Screen,
  type ScreenKey,
  screens,
  Sparkle,
  Spiral,
  Squiggle,
  Star,
} from "./parts";
import { CaseHeader, Icon, SectionTitle, kit as s } from "../_kit/parts";

export const metadata: Metadata = {
  title: "Fizvizz — UX/UI Case Study · Kriti Gupta",
  description:
    "UX/UI case study for Fizvizz, a networking app built around digital business cards, QR sharing, events and groups.",
  openGraph: {
    title: "Fizvizz — UX/UI Case Study",
    description: "Designing a digital business card and networking app.",
    images: ["/case-studies/fizvizz/logo.png"],
    type: "article",
  },
};

const nunito = Nunito({ subsets: ["latin"], weight: ["800", "900"] });

const WRAP = "max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20";

/* ─────────────────────────── content ─────────────────────────── */

const stats = [
  { value: "18", label: "Screens designed", icon: "screens" },
  { value: "4", label: "Core modules", icon: "modules" },
  { value: "3", label: "Ways to sign up", icon: "signup" },
  { value: "5.0★", label: "App Store rating", icon: "star" },
] as const;

const problems = [
  "Paper business cards are bulky, run out and get lost",
  "Sharing contact details means exposing your phone number and email",
  "No control over who keeps your details once they're shared",
  "One card doesn't fit every professional circle",
  "Introductions and follow-ups after events are hard to manage",
  "A pile of collected cards can't be searched",
];

const goals = [
  {
    title: "Share in a scan",
    body: "The QR code sits at the centre of the navigation, so swapping cards takes seconds.",
    icon: "qr",
  },
  {
    title: "A card for every circle",
    body: "Multiple cards mean the right details reach the right people.",
    icon: "cards",
  },
  {
    title: "Privacy by default",
    body: "Share a card, not your number — and manage or revoke access anytime.",
    icon: "shield",
  },
  {
    title: "Networking that continues",
    body: "Events, groups, introductions and a feed keep new connections alive after hello.",
    icon: "people",
  },
] as const;

const flow = [
  { title: "Open app", sub: "Splash" },
  { title: "Create account", sub: "Email · Google · LinkedIn" },
  { title: "Verify email", sub: "One-time code" },
  { title: "Accept terms", sub: "Clear consent" },
  { title: "Connections", sub: "Home" },
  { title: "Share card", sub: "Show QR" },
  { title: "Connected", sub: "Request accepted" },
];

type Feature = {
  title: string;
  accent: string;
  body: string;
  points: string[];
  keys: ScreenKey[];
};

const features: Feature[] = [
  {
    title: "Share your card,",
    accent: "anytime",
    body: "The QR code is the hero of the experience. New connection opens straight to My QR with download and share actions, and the card being sent is previewed underneath — so people always know exactly what they're giving away.",
    points: ["QR button at the centre of the bottom navigation", "Download or share the QR as an image", "Live preview of the card being sent"],
    keys: ["professionalCard", "qrShare", "qrShareDetail"],
  },
  {
    title: "Connections",
    accent: "at a glance",
    body: "Home is the contact book. Pending requests and approvals sit up top as two colour-coded counters, a Fizvizz / All toggle separates in-app connections from everyone else, and requests can be cleared in one pass.",
    points: ["Colour-coded request and approval counters", "Fizvizz vs All segmented control", "Profiles keep every card someone shared with you"],
    keys: ["pendingRequests", "homePending", "contactProfile"],
  },
  {
    title: "Events &",
    accent: "groups",
    body: "Networking happens in rooms, so events and groups are first-class. People switch between events they attend and events they host, and a group page puts members, join requests and a one-tap Share Card in one place.",
    points: ["Attend / My events tabs with Create event", "Past events stay browsable", "Members, requests and Add Members on group pages"],
    keys: ["eventsAttend", "groupDetail", "myEvents"],
  },
  {
    title: "A feed that keeps you",
    accent: "in the loop",
    body: "The feed turns network activity into actions: cards to accept, invitations to events and groups, and new organisers — filterable by All, Events or Groups.",
    points: ["Inline Accept and Join actions", "All · Events · Groups filters", "Timestamps for quick scanning"],
    keys: ["feed"],
  },
  {
    title: "Onboarding without",
    accent: "friction",
    body: "Sign-up offers email or one-tap Google and LinkedIn, followed by a short verification code and clear consent for terms and data processing.",
    points: ["Social sign-up with Google and LinkedIn", "4-digit email verification with resend", "Explicit consent before continuing"],
    keys: ["verifyEmail", "signUp", "terms"],
  },
  {
    title: "Works even",
    accent: "without the app",
    body: "When someone receives a card without Fizvizz installed, the mobile web view confirms the new connection and invites them to download the app — so every share can bring in a new user.",
    points: ["Congratulations state for the new connection", "App Store and Google Play badges"],
    keys: ["mobileWeb"],
  },
];

const states: { k: ScreenKey; title: string; body: string }[] = [
  { k: "noInternet", title: "Offline", body: "A friendly “Ooops!” with a single Retry action." },
  { k: "updateAvailable", title: "Forced update", body: "Progress and one clear Update Now button." },
  { k: "splash", title: "Slow start", body: "The splash reassures when loading takes longer than usual." },
];

const palette = [
  { name: "Night", hex: "#121A38", ink: "#fff" },
  { name: "Deep indigo", hex: "#1F2863", ink: "#fff" },
  { name: "Hover", hex: "#424F9E", ink: "#fff" },
  { name: "Primary", hex: "#5462B8", ink: "#fff" },
  { name: "Cyan", hex: "#22BAE2", ink: "#0b1a2a" },
  { name: "Mist", hex: "#EDEFFB", ink: "#1F2863" },
];

const takeaways = [
  { title: "Make the core action unmissable", body: "Sharing is the reason the app exists, so the QR lives at the centre of navigation." },
  { title: "Design the unhappy paths too", body: "Offline, forced-update and slow-loading states got the same care as the happy path." },
  { title: "Every share is an invitation", body: "The mobile web view turns recipients without the app into new users." },
];

/* Scattered paper cards turning into one phone — the problem in one picture. */
function ProblemArt() {
  const card = (x: number, y: number, r: number, key: number) => (
    <g key={key} transform={`rotate(${r} ${x + 46} ${y + 28})`}>
      <rect x={x} y={y} width="92" height="56" rx="6" className={s.paper} />
      <circle cx={x + 18} cy={y + 18} r="7" className={s.paperInk} />
      <path d={`M${x + 32} ${y + 15}h40M${x + 32} ${y + 24}h28M${x + 12} ${y + 40}h56`} className={s.paperLine} />
    </g>
  );
  return (
    <svg viewBox="0 0 420 340" className="w-full h-auto" role="img" aria-label="Scattered paper business cards becoming one digital card on a phone">
      <ellipse cx="210" cy="312" rx="170" ry="14" className={s.shadowEllipse} />
      {card(18, 160, -14, 1)}
      {card(70, 210, 9, 2)}
      {card(12, 240, -4, 3)}
      {card(92, 128, 18, 4)}
      {card(50, 96, -22, 5)}
      <text x="40" y="78" className={s.qmark}>?</text>
      <text x="150" y="96" className={s.qmark} style={{ fontSize: 28 }}>?</text>
      <path d="M190 210 C 230 150, 250 150, 282 168" className={s.artArrow} />
      <path d="M272 158 l12 10 -14 6" className={s.artArrowHead} />
      <g transform="rotate(6 335 180)">
        <rect x="282" y="64" width="110" height="222" rx="20" className={s.phone} />
        <rect x="292" y="80" width="90" height="190" rx="12" className={s.phoneScreen} />
        <rect x="306" y="96" width="62" height="38" rx="6" fill="#5462B8" />
        <circle cx="318" cy="108" r="5" fill="#EDEFFB" />
        <path d="M328 106h30M328 114h20M312 126h44" stroke="#EDEFFB" strokeWidth="3" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].flatMap((i) =>
          [0, 1, 2, 3, 4].map((j) =>
            (i * 7 + j * 3) % 4 !== 0 ? <rect key={`${i}-${j}`} x={313 + i * 10} y={150 + j * 10} width="8" height="8" rx="1.5" fill="#1F2863" /> : null,
          ),
        )}
        <rect x="306" y="214" width="62" height="16" rx="8" fill="#22BAE2" />
      </g>
    </svg>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function FizvizzCaseStudy() {
  return (
    <>
      <CustomCursor />

      <CaseHeader />

      <main className={`${s.page} ${s.themeFizvizz} overflow-x-clip`}>
        {/* ── Hero ── */}
        <section id="hero" className="relative pt-32 md:pt-40 pb-16 md:pb-24">
          <div className={`${s.glow} ${s.glowA}`} aria-hidden />
          <div className={`${WRAP} relative grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center`}>
            <div className="relative">
              <Star className={`${s.float} absolute -top-10 right-6 w-9 sm:right-20`} />
              <ScrollReveal>
                <p className={`${s.accent} text-2xl sm:text-3xl font-extrabold leading-none`}>UX/UI</p>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] mt-1">Case study</p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="flex items-center gap-2 mt-10 mb-4">
                  <FizvizzMark className="w-8 h-8" />
                  <span className={`${s.wordmark} ${nunito.className}`}>fizvizz</span>
                </div>
                <h1 className="uppercase tracking-tight leading-[0.95]">
                  <span className="block text-[2.5rem] sm:text-6xl lg:text-[3.4rem] xl:text-[3.75rem] font-black">Business card</span>
                  <span className="block text-[1.75rem] sm:text-[2.6rem] lg:text-[2.35rem] xl:text-[2.6rem] font-light mt-1">&amp; networking app</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="mt-6 max-w-lg text-[var(--text-secondary)] leading-relaxed">
                  Fizvizz turns the business card into something you share in a scan. People keep different cards for different
                  circles, swap them by QR, SMS, email or link, and grow their network through events, groups and introductions —
                  without handing out their phone number.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                  {[
                    ["Role", "Mobile App Design"],
                    ["Platform", "Android & iOS"],
                    ["Scope", "18 key screens"],
                    ["Tools", "Figma"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[var(--border-subtle)] pt-3">
                      <dt className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">{k}</dt>
                      <dd className="text-sm font-medium mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="https://fizvizz.com" target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>
                    Visit fizvizz.com <Icon name="external" className="w-4 h-4" />
                  </a>
                  <a href="https://apps.apple.com/in/app/fizvizz/id1660023679" target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
                    App Store <Icon name="external" className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Collage */}
            <ScrollReveal delay={150}>
              <div className={`${s.collage} mx-auto w-full max-w-[560px] aspect-[1.02]`}>
                <ChatBubble className={`${s.float} absolute top-[2%] left-[4%] w-10 sm:w-12`} />
                <Sparkle className={`${s.floatSlow} absolute bottom-[10%] left-[0%] w-7`} />
                <Spiral className={`${s.floatSlow} absolute top-[6%] right-[2%] w-10`} />
                <Heart className={`${s.float} absolute bottom-[4%] right-[8%] w-8`} />

                <div className={`${s.heroSide} ${s.heroLeft}`}>
                  <Screen k="qrShare" sizes="(max-width: 1024px) 36vw, 210px" preload />
                </div>
                <div className={`${s.heroSide} ${s.heroRight}`}>
                  <Screen k="eventsAttend" sizes="(max-width: 1024px) 36vw, 210px" preload />
                </div>
                <div className={s.heroCenter}>
                  <Screen k="homePending" className={s.lift} sizes="(max-width: 1024px) 46vw, 270px" preload />
                </div>

                <div className={`${s.badge} ${s.badgeA}`}>
                  <span className={s.badgeIcon}><Icon name="check" className="w-3.5 h-3.5" /></span>
                  Card shared
                </div>
                <div className={`${s.badge} ${s.badgeB}`}>
                  <span className={s.badgeIconCyan}><Icon name="qr" className="w-3.5 h-3.5" /></span>
                  Scan to connect
                </div>
                <div className={`${s.badge} ${s.badgeC}`}>
                  <span className="text-[#F5B400] tracking-tight">★★★★★</span> 5.0
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Project overview ── */}
        <section className="relative py-16 md:py-24">
          <ScrollReveal className="absolute inset-0 pointer-events-none hidden lg:block">
            <Connector viewBox="0 0 100 100" d="M30 2 C 20 30, 60 40, 40 98" className="absolute left-[8%] -top-24 w-40 h-[calc(100%+6rem)]" />
          </ScrollReveal>
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-14 items-center`}>
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative mx-auto w-full max-w-[460px] aspect-[1.05]">
                <Circle className={`${s.floatSlow} absolute -top-2 left-[8%] w-12`} />
                <div className={s.ovBack}>
                  <Screen k="signUp" sizes="(max-width: 1024px) 40vw, 220px" />
                </div>
                <div className={s.ovFront}>
                  <Screen k="splash" className={s.lift} sizes="(max-width: 1024px) 44vw, 230px" />
                </div>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionTitle lead="Project" accent="Overview" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  Fizvizz is a mobile networking app built around digital business cards, groups and events. Professionals keep
                  different cards for different contexts, share them instantly, and stay in control of who holds their details —
                  access can be revoked at any time.
                </p>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  The design goal: make exchanging a contact feel as quick as handing over a paper card — and far more useful
                  afterwards.
                </p>
                <div className={s.role}>
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">My role</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    I designed the native mobile experience end to end: card creation, separate cards for different circles,
                    and sharing by QR code, link, SMS and email without exposing personal contact details — plus the flows for
                    groups and events, contact introductions, privacy and access controls, and AI-powered scanning of paper
                    business cards into digital contacts.
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

        {/* ── Problem statement ── */}
        <section className="relative py-16 md:py-24">
          <div className={`${WRAP} relative grid lg:grid-cols-2 gap-12 items-center`}>
            <div>
              <ScrollReveal>
                <SectionTitle lead="Problem" accent="Statement" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-md">
                  Networking still runs on paper and copied phone numbers. That creates friction before, during and after every
                  meeting:
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

        {/* ── User flow ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="From first open to first connection" lead="User" accent="Flow" />
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
        <section className="relative py-10 md:py-16">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Inside the app" lead="Key" accent="Features" center />
            </ScrollReveal>
          </div>
          <div className="mt-10 md:mt-16 space-y-20 md:space-y-28">
            {features.map((f, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={f.title} className={`${WRAP} relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
                  <ScrollReveal className={flip ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div className={s.featureBlob} aria-hidden />
                      {i === 0 && <Arrow className={`${s.float} absolute -top-6 right-[6%] w-16 hidden sm:block`} />}
                      {i === 2 && <Star className={`${s.floatSlow} absolute top-0 left-[4%] w-8`} />}
                      {i === 3 && <ChatBubble className={`${s.float} absolute top-[8%] right-[14%] w-11`} />}
                      {i === 5 && <Heart className={`${s.float} absolute top-[6%] left-[16%] w-9`} />}
                      <Fan keys={f.keys} />
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

        {/* ── Edge states ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Beyond the happy path" lead="Edge" accent="States" center />
            </ScrollReveal>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-10">
              {states.map((st, i) => (
                <ScrollReveal key={st.k} delay={i * 120}>
                  <figure className="text-center">
                    <div className={`mx-auto w-[62%] sm:w-full max-w-[250px] ${s.tilt}`} style={{ "--r": `${(i - 1) * 3}deg` } as CSSProperties}>
                      <Screen k={st.k} sizes="(max-width: 640px) 62vw, 250px" />
                    </div>
                    <figcaption className="mt-5">
                      <span className="block font-bold">{st.title}</span>
                      <span className="block text-sm text-[var(--text-secondary)] mt-1 max-w-[16rem] mx-auto">{st.body}</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Design system ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Visual language" lead="Design" accent="System" />
            </ScrollReveal>
            <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-12">
              <ScrollReveal>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">Colour</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {palette.map((c) => (
                    <li key={c.hex} className={s.swatch} style={{ background: c.hex, color: c.ink }}>
                      <span className="text-sm font-semibold">{c.name}</span>
                      <span className="text-xs font-mono opacity-80">{c.hex}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${s.typeCard} mt-6`}>
                  <span className={`${s.typeAa} ${nunito.className}`}>Aa</span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">Type</p>
                    <p className="font-bold text-lg mt-1">Rounded, friendly sans</p>
                    <p className="text-sm text-[var(--text-secondary)]">Bold titles, quiet grey metadata, generous line height for scanning lists.</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">Components</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Crop k="homePending" x={236} y={90} w={164} h={40} label="Segmented control" />
                  <Crop k="homePending" x={318} y={48} w={90} h={40} label="Scan & notifications" />
                  <div className="col-span-2">
                    <Crop k="homePending" x={74} y={174} w={326} h={70} label="Request counters" />
                  </div>
                  <div className="col-span-2">
                    <Crop k="homePending" x={57} y={762} w={360} h={70} label="Bottom navigation with central QR" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── All screens ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow={`${Object.keys(screens).length} screens`} lead="All" accent="Screens" center />
            </ScrollReveal>
          </div>
          <div className={`${s.marquee} mt-12`} tabIndex={0} aria-label="All Fizvizz screens, scrollable">
            <div className={s.track}>
              {[0, 1].map((dup) =>
                (Object.keys(screens) as ScreenKey[]).map((k) => (
                  <div key={`${dup}-${k}`} className={s.marqueeItem} aria-hidden={dup === 1 || undefined}>
                    <Screen k={k} sizes="200px" />
                  </div>
                )),
              )}
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
                  Fizvizz is live on the App Store with a 5.0★ rating and continues to ship updates, most recently a redesigned
                  group profile.
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
