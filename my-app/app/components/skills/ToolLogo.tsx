import type { ReactNode } from "react";
import { iconPaths } from "./iconPaths";
import type { IconKey } from "./data";

// Full-colour brand logos. Brands whose official mark is black/near-black
// (Cursor, Next.js, shadcn/ui, GitHub) use currentColor so they stay visible in
// both themes. Apps without a published glyph (FigJam, Stitch, Antigravity,
// Teams, Adobe apps) are drawn as brand-coloured tiles in the same visual style.

const simple: Partial<Record<IconKey, string>> = {
  claude: "#D97757",
  claudecode: "#D97757",
  html: "#E34F26",
  css: "#663399",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  react: "#61DAFB",
  angular: "#DD0031",
  git: "#F03C2E",
  n8n: "#EA4B71",
  googleanalytics: "#E37400",
  cursor: "currentColor",
  nextjs: "currentColor",
  shadcn: "currentColor",
  github: "currentColor",
};

const AdobeTile = ({ bg, fg, letters }: { bg: string; fg: string; letters: string }) => (
  <>
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill={bg} />
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="none" stroke={fg} strokeWidth="1.3" />
    <text
      x="12"
      y="15.9"
      textAnchor="middle"
      fontSize="10.5"
      fontWeight="700"
      fontFamily="Arial, Helvetica, sans-serif"
      fill={fg}
    >
      {letters}
    </text>
  </>
);

// Figma's five-colour mark lives in a 38x57 box; centred into the 24x24 viewBox.
const FigmaMark = () => (
  <g transform="translate(6.6 1.2) scale(0.4)">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </g>
);

const stroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const custom: Partial<Record<IconKey, ReactNode>> = {
  figma: <FigmaMark />,
  figjam: (
    <>
      <path d="M4 4h16v11l-5 5H4z" fill="#A259FF" />
      <path d="M20 15h-5v5z" fill="#FFC700" />
      <path d="M7.5 8.8h9M7.5 12.4h5" stroke="#fff" {...stroke} />
    </>
  ),
  photoshop: <AdobeTile bg="#001E36" fg="#31A8FF" letters="Ps" />,
  illustrator: <AdobeTile bg="#330000" fg="#FF9A00" letters="Ai" />,
  aftereffects: <AdobeTile bg="#00005B" fg="#9999FF" letters="Ae" />,
  stitch: (
    <>
      <defs>
        <linearGradient id="g-stitch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8E6BFF" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#g-stitch)" />
      <path d="M5 16.5 9.2 8l2.8 5.4L14.8 8l4.2 8.5" stroke="#fff" {...stroke} strokeDasharray="2.4 2.4" />
    </>
  ),
  antigravity: (
    <>
      <defs>
        <linearGradient id="g-ag" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#34A853" />
          <stop offset="0.5" stopColor="#4285F4" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.4" fill="none" stroke="url(#g-ag)" strokeWidth="2.2" />
      <path d="M7.6 14.4 12 10l4.4 4.4M9.6 17 12 14.6l2.4 2.4" stroke="#FBBC04" {...stroke} />
    </>
  ),
  teams: (
    <>
      <rect x="1.5" y="5" width="15" height="15" rx="3.4" fill="#6264A7" />
      <path d="M5.2 10h7.6M9 10v7" stroke="#fff" {...stroke} strokeWidth={2} />
      <circle cx="18.2" cy="6.2" r="2.7" fill="#7B83EB" />
      <path d="M17.6 10.6h4.2v5.3a3.2 3.2 0 0 1-3.2 3.2" stroke="#7B83EB" {...stroke} strokeWidth={2.2} />
    </>
  ),
};

export default function ToolLogo({
  name,
  className = "w-8 h-8",
}: {
  name: IconKey;
  className?: string;
}) {
  const glyph = custom[name];

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      focusable="false"
      fill={glyph ? "none" : simple[name]}
    >
      {glyph ?? <path d={iconPaths[name]} />}
    </svg>
  );
}
