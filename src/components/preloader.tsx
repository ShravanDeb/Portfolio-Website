"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!overlayRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const el = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    const line1 = el.querySelector(".pre-line-1") as HTMLElement;
    const line2 = el.querySelector(".pre-line-2") as HTMLElement;
    const line3 = el.querySelector(".pre-line-3") as HTMLElement;
    const nameLine = el.querySelector(".pre-name") as HTMLElement;
    const subLine = el.querySelector(".pre-sub") as HTMLElement;

    if (!line1 || !line2 || !line3 || !nameLine || !subLine) return;

    gsap.set([line1, line2, line3, nameLine, subLine], { opacity: 0 });

    tl.to(line1, { opacity: 0.4, duration: 0.4, ease: "power2.out" })
      .to(line2, { opacity: 0.3, duration: 0.3, ease: "power2.out" }, "-=0.2")
      .to(line3, { opacity: 0.2, duration: 0.3, ease: "power2.out" }, "-=0.2")
      .to(nameLine, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.1")
      .to(subLine, { opacity: 0.5, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to([line1, line2, line3], {
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.in",
      }, "+=0.6")
      .to(nameLine, { opacity: 0, y: -10, duration: 0.4, ease: "power3.in" }, "-=0.3")
      .to(subLine, { opacity: 0, y: -8, duration: 0.3, ease: "power3.in" }, "-=0.25")
      .to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power4.inOut",
      }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: "#09090b", clipPath: "inset(0 0 0 0)" }}
    >
      <div className="relative flex flex-col items-center gap-4">
        <div
          className="pre-line-1 absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-px"
          style={{ backgroundColor: "#3f3f46", opacity: 0 }}
        />
        <div
          className="pre-line-2 absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{ backgroundColor: "#27272a", opacity: 0 }}
        />
        <div
          className="pre-line-3 absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-px"
          style={{ backgroundColor: "#18181b", opacity: 0 }}
        />

        <span
          className="pre-name font-medium text-[clamp(1.5rem,4vw,3rem)] tracking-[-0.04em]"
          style={{ color: "#fafafa", opacity: 0 }}
        >
          Shravan Deb
        </span>
        <span
          className="pre-sub font-mono text-[0.65rem] uppercase tracking-[0.2em]"
          style={{ color: "#71717a", opacity: 0 }}
        >
          Loading experience
        </span>
      </div>
    </div>
  );
}
