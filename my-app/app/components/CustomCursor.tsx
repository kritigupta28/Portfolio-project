"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 6}px`;
      cursor.style.top = `${e.clientY - 6}px`;
    };

    const addExpand = () => cursor.classList.add("expand");
    const removeExpand = () => cursor.classList.remove("expand");

    document.addEventListener("mousemove", move);

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .testimonial-card, .form-input"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addExpand);
      el.addEventListener("mouseleave", removeExpand);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addExpand);
        el.removeEventListener("mouseleave", removeExpand);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}
