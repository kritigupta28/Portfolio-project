/* One multiplayer cursor: arrow + name tag, plus the selection box it draws.
   All positions are in `em` of the stage canvas so the layer scales with the stage. */

import type { CastMember } from "./swarmScript";

export type Vec = { x: number; y: number };
export type Rect = Vec & { w: number; h: number };

export type SwarmClasses = {
  cursor: string;
  visible: string;
  tag: string;
  box: string;
  boxOn: string;
  dashed: string;
  chip: string;
  ripple: string;
};

type Motion = { from: Vec; ctrl: Vec; to: () => Vec; t0: number; dur: number; done: () => void };

const CURSOR_PATH = "M0 0 L0 17 L4.6 13.2 L7.6 20.4 L10.4 19.2 L7.4 12.2 L13.2 12 Z";
const WOBBLE_IDLE_EM = 0.3;
const WOBBLE_BUSY_EM = 0.07;
const MAX_LEAN_DEG = 14;
const LEAN_GAIN = 38;
const SHY_RADIUS_EM = 6;
const SHY_PUSH_EM = 2.2;
const BOX_PAD_EM = 0.3;

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const quad = (a: Vec, c: Vec, b: Vec, t: number): Vec => {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
};

/** Control point bent sideways off the straight line so every trip is a slight, random arc. */
const arcControl = (a: Vec, b: Vec): Vec => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const bend = (Math.random() - 0.5) * 0.5;
  return { x: (a.x + b.x) / 2 - dy * bend, y: (a.y + b.y) / 2 + dx * bend };
};

const div = (className: string, parent: HTMLElement) => {
  const el = document.createElement("div");
  el.className = className;
  parent.append(el);
  return el;
};

export class SwarmActor {
  pos: Vec = { x: 0, y: 0 };
  isBusy = false;
  isVisible = false;
  private motion: Motion | null = null;
  private boxTarget: Element | null = null;
  private lean = 0;
  private lastX = 0;
  private shy: Vec = { x: 0, y: 0 };
  private readonly seed = Math.random() * 100;
  private readonly el: HTMLElement;
  private readonly arrow: SVGSVGElement;
  private readonly box: HTMLElement;
  private readonly chip: HTMLElement;

  constructor(readonly member: CastMember, private readonly root: HTMLElement, private readonly cls: SwarmClasses) {
    this.box = div(cls.box, root);
    this.chip = div(cls.chip, this.box);
    this.el = div(cls.cursor, root);
    this.el.innerHTML =
      `<svg viewBox="0 0 14 22" aria-hidden="true"><path d="${CURSOR_PATH}" fill="${member.color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>` +
      `<span class="${cls.tag}"></span>`;
    this.el.querySelector("span")!.textContent = member.name;
    this.arrow = this.el.querySelector("svg")!;
    for (const node of [this.el, this.box]) {
      node.style.setProperty("--c", member.color);
      node.style.setProperty("--ink", member.ink);
    }
  }

  spawn(at: Vec) {
    this.pos = { ...at };
    this.lastX = at.x;
    this.isVisible = true;
    this.el.classList.add(this.cls.visible);
  }

  hide() {
    this.isVisible = false;
    this.el.classList.remove(this.cls.visible);
  }

  /** Curved, eased trip. The destination is re-read every frame so moving targets are tracked. */
  travel(to: () => Vec, now: number): Promise<void> {
    this.cancelMotion();
    const end = to();
    const dist = Math.hypot(end.x - this.pos.x, end.y - this.pos.y);
    if (dist < 0.1) return Promise.resolve();
    const dur = clamp(520 + dist * 24, 560, 1300);
    return new Promise((done) => {
      this.motion = { from: { ...this.pos }, ctrl: arcControl(this.pos, end), to, t0: now, dur, done };
    });
  }

  cancelMotion() {
    this.motion?.done();
    this.motion = null;
  }

  click() {
    const ring = div(this.cls.ripple, this.root);
    ring.style.setProperty("--c", this.member.color);
    ring.style.transform = `translate(${this.pos.x}em, ${this.pos.y}em)`;
    ring.addEventListener("animationend", () => ring.remove());
    this.arrow.animate([{ scale: 1 }, { scale: 0.78 }, { scale: 1 }], { duration: 280 });
  }

  showBox(target: Element, label: string | true, isDashed = false) {
    this.boxTarget = target;
    this.chip.textContent = label === true ? "" : label;
    this.chip.hidden = label === true;
    this.box.classList.toggle(this.cls.dashed, isDashed);
    this.box.classList.add(this.cls.boxOn);
  }

  hideBox() {
    this.boxTarget = null;
    this.box.classList.remove(this.cls.boxOn);
  }

  render(now: number, pointer: Vec | null, rectOf: (el: Element) => Rect) {
    if (!this.isVisible) return;
    this.advance(now);
    const s = now / 1000;
    const amp = this.isBusy ? WOBBLE_BUSY_EM : WOBBLE_IDLE_EM;
    const jx = (Math.sin(s * 0.8 + this.seed) + Math.sin(s * 2.1 + this.seed * 1.7) * 0.4) * amp;
    const jy = (Math.cos(s * 0.9 + this.seed * 1.3) + Math.cos(s * 1.9 + this.seed) * 0.4) * amp;
    this.updateShy(pointer);
    const x = this.pos.x + jx + this.shy.x;
    const y = this.pos.y + jy + this.shy.y;
    this.lean += (clamp((x - this.lastX) * LEAN_GAIN, -MAX_LEAN_DEG, MAX_LEAN_DEG) - this.lean) * 0.2;
    this.lastX = x;
    this.el.style.transform = `translate(${x}em, ${y}em) rotate(${this.lean}deg)`;
    if (this.boxTarget) this.placeBox(rectOf(this.boxTarget));
  }

  destroy() {
    this.cancelMotion();
    this.el.remove();
    this.box.remove();
  }

  private advance(now: number) {
    const m = this.motion;
    if (!m) return;
    const t = clamp((now - m.t0) / m.dur, 0, 1);
    this.pos = quad(m.from, m.ctrl, m.to(), easeInOut(t));
    if (t < 1) return;
    this.motion = null;
    m.done();
  }

  /** Cursors politely step aside when the visitor's real pointer comes close. */
  private updateShy(pointer: Vec | null) {
    let tx = 0;
    let ty = 0;
    if (pointer) {
      const dx = this.pos.x - pointer.x;
      const dy = this.pos.y - pointer.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < SHY_RADIUS_EM) {
        const push = (1 - dist / SHY_RADIUS_EM) * SHY_PUSH_EM;
        tx = (dx / dist) * push;
        ty = (dy / dist) * push;
      }
    }
    this.shy.x += (tx - this.shy.x) * 0.1;
    this.shy.y += (ty - this.shy.y) * 0.1;
  }

  private placeBox(r: Rect) {
    const style = this.box.style;
    style.transform = `translate(${r.x - BOX_PAD_EM}em, ${r.y - BOX_PAD_EM}em)`;
    style.width = `${r.w + BOX_PAD_EM * 2}em`;
    style.height = `${r.h + BOX_PAD_EM * 2}em`;
  }
}
