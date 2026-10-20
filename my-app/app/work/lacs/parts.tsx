import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { FanShots, Icon, ScreenImg, kit, type Shot } from "../_kit/parts";
import l from "./lacs.module.css";

export { Arrow, ChatBubble, Circle, Connector, Signal, Sparkle, Spiral, Squiggle, Star } from "../_kit/parts";

const BASE = "/case-studies/lacs";
const shot = (file: string, alt: string, w = 376, h = 816, raw = false): Shot => ({ src: `${BASE}/${file}`, alt, w, h, raw });

export const screens = {
  home: shot("home.png", "LACS home with user search, a red Emergency SOS button, the Alerts map, Alerts, Calls & Messages, Feeds and Pages tiles, and recent disaster-rescue posts", 376, 1000),
  sosAddInfo: shot("sos-add-info.png", "SOS triggered: an Add More Information sheet over the home screen with Photo, Video, Voice and Text tiles"),
  capturePhoto: shot("capture-photo.png", "Photo capture with close, flash, gallery, shutter and flip-camera controls"),
  photoReview: shot("photo-review.png", "Photo review over a flood-damaged neighbourhood, with quick-message chips, a Write here field and a Send button"),
  captureVideo: shot("capture-video.png", "Video capture ready to record, showing a 00:00 timer and the record button"),
  videoReview: shot("video-review.png", "Video review of a landslide-damaged house, with a play button, 05:30 duration, quick-message chips and Send"),
  recordAudio: shot("record-audio.png", "Voice recording in progress with a red Recording label, a 00:03:07 timer and a live waveform"),
  audioReview: shot("audio-review.png", "Voice note review with waveform, play and skip 10 seconds controls, quick-message chips and Send"),
  composeText: shot("compose-text.png", "Text message composer with preset emergency phrases such as Emergency! Please send help now, a Send button and the keyboard"),
  alertsList: shot("alerts-list.png", "Responder Alerts list on the Resolved tab: people who sent an image, video or audio, with thumbnails and times"),
  alertsUnread: shot("alerts-unread.png", "Responder Alerts list on the All tab with unread alerts highlighted in light blue"),
  alertRaised: shot("alert-raised.png", "Responder screen: Emergency Alert Raised by John Doe, who sent a video, with Call and Chat buttons, a map pin and More details", 360, 800, true),
  alertDetailVideo: shot("alert-detail-video.png", "Alert Details for John Doe with timestamp, location map pin, the video he sent and Mark as Resolved", 376, 815),
  alertDetailAudio: shot("alert-detail-audio.png", "Alert Details with location map pin, an audio player and the accompanying message, and Mark as Resolved", 376, 815),
  alertDetailText: shot("alert-detail-text.png", "Alert Details with location map pin, a text message asking for help and Mark as Resolved", 376, 815),
  alertDetailImage: shot("alert-detail-image.png", "Alert Details with Call and Chat buttons, location map pin, the image sent and Mark as Resolved", 376, 815),
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

/** Same look as the kit's CropImg, but offsets with a translate (relative to the image itself) so
    crops low on a screen land exactly where measured instead of drifting with the frame's border. */
export function Crop({ k, x, y, w, h, label }: { k: ScreenKey; x: number; y: number; w: number; h: number; label: string }) {
  const shot = screens[k];
  return (
    <figure className={kit.cropFig}>
      <div className={kit.crop} style={{ aspectRatio: `${w} / ${h}`, background: "transparent" }}>
        <Image
          src={shot.src}
          alt=""
          width={shot.w}
          height={shot.h}
          sizes="(max-width: 768px) 90vw, 480px"
          className={kit.cropImg}
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

export function Fan({ keys, className }: { keys: ScreenKey[]; className?: string }) {
  return <FanShots shots={keys.map((k) => screens[k])} className={className} />;
}

/** Two screens overlapping, the second lifted in front — balanced where a 2-card fan would lean. */
export function Pair({
  back,
  front,
  aspect,
  backStyle,
  className = "",
}: {
  back: ScreenKey;
  front: ScreenKey;
  aspect: string;
  backStyle?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[460px] ${className}`} style={{ aspectRatio: aspect }}>
      <div className={kit.ovBack} style={backStyle}>
        <Screen k={back} sizes="(max-width: 1024px) 40vw, 220px" />
      </div>
      <div className={kit.ovFront}>
        <Screen k={front} className={kit.lift} sizes="(max-width: 1024px) 44vw, 220px" />
      </div>
    </div>
  );
}

/** LACS has no logo of its own: a shield carrying a broadcast signal, with a red SOS dot. */
export function LacsMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 3l14 5.2v9.6c0 8.6-5.8 15.4-14 18.2C11.8 33.2 6 26.4 6 17.8V8.2z" className={l.markShield} />
      <circle cx="20" cy="21" r="2.6" className={l.markInk} />
      <path d="M15 16.2a7 7 0 000 9.6M25 16.2a7 7 0 010 9.6M11.6 12.8a12 12 0 000 16.4M28.4 12.8a12 12 0 010 16.4" className={l.markWave} />
      <circle cx="31.5" cy="8.5" r="4.5" className={l.markSos} />
    </svg>
  );
}

/** Small line icons the shared kit doesn't have. */
export function LIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    chat: (<><path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1h-8l-5 4v-4H4a1 1 0 01-1-1V6a1 1 0 011-1z" {...p} /><path d="M7.5 9.5h9M7.5 12.5h6" {...p} /></>),
    phone: <path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 006.5 6.5l1.4-2.3 4.6 1.8V19a1.5 1.5 0 01-1.5 1.5A16.5 16.5 0 013.5 5 1.5 1.5 0 015 3.5z" {...p} />,
    video: (<><rect x="3" y="6" width="13" height="12" rx="2" {...p} /><path d="M16 10.5l5-3v9l-5-3z" {...p} /></>),
    text: <path d="M5 6V4.5h14V6M12 4.5v15M9 19.5h6" {...p} />,
    hub: (<><rect x="5" y="12" width="14" height="8" rx="2" {...p} /><path d="M12 12V8M8.5 6a5 5 0 017 0M6 3.5a8.5 8.5 0 0112 0" {...p} /><path d="M8.5 16h.01M11.5 16h4" {...p} /></>),
    pin: (<><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0113 0C18.5 14.8 12 21 12 21z" {...p} /><circle cx="12" cy="9.8" r="2.3" {...p} /></>),
    tap: (<><path d="M9 11V5.5a1.6 1.6 0 013.2 0V10l4.6.9a2 2 0 011.6 2.3l-.9 5A2.5 2.5 0 0115 20.5h-3.6a3 3 0 01-2.4-1.2L5.6 14.7a1.5 1.5 0 012.2-2z" {...p} /></>),
    inbox: (<><path d="M3.5 13.5l2.5-8h12l2.5 8V19a1 1 0 01-1 1h-15a1 1 0 01-1-1z" {...p} /><path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" {...p} /></>),
  };
  if (!paths[name]) return <Icon name={name} className={className} />;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
