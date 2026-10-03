import type { ReactNode } from "react";
import { iconPaths } from "./iconPaths";
import type { IconKey } from "./data";

// Every icon is single-colour and uses currentColor, so it follows the theme
// (white on dark, black on light) and can be recoloured with a text-* class.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Mono = ({ letters }: { letters: string }) => (
  <>
    <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" {...stroke} />
    <text
      x="12"
      y="16.2"
      textAnchor="middle"
      fontSize="10.5"
      fontWeight="700"
      fontFamily="Arial, Helvetica, sans-serif"
      fill="currentColor"
    >
      {letters}
    </text>
  </>
);

const custom: Partial<Record<IconKey, ReactNode>> = {
  photoshop: <Mono letters="Ps" />,
  illustrator: <Mono letters="Ai" />,
  aftereffects: <Mono letters="Ae" />,
  // sticky-note: FigJam
  figjam: (
    <>
      <path d="M4.5 4.5h15v10.5l-4.5 4.5h-10.5z" {...stroke} />
      <path d="M19.5 15H15v4.5" {...stroke} />
      <path d="M8 9h8M8 12.5h4" {...stroke} />
    </>
  ),
  // running stitch: Google Stitch
  stitch: (
    <>
      <path d="M3.5 17 9 7l3 6 3-6 5.5 10" {...stroke} strokeDasharray="2.6 2.6" />
      <circle cx="3.5" cy="17" r="1.3" fill="currentColor" />
      <circle cx="20.5" cy="17" r="1.3" fill="currentColor" />
    </>
  ),
  // ascending chevrons in a ring: Antigravity
  antigravity: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M7.5 14.5 12 10l4.5 4.5" {...stroke} />
      <path d="M9.5 17.2 12 14.7l2.5 2.5" {...stroke} />
    </>
  ),
  // Teams: rounded tile with T and companion dot
  teams: (
    <>
      <rect x="2.5" y="6" width="14" height="14" rx="3.2" {...stroke} />
      <path d="M6.2 10.6h6.6M9.5 10.6V16.4" {...stroke} />
      <circle cx="18" cy="6" r="2.4" {...stroke} />
      <path d="M19.2 11.2h2.3v5.3a2.8 2.8 0 0 1-2.8 2.8" {...stroke} />
    </>
  ),
};

export default function ToolIcon({
  name,
  className = "w-8 h-8",
}: {
  name: IconKey;
  className?: string;
}) {
  const path = iconPaths[name];
  const glyph = custom[name];

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={glyph ? "none" : "currentColor"}
      aria-hidden
      focusable="false"
    >
      {glyph ?? <path d={path} />}
    </svg>
  );
}
