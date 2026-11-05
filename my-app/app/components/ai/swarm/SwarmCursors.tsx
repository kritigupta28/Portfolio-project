"use client";

import { useEffect, useRef } from "react";
import type { SwarmClasses } from "./swarmActor";
import { SwarmEngine } from "./swarmEngine";
import { CAST, STEP_SCRIPTS } from "./swarmScript";
import s from "./SwarmCursors.module.css";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const CLASSES: SwarmClasses = {
  cursor: s.cursor,
  visible: s.visible,
  tag: s.tag,
  box: s.box,
  boxOn: s.boxOn,
  dashed: s.dashed,
  chip: s.chip,
  ripple: s.ripple,
};

/** Decorative multiplayer cursors that act out the active workflow step on the stage canvas. */
export default function SwarmCursors({ step }: { step: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<SwarmEngine | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;
    const engine = new SwarmEngine(root, CAST, CLASSES);
    engineRef.current = engine;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) engine.start();
      else engine.stop();
    });
    io.observe(root);
    return () => {
      io.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.play(STEP_SCRIPTS[step] ?? {});
  }, [step]);

  return <div ref={rootRef} className={s.swarm} aria-hidden="true" />;
}
