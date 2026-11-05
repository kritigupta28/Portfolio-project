/* Runs the cursor choreography: one rAF loop, a pausable clock, and an async runner per cursor.
   The clock only advances while the stage is on screen, so off-screen stages cost nothing. */

import { SwarmActor, type Rect, type SwarmClasses, type Vec } from "./swarmActor";
import type { CastMember, StepScript, SwarmTask } from "./swarmScript";

const MAX_FRAME_MS = 50;
const ENTRY_STAGGER_MS = 380;
const EDGE_OFFSET_EM = 2.5;
const DEFAULT_ANCHOR = { x: 0.72, y: 0.62 };

type Wait = { until: number; done: () => void };

export class SwarmEngine {
  private readonly actors: SwarmActor[];
  private readonly scope: HTMLElement;
  private waits: Wait[] = [];
  private clock = 0;
  private lastFrame = 0;
  private frameId = 0;
  private generation = 0;
  private fontSize = 16;
  private rootRect: DOMRect;
  private pointer: Vec | null = null;

  constructor(private readonly root: HTMLElement, cast: CastMember[], cls: SwarmClasses) {
    this.scope = root.parentElement ?? root;
    this.actors = cast.map((member) => new SwarmActor(member, root, cls));
    this.rootRect = root.getBoundingClientRect();
    this.scope.addEventListener("pointermove", this.onPointerMove);
    this.scope.addEventListener("pointerleave", this.onPointerLeave);
  }

  start() {
    if (this.frameId) return;
    this.lastFrame = performance.now();
    this.frameId = requestAnimationFrame(this.frame);
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  /** Switch to a step's script. Cursors keep their positions and fly on from wherever they are. */
  play(script: StepScript) {
    const gen = ++this.generation;
    this.flush();
    this.actors.forEach((actor, i) => {
      const tasks = script[actor.member.id];
      if (tasks?.length) void this.run(actor, tasks, gen, i * ENTRY_STAGGER_MS);
      else void this.leave(actor, gen);
    });
  }

  destroy() {
    this.stop();
    this.generation++;
    this.flush();
    this.actors.forEach((actor) => actor.destroy());
    this.scope.removeEventListener("pointermove", this.onPointerMove);
    this.scope.removeEventListener("pointerleave", this.onPointerLeave);
    this.root.replaceChildren();
  }

  private async run(actor: SwarmActor, tasks: SwarmTask[], gen: number, delay: number) {
    await this.wait(delay);
    if (gen !== this.generation) return;
    if (!actor.isVisible) actor.spawn(this.edgePoint());
    while (gen === this.generation) {
      let didWork = false;
      for (const task of tasks) {
        const target = this.scope.querySelector(`[data-sw="${task.at}"]`);
        if (!target) continue;
        didWork = true;
        if (!(await this.perform(actor, task, target, gen))) return;
      }
      // Guard against a tight loop when none of this step's targets are rendered.
      if (!didWork) await this.wait(1000);
    }
  }

  /** Returns false once the step has changed underneath the task. */
  private async perform(actor: SwarmActor, task: SwarmTask, target: Element, gen: number) {
    actor.isBusy = false;
    actor.hideBox();
    await actor.travel(() => this.anchorOf(target, task), this.clock);
    if (gen !== this.generation) return false;
    if (task.click) actor.click();
    if (task.box) actor.showBox(target, task.box, task.dashed);
    actor.isBusy = true;
    await this.wait(task.hold);
    return gen === this.generation;
  }

  private async leave(actor: SwarmActor, gen: number) {
    if (!actor.isVisible) return;
    actor.isBusy = false;
    actor.hideBox();
    const exit = this.edgePoint();
    await actor.travel(() => exit, this.clock);
    if (gen === this.generation) actor.hide();
  }

  private wait(ms: number) {
    return new Promise<void>((done) => this.waits.push({ until: this.clock + ms, done }));
  }

  /** Wake every pending runner so stale ones can notice the generation change and exit. */
  private flush() {
    const pending = this.waits;
    this.waits = [];
    pending.forEach((w) => w.done());
    this.actors.forEach((actor) => actor.cancelMotion());
  }

  private frame = (now: number) => {
    this.clock += Math.min(now - this.lastFrame, MAX_FRAME_MS);
    this.lastFrame = now;
    this.fontSize = parseFloat(getComputedStyle(this.root).fontSize) || this.fontSize;
    this.rootRect = this.root.getBoundingClientRect();

    const due = this.waits.filter((w) => w.until <= this.clock);
    if (due.length) {
      this.waits = this.waits.filter((w) => w.until > this.clock);
      due.forEach((w) => w.done());
    }
    this.actors.forEach((actor) => actor.render(this.clock, this.pointer, this.rectOf));
    this.frameId = requestAnimationFrame(this.frame);
  };

  private rectOf = (el: Element): Rect => {
    const r = el.getBoundingClientRect();
    const fs = this.fontSize;
    return {
      x: (r.left - this.rootRect.left) / fs,
      y: (r.top - this.rootRect.top) / fs,
      w: r.width / fs,
      h: r.height / fs,
    };
  };

  private anchorOf(el: Element, task: SwarmTask): Vec {
    const r = this.rectOf(el);
    return { x: r.x + r.w * (task.ax ?? DEFAULT_ANCHOR.x), y: r.y + r.h * (task.ay ?? DEFAULT_ANCHOR.y) };
  }

  private edgePoint(): Vec {
    const w = this.rootRect.width / this.fontSize;
    const h = this.rootRect.height / this.fontSize;
    const o = EDGE_OFFSET_EM;
    const edges: Vec[] = [
      { x: Math.random() * w, y: -o },
      { x: w + o, y: Math.random() * h },
      { x: Math.random() * w, y: h + o },
      { x: -o, y: Math.random() * h },
    ];
    return edges[Math.floor(Math.random() * edges.length)];
  }

  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.pointer = {
      x: (e.clientX - this.rootRect.left) / this.fontSize,
      y: (e.clientY - this.rootRect.top) / this.fontSize,
    };
  };

  private onPointerLeave = () => {
    this.pointer = null;
  };
}
