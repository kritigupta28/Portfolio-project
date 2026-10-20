import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import s from "./case.module.css";

const BASE = "/case-studies/fizvizz";

export type ScreenKey = keyof typeof screens;

export const screens = {
  homePending: { file: "home-pending.png", alt: "Connections home with pending requests and approvals", w: 474, h: 914 },
  connections: { file: "connections.png", alt: "Connections list with Fizvizz and All tabs", w: 474, h: 914 },
  pendingRequests: { file: "pending-requests.png", alt: "Pending requests queue with accept and decline", w: 474, h: 914 },
  contactProfile: { file: "contact-profile.png", alt: "Contact profile showing shared cards", w: 474, h: 914 },
  professionalCard: { file: "professional-card.png", alt: "Professional card with QR code and contact details", w: 474, h: 914 },
  qrShare: { file: "qr-share-card.png", alt: "New connection screen showing My QR to share a card", w: 474, h: 913 },
  qrShareDetail: { file: "qr-share-card-detail.png", alt: "QR share screen with the selected card preview", w: 474, h: 913 },
  eventsAttend: { file: "events-attend.png", alt: "Events list for events you attend", w: 474, h: 914 },
  myEvents: { file: "my-events.png", alt: "My events list for events you created", w: 474, h: 914 },
  groupDetail: { file: "group-detail.png", alt: "Group page with members, requests and Share Card", w: 474, h: 914 },
  feed: { file: "feed.png", alt: "Activity feed with invites and shared cards", w: 360, h: 800, raw: true },
  signUp: { file: "sign-up.png", alt: "Create account screen with Google and LinkedIn sign up", w: 474, h: 914 },
  verifyEmail: { file: "verify-email.png", alt: "Email verification code entry", w: 474, h: 914 },
  terms: { file: "terms-and-conditions.png", alt: "Terms and conditions with consent checkboxes", w: 474, h: 1128 },
  mobileWeb: { file: "mobile-web-connected.png", alt: "Mobile web confirmation of a new connection with app store badges", w: 474, h: 914 },
  noInternet: { file: "no-internet.png", alt: "No internet connection state with Retry", w: 474, h: 914 },
  updateAvailable: { file: "update-available.png", alt: "Update available state with Update Now", w: 474, h: 914 },
  splash: { file: "splash.png", alt: "Splash screen with slow loading message", w: 360, h: 800, raw: true },
} as const;

/** One exported app screen (the export already includes its rounded card and shadow). */
export function Screen({
  k,
  className = "",
  style,
  sizes = "(max-width: 768px) 60vw, 320px",
  preload = false,
}: {
  k: ScreenKey;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  preload?: boolean;
}) {
  const sc = screens[k];
  const raw = "raw" in sc;
  const img = (
    <Image
      src={`${BASE}/${sc.file}`}
      alt={sc.alt}
      width={sc.w}
      height={sc.h}
      sizes={sizes}
      preload={preload}
      draggable={false}
      className={raw ? `${s.screen} ${s.raw}` : `${s.screen} ${className}`}
      style={raw ? undefined : style}
    />
  );
  // Raw exports have no card frame or margin; pad them so they size like the others.
  return raw ? (
    <span className={`${s.rawWrap} ${className}`} style={style}>
      {img}
    </span>
  ) : (
    img
  );
}

/** Crop a region of a screen to show a single UI element. Coordinates are in screen pixels. */
export function Crop({
  k,
  x,
  y,
  w,
  h,
  label,
}: {
  k: ScreenKey;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  const sc = screens[k];
  return (
    <figure className={s.cropFig}>
      <div className={s.crop} style={{ aspectRatio: `${w} / ${h}` }}>
        <Image
          src={`${BASE}/${sc.file}`}
          alt=""
          width={sc.w}
          height={sc.h}
          sizes="(max-width: 768px) 90vw, 480px"
          className={s.cropImg}
          style={{
            width: `${(sc.w / w) * 100}%`,
            left: `${(-x / w) * 100}%`,
            top: `${(-y / h) * 100}%`,
          }}
        />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function FizvizzMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="9" y="6" width="26" height="46" rx="5" transform="rotate(12 22 29)" fill="#5462B8" />
      <rect x="26" y="20" width="18" height="38" rx="4" transform="rotate(12 35 39)" fill="#22BAE2" />
    </svg>
  );
}

/* ─── Hand-drawn doodles (stroke follows the theme via currentColor) ─── */

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

export const Star = doodle(
  <path {...stroke} d="M20 4l4.6 10.2 11 1.2-8.3 7.4 2.4 10.9L20 28.1l-9.7 5.6 2.4-10.9-8.3-7.4 11-1.2z" />,
  "0 0 40 40",
);
export const Sparkle = doodle(
  <path {...stroke} d="M16 2c1 8 4 11 12 14-8 3-11 6-12 14-1-8-4-11-12-14 8-3 11-6 12-14z" />,
  "0 0 32 32",
);
export const Squiggle = doodle(
  <path {...stroke} d="M3 14c6-10 10-10 14 0s8 10 14 0 10-10 14 0 8 10 14 0" />,
  "0 0 62 26",
);
export const Spiral = doodle(
  <path {...stroke} d="M22 22c0-2 2-3 4-2s3 4 1 6-6 3-9 1-4-7-1-11 9-5 13-2 6 9 3 14-12 7-17 3" />,
  "0 0 44 44",
);
export const Heart = doodle(
  <path {...stroke} d="M18 31S5 23 5 13.5C5 9 8.5 6 12.5 6c2.6 0 4.4 1.4 5.5 3.3C19.1 7.4 20.9 6 23.5 6 27.5 6 31 9 31 13.5 31 23 18 31 18 31z" />,
  "0 0 36 36",
);
export const Circle = doodle(
  <path {...stroke} d="M40 9c-9-6-27-5-33 6s3 24 18 25 28-8 26-20C50 12 42 7 31 7" />,
  "0 0 56 48",
);
export const Arrow = doodle(
  <>
    <path {...stroke} d="M4 40C14 12 38 6 62 14" />
    <path {...stroke} d="M52 6l11 8-12 6" />
  </>,
  "0 0 70 48",
);
export const ChatBubble = doodle(
  <>
    <path {...stroke} d="M6 8h34a4 4 0 014 4v18a4 4 0 01-4 4H22l-9 8v-8H6a4 4 0 01-4-4V12a4 4 0 014-4z" />
    <path {...stroke} d="M12 18h22M12 25h14" />
  </>,
  "0 0 48 46",
);

/** A long dashed hand-drawn connector that draws on when its section scrolls into view. */
export function Connector({ d, viewBox, className = "" }: { d: string; viewBox: string; className?: string }) {
  return (
    <svg viewBox={viewBox} className={`${s.connector} ${className}`} preserveAspectRatio="none" aria-hidden>
      <path d={d} className={s.connectorPath} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
