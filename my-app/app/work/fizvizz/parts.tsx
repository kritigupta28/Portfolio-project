import type { CSSProperties } from "react";
import { CropImg, FanShots, ScreenImg, type Shot } from "../_kit/parts";

export { Arrow, ChatBubble, Circle, Connector, Heart, Sparkle, Spiral, Squiggle, Star } from "../_kit/parts";

const BASE = "/case-studies/fizvizz";
const shot = (file: string, alt: string, w = 474, h = 914, raw = false): Shot => ({ src: `${BASE}/${file}`, alt, w, h, raw });

export const screens = {
  homePending: shot("home-pending.png", "Connections home with pending requests and approvals"),
  connections: shot("connections.png", "Connections list with Fizvizz and All tabs"),
  pendingRequests: shot("pending-requests.png", "Pending requests queue with accept and decline"),
  contactProfile: shot("contact-profile.png", "Contact profile showing shared cards"),
  professionalCard: shot("professional-card.png", "Professional card with QR code and contact details"),
  qrShare: shot("qr-share-card.png", "New connection screen showing My QR to share a card", 474, 913),
  qrShareDetail: shot("qr-share-card-detail.png", "QR share screen with the selected card preview", 474, 913),
  eventsAttend: shot("events-attend.png", "Events list for events you attend"),
  myEvents: shot("my-events.png", "My events list for events you created"),
  groupDetail: shot("group-detail.png", "Group page with members, requests and Share Card"),
  feed: shot("feed.png", "Activity feed with invites and shared cards", 360, 800, true),
  signUp: shot("sign-up.png", "Create account screen with Google and LinkedIn sign up"),
  verifyEmail: shot("verify-email.png", "Email verification code entry"),
  terms: shot("terms-and-conditions.png", "Terms and conditions with consent checkboxes", 474, 1128),
  mobileWeb: shot("mobile-web-connected.png", "Mobile web confirmation of a new connection with app store badges"),
  noInternet: shot("no-internet.png", "No internet connection state with Retry"),
  updateAvailable: shot("update-available.png", "Update available state with Update Now"),
  splash: shot("splash.png", "Splash screen with slow loading message", 360, 800, true),
};

export type ScreenKey = keyof typeof screens;

export function Screen({
  k,
  ...rest
}: {
  k: ScreenKey;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  preload?: boolean;
}) {
  return <ScreenImg shot={screens[k]} {...rest} />;
}

export function Crop({ k, ...rest }: { k: ScreenKey; x: number; y: number; w: number; h: number; label: string }) {
  return <CropImg shot={screens[k]} {...rest} />;
}

export function Fan({ keys, className }: { keys: ScreenKey[]; className?: string }) {
  return <FanShots shots={keys.map((k) => screens[k])} className={className} />;
}

export function FizvizzMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="9" y="6" width="26" height="46" rx="5" transform="rotate(12 22 29)" fill="#5462B8" />
      <rect x="26" y="20" width="18" height="38" rx="4" transform="rotate(12 35 39)" fill="#22BAE2" />
    </svg>
  );
}
