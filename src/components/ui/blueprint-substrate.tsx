"use client";

import { useEffect, useRef } from "react";

export default function BlueprintSubstrate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const isDirty = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      isDirty.current = true;
    };

    const renderLoop = () => {
      if (isDirty.current && containerRef.current) {
        const { x, y } = mousePos.current;

        containerRef.current.style.setProperty("--mouse-x", `${x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${y}px`);

        if (coordsRef.current) {
          coordsRef.current.textContent = `X:${x.toString().padStart(4, "0")} Y:${y.toString().padStart(4, "0")}`;
        }

        isDirty.current = false;
      }
      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={
        {
          "--mouse-x": "-1000px",
          "--mouse-y": "-1000px",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* 1. Ambient Substrate Layer (~3.5% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 2. Cursor-Follow Spotlight Layer (Raises local grid to ~10% opacity) */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-15 transition-opacity duration-300 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)",
        }}
      />

      {/* 3. CAD Instrumentation Readout */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 opacity-25">
        <div className="h-1.5 w-1.5 rounded-full bg-currentColor animate-pulse" />
        <span
          ref={coordsRef}
          className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-currentColor"
        >
          X:0000 Y:0000
        </span>
      </div>
    </div>
  );
}
