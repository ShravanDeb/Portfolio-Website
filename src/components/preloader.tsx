"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

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
    const nameEl = el.querySelector(".pre-name") as HTMLElement;
    const subEl = el.querySelector(".pre-sub") as HTMLElement;
    const counterEl = el.querySelector(".pre-counter") as HTMLElement;
    const lineEl = el.querySelector(".pre-line") as HTMLElement;
    const topHalf = el.querySelector(".pre-top") as HTMLElement;
    const bottomHalf = el.querySelector(".pre-bottom") as HTMLElement;

    if (!nameEl || !subEl || !counterEl || !lineEl || !topHalf || !bottomHalf) return;

    let splitName: SplitText | null = null;

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    document.fonts.ready.then(() => {
      splitName = SplitText.create(nameEl, {
        type: "chars",
        charsClass: "pre-char",
      });

      gsap.set(splitName.chars, { yPercent: 110, opacity: 0 });
      gsap.set(subEl, { opacity: 0, y: 10 });
      gsap.set(counterEl, { opacity: 0 });
      gsap.set(lineEl, { scaleX: 0 });

      const counter = { value: 0 };

      tl
        .to(lineEl, {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .to(
          splitName.chars,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.03,
          },
          "-=0.3"
        )
        .to(
          subEl,
          {
            opacity: 0.5,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          counterEl,
          {
            opacity: 0.4,
            duration: 0.3,
          },
          "-=0.4"
        )
        .to(
          counter,
          {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              counterEl.textContent = String(
                Math.round(counter.value)
              ).padStart(3, "0");
            },
          },
          "-=0.8"
        )
        .to(
          lineEl,
          {
            scaleX: 0,
            duration: 0.4,
            ease: "power3.inOut",
          },
          "-=0.3"
        )
        .to(
          splitName.chars,
          {
            yPercent: -110,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            stagger: 0.015,
          },
          "-=0.1"
        )
        .to(
          subEl,
          {
            opacity: 0,
            y: -8,
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.3"
        )
        .to(
          counterEl,
          {
            opacity: 0,
            duration: 0.2,
          },
          "-=0.25"
        )
        .to(
          topHalf,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.1"
        )
        .to(
          bottomHalf,
          {
            yPercent: 100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "<"
        );
    });

    return () => {
      tl.kill();
      if (splitName) splitName.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
      style={{ backgroundColor: "#09090b" }}
    >
      <div className="pre-top absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div
            className="pre-line absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-px origin-center"
            style={{ backgroundColor: "#3f3f46", transform: "scaleX(0)" }}
          />
          <span
            className="pre-name font-medium text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] overflow-hidden"
            style={{ color: "#fafafa" }}
          >
            Shravan Deb
          </span>
          <span
            className="pre-sub font-mono text-[0.6rem] uppercase tracking-[0.25em] mt-4"
            style={{ color: "#71717a" }}
          >
            AI/ML Engineer & Product Builder
          </span>
        </div>
      </div>

      <div className="pre-bottom absolute inset-0 flex items-center justify-center">
        <span
          className="pre-counter font-mono text-[0.6rem] tracking-[0.3em] tabular-nums"
          style={{ color: "#52525b" }}
        >
          000
        </span>
      </div>
    </div>
  );
}
