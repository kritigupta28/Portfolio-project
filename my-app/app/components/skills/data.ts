export type IconKey =
  | "figma" | "figjam" | "photoshop" | "illustrator" | "aftereffects"
  | "stitch" | "claude" | "claudecode" | "antigravity" | "cursor"
  | "html" | "css" | "javascript" | "typescript" | "react" | "nextjs" | "angular" | "shadcn"
  | "git" | "github" | "teams" | "n8n" | "googleanalytics";

export type Tool = { name: string; icon: IconKey; note?: string };

export const toolGroups: { label: string; tools: Tool[] }[] = [
  {
    label: "Design",
    tools: [
      { name: "Figma", icon: "figma" },
      { name: "FigJam", icon: "figjam" },
      { name: "Adobe Photoshop", icon: "photoshop" },
      { name: "Adobe Illustrator", icon: "illustrator" },
      { name: "After Effects", icon: "aftereffects", note: "Basic" },
    ],
  },
  {
    label: "AI Design / Coding",
    tools: [
      { name: "Google Stitch", icon: "stitch" },
      { name: "Claude Design", icon: "claude" },
      { name: "Claude Code", icon: "claudecode" },
      { name: "Antigravity IDE", icon: "antigravity" },
      { name: "Cursor", icon: "cursor" },
    ],
  },
  {
    label: "Development",
    tools: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript / TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Angular", icon: "angular" },
      { name: "shadcn/ui", icon: "shadcn" },
    ],
  },
  {
    label: "Workflow & Analytics",
    tools: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Microsoft Teams", icon: "teams" },
      { name: "n8n", icon: "n8n" },
      { name: "Google Analytics", icon: "googleanalytics", note: "Basic" },
    ],
  },
];

export const allTools: Tool[] = toolGroups.flatMap((g) => g.tools);

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Product",
    skills: ["Product Thinking", "End-to-End Product Design", "Product Discovery", "Product Strategy", "Problem Solving", "Design Thinking", "Requirements Gathering"],
  },
  {
    title: "UX Research",
    skills: ["User Research", "Competitive Analysis", "User Journey Mapping", "Information Architecture", "Usability Testing", "User Flows", "Wireframing", "UX Writing"],
  },
  {
    title: "UI Design",
    skills: ["Visual & Responsive Design", "Design Systems", "Components", "Prototyping", "Accessibility (WCAG)", "Interaction Design", "Design QA", "Developer Handoff"],
  },
  {
    title: "AI Workflow",
    skills: ["AI-Assisted UI Generation", "Prompting for Design", "AI-Assisted Prototyping & Frontend Development"],
  },
  {
    title: "Collaboration",
    skills: ["Stakeholder Communication", "Cross-functional Collaboration", "Design Reviews", "Product Documentation", "Agile / Sprint Workflows"],
  },
  {
    title: "Marketing",
    skills: ["Social Media Design", "Content Planning", "Creative Production", "Brand Consistency", "Campaign Design", "GTM Communication"],
  },
];

// Brand accent colours, used only for momentary highlights on the focused tool.
export const brandColor: Record<IconKey, string> = {
  figma: "#A259FF",
  figjam: "#A259FF",
  photoshop: "#31A8FF",
  illustrator: "#FF9A00",
  aftereffects: "#9999FF",
  stitch: "#7B61FF",
  claude: "#D97757",
  claudecode: "#D97757",
  antigravity: "#4285F4",
  cursor: "#8a8a8a",
  html: "#E34F26",
  css: "#663399",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  react: "#61DAFB",
  nextjs: "#8a8a8a",
  angular: "#DD0031",
  shadcn: "#8a8a8a",
  git: "#F03C2E",
  github: "#8a8a8a",
  teams: "#6264A7",
  n8n: "#EA4B71",
  googleanalytics: "#E37400",
};
