"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!overlayRef.current || !lineRef.current || !counterRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => setVisible(false),
        });
      },
    });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
    )
      .to(
        counter,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(counter.value)
              );
            }
          },
        },
        "-=0.4"
      )
      .to(
        lineRef.current,
        { scaleX: 0, duration: 0.5, ease: "power3.inOut" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: "#09090b" }}
    >
      <div
        ref={lineRef}
        className="w-32 h-px origin-center"
        style={{ backgroundColor: "#71717a", transform: "scaleX(0)" }}
      />
      <span
        ref={counterRef}
        className="mt-6 font-mono text-xs tabular-nums"
        style={{ color: "#71717a" }}
      >
        0
      </span>
    </div>
  );
}
