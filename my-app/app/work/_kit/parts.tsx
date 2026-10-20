import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import s from "./kit.module.css";

/* Shared building blocks for case-study pages. Each page wraps its <main> in
   `s.page` plus a theme class (s.themeFizvizz, s.themeLacs, s.themeNest…). */

export { s as kit };

export type Shot = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** Export has no frame/margin of its own; it gets padded and framed to match the others. */
  raw?: boolean;
};

export function ScreenImg({
  shot,
  className = "",
  style,
  sizes = "(max-width: 768px) 60vw, 320px",
  preload = false,
}: {
  shot: Shot;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  preload?: boolean;
}) {
  const img = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      sizes={sizes}
      preload={preload}
      draggable={false}
      className={shot.raw ? `${s.screen} ${s.raw}` : `${s.screen} ${className}`}
      style={shot.raw ? undefined : style}
    />
  );
  return shot.raw ? (
    <span className={`${s.rawWrap} ${className}`} style={style}>
      {img}
    </span>
  ) : (
    img
  );
}

/** Crop a region of a screen to show a single UI element. Coordinates are in image pixels. */
export function CropImg({
  shot,
  x,
  y,
  w,
  h,
  label,
}: {
  shot: Shot;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <figure className={s.cropFig}>
      <div className={s.crop} style={{ aspectRatio: `${w} / ${h}` }}>
        <Image
          src={shot.src}
          alt=""
          width={shot.w}
          height={shot.h}
          sizes="(max-width: 768px) 90vw, 480px"
          className={s.cropImg}
          // Offset relative to the image itself; % top/left would follow the frame's border box and drift.
          style={{
            width: `${(shot.w / w) * 100}%`,
            left: 0,
            top: 0,
            transform: `translate(${(-x / shot.w) * 100}%, ${(-y / shot.h) * 100}%)`,
          }}
        />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** 1–3 phone screens fanned like a hand of cards; the middle one sits on top. */
export function FanShots({ shots, className = "" }: { shots: Shot[]; className?: string }) {
  if (shots.length === 1) {
    return (
      <div className={`relative mx-auto w-[58%] max-w-[300px] ${className}`}>
        <ScreenImg shot={shots[0]} className={s.lift} sizes="(max-width: 768px) 58vw, 300px" />
      </div>
    );
  }
  const [a, b, c] = shots;
  return (
    <div className={`${s.fan} mx-auto w-full max-w-[520px] aspect-[1.08] ${className}`}>
      <div className={`${s.fanSide} ${s.fanLeft}`}>
        <ScreenImg shot={a} sizes="(max-width: 768px) 38vw, 200px" />
      </div>
      {c && (
        <div className={`${s.fanSide} ${s.fanRight}`}>
          <ScreenImg shot={c} sizes="(max-width: 768px) 38vw, 200px" />
        </div>
      )}
      <div className={s.fanCenter}>
        <ScreenImg shot={b} className={s.lift} sizes="(max-width: 768px) 46vw, 240px" />
      </div>
    </div>
  );
}

/** A desktop screenshot inside a minimal browser window. */
export function BrowserFrame({
  shot,
  url,
  className = "",
  sizes = "(max-width: 1024px) 92vw, 760px",
  preload = false,
}: {
  shot: Shot;
  url?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <figure className={`${s.browser} ${className}`}>
      <div className={s.browserBar} aria-hidden>
        <span className={s.browserDots}>
          <i />
          <i />
          <i />
        </span>
        {url && <span className={s.browserUrl}>{url}</span>}
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        preload={preload}
        draggable={false}
        className={s.browserImg}
      />
    </figure>
  );
}

/* ─── Text pieces ─── */

export function SectionTitle({
  eyebrow,
  lead,
  accent,
  center = false,
}: {
  eyebrow?: string;
  lead: string;
  accent: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--text-muted)] mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
        {lead} <span className={s.accent}>{accent}</span>
      </h2>
      <span className={`${s.underline} ${center ? "mx-auto" : ""}`} aria-hidden />
    </div>
  );
}

export function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    screens: (<><rect x="6" y="3" width="12" height="18" rx="2.5" {...p} /><path d="M10 18h4" {...p} /></>),
    desktop: (<><rect x="3" y="4" width="18" height="12" rx="2" {...p} /><path d="M8 20h8M12 16v4" {...p} /></>),
    modules: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" {...p} /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" {...p} /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" {...p} /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" {...p} /></>),
    signup: (<><circle cx="10" cy="8" r="3.5" {...p} /><path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M18 8v6M15 11h6" {...p} /></>),
    star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z" {...p} />,
    qr: (<><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" {...p} /><rect x="14" y="3.5" width="6.5" height="6.5" rx="1" {...p} /><rect x="3.5" y="14" width="6.5" height="6.5" rx="1" {...p} /><path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM14 20.5h1M20.5 14v1.5" {...p} /></>),
    cards: (<><rect x="3" y="7" width="14" height="10" rx="2" {...p} /><path d="M7 4h12a2 2 0 012 2v8" {...p} /><path d="M6.5 11h4M6.5 13.5h6" {...p} /></>),
    shield: (<><path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6z" {...p} /><path d="M9 12l2 2 4-4" {...p} /></>),
    people: (<><circle cx="8.5" cy="9" r="3" {...p} /><circle cx="16.5" cy="8" r="2.5" {...p} /><path d="M3 19c.7-3.2 2.9-5 5.5-5s4.8 1.8 5.5 5M14.5 13.4c2.6-.6 5.2.8 6 4.6" {...p} /></>),
    check: <path d="M5 12.5l4.5 4.5L19 7.5" {...p} />,
    external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" {...p} />,
    alert: (<><path d="M12 3.5l9 16H3z" {...p} /><path d="M12 10v4.5M12 17.2v.3" {...p} /></>),
    wifiOff: (<><path d="M3 3l18 18M8.5 16.5a5 5 0 017 0M5 12.5a10 10 0 015-2.6M14.5 9.9A10 10 0 0119 12.5M2 9a15 15 0 015.2-3.3M12 4.5c3.8 0 7.3 1.6 10 4.5" {...p} /><circle cx="12" cy="19.5" r=".8" {...p} /></>),
    map: (<><path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z" {...p} /><path d="M9 4v14M15 6v14" {...p} /></>),
    mic: (<><rect x="9" y="3" width="6" height="11" rx="3" {...p} /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" {...p} /></>),
    camera: (<><path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" {...p} /><circle cx="12" cy="13" r="3.5" {...p} /></>),
    clock: (<><circle cx="12" cy="12" r="8.5" {...p} /><path d="M12 7.5V12l3 2" {...p} /></>),
    school: (<><path d="M3 9l9-5 9 5-9 5z" {...p} /><path d="M7 11.2V16c1.4 1.6 3 2.3 5 2.3s3.6-.7 5-2.3v-4.8M21 9v5" {...p} /></>),
    rupee: (<><path d="M7 4.5h10M7 9h10M7 4.5h3.5a4.5 4.5 0 010 9H7l7 6" {...p} /></>),
    chart: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...p} /></>),
    bus: (<><rect x="4" y="3.5" width="16" height="14" rx="2.5" {...p} /><path d="M4 10.5h16M7.5 20.5v-3M16.5 20.5v-3" {...p} /><circle cx="8" cy="14" r=".8" {...p} /><circle cx="16" cy="14" r=".8" {...p} /></>),
    bell: (<><path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 1.5h-15z" {...p} /><path d="M10 20.5a2.2 2.2 0 004 0" {...p} /></>),
    sparkle: <path d="M12 3c.7 5.2 2.8 7.3 8 8-5.2.7-7.3 2.8-8 8-.7-5.2-2.8-7.3-8-8 5.2-.7 7.3-2.8 8-8z" {...p} />,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

/** Fixed glass top bar for case-study pages. */
export function CaseHeader() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4 sm:px-6">
      <nav className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full pl-3 pr-2.5 sm:pl-5 py-2.5 flex items-center justify-between gap-3 shadow-[0_20px_50px_var(--accent-glow)] backdrop-blur-md">
        <Link href="/#work" className="group flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          <span className="hidden sm:inline">All work</span>
          <span className="sm:hidden">Work</span>
        </Link>
        <Link href="/" className="flex items-center gap-2" aria-label="Kriti Gupta, home">
          <span className="w-8 h-8 rounded-full bg-[var(--accent-brand)] flex items-center justify-center text-[var(--bg-primary)] font-bold text-sm">K</span>
          <span className="font-bold text-base tracking-wide">Kriti</span>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

/* ─── Hand-drawn doodles (stroke follows the theme via the --cs-line colour) ─── */

type DoodleProps = { className?: string; style?: CSSProperties };

const doodle = (path: ReactNode, viewBox: string) =>
  function Doodle({ className = "", style }: DoodleProps) {
    return (
      <svg viewBox={viewBox} className={`${s.doodle} ${className}`} style={style} aria-hidden>
        {path}
      </svg>
    );
  };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Star = doodle(<path {...stroke} d="M20 4l4.6 10.2 11 1.2-8.3 7.4 2.4 10.9L20 28.1l-9.7 5.6 2.4-10.9-8.3-7.4 11-1.2z" />, "0 0 40 40");
export const Sparkle = doodle(<path {...stroke} d="M16 2c1 8 4 11 12 14-8 3-11 6-12 14-1-8-4-11-12-14 8-3 11-6 12-14z" />, "0 0 32 32");
export const Squiggle = doodle(<path {...stroke} d="M3 14c6-10 10-10 14 0s8 10 14 0 10-10 14 0 8 10 14 0" />, "0 0 62 26");
export const Spiral = doodle(<path {...stroke} d="M22 22c0-2 2-3 4-2s3 4 1 6-6 3-9 1-4-7-1-11 9-5 13-2 6 9 3 14-12 7-17 3" />, "0 0 44 44");
export const Heart = doodle(<path {...stroke} d="M18 31S5 23 5 13.5C5 9 8.5 6 12.5 6c2.6 0 4.4 1.4 5.5 3.3C19.1 7.4 20.9 6 23.5 6 27.5 6 31 9 31 13.5 31 23 18 31 18 31z" />, "0 0 36 36");
export const Circle = doodle(<path {...stroke} d="M40 9c-9-6-27-5-33 6s3 24 18 25 28-8 26-20C50 12 42 7 31 7" />, "0 0 56 48");
export const Arrow = doodle(<><path {...stroke} d="M4 40C14 12 38 6 62 14" /><path {...stroke} d="M52 6l11 8-12 6" /></>, "0 0 70 48");
export const ChatBubble = doodle(<><path {...stroke} d="M6 8h34a4 4 0 014 4v18a4 4 0 01-4 4H22l-9 8v-8H6a4 4 0 01-4-4V12a4 4 0 014-4z" /><path {...stroke} d="M12 18h22M12 25h14" /></>, "0 0 48 46");
export const Signal = doodle(<><path {...stroke} d="M8 30a16 16 0 010-22M32 8a16 16 0 010 22M14 24a8 8 0 010-10M26 14a8 8 0 010 10" /><circle cx="20" cy="19" r="2.5" {...stroke} /></>, "0 0 40 38");

/** A long dashed hand-drawn connector that draws on when its ScrollReveal wrapper becomes visible. */
export function Connector({ d, viewBox, className = "" }: { d: string; viewBox: string; className?: string }) {
  return (
    <svg viewBox={viewBox} className={`${s.connector} ${className}`} preserveAspectRatio="none" aria-hidden>
      <path d={d} className={s.connectorPath} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
