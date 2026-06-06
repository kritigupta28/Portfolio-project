"use client";

import { useEffect, useRef } from "react";

// Elastic "squeeze & rotate" cursor: a precise core dot that tracks closely,
// plus a larger ring that lags behind and stretches in the direction of motion
// (like a ball elongating), easing back to a circle at rest.
export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const core = coreRef.current;
    const ring = ringRef.current;
    if (!core || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const corePos = { ...mouse };
    const ringPos = { ...mouse };
    let prevRingX = ringPos.x;
    let prevRingY = ringPos.y;

    let stretch = 0; // smoothed 0..MAX
    let angle = 0; // motion direction (deg)
    let hover = 0; // smoothed hover growth 0..1

    let targetHover = 0;
    const MAX_STRETCH = 0.45; // subtle, never too "funky"

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const interactive = document.querySelectorAll(
      "a, button, .project-card, .testimonial-card, .form-input"
    );
    const onEnter = () => (targetHover = 1);
    const onLeave = () => (targetHover = 0);
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    const render = () => {
      // Core tracks tightly (precision); ring lags for a springy, liquid feel.
      corePos.x = lerp(corePos.x, mouse.x, 0.55);
      corePos.y = lerp(corePos.y, mouse.y, 0.55);
      ringPos.x = lerp(ringPos.x, mouse.x, 0.18);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.18);

      // Velocity of the (lagging) ring drives the elongation.
      const vx = ringPos.x - prevRingX;
      const vy = ringPos.y - prevRingY;
      prevRingX = ringPos.x;
      prevRingY = ringPos.y;

      const speed = Math.hypot(vx, vy);
      const targetStretch = Math.min(speed / 90, MAX_STRETCH);
      // Slow ease in AND out so the stretch flows instead of snapping back.
      stretch = lerp(stretch, targetStretch, 0.12);

      if (speed > 0.4) angle = Math.atan2(vy, vx) * (180 / Math.PI);
      hover = lerp(hover, targetHover, 0.15);

      const grow = 1 + hover * 0.9; // ring grows on interactive elements
      const sx = (1 + stretch) * grow;
      const sy = (1 - stretch * 0.7) * grow;

      core.style.transform = `translate3d(${corePos.x}px, ${corePos.y}px, 0) translate(-50%, -50%) scale(${1 - hover * 0.5})`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${sx}, ${sy})`;

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={coreRef} className="cursor-core" />
    </div>
  );
}
