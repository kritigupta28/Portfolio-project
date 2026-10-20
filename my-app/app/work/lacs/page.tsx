import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import CustomCursor from "../../components/CustomCursor";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import {
  Arrow,
  ChatBubble,
  Circle,
  Connector,
  Fan,
  LacsMark,
  LIcon,
  Pair,
  Screen,
  type ScreenKey,
  screens,
  Signal,
  Sparkle,
  Spiral,
  Squiggle,
  Star,
} from "./parts";
import { CaseHeader, Icon, SectionTitle, kit as s } from "../_kit/parts";
import l from "./lacs.module.css";

export const metadata: Metadata = {
  title: "LACS — UX/UI Case Study · Kriti Gupta",
  description:
    "UX/UI case study for LACS (Locally Accessible Cloud System), a disaster communication platform with one-tap SOS, photo, video, voice and text alerts, and a responder alert inbox that works without internet.",
  openGraph: {
    title: "LACS — UX/UI Case Study",
    description: "Designing SOS, messaging and feeds for a local network that keeps working when the internet doesn't.",
    images: ["/case-studies/lacs/home.png"],
    type: "article",
  },
};

const WRAP = "max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20";

/* ─────────────────────────── content ─────────────────────────── */

const stats = [
  { value: "16", label: "Screens designed", icon: "screens" },
  { value: "4", label: "Ways to report", icon: "camera" },
  { value: "1-tap", label: "Emergency SOS", icon: "alert" },
  { value: "2", label: "Sides: reporter & responder", icon: "people" },
] as const;

const problems = [
  "Internet and mobile networks go down or get congested exactly when they're needed most",
  "People in danger have no dependable way to reach help",
  "Rescuers hear about emergencies without a precise location or context",
  "Panic, injury and poor light make typing a long message hard",
  "Reports arrive in fragments — calls, texts, word of mouth",
  "Responders can't tell which alerts have already been handled",
];

const goals = [
  {
    title: "One tap to SOS",
    body: "A full-width red Emergency SOS button sits at the top of Home, ahead of everything else.",
    icon: "alert",
  },
  {
    title: "Report any way you can",
    body: "Photo, video, voice or text — with preset messages, so nobody has to type under stress.",
    icon: "camera",
  },
  {
    title: "Location, attached",
    body: "Alerts arrive with a map pin, so responders know where to go before they ask.",
    icon: "map",
  },
  {
    title: "Close the loop",
    body: "Responders triage an alert inbox, call or chat, and mark each alert as resolved.",
    icon: "check",
  },
] as const;

const lanes = [
  {
    tag: "Reporter",
    who: "Person in danger",
    icon: "alert",
    reporter: true,
    steps: [
      { title: "Tap SOS", sub: "Emergency SOS on Home" },
      { title: "Add information", sub: "Photo · Video · Voice · Text" },
      { title: "Capture", sub: "Shoot, record or write" },
      { title: "Review & send", sub: "Quick messages, one Send" },
    ],
  },
  {
    tag: "Responder",
    who: "Rescuer nearby",
    icon: "bell",
    reporter: false,
    steps: [
      { title: "Alert raised", sub: "Who, what and where" },
      { title: "Alert details", sub: "Location map + media" },
      { title: "Call or chat", sub: "Reach the reporter" },
      { title: "Mark as resolved", sub: "Moves to Resolved" },
    ],
  },
];

type Feature = {
  title: string;
  accent: string;
  body: string;
  points: string[];
  keys: ScreenKey[];
  /** Two screens overlapped instead of fanned. */
  pair?: { aspect: string; backStyle?: CSSProperties };
};

const features: Feature[] = [
  {
    title: "Emergency SOS,",
    accent: "in one tap",
    body: "The red Emergency SOS button spans the top of Home, above the Alerts map, quick tiles and recent posts. One tap triggers the SOS and brings up an Add More Information sheet to attach a photo, video, voice note or text.",
    points: [
      "Full-width, high-contrast SOS button at the top of Home",
      "Four big, colour-coded tiles to add information",
      "Unread counts on the Alerts and Calls & Messages tiles",
    ],
    keys: ["sosAddInfo", "home"],
    pair: { aspect: "0.92" },
  },
  {
    title: "Capture,",
    accent: "without clutter",
    body: "Each format opens a focused capture screen. The camera keeps only close, flash, gallery, shutter and flip. Voice recording shows a red Recording… label, a running timer and a live waveform, then hands over to a review screen.",
    points: [
      "Minimal camera controls on a full-bleed viewfinder",
      "Live timer and waveform while recording",
      "Playback with 10-second skips before sending",
    ],
    keys: ["capturePhoto", "recordAudio", "audioReview"],
  },
  {
    title: "Quick messages,",
    accent: "not typing",
    body: "Typing is hard with shaking hands. Review screens add one-tap chips — “We are stuck here.”, “There is an earthquake.” — above an optional Write here field, and text mode starts from preset phrases like “Emergency! Please send help now.”",
    points: [
      "Scrollable quick-message chips on photo, video and voice review",
      "Five preset emergency phrases in text mode",
      "One full-width Send button on every screen",
    ],
    keys: ["photoReview", "composeText", "videoReview"],
  },
  {
    title: "From alert",
    accent: "to action",
    body: "On the responder's side, an incoming SOS takes over the screen as Emergency Alert Raised: who sent it, what they sent, where they are, and Call or Chat. More details opens the full alert, with Mark as Resolved always at the bottom.",
    points: ["Sender, media type and map pin in one view", "Call and Chat one tap away", "More details opens the full Alert Details"],
    keys: ["alertRaised", "alertDetailImage"],
    pair: { aspect: "1", backStyle: { width: "46%", left: "6%", top: "7%" } },
  },
  {
    title: "An alert inbox",
    accent: "built for triage",
    body: "Alerts collects every report in one list — who, what they sent and how long ago, with an image or video thumbnail or an audio badge. Unread alerts are highlighted, and handled ones move to their own Resolved tab.",
    points: ["All and Resolved tabs", "Unread alerts highlighted at a glance", "Search and map view in the header"],
    keys: ["alertsList", "alertsUnread"],
    pair: { aspect: "1" },
  },
];

const formats: { k: ScreenKey; title: string; body: string; icon: string }[] = [
  { k: "alertDetailVideo", title: "Video", body: "Inline player with a scrub bar.", icon: "video" },
  { k: "alertDetailAudio", title: "Voice", body: "Waveform player plus the message.", icon: "mic" },
  { k: "alertDetailText", title: "Text", body: "The full message, easy to read.", icon: "text" },
  { k: "alertDetailImage", title: "Image", body: "With Call and Chat up top.", icon: "camera" },
];

const principles: {
  title: string;
  body: string;
  art: "sos" | "chips" | "alert" | "camera";
}[] = [
  {
    title: "Big, unmissable targets",
    body: "SOS is a full-width button, and reporting options are large tiles rather than a list.",
    art: "sos",
  },
  {
    title: "Tap, don't type",
    body: "Quick-message chips turn a sentence into a single tap; writing stays optional.",
    art: "chips",
  },
  {
    title: "Red means emergency",
    body: "Red marks the SOS button, the alert headline, recording and map pins. Everyday actions stay a calm blue.",
    art: "alert",
  },
  {
    title: "Nothing to misread",
    body: "Capture screens show only the controls needed: close, gallery, shutter and flip.",
    art: "camera",
  },
];

const palette = [
  { name: "Deep navy", hex: "#0F2C4A", bg: "var(--cs-deep)", ink: "#fff" },
  { name: "Hover", hex: "#2468AA", bg: "var(--cs-hover)", ink: "#fff" },
  { name: "Rescue blue", hex: "#2F7FCB", bg: "var(--cs)", ink: "#fff" },
  { name: "SOS red", hex: "#EC3C3C", bg: "var(--cs-alt)", ink: "#fff" },
  { name: "Audio amber", hex: "#FD9801", bg: "#FD9801", ink: "#2b1a00" },
  { name: "Mist", hex: "#E8F2FC", bg: "#E8F2FC", ink: "#0F2C4A" },
];

const tints = [
  { name: "Photo", tint: "#FFE6E2", dot: "#FC573B", icon: "camera" },
  { name: "Video", tint: "#E3F8FA", dot: "#26C6DA", icon: "video" },
  { name: "Voice", tint: "#F5E6FE", dot: "#BE63F9", icon: "mic" },
  { name: "Text", tint: "#FFF0E5", dot: "#ED8915", icon: "text" },
];

const takeaways = [
  { title: "Design for the worst moment", body: "Big targets, presets and minimal chrome assume shaking hands, poor light and no time." },
  { title: "Two users, one alert", body: "Reporter and responder screens were designed as one flow, so what's sent is what's needed to act." },
  { title: "Close the loop", body: "Mark as Resolved and a Resolved tab stop responders chasing alerts that are already handled." },
];

/* A failed cell tower on the left; on the right a local hub keeps phones talking. */
function ProblemArt() {
  const phone = (x: number, y: number, r: number, screen: ReactNode) => (
    <g transform={`rotate(${r} ${x + 23} ${y + 40})`}>
      <rect x={x} y={y} width="46" height="80" rx="9" className={l.artPhone} />
      <rect x={x + 4} y={y + 8} width="38" height="64" rx="5" className={l.artScreen} />
      {screen}
    </g>
  );
  /* Tower legs run from the apex (80,92) to (46,290) and (114,290). */
  const at = (y: number) => (34 * (y - 92)) / 198;
  const brace = (y1: number, y2: number) => `M${80 - at(y1)} ${y1}L${80 + at(y2)} ${y2}M${80 + at(y1)} ${y1}L${80 - at(y2)} ${y2}`;
  return (
    <svg viewBox="0 0 440 340" className="w-full h-auto" role="img" aria-label="A broken cell tower with no signal, beside a local LACS hub that keeps four phones connected, one of them sending an SOS">
      <ellipse cx="230" cy="318" rx="200" ry="14" className={l.artShadow} />

      {/* failed tower */}
      <path d={`M80 92L43 308M80 92L117 308M${80 - at(150)} 150H${80 + at(150)}M${80 - at(210)} 210H${80 + at(210)}M${80 - at(260)} 260H${80 + at(260)}${brace(150, 210)}${brace(210, 260)}M80 92V70`} className={l.artTower} />
      <path d="M62 62a24 24 0 000 34M98 62a24 24 0 010 34M50 50a40 40 0 000 58M110 50a40 40 0 010 58" className={l.artWaveDead} />
      <path d="M70 128l14 14-10 8 16 18" className={l.artCrack} />
      <circle cx="122" cy="62" r="14" className={l.artSos} />
      <path d="M116 56l12 12M128 56l-12 12" className={l.artSosInk} />

      {/* mesh from the local hub to each phone */}
      <path d="M300 219L219 136M300 219L393 124M300 219L407 276M300 219L222 280M219 136L393 124" className={l.artMesh} />

      {phone(196, 96, -8, (
        <>
          <rect x="203" y="124" width="32" height="14" rx="7" className={l.artSos} />
          <path d="M207 150h24M207 158h16" className={l.artGrey} />
        </>
      ))}
      {phone(370, 84, 8, <path d="M378 106h28M378 114h20M378 128h28M378 136h14" className={l.artGrey} />)}
      {phone(384, 236, -6, (
        <>
          <path d="M407 252c-6 0-10 4.5-10 10 0 7 10 16 10 16s10-9 10-16c0-5.5-4-10-10-10z" className={l.artSos} />
          <circle cx="407" cy="262" r="3.5" className={l.artScreen} />
          <path d="M393 290h28" className={l.artGrey} />
        </>
      ))}
      {phone(199, 240, 6, (
        <>
          <rect x="207" y="256" width="30" height="16" rx="4" className={l.artBlue} />
          <path d="M207 284h26M207 292h18" className={l.artGrey} />
        </>
      ))}
      <text x="174" y="104" className={l.artMark}>!</text>

      {/* local hub */}
      <path d="M300 196v-26" className={l.artTower} />
      <path d="M290 160a14 14 0 000 18M310 160a14 14 0 010 18M282 152a26 26 0 000 34M318 152a26 26 0 010 34" className={l.artWave} />
      <rect x="258" y="196" width="84" height="46" rx="11" className={l.artHub} />
      <text x="300" y="223" textAnchor="middle" className={l.artHubText}>LACS</text>
      <circle cx="272" cy="232" r="3" className={l.artLed} />
      <circle cx="282" cy="232" r="3" className={l.artLed} />
    </svg>
  );
}

/* Small pieces of the LACS UI, rebuilt in code so they stay sharp at any size. */
function PrincipleArt({ kind }: { kind: "sos" | "chips" | "alert" | "camera" }) {
  if (kind === "sos") {
    return (
      <div className={l.artSos} aria-hidden>
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M5 18h14M7 18v-5a5 5 0 0110 0v5M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Emergency SOS
      </div>
    );
  }
  if (kind === "chips") {
    return (
      <div className="w-full" aria-hidden>
        <div className="flex flex-wrap gap-1.5">
          {["We are stuck here", "There is an earthquake", "Need medical help"].map((c) => (
            <span key={c} className={l.artChip}>{c}</span>
          ))}
        </div>
        <div className={l.artSend}>Send</div>
      </div>
    );
  }
  if (kind === "alert") {
    return (
      <div className="w-full text-center" aria-hidden>
        <p className={l.artAlert}>Emergency Alert Raised</p>
        <p className="mt-1.5 text-xs text-[var(--text-secondary)]">Rohan Verma · Sent a video</p>
        <span className={l.artPin}>
          <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" fill="currentColor" /><circle cx="12" cy="10" r="2.4" fill="#fff" /></svg>
          Location attached
        </span>
      </div>
    );
  }
  return (
    <div className={l.artCamera} aria-hidden>
      <span className={l.artCamBtn}>
        <svg viewBox="0 0 24 24" className="w-4 h-4"><rect x="4" y="5" width="16" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M4 16l4.5-4.5L13 16l2.5-2.5L20 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
      </span>
      <span className={l.artShutter} />
      <span className={l.artCamBtn}>
        <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M4 12a8 8 0 0113.7-5.6M20 12a8 8 0 01-13.7 5.6M17.5 3v3.6h-3.6M6.5 21v-3.6h3.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </div>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function LacsCaseStudy() {
  return (
    <>
      <CustomCursor />

      <CaseHeader />

      <main className={`${s.page} ${s.themeLacs} overflow-x-clip`}>
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
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-10 mb-4">
                  <span className="flex items-center gap-2">
                    <LacsMark className="w-8 h-8" />
                    <span className={`${s.wordmark} tracking-[0.06em]`}>LACS</span>
                  </span>
                  <span className={l.productLabel}>Locally Accessible Cloud System</span>
                </div>
                <h1 className="uppercase tracking-tight leading-[0.95]">
                  <span className="block text-[1.8rem] min-[370px]:text-[2.1rem] min-[420px]:text-[2.45rem] sm:text-6xl lg:text-[2.8rem] xl:text-[3.2rem] font-black">
                    Disaster communication
                  </span>
                  <span className="block text-[1.75rem] sm:text-[2.6rem] lg:text-[2.35rem] xl:text-[2.6rem] font-light mt-1">&amp; SOS app</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="mt-6 max-w-lg text-[var(--text-secondary)] leading-relaxed">
                  LACS is a portable local communication system for when the internet or mobile network is unavailable or
                  disrupted. I designed its Feed, Messaging and SOS experiences — so someone in danger can raise an alert in one
                  tap, and a responder nearby knows who needs help, where, and what happened.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                  {[
                    ["Role", "UI Design"],
                    ["Platform", "Mobile app (Android)"],
                    ["Scope", "16 key screens"],
                    ["Tools", "Figma"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-[var(--border-subtle)] pt-3">
                      <dt className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)]">{k}</dt>
                      <dd className="text-sm font-medium mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#flow" className={s.btnPrimary}>
                    See the SOS flow <span aria-hidden>↓</span>
                  </a>
                  <a href="#features" className={s.btnGhost}>
                    Key features
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Collage */}
            <ScrollReveal delay={150}>
              <div className={`${s.collage} mx-auto w-full max-w-[500px] lg:max-w-[560px] aspect-[0.86]`}>
                <Signal className={`${s.float} absolute top-[1%] left-[5%] w-10 sm:w-12`} />
                <Sparkle className={`${s.floatSlow} absolute bottom-[8%] left-[0%] w-7`} />
                <Spiral className={`${s.floatSlow} absolute top-[4%] right-[2%] w-10`} />
                <Star className={`${s.float} absolute bottom-[3%] right-[6%] w-8`} />

                <div className={`${s.heroSide} ${s.heroLeft}`}>
                  <Screen k="photoReview" sizes="(max-width: 1024px) 36vw, 210px" preload />
                </div>
                <div className={`${s.heroSide} ${s.heroRight}`}>
                  <Screen k="alertDetailImage" sizes="(max-width: 1024px) 36vw, 210px" preload />
                </div>
                <div className={s.heroCenter}>
                  <Screen k="home" className={s.lift} sizes="(max-width: 1024px) 46vw, 270px" preload />
                </div>

                <div className={`${s.badge} ${s.badgeA}`}>
                  <span className={s.badgeIconCyan}><Icon name="alert" className="w-3.5 h-3.5" /></span>
                  SOS sent
                </div>
                <div className={`${s.badge} ${s.badgeB}`}>
                  <span className={s.badgeIcon}><LIcon name="pin" className="w-3.5 h-3.5" /></span>
                  Location attached
                </div>
                <div className={`${s.badge} ${s.badgeC}`}>
                  <span className={s.badgeIcon}><Icon name="wifiOff" className="w-3.5 h-3.5" /></span>
                  No internet needed
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
                <ChatBubble className={`${s.float} absolute bottom-[4%] right-[4%] w-10`} />
                <div className={s.ovBack}>
                  <Screen k="videoReview" sizes="(max-width: 1024px) 40vw, 220px" />
                </div>
                <div className={s.ovFront}>
                  <Screen k="alertDetailVideo" className={s.lift} sizes="(max-width: 1024px) 44vw, 230px" />
                </div>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionTitle lead="Project" accent="Overview" />
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  LACS — Locally Accessible Cloud System — is a disaster communication and local ICT platform. It brings feeds,
                  messaging and SOS onto a local network, so a community can keep talking when the internet or mobile network
                  is down.
                </p>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  The design goal: make asking for help the easiest thing on the screen — and give whoever answers everything
                  they need to act.
                </p>
                <div className={s.role}>
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">My role · UI Design</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    I designed the Feed, Messaging and SOS/Emergency experiences: the one-tap SOS, reporting by photo, video,
                    voice or text with preset quick messages, and the responder&apos;s alert inbox, alert details and
                    resolution flow.
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
                  In a disaster, the networks people rely on are often the first thing to fail. That breaks the chain between
                  someone who needs help and someone who can give it:
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
        <section id="flow" className="relative py-16 md:py-24 scroll-mt-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Two sides of one alert" lead="User" accent="Flow" />
            </ScrollReveal>
            <div className="mt-12">
              {lanes.map((lane, li) => (
                <div key={lane.tag}>
                  {li > 0 && (
                    <div className={l.relay}>
                      <span className={l.relayPill}>
                        <span className={l.relayIcon}><LIcon name="hub" className="w-4 h-4" /></span>
                        Alert delivered over the local network
                      </span>
                    </div>
                  )}
                  <ScrollReveal delay={li * 100}>
                    <div className={`${l.lane} ${lane.reporter ? l.reporter : ""}`}>
                      <div className={l.laneHead}>
                        <span className={s.statIcon}><Icon name={lane.icon} /></span>
                        <span>
                          <span className={`${l.laneTag} block`}>{lane.tag}</span>
                          <span className="block font-semibold mt-0.5">{lane.who}</span>
                        </span>
                      </div>
                      <ol className={`${s.flow} ${l.flow4}`}>
                        {lane.steps.map((f, i) => (
                          <li key={f.title} className={s.flowStep} style={{ "--i": i } as CSSProperties}>
                            <span className={i === 0 || i === lane.steps.length - 1 ? s.flowNodeSolid : s.flowNode}>{i + 1}</span>
                            <span className="block font-semibold text-sm mt-3">{f.title}</span>
                            <span className="block text-xs text-[var(--text-secondary)] mt-0.5">{f.sub}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="relative py-10 md:py-16 scroll-mt-24">
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
                      {i === 0 && <Arrow className={`${s.float} absolute top-[2%] right-[2%] w-16 hidden sm:block`} />}
                      {i === 1 && <Star className={`${s.floatSlow} absolute top-0 left-[4%] w-8`} />}
                      {i === 2 && <ChatBubble className={`${s.float} absolute top-[6%] right-[10%] w-11`} />}
                      {i === 3 && <Signal className={`${s.float} absolute top-[4%] right-[14%] w-11`} />}
                      {i === 4 && <Sparkle className={`${s.floatSlow} absolute top-[4%] left-[10%] w-8`} />}
                      {f.pair ? (
                        <Pair back={f.keys[0]} front={f.keys[1]} aspect={f.pair.aspect} backStyle={f.pair.backStyle} />
                      ) : (
                        <Fan keys={f.keys} />
                      )}
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

        {/* ── Alert details in every format ── */}
        <section className="relative py-16 md:py-24">
          <div className={WRAP}>
            <ScrollReveal>
              <SectionTitle eyebrow="Alert details" lead="One layout," accent="every format" center />
              <p className="mt-6 text-center text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
                Every alert keeps the same order — who, when, where — and swaps only the media block, so responders always
                know where to look. Mark as Resolved stays pinned to the bottom.
              </p>
            </ScrollReveal>
            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-8">
              {formats.map((st, i) => (
                <ScrollReveal key={st.k} delay={i * 100}>
                  <figure className="text-center">
                    <div className={`mx-auto w-full max-w-[230px] ${s.tilt}`} style={{ "--r": `${[-3, 2, -2, 3][i]}deg` } as CSSProperties}>
                      <Screen k={st.k} sizes="(max-width: 1024px) 44vw, 230px" />
                    </div>
                    <figcaption className="mt-5">
                      <span className="inline-flex items-center gap-2 font-bold">
                        <span className={`${s.tick} w-6 h-6`}><LIcon name={st.icon} className="w-3.5 h-3.5" /></span>
                        {st.title}
                      </span>
                      <span className="block text-sm text-[var(--text-secondary)] mt-1 max-w-[14rem] mx-auto">{st.body}</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Designing for stress ── */}
        <section className="relative py-16 md:py-24">
          <ScrollReveal className="absolute inset-0 pointer-events-none hidden xl:block">
            <Connector viewBox="0 0 100 100" d="M70 0 C 90 30, 40 50, 60 100" className="absolute right-[4%] -top-16 w-40 h-[calc(100%+4rem)]" />
          </ScrollReveal>
          <div className={`${WRAP} relative`}>
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
              <ScrollReveal className="lg:sticky lg:top-32">
                <SectionTitle eyebrow="Design principles" lead="Designing for" accent="stress" />
                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed max-w-md">
                  People reaching for LACS may be injured, frightened or in the dark. Four principles shaped every screen.
                </p>
                <Squiggle className="w-16 mt-6" />
              </ScrollReveal>
              <div role="list" className="grid sm:grid-cols-2 gap-5">
                {principles.map((p, i) => (
                  <ScrollReveal key={p.title} delay={i * 100} className="h-full">
                    <div role="listitem" className={l.principle}>
                      <div className={l.stage}>
                        <PrincipleArt kind={p.art} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-snug">
                          <span className={`${s.accent} mr-2 text-sm font-extrabold`}>{String(i + 1).padStart(2, "0")}</span>
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
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
                    <li key={c.hex} className={s.swatch} style={{ background: c.bg, color: c.ink }}>
                      <span className="text-sm font-semibold">{c.name}</span>
                      <span className="text-xs font-mono opacity-80">{c.hex}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mt-8 mb-4">Report types</h3>
                <ul className={l.tints}>
                  {tints.map((t) => (
                    <li key={t.name} className={l.tint} style={{ background: t.tint }}>
                      <span className={l.tintDot} style={{ background: t.dot }}><LIcon name={t.icon} className="w-3.5 h-3.5" /></span>
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold">{t.name}</span>
                        <span className="block text-[11px] font-mono opacity-70">{t.dot}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={`${s.typeCard} mt-6`}>
                  <span className={`${s.typeAa} font-bold`}>Aa</span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">Type</p>
                    <p className="font-bold text-lg mt-1">Clean, neutral sans</p>
                    <p className="text-sm text-[var(--text-secondary)]">Bold names and headings, regular messages, small grey timestamps — legible at a glance.</p>
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
          <div className={`${s.marquee} mt-12`} tabIndex={0} aria-label="All LACS screens, scrollable">
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
                  LACS keeps feeds, messaging and SOS running on a local network when the internet is out. The interface had
                  to be just as dependable: calm, familiar and impossible to misread.
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
