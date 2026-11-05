/* Choreography for the multiplayer cursors that work on the AI-workflow stage.
   Each step lists, per cursor, a looping task list. Cursors absent from a step drift off-canvas. */

export type CursorId = "kriti" | "claude" | "agentA" | "agentB";

export type CastMember = {
  id: CursorId;
  name: string;
  color: string;
  /** Text colour on top of `color` (name tag, box chip). */
  ink: string;
};

export type SwarmTask = {
  /** `data-sw` key of the element to visit, looked up inside the stage canvas. */
  at: string;
  /** Point inside the element the arrow tip rests on, as 0–1 fractions. */
  ax?: number;
  ay?: number;
  /** How long the cursor lingers after arriving, in ms. */
  hold: number;
  /** Draw a selection box around the element; a string adds a label chip. */
  box?: string | true;
  dashed?: boolean;
  click?: boolean;
};

export type StepScript = Partial<Record<CursorId, SwarmTask[]>>;

export const CAST: CastMember[] = [
  { id: "kriti", name: "Kriti", color: "#FF4FA3", ink: "#FFFFFF" },
  { id: "claude", name: "Claude", color: "#D97757", ink: "#FFFFFF" },
  { id: "agentA", name: "agent 2", color: "#3A49FF", ink: "#FFFFFF" },
  { id: "agentB", name: "agent 3", color: "#00B8D9", ink: "#012A33" },
];

/** Indexed by workflow step: Design, Brief, Build, Verify, Refine, Ship. */
export const STEP_SCRIPTS: StepScript[] = [
  {
    kriti: [
      { at: "thumb", ax: 0.78, ay: 0.7, box: "Frame", click: true, hold: 1500 },
      { at: "title", box: "H3", click: true, hold: 1100 },
      { at: "desc", box: "Body", hold: 1100 },
      { at: "cta", box: "Button", click: true, hold: 1300 },
    ],
  },
  {
    kriti: [
      { at: "prompt", ax: 0.86, ay: 0.78, hold: 2600 },
      { at: "title", box: "H3 · Bold", click: true, hold: 1200 },
      { at: "cta", box: "hover · focus", hold: 1200 },
    ],
    claude: [
      { at: "prompt", ax: 0.3, ay: 0.4, box: "reading spec", dashed: true, hold: 2400 },
      { at: "thumb", ax: 0.3, ay: 0.5, hold: 1400 },
    ],
  },
  {
    // Build is the swarm moment: Claude Code fans the card out to parallel agents.
    claude: [
      { at: "thumb", box: "<Thumb />", click: true, hold: 1600 },
      { at: "cta", box: "<Cta />", click: true, hold: 1500 },
    ],
    agentA: [
      { at: "title", box: "<Title />", click: true, hold: 1500 },
      { at: "tags", box: "<Tags />", click: true, hold: 1400 },
    ],
    agentB: [
      { at: "desc", box: "<Desc />", click: true, hold: 1700 },
      { at: "eyebrow", box: "<Eyebrow />", click: true, hold: 1300 },
    ],
  },
  {
    claude: [
      { at: "phone", ax: 0.6, ay: 0.55, box: true, click: true, hold: 1100 },
      { at: "tablet", ax: 0.6, ay: 0.55, box: true, click: true, hold: 1100 },
      { at: "desktop", ax: 0.7, ay: 0.6, box: true, click: true, hold: 1800 },
    ],
    kriti: [
      { at: "desktop", ax: 0.22, ay: 0.3, hold: 2200 },
      { at: "phone", ax: 0.5, ay: 0.4, hold: 1600 },
    ],
  },
  {
    kriti: [
      { at: "cta", box: "focus ring", click: true, hold: 1500 },
      { at: "title", box: "type scale", hold: 1300 },
      { at: "tags", box: "8pt", hold: 1200 },
    ],
    claude: [
      { at: "desc", ax: 0.4, box: "contrast AA", dashed: true, hold: 1600 },
      { at: "eyebrow", hold: 1200 },
    ],
  },
  {
    kriti: [
      { at: "badge", ax: 0.8, ay: 0.7, click: true, hold: 2000 },
      { at: "card", ax: 0.55, ay: 0.4, hold: 1800 },
    ],
    claude: [
      { at: "badge", ax: 0.15, ay: 0.9, hold: 1600 },
      { at: "cta", hold: 1600 },
    ],
  },
];
