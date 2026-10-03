"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import ToolIcon from "./ToolIcon";
import { allTools, brandColor, skillGroups, toolGroups, type IconKey } from "./data";
import s from "./SkillsSection.module.css";

/* ════════════════════════════════════════════════════════════════════
   Constellation Globe
   A wireframe instrument globe. Tools are stars; each skill group is a
   constellation whose great-circle arcs draw themselves across the sphere.
   ════════════════════════════════════════════════════════════════════ */

type V3 = [number, number, number];

const N = allTools.length;
const D2R = Math.PI / 180;
const TAU = Math.PI * 2;
const CAM = 6; // camera distance in globe radii (gentle perspective)
const HORIZON = 1 / CAM; // z beyond which a surface point faces the camera
const R_FRAC = 0.4; // globe radius as a fraction of the stage width
const REST_PITCH = 14 * D2R;
const PITCH_MAX = 62 * D2R;
const IDLE = 0.12; // rad/s idle spin

/** Which tools each discipline leans on — every tool belongs to ≥1 constellation. */
const constellations: Record<string, IconKey[]> = {
  Product: ["figma", "figjam", "claude", "n8n", "teams", "googleanalytics"],
  "UX Research": ["figjam", "figma", "stitch", "googleanalytics", "teams"],
  "UI Design": ["figma", "illustrator", "shadcn", "html", "css", "react", "angular"],
  "AI Workflow": ["stitch", "claude", "claudecode", "antigravity", "cursor", "nextjs", "typescript"],
  Collaboration: ["figjam", "teams", "github", "git", "n8n"],
  Marketing: ["photoshop", "illustrator", "aftereffects", "figma", "googleanalytics"],
};

const toolIndex = new Map<IconKey, number>(allTools.map((t, i) => [t.icon, i]));
const groupOf = new Map<IconKey, string>();
toolGroups.forEach((g) => g.tools.forEach((t) => groupOf.set(t.icon, g.label)));

const members: number[][] = skillGroups.map((g) =>
  (constellations[g.title] ?? []).map((k) => toolIndex.get(k)).filter((i): i is number => i != null),
);

/* ───────── vector helpers ───────── */

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (v: V3): V3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrapPi = (a: number) => a - TAU * Math.round(a / TAU);
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/* ───────── star placement ───────── */

// Fibonacci lattice kept off the poles, so every star can be framed.
const lattice: V3[] = (() => {
  const G = Math.PI * (3 - Math.sqrt(5));
  const pts: V3[] = [];
  for (let k = 0; k < N; k++) {
    const y = 0.84 * (1 - (2 * (k + 0.5)) / N);
    const r = Math.sqrt(1 - y * y);
    pts.push([Math.sin(k * G) * r, y, Math.cos(k * G) * r]);
  }
  return pts;
})();

// Deterministic swap-search: tools that share disciplines settle near each
// other, so every constellation reads as a compact figure on one hemisphere.
const stars: V3[] = (() => {
  const perm = Array.from({ length: N }, (_, i) => (i * 7) % N);
  const cost = () => {
    let c = 0;
    for (const m of members)
      for (let a = 0; a < m.length; a++)
        for (let b = a + 1; b < m.length; b++) c += 1 - dot(lattice[perm[m[a]]], lattice[perm[m[b]]]);
    return c;
  };
  let best = cost();
  for (let sweep = 0, improved = true; improved && sweep < 24; sweep++) {
    improved = false;
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        [perm[i], perm[j]] = [perm[j], perm[i]];
        const c = cost();
        if (c < best - 1e-9) {
          best = c;
          improved = true;
        } else [perm[i], perm[j]] = [perm[j], perm[i]];
      }
  }
  return allTools.map((_, i) => lattice[perm[i]]);
})();

const starLL = stars.map((p) => ({ lon: Math.atan2(p[0], p[2]), lat: Math.asin(p[1]) }));

/* ───────── constellations: minimum spanning trees of great-circle arcs ───────── */

type Edge = { a: number; b: number; pts: V3[]; delay: number; dur: number };
type Geo = { edges: Edge[]; lon: number; lat: number; arrive: Map<number, number> };

const slerp = (a: V3, b: V3, ang: number, n: number): V3[] => {
  const out: V3[] = [];
  const sn = Math.sin(ang) || 1;
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const wa = Math.sin((1 - t) * ang) / sn;
    const wb = Math.sin(t * ang) / sn;
    out.push([a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb]);
  }
  return out;
};

const geos: Geo[] = members.map((m) => {
  let c: V3 = [0, 0, 0];
  m.forEach((i) => (c = [c[0] + stars[i][0], c[1] + stars[i][1], c[2] + stars[i][2]]));
  c = norm(c);
  let root = m[0];
  m.forEach((i) => dot(stars[i], c) > dot(stars[root], c) && (root = i));

  const inTree = new Set([root]);
  const arrive = new Map([[root, 0]]);
  const edges: Edge[] = [];
  while (inTree.size < m.length) {
    let bu = -1;
    let bv = -1;
    let bd = -2;
    for (const u of inTree)
      for (const v of m) {
        if (inTree.has(v)) continue;
        const d = dot(stars[u], stars[v]);
        if (d > bd) [bd, bu, bv] = [d, u, v];
      }
    const ang = Math.acos(clamp(bd, -1, 1));
    const delay = arrive.get(bu)!;
    const dur = 0.16 + ang * 0.26;
    edges.push({ a: bu, b: bv, pts: slerp(stars[bu], stars[bv], ang, Math.max(8, Math.ceil(ang / 0.035))), delay, dur });
    arrive.set(bv, delay + dur);
    inTree.add(bv);
  }
  return { edges, lon: Math.atan2(c[0], c[2]), lat: Math.asin(c[1]), arrive };
});

// Flat thumbnail of each constellation (for the tab list).
const thumbs = geos.map((g, gi) => {
  const cy = Math.cos(-g.lon);
  const sy = Math.sin(-g.lon);
  const cp = Math.cos(g.lat);
  const sp = Math.sin(g.lat);
  const pos = new Map<number, [number, number]>();
  members[gi].forEach((i) => {
    const v = stars[i];
    const x1 = v[0] * cy + v[2] * sy;
    const z1 = -v[0] * sy + v[2] * cy;
    pos.set(i, [x1, -(v[1] * cp - z1 * sp)]);
  });
  const xs = [...pos.values()].map((p) => p[0]);
  const ys = [...pos.values()].map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const W = 40;
  const H = 18;
  const k = Math.min(W / (x1 - x0 || 1), H / (y1 - y0 || 1));
  const ox = 2 + (W - (x1 - x0) * k) / 2;
  const oy = 2 + (H - (y1 - y0) * k) / 2;
  const P = (i: number) => {
    const p = pos.get(i)!;
    return [+(ox + (p[0] - x0) * k).toFixed(1), +(oy + (p[1] - y0) * k).toFixed(1)] as const;
  };
  return {
    d: g.edges.map((e) => `M${P(e.a).join(" ")}L${P(e.b).join(" ")}`).join(""),
    dots: members[gi].map(P),
  };
});

/* ───────── static geometry ───────── */

const SEG = 96;
const ring = (f: (a: number) => V3) => Array.from({ length: SEG + 1 }, (_, j) => f((j / SEG) * TAU));
const parallels = [-60, -30, 30, 60].map((lat) => {
  const y = Math.sin(lat * D2R);
  const r = Math.cos(lat * D2R);
  return ring((a) => [Math.sin(a) * r, y, Math.cos(a) * r]);
});
const meridians = [0, 30, 60, 90, 120, 150].map((lon) =>
  ring((a) => [Math.cos(a) * Math.sin(lon * D2R), Math.sin(a), Math.cos(a) * Math.cos(lon * D2R)]),
);
const equator = ring((a) => [Math.sin(a), 0, Math.cos(a)]);

const DOTS: V3[] = (() => {
  const G = Math.PI * (3 - Math.sqrt(5));
  const n = 560;
  return Array.from({ length: n }, (_, k) => {
    const y = 1 - (2 * (k + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    return [Math.sin(k * G) * r, y, Math.cos(k * G) * r] as V3;
  });
})();

// Bezel ticks (viewBox −500…500, globe silhouette ≈ 406).
const TICKS = (() => {
  let minor = "";
  let major = "";
  for (let d = 0; d < 360; d += 5) {
    const a = (d - 90) * D2R;
    const big = d % 30 === 0;
    const r0 = 422;
    const r1 = big ? 440 : 430;
    const seg = `M${(Math.cos(a) * r0).toFixed(1)} ${(Math.sin(a) * r0).toFixed(1)}L${(Math.cos(a) * r1).toFixed(1)} ${(Math.sin(a) * r1).toFixed(1)}`;
    if (big) major += seg;
    else minor += seg;
  }
  return { minor, major };
})();
const BEZEL_LABELS = [0, 90, 180, 270].map((d) => {
  const a = (d - 90) * D2R;
  return { d, x: +(Math.cos(a) * 468).toFixed(1), y: +(Math.sin(a) * 468).toFixed(1) };
});

const fmtLon = (v: number) => `${Math.abs(v).toFixed(1).padStart(5, "0")}°${v < 0 ? "W" : "E"}`;
const fmtLat = (v: number) => `${Math.abs(v).toFixed(1).padStart(4, "0")}°${v < 0 ? "S" : "N"}`;
const pad2 = (n: number) => String(n).padStart(2, "0");

/* ───────── path builder that splits a polyline at the horizon ───────── */

class Split {
  f = "";
  b = "";
  private prev = 0; // 0 none · 1 front · 2 back
  private last = "";
  reset() {
    this.f = "";
    this.b = "";
    this.prev = 0;
  }
  lift() {
    this.prev = 0;
  }
  add(x: number, y: number, front: boolean) {
    const c = `${x.toFixed(1)} ${y.toFixed(1)}`;
    const st = front ? 1 : 2;
    if (this.prev === st) {
      if (front) this.f += `L${c}`;
      else this.b += `L${c}`;
    } else {
      const head = this.prev === 0 ? `M${c}` : `M${this.last}L${c}`;
      if (front) this.f += head;
      else this.b += head;
    }
    this.prev = st;
    this.last = c;
  }
}

/* ───────── scrambling label ───────── */

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+·";

function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }
    const t0 = performance.now();
    const dur = 260 + text.length * 22;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const n = Math.floor(p * p * text.length + p * 0.0001);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++)
        out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = p >= 1 ? text : out;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return (
    <span className={className}>
      <span ref={ref} aria-hidden />
      <span className={s.sr}>{text}</span>
    </span>
  );
}

/* ═════════════════════════════ component ═════════════════════════════ */

type ArcSlot = { g: number; t0: number; freeze: number | null; out: number | null };

export default function SkillsSection() {
  const [tab, setTab] = useState(0);
  const [hoverGroup, setHoverGroup] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null); // mouse over a star (holds the globe)
  const [peek, setPeek] = useState<number | null>(null); // mouse over a tool name (swings the globe)
  const [kbd, setKbd] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [rove, setRove] = useState(0);
  const [seen, setSeen] = useState(false);

  const shown = hoverGroup ?? tab;
  const focus = hover ?? peek ?? kbd ?? pinned;
  const aim = hover != null ? null : (peek ?? kbd ?? pinned);
  const litMembers = seen ? geos[shown].arrive : null;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const r = useRef({
    svgB: null as SVGSVGElement | null,
    svgF: null as SVGSVGElement | null,
    gB: null as SVGPathElement | null,
    gF: null as SVGPathElement | null,
    eqF: null as SVGPathElement | null,
    eqB: null as SVGPathElement | null,
    d1: null as SVGPathElement | null,
    d2: null as SVGPathElement | null,
    d3: null as SVGPathElement | null,
    aF: null as SVGPathElement | null,
    aB: null as SVGPathElement | null,
    tips: null as SVGPathElement | null,
    oG: null as SVGGElement | null,
    oGB: null as SVGGElement | null,
    oF: null as SVGPathElement | null,
    oB: null as SVGPathElement | null,
    spec: null as HTMLSpanElement | null,
    rimLight: null as HTMLSpanElement | null,
    tickHi: null as HTMLDivElement | null,
    caret: null as HTMLDivElement | null,
    ret: null as HTMLDivElement | null,
    ch: null as HTMLSpanElement | null,
    cv: null as HTMLSpanElement | null,
    lon: null as HTMLSpanElement | null,
    lat: null as HTMLSpanElement | null,
  });

  // Animation state lives here — React never re-renders per frame.
  const anim = useRef({
    yaw: -0.6,
    pitch: REST_PITCH,
    vy: 0,
    vp: 0,
    size: 0,
    dragging: false,
    hold: false,
    framed: true,
    focus: null as number | null,
    aim: null as number | null,
    group: 0,
    reduced: false,
    seen: false,
    cx: 0,
    cy: 0,
    cin: false,
    cur: null as ArcSlot | null,
    out: null as ArcSlot | null,
    kick: () => {},
    setGroup: (g: number) => void g,
  });

  /* ───────── render loop ───────── */
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;
    const A = anim.current;
    const E = r.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    A.reduced = mq.matches;
    const onMq = () => {
      A.reduced = mq.matches;
      A.kick();
    };
    mq.addEventListener("change", onMq);

    const backFlags = new Array<boolean>(N).fill(false);
    const SX = new Float32Array(N);
    const SY = new Float32Array(N);
    const MX = new Float32Array(N);
    const MY = new Float32Array(N);
    let rx = 0;
    let ry = 0;
    let rvx = 0;
    let rvy = 0;
    let la = -2.36; // light angle (screen, rad)
    let li = 0.55; // light intensity
    let lastCa = 999;
    let dLon = -A.yaw;
    let dLat = A.pitch;
    let lonTxt = "";
    let latTxt = "";
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let settled = 0;
    const sp = new Split();

    const ro = new ResizeObserver(([e]) => {
      const sz = e.contentRect.width;
      A.size = sz;
      stage.style.setProperty("--tile", `${Math.round(clamp(sz * 0.068, 24, 34))}px`);
      const vb = `${-sz / 2} ${-sz / 2} ${sz} ${sz}`;
      E.svgB?.setAttribute("viewBox", vb);
      E.svgF?.setAttribute("viewBox", vb);
      A.kick();
    });
    ro.observe(stage);

    A.setGroup = (g: number) => {
      A.group = g;
      if (!A.seen) return;
      const now = performance.now();
      if (A.cur && A.cur.g === g && A.cur.out == null) return;
      if (A.cur) A.out = { ...A.cur, freeze: A.cur.freeze ?? now, out: now };
      A.cur = { g, t0: now, freeze: null, out: null };
      A.kick();
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60;
      last = t;
      const S = A.size;
      if (!S) return;
      const R = S * R_FRAC;
      const reduced = A.reduced;
      let busy = false;

      /* dynamics: yaw / pitch springs (slightly under-damped → subtle overshoot) */
      if (!A.dragging) {
        const target = A.aim != null ? starLL[A.aim] : A.framed ? geos[A.group] : null;
        if (target) {
          let yT = -target.lon;
          yT += TAU * Math.round((A.yaw - yT) / TAU);
          const pT = clamp(target.lat, -PITCH_MAX, PITCH_MAX);
          const sway = !reduced && A.aim == null && !A.hold ? Math.sin(t / 1000 * 0.42) * 0.09 : 0;
          if (reduced) {
            A.yaw = yT;
            A.pitch = pT;
            A.vy = A.vp = 0;
          } else {
            const K = 40;
            const C = 2 * Math.sqrt(K) * 0.64;
            A.vy += (K * (yT + sway - A.yaw) - C * A.vy) * dt;
            A.vp += (K * (pT - A.pitch) - C * A.vp) * dt;
          }
        } else if (reduced) {
          A.vy = A.vp = 0;
        } else {
          const idle = A.hold ? 0 : IDLE;
          A.vy += (idle - A.vy) * (1 - Math.exp(-dt * (A.hold ? 7 : 0.85)));
          const K = 20;
          const C = 2 * Math.sqrt(K) * 0.6;
          A.vp += (K * (REST_PITCH - A.pitch) - C * A.vp) * dt;
        }
        A.yaw += A.vy * dt;
        A.pitch += A.vp * dt;
        if (Math.abs(A.vy) > 1e-4 || Math.abs(A.vp) > 1e-4) busy = true;
      }

      const cy = Math.cos(A.yaw);
      const sy = Math.sin(A.yaw);
      const cp = Math.cos(A.pitch);
      const spi = Math.sin(A.pitch);
      let px = 0;
      let py = 0;
      let pz = 0;
      let pk = 1;
      const P = (v: V3) => {
        const x1 = v[0] * cy + v[2] * sy;
        const z1 = -v[0] * sy + v[2] * cy;
        const y2 = v[1] * cp - z1 * spi;
        pz = v[1] * spi + z1 * cp;
        pk = CAM / (CAM - pz);
        px = x1 * R * pk;
        py = -y2 * R * pk;
      };

      /* stars */
      const ease = 1 - Math.exp(-dt * 14);
      for (let i = 0; i < N; i++) {
        const el = starRefs.current[i];
        if (!el) continue;
        P(stars[i]);
        let tx = 0;
        let ty = 0;
        if (A.focus === i && A.cin && !A.dragging && !reduced) {
          tx = clamp((A.cx - px) * 0.3, -7, 7);
          ty = clamp((A.cy - py) * 0.3, -7, 7);
        }
        MX[i] += (tx - MX[i]) * ease;
        MY[i] += (ty - MY[i]) * ease;
        if (Math.abs(tx - MX[i]) + Math.abs(ty - MY[i]) > 0.02) busy = true;
        const x = px + MX[i];
        const y = py + MY[i];
        SX[i] = x;
        SY[i] = y;
        const sc = pk * (0.66 + 0.34 * ((pz + 1) / 2));
        const vis = smooth(-0.4, 0.3, pz);
        el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${sc.toFixed(4)})`;
        el.style.opacity = (0.16 + 0.84 * vis).toFixed(3);
        const back = pz < HORIZON;
        el.style.zIndex = String(A.focus === i ? 300 : back ? 10 + Math.round((pz + 1) * 20) : 100 + Math.round(pz * 60));
        if (back !== backFlags[i]) {
          backFlags[i] = back;
          el.dataset.back = back ? "1" : "0";
        }
      }

      /* graticule */
      sp.reset();
      for (const rg of [...parallels, ...meridians]) {
        sp.lift();
        for (const v of rg) {
          P(v);
          sp.add(px, py, pz > HORIZON);
        }
      }
      E.gF?.setAttribute("d", sp.f);
      E.gB?.setAttribute("d", sp.b);
      sp.reset();
      for (const v of equator) {
        P(v);
        sp.add(px, py, pz > HORIZON);
      }
      E.eqF?.setAttribute("d", sp.f);
      E.eqB?.setAttribute("d", sp.b);

      /* dot-matrix surface, bucketed by depth */
      let d1 = "";
      let d2 = "";
      let d3 = "";
      for (const v of DOTS) {
        P(v);
        if (pz < 0.3) continue;
        const c = `M${px.toFixed(1)} ${py.toFixed(1)}h0`;
        if (pz < 0.6) d1 += c;
        else if (pz < 0.85) d2 += c;
        else d3 += c;
      }
      E.d1?.setAttribute("d", d1);
      E.d2?.setAttribute("d", d2);
      E.d3?.setAttribute("d", d3);

      /* constellation arcs */
      const now = performance.now();
      let tips = "";
      const drawSlot = (slot: ArcSlot) => {
        const g = geos[slot.g];
        const el = ((slot.freeze ?? now) - slot.t0) / 1000;
        sp.reset();
        for (const e of g.edges) {
          let p = reduced ? 1 : clamp((el - e.delay) / e.dur, 0, 1);
          if (p <= 0) continue;
          if (p < 1 && slot.freeze == null) busy = true;
          p = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          const n = e.pts.length - 1;
          const f = p * n;
          const m = Math.floor(f);
          sp.lift();
          for (let k = 0; k <= m && k <= n; k++) {
            P(e.pts[k]);
            sp.add(px, py, pz > HORIZON);
          }
          if (m < n) {
            const a = e.pts[m];
            const b = e.pts[m + 1];
            const u = f - m;
            P(norm([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u]));
            sp.add(px, py, pz > HORIZON);
            if (pz > HORIZON && slot.out == null) tips += `M${px.toFixed(1)} ${py.toFixed(1)}h0`;
          }
        }
      };
      if (A.cur) {
        drawSlot(A.cur);
        E.aF?.setAttribute("d", sp.f);
        E.aB?.setAttribute("d", sp.b);
      }
      E.tips?.setAttribute("d", tips);
      if (A.out) {
        const o = reduced ? 0 : 1 - (now - A.out.out!) / 380;
        if (o <= 0) {
          A.out = null;
          E.oF?.setAttribute("d", "");
          E.oB?.setAttribute("d", "");
        } else {
          busy = true;
          drawSlot(A.out);
          E.oF?.setAttribute("d", sp.f);
          E.oB?.setAttribute("d", sp.b);
          const oo = (o * o).toFixed(3);
          if (E.oG) E.oG.style.opacity = oo;
          if (E.oGB) E.oGB.style.opacity = oo;
        }
      }

      /* reticle: spring onto the focused star */
      if (A.focus != null) {
        const tx = SX[A.focus];
        const ty = SY[A.focus];
        if (reduced) {
          rx = tx;
          ry = ty;
        } else {
          const K = 320;
          const C = 2 * Math.sqrt(K) * 0.52;
          const h = dt / 2;
          for (let k = 0; k < 2; k++) {
            rvx += (K * (tx - rx) - C * rvx) * h;
            rvy += (K * (ty - ry) - C * rvy) * h;
            rx += rvx * h;
            ry += rvy * h;
          }
          if (Math.abs(tx - rx) + Math.abs(ty - ry) + Math.abs(rvx) + Math.abs(rvy) > 0.05) busy = true;
        }
        if (E.ret) E.ret.style.transform = `translate3d(${rx.toFixed(2)}px,${ry.toFixed(2)}px,0)`;
        if (E.ch) E.ch.style.transform = `translate3d(0,${ry.toFixed(2)}px,0)`;
        if (E.cv) E.cv.style.transform = `translate3d(${rx.toFixed(2)}px,0,0)`;
      }

      /* cursor-following light: specular + rim + bezel highlight */
      const lt = A.cin ? Math.atan2(A.cy, A.cx) : -2.36;
      const ke = reduced ? 1 : 1 - Math.exp(-dt * 7);
      const da = wrapPi(lt - la);
      la += da * ke;
      li += ((A.cin ? 1 : 0.5) - li) * ke;
      if (Math.abs(da) > 0.002 || Math.abs((A.cin ? 1 : 0.5) - li) > 0.004) busy = true;
      const ca = la / D2R + 90;
      if (Math.abs(ca - lastCa) > 0.05) {
        lastCa = ca;
        const deg = `${ca.toFixed(2)}deg`;
        E.rimLight?.style.setProperty("--ca", deg);
        E.tickHi?.style.setProperty("--ca", deg);
        if (E.caret) E.caret.style.transform = `rotate(${deg})`;
      }
      if (E.spec) {
        const sr = R * 0.6 * li;
        E.spec.style.transform = `translate3d(${(Math.cos(la) * sr).toFixed(1)}px,${(Math.sin(la) * sr).toFixed(1)}px,0)`;
        E.spec.style.opacity = li.toFixed(3);
      }
      if (E.rimLight) E.rimLight.style.opacity = (li * li).toFixed(3);

      /* readout: ticks toward the focused star's coordinates, else the view centre */
      const tLon = A.focus != null ? starLL[A.focus].lon : -A.yaw;
      const tLat = A.focus != null ? starLL[A.focus].lat : A.pitch;
      const kr = reduced ? 1 : 1 - Math.exp(-dt * 9);
      const dl = wrapPi(tLon - dLon);
      dLon = wrapPi(dLon + dl * kr);
      dLat += (tLat - dLat) * kr;
      if (Math.abs(dl) + Math.abs(tLat - dLat) > 0.0005) busy = true;
      const lo = fmtLon(dLon / D2R);
      const la2 = fmtLat(dLat / D2R);
      if (lo !== lonTxt && E.lon) E.lon.textContent = lonTxt = lo;
      if (la2 !== latTxt && E.lat) E.lat.textContent = latTxt = la2;

      settled = busy || A.dragging ? 0 : settled + 1;
      if (onScreen && !document.hidden && settled < 12) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      settled = 0;
      if (!raf && onScreen && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    A.kick = kick;

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) {
          if (!A.seen && e.intersectionRatio > 0) {
            A.seen = true;
            setSeen(true);
            A.setGroup(A.group);
          }
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "60px", threshold: [0, 0.2] },
    );
    io.observe(section);
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else kick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMq);
      A.kick = () => {};
    };
  }, []);

  /* sync React state → animation state */
  useEffect(() => {
    const A = anim.current;
    A.focus = focus;
    A.aim = aim;
    A.hold = hover != null;
    A.kick();
  }, [focus, aim, hover]);

  useEffect(() => {
    anim.current.framed = true;
    anim.current.setGroup(shown);
  }, [shown]);

  /* ───────── drag to orbit (touch: horizontal only, so the page still scrolls) ───────── */
  const drag = useRef({ id: -1, x: 0, y: 0, t: 0, active: false, moved: false, type: "" });
  const samples = useRef<{ t: number; yaw: number; pitch: number }[]>([]);

  const trackCursor = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || !stageRef.current) return;
    const b = stageRef.current.getBoundingClientRect();
    const A = anim.current;
    A.cx = e.clientX - (b.left + b.width / 2);
    A.cy = e.clientY - (b.top + b.height / 2);
    A.cin = true;
    A.kick();
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), active: false, moved: false, type: e.pointerType };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    trackCursor(e);
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const A = anim.current;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.active) {
      if (Math.hypot(dx, dy) < 5) return;
      if (d.type !== "mouse" && Math.abs(dy) > Math.abs(dx)) {
        d.id = -1; // vertical intent → let the page scroll
        return;
      }
      d.active = true;
      d.moved = true;
      A.dragging = true;
      A.framed = false;
      A.vy = A.vp = 0;
      stageRef.current?.setPointerCapture(e.pointerId);
      stageRef.current?.setAttribute("data-dragging", "1");
      setPinned(null);
      setHover(null);
      d.x = e.clientX;
      d.y = e.clientY;
      d.t = performance.now();
      samples.current = [{ t: d.t, yaw: A.yaw, pitch: A.pitch }];
      A.kick();
      return;
    }
    const now = performance.now();
    const R = (A.size || 300) * R_FRAC;
    A.yaw += dx / R;
    if (d.type === "mouse") {
      const over = Math.abs(A.pitch) > PITCH_MAX ? 0.3 : 1; // rubber band past the limit
      A.pitch = clamp(A.pitch + (dy / R) * over, -PITCH_MAX - 0.35, PITCH_MAX + 0.35);
    }
    const smp = samples.current;
    smp.push({ t: now, yaw: A.yaw, pitch: A.pitch });
    while (smp.length > 2 && now - smp[0].t > 100) smp.shift();
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    A.kick();
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    d.id = -1;
    if (!d.active) return;
    d.active = false;
    const A = anim.current;
    A.dragging = false;
    // Release velocity from the last ~100ms of motion (robust to bunched events).
    const now = performance.now();
    const s0 = samples.current[0];
    const span = s0 ? (now - s0.t) / 1000 : 0;
    if (s0 && now - d.t < 90 && span > 0.012) {
      A.vy = clamp((A.yaw - s0.yaw) / span, -8, 8);
      A.vp = clamp(((A.pitch - s0.pitch) / span) * 0.6, -2.5, 2.5);
    } else A.vy = A.vp = 0;
    samples.current = [];
    stageRef.current?.removeAttribute("data-dragging");
    A.kick();
  };

  const onStageLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    anim.current.cin = false;
    anim.current.kick();
  };

  const onStageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (!drag.current.moved) setPinned(null);
    drag.current.moved = false;
  };

  const onStarClick = (i: number) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setPinned((p) => (p === i ? null : i));
    setHover(null);
    setRove(i);
  };

  const onStarKey = (e: ReactKeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % N;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + N) % N;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = N - 1;
    else if (e.key === "Escape") {
      setPinned(null);
      return;
    }
    if (next < 0) return;
    e.preventDefault();
    setRove(next);
    starRefs.current[next]?.focus();
  };

  /* ───────── tabs ───────── */
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectTab = (i: number) => {
    setTab(i);
    setPinned(null);
    anim.current.framed = true;
    anim.current.kick();
  };
  const onTabKey = (e: ReactKeyboardEvent, i: number) => {
    const n = skillGroups.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const active = skillGroups[tab];
  const focusTool = focus != null ? allTools[focus] : null;

  return (
    <section id="skills" ref={sectionRef} className={`relative py-16 md:py-20 scroll-mt-16 ${s.section}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-20">
        <div className={s.layout}>
          <header className={s.head}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-2">Toolkit</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="gradient-text">Skills &amp; Tools</span>
            </h2>
          </header>

          {/* ───────── globe ───────── */}
          <div className={s.globeCol}>
            <div
              ref={stageRef}
              className={s.stage}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={onStageLeave}
              onClick={onStageClick}
              role="group"
              aria-label={`Globe of ${N} tools. Drag to orbit; use arrow keys to move between tools.`}
            >
              <span className={s.ground} aria-hidden />

              {/* bezel */}
              <svg className={s.bezel} viewBox="-500 -500 1000 1000" aria-hidden>
                <path className={s.tickMinor} d={TICKS.minor} />
                <path className={s.tickMajor} d={TICKS.major} />
                {BEZEL_LABELS.map((l) => (
                  <text key={l.d} x={l.x} y={l.y} className={s.bezelLabel} dominantBaseline="central" textAnchor="middle">
                    {String(l.d).padStart(3, "0")}
                  </text>
                ))}
              </svg>
              <div ref={(el) => void (r.current.tickHi = el)} className={s.tickHi} aria-hidden>
                <svg viewBox="-500 -500 1000 1000">
                  <path d={TICKS.minor + TICKS.major} />
                </svg>
              </div>
              <div ref={(el) => void (r.current.caret = el)} className={s.caret} aria-hidden>
                <span />
              </div>

              {/* back hemisphere */}
              <svg ref={(el) => void (r.current.svgB = el)} className={`${s.layer} ${s.back}`} aria-hidden>
                <path ref={(el) => void (r.current.gB = el)} className={s.grid} />
                <path ref={(el) => void (r.current.eqB = el)} className={s.grid} />
                <g ref={(el) => void (r.current.oGB = el)}>
                  <path ref={(el) => void (r.current.oB = el)} className={s.arcBack} />
                </g>
                <path ref={(el) => void (r.current.aB = el)} className={s.arcBack} />
              </svg>

              {/* body */}
              <div className={s.body} aria-hidden>
                <span ref={(el) => void (r.current.spec = el)} className={s.spec} />
                <span ref={(el) => void (r.current.rimLight = el)} className={s.rimLight} />
              </div>

              {/* front hemisphere */}
              <svg ref={(el) => void (r.current.svgF = el)} className={`${s.layer} ${s.front}`} aria-hidden>
                <path ref={(el) => void (r.current.d1 = el)} className={`${s.dots} ${s.dots1}`} />
                <path ref={(el) => void (r.current.d2 = el)} className={`${s.dots} ${s.dots2}`} />
                <path ref={(el) => void (r.current.d3 = el)} className={`${s.dots} ${s.dots3}`} />
                <path ref={(el) => void (r.current.gF = el)} className={s.grid} />
                <path ref={(el) => void (r.current.eqF = el)} className={`${s.grid} ${s.equator}`} />
                <g ref={(el) => void (r.current.oG = el)}>
                  <path ref={(el) => void (r.current.oF = el)} className={s.arc} />
                </g>
                <path ref={(el) => void (r.current.aF = el)} className={s.arc} />
                <path ref={(el) => void (r.current.tips = el)} className={s.tips} />
              </svg>

              {/* crosshair */}
              <div className={s.cross} data-on={focus != null ? "1" : undefined} aria-hidden>
                <span ref={(el) => void (r.current.ch = el)} className={s.ch} />
                <span ref={(el) => void (r.current.cv = el)} className={s.cv} />
              </div>

              {/* stars */}
              {allTools.map((tool, i) => {
                const arrive = litMembers?.get(i);
                return (
                  <button
                    key={tool.icon}
                    ref={(el) => {
                      starRefs.current[i] = el;
                    }}
                    type="button"
                    className={s.star}
                    style={{ "--brand": brandColor[tool.icon], "--d": `${((arrive ?? 0) + 0.05).toFixed(2)}s` } as CSSProperties}
                    tabIndex={rove === i ? 0 : -1}
                    data-focus={focus === i ? "1" : undefined}
                    data-lit={litMembers ? (arrive != null ? "1" : "0") : undefined}
                    aria-label={`${tool.name}${tool.note ? ` (${tool.note})` : ""}, ${groupOf.get(tool.icon)}`}
                    aria-pressed={pinned === i}
                    onPointerEnter={(e) => e.pointerType === "mouse" && !anim.current.dragging && setHover(i)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && setHover((h) => (h === i ? null : h))}
                    onFocus={(e) => {
                      setRove(i);
                      if (e.currentTarget.matches(":focus-visible")) setKbd(i);
                    }}
                    onBlur={() => setKbd((k) => (k === i ? null : k))}
                    onClick={() => onStarClick(i)}
                    onKeyDown={(e) => onStarKey(e, i)}
                  >
                    <span className={s.bloom} aria-hidden />
                    <span className={s.mk}>
                      <svg className={s.ring} viewBox="0 0 40 40" aria-hidden>
                        <circle className={s.ringBase} cx="20" cy="20" r="19.5" />
                        <circle className={s.ringDraw} cx="20" cy="20" r="19.5" pathLength={100} />
                        <circle className={s.ringKbd} cx="20" cy="20" r="25" pathLength={100} />
                      </svg>
                      <span className={s.ping} aria-hidden />
                      <ToolIcon name={tool.icon} className={s.glyph} />
                      <span className={s.bdot} aria-hidden />
                    </span>
                  </button>
                );
              })}

              {/* reticle */}
              <div ref={(el) => void (r.current.ret = el)} className={s.ret} data-on={focus != null ? "1" : undefined} aria-hidden>
                <svg className={s.retBox} viewBox="0 0 40 40">
                  <path d="M1 9V1h8M31 1h8v8M39 31v8h-8M9 39H1v-8" />
                </svg>
                <span className={s.retTag}>{focus != null ? `★${pad2(focus + 1)}` : ""}</span>
              </div>
            </div>

            {/* caption + live readout */}
            <div className={s.caption}>
              <div className={s.capL} aria-live="polite">
                {focusTool ? (
                  <span key={`t${focus}`} className={s.capIn}>
                    <span className={s.capDot} style={{ "--brand": brandColor[focusTool.icon] } as CSSProperties} />
                    <Scramble text={focusTool.name} className={s.capName} />
                    <span className={s.capMeta}>{groupOf.get(focusTool.icon)}</span>
                    {focusTool.note && <span className={s.capNote}>{focusTool.note}</span>}
                  </span>
                ) : (
                  <span key={`g${shown}`} className={s.capIn}>
                    <span className={s.capRing} />
                    <Scramble text={skillGroups[shown].title} className={s.capName} />
                    <span className={s.capMeta}>
                      {members[shown].length} stars<span className={s.hint}> · drag to orbit</span>
                    </span>
                  </span>
                )}
              </div>
              <div className={s.readout} aria-hidden>
                <span className={s.rk}>λ</span>
                <span ref={(el) => void (r.current.lon = el)} className={s.rv} />
                <span className={s.rk}>φ</span>
                <span ref={(el) => void (r.current.lat = el)} className={s.rv} />
              </div>
            </div>
          </div>

          {/* ───────── skills ───────── */}
          <div className={s.skills}>
            <div
              role="tablist"
              aria-label="Skill groups"
              aria-orientation="vertical"
              className={s.tabs}
              onPointerLeave={() => setHoverGroup(null)}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHoverGroup(null)}
            >
              {skillGroups.map((g, i) => (
                <button
                  key={g.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`s1-tab-${i}`}
                  aria-selected={tab === i}
                  aria-controls="s1-panel"
                  tabIndex={tab === i ? 0 : -1}
                  className={s.tab}
                  data-preview={hoverGroup === i && tab !== i ? "1" : undefined}
                  onClick={() => selectTab(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHoverGroup(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className={s.tabNum}>{pad2(i + 1)}</span>
                  <span className={s.tabTitle}>{g.title}</span>
                  <svg className={s.thumb} viewBox="0 0 44 22" aria-hidden>
                    <path d={thumbs[i].d} pathLength={100} />
                    {thumbs[i].dots.map(([x, y], k) => (
                      <circle key={k} cx={x} cy={y} r="1.5" />
                    ))}
                  </svg>
                  <span className={s.tabCount}>{pad2(members[i].length)}</span>
                </button>
              ))}
            </div>

            <div id="s1-panel" role="tabpanel" aria-labelledby={`s1-tab-${tab}`} className={s.panel}>
              <ul key={active.title} className={s.chips} aria-label={`${active.title} skills`}>
                {active.skills.map((sk, j) => (
                  <li key={sk} className={s.chip} style={{ "--j": j } as CSSProperties}>
                    {sk}
                  </li>
                ))}
              </ul>
              <div key={`tools-${active.title}`} className={s.tools}>
                <span className={s.toolsLabel}>Tools</span>
                <ul className={s.toolList}>
                  {members[tab].map((i, j) => (
                    <li key={i} style={{ "--j": j + active.skills.length * 0.5 } as CSSProperties}>
                      <button
                        type="button"
                        className={s.toolBtn}
                        data-on={focus === i ? "1" : undefined}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setPeek(i)}
                        onPointerLeave={(e) => e.pointerType === "mouse" && setPeek((p) => (p === i ? null : p))}
                        onFocus={(e) => e.currentTarget.matches(":focus-visible") && setKbd(i)}
                        onBlur={() => setKbd((k) => (k === i ? null : k))}
                        onClick={() => {
                          setPinned((p) => (p === i ? null : i));
                          setRove(i);
                        }}
                      >
                        {allTools[i].name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
